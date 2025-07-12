import { Leaf, Coins, Recycle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { type User } from "@shared/schema";

export default function EGardenWidget() {
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  if (!user) return null;

  const nextRewardProgress = ((user?.ecoPoints ?? 0 % 200) / 200) * 100;
  const nextFreeProductProgress = ((user?.ecoPoints ?? 0 % 500) / 500) * 100;

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
          Your Virtual E-Garden 🌱
        </CardTitle>
        <p className="text-lg text-gray-600">
          Watch your sustainable choices bloom into rewards
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Garden Progress */}
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                alt="Virtual Garden Progress"
                className="w-full h-full rounded-full object-cover border-4 border-eco-green"
              />
              <div className="absolute -bottom-2 -right-2 bg-eco-green text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                {user.gardenLevel}
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Garden Level</h3>
            <p className="text-sm text-gray-600">
              {user.gardenLevel} plants grown from eco choices
            </p>
          </div>

          {/* Eco Stats */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  CO₂ Saved
                </span>
              </div>
              <span className="text-sm font-bold text-green-600">
                {user.co2Saved}kg
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Recycle className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Items Recycled
                </span>
              </div>
              <span className="text-sm font-bold text-blue-600">23</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Coins className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-gray-700">
                  Eco Points
                </span>
              </div>
              <span className="text-sm font-bold text-yellow-600">
                {user.ecoPoints}
              </span>
            </div>
          </div>

          {/* Next Rewards */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Upcoming Rewards</h4>

            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  5% Store Credit
                </span>
                <span className="text-xs text-gray-500">
                  {200 - (user?.ecoPoints ?? 0 % 200)} points to go
                </span>
              </div>
              <Progress value={nextRewardProgress} className="h-2" />
            </div>

            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Free Eco Product
                </span>
                <span className="text-xs text-gray-500">
                  {500 - (user?.ecoPoints ?? 0 % 500)} points to go
                </span>
              </div>
              <Progress value={nextFreeProductProgress} className="h-2" />
            </div>

            <Button className="w-full bg-gradient-to-r from-eco-green to-eco-blue text-white py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
              View All Rewards
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
