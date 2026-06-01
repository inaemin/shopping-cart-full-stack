type Rule<T> = (val: T) => string | null;

function throwIfInvalid<T>(rules: Array<Rule<T>>, val: T): void {
  const error = rules.map((rule) => rule(val)).find((result): result is string => result !== null);
  if (error !== undefined) {
    throw new ZodError([{ message: error }]);
  }
}

class StringSchema {
  private rules: Array<Rule<string>> = [];

  public min(n: number, message?: string): StringSchema {
    this.rules.push((val) => {
      if (val.length >= n) {
        return null;
      }
      return message ?? "too short";
    });
    return this;
  }

  public max(n: number, message?: string): StringSchema {
    this.rules.push((val) => {
      if (val.length <= n) {
        return null;
      }
      return message ?? "too long";
    });
    return this;
  }

  public parse(val: unknown): string {
    if (typeof val !== "string") {
      throw new ZodError([{ message: "Not a string" }]);
    }
    throwIfInvalid(this.rules, val);
    return val;
  }
}

class NumberSchema {
  private rules: Array<Rule<number>> = [];

  public min(n: number, message?: string): NumberSchema {
    this.rules.push((val) => {
      if (val >= n) {
        return null;
      }
      return message ?? "too small";
    });
    return this;
  }

  public int(message?: string): NumberSchema {
    this.rules.push((val) => {
      if (Number.isInteger(val)) {
        return null;
      }
      return message ?? "not an integar";
    });
    return this;
  }

  public positive(message?: string): NumberSchema {
    this.rules.push((val) => {
      if (val > 0) {
        return null;
      }
      return message ?? "not a positive";
    });
    return this;
  }

  public parse(val: unknown): number {
    if (typeof val !== "number") {
      throw new ZodError([{ message: "Not a number" }]);
    }
    throwIfInvalid(this.rules, val);
    return val;
  }
}

class ObjectSchema {
  constructor(private shape: Record<string, { parse: (val: unknown) => unknown }>) {}

  public parse(val: unknown) {
    if (typeof val !== "object" || val === null) {
      throw new ZodError([{ message: "Not an object" }]);
    }
    const result: Record<string, unknown> = {};
    for (const key in this.shape) {
      result[key] = this.shape[key].parse((val as Record<string, unknown>)[key]);
    }
    return result;
  }
}

class ArraySchema {
  constructor(private schema: { parse: (val: unknown) => unknown }) {}

  public parse(val: unknown) {
    if (!Array.isArray(val)) {
      throw new ZodError([{ message: "Not an Array" }]);
    }
    const result: unknown[] = [];
    for (const item of val) {
      result.push(this.schema.parse(item));
    }
    return result;
  }
}

export class ZodError extends Error {
  public issues: Array<{ message: string }>;

  constructor(issues: Array<{ message: string }>) {
    super("Validation failed");
    this.issues = issues;
  }
}

export const z = {
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
  object: (shape: Record<string, { parse: (val: unknown) => unknown }>) => new ObjectSchema(shape),
  array: (schema: { parse: (val: unknown) => unknown }) => new ArraySchema(schema),
};
