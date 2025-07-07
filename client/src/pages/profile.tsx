import { User, CreditCard, Settings, Package, Leaf, Award, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { type User as UserType } from "@shared/schema";

export default function Profile() {
  const { data: user, isLoading } = useQuery<UserType>({
    queryKey: ["/api/user"],
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="bg-gray-200 h-32 rounded-xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-gray-200 h-24 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">User not found</h1>
        </div>
      </div>
    );
  }

  const budget = parseFloat(user.budget);
  const co2Saved = parseFloat(user.co2Saved);
  const nextLevelPoints = user.gardenLevel * 200;
  const currentLevelProgress = (user.ecoPoints % 200) / 200 * 100;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-r from-eco-green to-eco-blue rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge className="bg-eco-green text-white">
                    Level {user.gardenLevel} Eco Shopper
                  </Badge>
                  <Badge variant="secondary">
                    {user.ecoPoints} Eco Points
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-eco-light-green rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-6 h-6 text-eco-green" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">${budget.toFixed(2)}</h3>
            <p className="text-sm text-gray-600">Remaining Budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-eco-light-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-eco-green" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{co2Saved.toFixed(1)}kg</h3>
            <p className="text-sm text-gray-600">CO₂ Saved</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-eco-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-eco-blue" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{user.ecoPoints}</h3>
            <p className="text-sm text-gray-600">Eco Points</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-eco-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-eco-blue" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">23</h3>
            <p className="text-sm text-gray-600">Orders Placed</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Garden Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>🌱</span>
                  <span>Garden Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-eco-green mb-2">Level {user.gardenLevel}</div>
                  <p className="text-gray-600">Eco Garden Level</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress to Level {user.gardenLevel + 1}</span>
                    <span>{user.ecoPoints % 200}/200 points</span>
                  </div>
                  <Progress value={currentLevelProgress} className="h-3" />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-green-600">{user.gardenLevel}</div>
                    <div className="text-xs text-green-600">Plants Grown</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-blue-600">7</div>
                    <div className="text-xs text-blue-600">Eco Actions</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Environmental Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Leaf className="w-5 h-5 text-eco-green" />
                  <span>Environmental Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-green-800">CO₂ Saved</span>
                      <span className="text-lg font-bold text-green-600">{co2Saved.toFixed(1)}kg</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      Equivalent to planting 2 trees
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-800">Water Saved</span>
                      <span className="text-lg font-bold text-blue-600">450L</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                      Through sustainable product choices
                    </p>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-yellow-800">Waste Reduced</span>
                      <span className="text-lg font-bold text-yellow-600">2.3kg</span>
                    </div>
                    <p className="text-xs text-yellow-600 mt-1">
                      By choosing reusable products
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Eco Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Purchased organic vegetables</p>
                    <p className="text-sm text-gray-600">Saved 0.8kg CO₂ • 2 hours ago</p>
                  </div>
                  <Badge className="bg-green-500 text-white">+10 points</Badge>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Chose reusable packaging</p>
                    <p className="text-sm text-gray-600">Reduced waste • 1 day ago</p>
                  </div>
                  <Badge className="bg-blue-500 text-white">+5 points</Badge>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Reached Garden Level 7</p>
                    <p className="text-sm text-gray-600">Unlocked new rewards • 3 days ago</p>
                  </div>
                  <Badge className="bg-yellow-500 text-white">Level Up!</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-6">Start shopping to see your order history here</p>
                <Button className="bg-eco-green hover:bg-green-600">
                  Start Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">First Eco Purchase</h3>
                <p className="text-sm text-gray-600 mb-3">Made your first sustainable purchase</p>
                <Badge className="bg-green-500 text-white">Completed</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">♻️</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Recycling Champion</h3>
                <p className="text-sm text-gray-600 mb-3">Chose reusable products 10 times</p>
                <Badge className="bg-blue-500 text-white">Completed</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Garden Master</h3>
                <p className="text-sm text-gray-600 mb-3">Reach Garden Level 10</p>
                <Badge variant="secondary">7/10 Progress</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Username</label>
                  <div className="mt-1 p-3 border rounded-lg bg-gray-50">{user.username}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 p-3 border rounded-lg bg-gray-50">{user.email}</div>
                </div>
                <Button variant="outline" className="w-full">
                  Edit Account Information
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Monthly Budget</label>
                  <div className="mt-1 p-3 border rounded-lg bg-gray-50">${budget.toFixed(2)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Budget Alerts</label>
                  <div className="mt-1">
                    <Badge className="bg-eco-green text-white">Enabled</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Update Budget Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
