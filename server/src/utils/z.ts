/* eslint-disable */
class StringSchema {
  private rules: Array<(val: string) => string | null> = [];
  min(n: number, msg?: string): StringSchema {
    this.rules.push((val) => (val.length >= n ? null : (msg ?? "too short")));
    return this;
  }
  max(n: number, msg?: string): StringSchema {
    this.rules.push((val) => (val.length <= n ? null : (msg ?? "too long")));
    return this;
  }
  parse(val: unknown): string {
    if (typeof val !== "string") {
      throw new ZodError([{ message: "Not a string" }]);
    }
    for (const rule of this.rules) {
      const error = rule(val);
      if (error !== null) {
        throw new ZodError([{ message: error }]);
      }
    }
    return val;
  }
}

class NumberSchema {
  private rules: Array<(val: number) => string | null> = [];

  min(n: number, msg?: string): NumberSchema {
    this.rules.push((val) => (val >= n ? null : (msg ?? "too small")));
    return this;
  }
  int(msg?: string): NumberSchema {
    this.rules.push((val) => (Number.isInteger(val) ? null : (msg ?? "not an integar")));
    return this;
  }
  positive(msg?: string): NumberSchema {
    this.rules.push((val) => (val > 0 ? null : (msg ?? "not a positive")));
    return this;
  }
  parse(val: unknown): number {
    if (typeof val !== "number") {
      throw new ZodError([{ message: "Not a number" }]);
    }
    for (const rule of this.rules) {
      const error = rule(val);
      if (error !== null) {
        throw new ZodError([{ message: error }]);
      }
    }
    return val;
  }
}

class ObjectSchema {
  constructor(private shape: Record<string, { parse: (val: unknown) => unknown }>) {}

  parse(val: unknown) {
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

  parse(val: unknown) {
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
  issues: Array<{ message: string }>;

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
