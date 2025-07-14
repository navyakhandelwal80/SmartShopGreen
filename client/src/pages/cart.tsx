import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CreditCard,
  Leaf,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useOrders } from "@/hooks/use-orders";
import { useQuery } from "@tanstack/react-query";
import { type User } from "@shared/schema";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import EcoProgressCard from "@/components/layout/EcoProgressCard";

export default function Cart() {
  const {
    cartItems,
    cartTotal,
    cartCount,
    totalCo2,
    updateCart,
    removeFromCart,
    clearCart,
    isUpdatingCart,
    isRemovingFromCart,
  } = useCart();

  const { createOrder, isCreatingOrder } = useOrders();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const budget = parseFloat(user?.budget || "100");
  const budgetUsed = (cartTotal / budget) * 100;
  const remainingBudget = budget - cartTotal;

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCart({ id: itemId, quantity: newQuantity });
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const finalTotal =
      cartTotal + (cartTotal >= 50 ? 0 : 5.99) + cartTotal * 0.08;

    const orderItems = cartItems.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      imageUrl: item.product.imageUrl,
    }));

    createOrder(
      {
        total: finalTotal.toFixed(2),
        items: orderItems,
      },
      {
        onSuccess: () => {
          toast({
            title: "Order Placed Successfully!",
            description:
              "Thank you for your eco-friendly purchase. Check your profile for order details.",
          });
          setLocation("/profile");
        },
        onError: () => {
          toast({
            title: "Checkout Failed",
            description:
              "There was an error processing your order. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Start shopping for sustainable products to build your eco-friendly
            lifestyle
          </p>
          <Link href="/products">
            <Button className="bg-gradient-to-r from-eco-green to-green-500 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all duration-300">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <Button
              variant="ghost"
              onClick={() => clearCart()}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Clear Cart
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.product.description}
                        </p>

                        {/* Eco Badges */}
                        <div className="flex items-center space-x-2 mb-2">
                          {item.product.isOrganic && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Organic
                            </Badge>
                          )}
                          {item.product.isLocal && (
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              Local
                            </Badge>
                          )}
                          {item.product.isFairTrade && (
                            <Badge className="bg-purple-100 text-purple-800 text-xs">
                              Fair Trade
                            </Badge>
                          )}
                        </div>

                        {/* Carbon Footprint */}
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Leaf className="w-3 h-3 text-green-500" />
                          <span>
                            {item.product.carbonFootprint}kg CO₂ per item
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          disabled={isUpdatingCart}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          disabled={isUpdatingCart}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          $
                          {(
                            parseFloat(item.product.price) * item.quantity
                          ).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.product.price} each
                        </p>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        disabled={isRemovingFromCart}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {index < cartItems.length - 1 && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Eco Suggestions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg text-eco-green">
                🌱 Eco Swap Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-eco-light-green rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-3">
                  Replace plastic bags with reusable cotton bags and save 2.3kg
                  CO₂
                </p>
                <Button className="bg-gradient-to-r from-eco-green to-green-500 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all duration-300">
                  Add Eco Alternative
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Budget Tracker */}
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Budget Used</span>
                  <span>
                    ${cartTotal.toFixed(2)} / ${budget.toFixed(2)}
                  </span>
                </div>
                <Progress value={budgetUsed} className="h-3" />
                {remainingBudget < 0 && (
                  <div className="flex items-center space-x-2 mt-2 text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">
                      Over budget by ${Math.abs(remainingBudget).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
              <section className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                  <EcoProgressCard />
                </div>
              </section>

              <Separator />

              {/* Cart Details */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({cartCount})</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">
                    {cartTotal >= 50 ? "FREE" : "$5.99"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">
                    ${(cartTotal * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>
                  $
                  {(
                    cartTotal +
                    (cartTotal >= 50 ? 0 : 5.99) +
                    cartTotal * 0.08
                  ).toFixed(2)}
                </span>
              </div>

              {/* Environmental Impact */}
              <div className="bg-eco-light-green rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Environmental Impact
                </h4>
                <div className="flex items-center space-x-2 text-sm">
                  <Leaf className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">
                    Total carbon footprint: {totalCo2.toFixed(1)}kg CO₂
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  You're saving 15% CO₂ compared to conventional alternatives
                </p>
              </div>

              {/* Shipping Info */}
              {cartTotal < 50 && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                className="
                w-full 
                bg-gradient-to-r from-eco-blue to-blue-500 
                hover:from-blue-600 hover:to-blue-700 
                text-white 
                py-3 
                px-8  // ← Only include if your original had horizontal padding
                text-lg 
                font-semibold 
                rounded-lg 
                shadow-md 
                transition-all 
                duration-300
              "
                disabled={remainingBudget < 0 || isCreatingOrder}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                {isCreatingOrder ? "Processing..." : "Proceed to Checkout"}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Secure checkout with 256-bit SSL encryption
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
