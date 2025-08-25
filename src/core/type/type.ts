export {};

declare global {
  type StackTrace = string | null;
  type PromiseSnapshotStateKind = "loading" | "rejected" | "fulfilled";
  type LoadingPromiseSnapshot = { state: "loading" };
  type RejectedPromiseSnapshot = { state: "rejected"; error: any; stackTrace: StackTrace };
  type FulfilledPromiseSnapshot<T> = { state: "fulfilled"; data: T };
  type PromiseSnapshot<T> = LoadingPromiseSnapshot | RejectedPromiseSnapshot | FulfilledPromiseSnapshot<T>;
  type PromiseCreationCallback<T> = (signal?: AbortSignal) => Promise<T>;
}
