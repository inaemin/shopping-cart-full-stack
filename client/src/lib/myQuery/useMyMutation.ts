import { useContext } from "react";
import { MyQueryContext } from "./MyQueryContext";

interface MutationOptions<TResult, TVariables, TContext> {
  onMutate?: (variables: TVariables) => TContext | undefined;
  onSuccess?: (result: TResult, variables: TVariables, context: TContext | undefined) => void;
  onError?: (error: unknown, variables: TVariables, context: TContext | undefined) => void;
  onSettled?: (variables: TVariables, context: TContext | undefined) => void;
}

export function useMyMutation<TResult, TVariables, TContext = unknown>(
  queryKey: string,
  mutationFn: (variables: TVariables) => Promise<TResult>,
  options: MutationOptions<TResult, TVariables, TContext> = {},
) {
  const myQueryClient = useContext(MyQueryContext);
  if (!myQueryClient) {
    throw new Error("useMyMutation은 MyQueryProvider 안에서 사용해야 합니다.");
  }

  const mutate = async (variables: TVariables): Promise<TResult> => {
    let context: TContext | undefined;

    myQueryClient.startMutation(queryKey);
    try {
      context = options.onMutate?.(variables);
      const result = await mutationFn(variables);
      options.onSuccess?.(result, variables, context);
      return result;
    } catch (error) {
      options.onError?.(error, variables, context);
      throw error;
    } finally {
      options.onSettled?.(variables, context);
      myQueryClient.endMutation(queryKey);
      myQueryClient.invalidate(queryKey);
    }
  };

  return { mutate };
}
