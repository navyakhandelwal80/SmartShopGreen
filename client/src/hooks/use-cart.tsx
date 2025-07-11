import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type CartItem, type Product } from "@shared/schema";

type CartItemWithProduct = CartItem & { product: Product };

export function useCart() {
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
  });

  const addToCartMutation = useMutation({
    mutationFn: async (data: { productId: number; quantity: number }) => {
      const response = await apiRequest("POST", "/api/cart", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
  });

  const updateCartMutation = useMutation({
    mutationFn: async (data: { id: number; quantity: number }) => {
      const response = await apiRequest("PUT", `/api/cart/${data.id}`, {
        quantity: data.quantity,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/cart/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("DELETE", "/api/cart");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const cartTotal = cartItems.reduce((total, item) => {
    return (
      total + (parseFloat(item.product?.price ?? "0") || 0) * item.quantity
    );
  }, 0);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const totalCo2 = cartItems.reduce((total, item) => {
    return (
      total +
      (parseFloat(item.product?.carbonFootprint ?? "0") || 0) * item.quantity
    );
  }, 0);

  return {
    cartItems,
    isLoading,
    cartTotal,
    cartCount,
    totalCo2,
    addToCart: addToCartMutation.mutate,
    updateCart: updateCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    clearCart: clearCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingCart: updateCartMutation.isPending,
    isRemovingFromCart: removeFromCartMutation.isPending,
  };
}
