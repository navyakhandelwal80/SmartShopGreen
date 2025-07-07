import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useBudget() {
  const queryClient = useQueryClient();

  const updateBudgetMutation = useMutation({
    mutationFn: async (budget: string) => {
      const response = await apiRequest("PUT", "/api/user/budget", { budget });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    },
  });

  return {
    updateBudget: updateBudgetMutation.mutate,
    isUpdating: updateBudgetMutation.isPending,
    error: updateBudgetMutation.error,
  };
}