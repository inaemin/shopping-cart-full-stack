export interface QueryState<T> {
  status: "idle" | "loading" | "success" | "error";
  data: T | null;
  error: unknown | null;
}

interface QueryRecord<T> {
  queryFn: () => Promise<T>;
  state: QueryState<T>;
  listeners: Set<() => void>;
}

export class MyQueryClient {
  private queryCache = new Map<string, QueryRecord<unknown>>();
  private pendingMutationCount = new Map<string, number>();

  createQueryRecord<T>(queryKey: string, queryFn: () => Promise<T>) {
    if (this.queryCache.has(queryKey)) return;

    const queryRecord: QueryRecord<T> = {
      queryFn,
      state: {
        status: "idle",
        data: null,
        error: null,
      },
      listeners: new Set(),
    };
    this.queryCache.set(queryKey, queryRecord as QueryRecord<unknown>);
  }

  getQueryData<T>(queryKey: string): T | null {
    return (this.queryCache.get(queryKey)?.state.data as T | undefined) ?? null;
  }

  getQueryState<T>(queryKey: string): QueryState<T> | null {
    return (this.queryCache.get(queryKey)?.state as QueryState<T> | undefined) ?? null;
  }

  async fetchQuery<T>(queryKey: string): Promise<T | null> {
    const queryRecord = this.queryCache.get(queryKey);
    if (!queryRecord) return null;

    this.setQueryState(queryKey, {
      status: "loading",
      error: null,
    });

    try {
      const data = await queryRecord.queryFn();
      this.setQueryData(queryKey, data);
      return data as T;
    } catch (error) {
      this.setQueryState(queryKey, {
        status: "error",
        error,
      });
      throw error;
    }
  }

  setQueryData<T>(queryKey: string, dataOrUpdater: T | ((prevData: T | null) => T)) {
    const queryRecord = this.queryCache.get(queryKey);
    if (!queryRecord) return;

    const prevData = queryRecord.state.data as T | null;
    const nextData =
      typeof dataOrUpdater === "function" ? (dataOrUpdater as (prev: T | null) => T)(prevData) : dataOrUpdater;

    queryRecord.state = {
      status: "success",
      data: nextData,
      error: null,
    };

    this.notify(queryKey);
  }

  setQueryState(queryKey: string, partialState: Partial<QueryState<unknown>>) {
    const queryRecord = this.queryCache.get(queryKey);
    if (!queryRecord) return;

    queryRecord.state = {
      ...queryRecord.state,
      ...partialState,
    };

    this.notify(queryKey);
  }

  invalidate<T>(queryKey: string) {
    if (this.hasPendingMutation(queryKey)) return Promise.resolve(null);
    return this.fetchQuery<T>(queryKey);
  }

  hasPendingMutation(queryKey: string): boolean {
    return (this.pendingMutationCount.get(queryKey) ?? 0) > 0;
  }

  startMutation(queryKey: string) {
    this.pendingMutationCount.set(queryKey, (this.pendingMutationCount.get(queryKey) ?? 0) + 1);
  }

  endMutation(queryKey: string) {
    const count = this.pendingMutationCount.get(queryKey) ?? 0;
    this.pendingMutationCount.set(queryKey, Math.max(0, count - 1));
  }

  subscribe(queryKey: string, listener: () => void): () => void {
    const queryRecord = this.queryCache.get(queryKey);
    if (!queryRecord) return () => {};

    queryRecord.listeners.add(listener);

    return () => {
      queryRecord.listeners.delete(listener);
    };
  }

  private notify(queryKey: string) {
    const queryRecord = this.queryCache.get(queryKey);
    if (!queryRecord) return;

    queryRecord.listeners.forEach((listener) => listener());
  }
}
