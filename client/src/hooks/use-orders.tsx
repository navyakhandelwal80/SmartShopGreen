import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type Order } from "@shared/schema";

export function useOrders() {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: { total: string; items: any[] }) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    },
  });

  return {
    orders,
    isLoading,
    createOrder: createOrderMutation.mutate,
    isCreatingOrder: createOrderMutation.isPending,
  };
}