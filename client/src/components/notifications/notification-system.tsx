import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNotifications } from "@/hooks/use-notifications";

const iconMap = {
  eco: CheckCircle,
  budget: AlertTriangle,
  deal: Info,
  stock: AlertCircle,
};

const colorMap = {
  eco: "bg-green-500",
  budget: "bg-orange-500", 
  deal: "bg-blue-500",
  stock: "bg-red-500",
};

export default function NotificationSystem() {
  const { notifications, markAsRead } = useNotifications();
  
  const activeNotifications = notifications.filter(n => !n.isRead).slice(0, 3);

  if (activeNotifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm">
      {activeNotifications.map((notification) => {
        const Icon = iconMap[notification.type as keyof typeof iconMap] || Info;
        const colorClass = colorMap[notification.type as keyof typeof colorMap] || "bg-gray-500";

        return (
          <Card
            key={notification.id}
            className={`${colorClass} text-white p-4 shadow-lg transform transition-transform duration-300 animate-in slide-in-from-right`}
          >
            <div className="flex items-start space-x-3">
              <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium">{notification.title}</h4>
                <p className="text-sm opacity-90 mt-1">{notification.message}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => markAsRead(notification.id)}
                className="text-white/80 hover:text-white hover:bg-white/20 h-6 w-6 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
