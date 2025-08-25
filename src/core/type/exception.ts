export type ExceptionOr<T, Exception = any> = T
export type ExceptionOrPromise<T, Exception = any> = Promise<ExceptionOr<T, Exception>>