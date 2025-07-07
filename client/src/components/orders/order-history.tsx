import { Calendar, Package, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOrders } from "@/hooks/use-orders";
import { type Order } from "@shared/schema";

export default function OrderHistory() {
  const { orders, isLoading } = useOrders();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-24 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600">Your order history will appear here once you make your first purchase</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>Order History</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4">
              {/* Order Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(order.orderDate)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status === 'completed' && <Check className="w-3 h-3 mr-1" />}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                  <div className="text-lg font-bold text-gray-900 mt-1">
                    ${parseFloat(order.total).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Items ({order.items.length})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img 
                        src={item.imageUrl} 
                        alt={item.productName}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="text-sm font-medium text-gray-900">{item.productName}</h5>
                        <p className="text-xs text-gray-600">
                          Qty: {item.quantity} × ${item.price} = ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-medium">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                  <span className="text-gray-600">Order Total:</span>
                  <span className="font-bold text-lg">${parseFloat(order.total).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}