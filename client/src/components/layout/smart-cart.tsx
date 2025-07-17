import { useState } from "react";
import { ChevronDown, ChevronUp, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useCart } from "@/hooks/use-cart";
import { useQuery } from "@tanstack/react-query";
import { type User } from "@shared/schema";
import { Link } from "wouter";

export default function SmartCart() {
  const [isExpanded, setIsExpanded] = useState(true);
  const {
    cartItems,
    cartTotal,
    cartCount,
    removeFromCart,
    isRemovingFromCart,
  } = useCart();

  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const budget = parseFloat(user?.budget || "100");
  const budgetUsed = (cartTotal / budget) * 100;

  const ecoSuggestion = {
    title: "🌱 Eco Swap Suggestion",
    message:
      "Replace plastic bags with reusable cotton bags and save 2.3kg CO₂",
    action: "Add Eco Alternative",
  };
  return (
    <div className="fixed right-4 top-24 w-80 bg-white rounded-xl shadow-xl border-2 border-eco-green z-40 transform transition-transform duration-300 max-h-[90vh] flex flex-col">
      {/* Header */}
      <CardHeader className="p-4 border-b border-gray-200 bg-gradient-to-r from-eco-light-green to-eco-light-blue rounded-t-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Smart Cart</h3>
          <div className="flex items-center space-x-2">
            <Badge className="bg-gradient-to-r from-eco-green to-green-500 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all duration-300">
              {cartCount} items
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-6 w-6"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Conditional Content */}
      {isExpanded && (
        <>
          {/* Budget Warning */}
          {cartTotal > budget && (
            <div className="p-3 bg-red-100 text-red-800 font-semibold rounded-md mx-4 mt-2 border border-red-300">
              ⚠️ Warning: You have exceeded your budget limit!
            </div>
          )}

          {/* Scrollable Cart Items */}
          <div className="flex-1 overflow-y-auto">
            <CardContent className="p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Your cart is empty</p>
                  <Link href="/products">
                    <Button className="bg-gradient-to-r from-eco-green to-green-500 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all duration-300">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <img
                        src={item.product?.imageUrl || "/placeholder.png"}
                        alt={item.product?.name || "No image"}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                          {item.product?.name || "Unnamed item"}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          {item.product?.isOrganic && (
                            <Badge
                              variant="secondary"
                              className="text-xs text-green-600 bg-green-100"
                            >
                              Organic
                            </Badge>
                          )}
                          {item.product?.isLocal && (
                            <Badge
                              variant="secondary"
                              className="text-xs text-blue-600 bg-blue-100"
                            >
                              Local
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">
                            ${item.product?.price} × {item.quantity}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        disabled={isRemovingFromCart}
                        className="h-6 w-6 text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </div>

          {/* Eco Suggestion */}
          <div className="p-4 bg-eco-light-green border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              {ecoSuggestion.title}
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              {ecoSuggestion.message}
            </p>
            <Button
              className=" w-full 
    bg-gradient-to-r from-eco-green to-green-500 
    hover:from-green-600 hover:to-green-700 
    text-white 
    text-sm 
    py-2 
    rounded-lg 
    transition-colors 
    duration-300"
            >
              {ecoSuggestion.action}
            </Button>
          </div>

          {/* Sticky Footer */}
          <div className="p-4 border-t border-gray-200 rounded-b-xl">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-lg text-gray-900">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <Link href="/cart">
              <Button
                className=" w-full 
    bg-gradient-to-r from-eco-green to-green-500 
    hover:from-green-600 hover:to-green-700 
    text-white 
    text-sm 
    py-2 
    rounded-lg 
    transition-colors 
    duration-300"
              >
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
