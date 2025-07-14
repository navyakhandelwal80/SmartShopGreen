import {
  Leaf,
  Coins,
  Award,
  TreePine,
  Flower,
  Sprout,
  Star,
  Gift,
  Target,
} from "lucide-react";
import { toast as sonnerToast } from "sonner"; // or from your toast library

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { type User } from "@shared/schema";
import * as React from "react";

export default function EGarden() {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="bg-gray-200 h-32 rounded-xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-200 h-48 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">User not found</h1>
        </div>
      </div>
    );
  }

  const co2Saved = parseFloat(user.co2Saved ?? "0");
  const nextLevelPoints = (user.gardenLevel ?? 0) * 200;
  const currentLevelProgress = (((user.ecoPoints ?? 0) % 200) / 200) * 100;
  const nextRewardProgress = (((user.ecoPoints ?? 0) % 200) / 200) * 100;
  const nextFreeProductProgress = (((user.ecoPoints ?? 0) % 500) / 500) * 100;

  const plants = [
    {
      id: 1,
      name: "Sunflower",
      icon: "🌻",
      level: 3,
      unlocked: true,
      description: "Organic purchases",
    },
    {
      id: 2,
      name: "Oak Tree",
      icon: "🌳",
      level: 2,
      unlocked: true,
      description: "Reusable choices",
    },
    {
      id: 3,
      name: "Rose Bush",
      icon: "🌹",
      level: 1,
      unlocked: true,
      description: "Local products",
    },
    {
      id: 4,
      name: "Bamboo",
      icon: "🎋",
      level: 4,
      unlocked: true,
      description: "Zero waste actions",
    },
    {
      id: 5,
      name: "Lavender",
      icon: "💜",
      level: 1,
      unlocked: true,
      description: "Fair trade purchases",
    },
    {
      id: 6,
      name: "Cactus",
      icon: "🌵",
      level: 2,
      unlocked: true,
      description: "Water conservation",
    },
    {
      id: 7,
      name: "Pine Tree",
      icon: "🌲",
      level: 1,
      unlocked: true,
      description: "Carbon neutral choices",
    },
    {
      id: 8,
      name: "Lily",
      icon: "🪷",
      level: 0,
      unlocked: false,
      description: "Unlock at Level 8",
    },
    {
      id: 9,
      name: "Cherry Blossom",
      icon: "🌸",
      level: 0,
      unlocked: false,
      description: "Unlock at Level 10",
    },
  ];

  const achievements = [
    {
      id: 1,
      name: "Eco Warrior",
      description: "Made 50 sustainable purchases",
      icon: "🛡️",
      completed: true,
      points: 100,
    },
    {
      id: 2,
      name: "Carbon Saver",
      description: "Saved 10kg of CO₂",
      icon: "🌍",
      completed: true,
      points: 150,
    },
    {
      id: 3,
      name: "Local Hero",
      description: "Bought 25 local products",
      icon: "🏪",
      completed: true,
      points: 75,
    },
    {
      id: 4,
      name: "Waste Warrior",
      description: "Chose reusable options 30 times",
      icon: "♻️",
      completed: false,
      progress: 23,
      total: 30,
      points: 200,
    },
    {
      id: 5,
      name: "Garden Master",
      description: "Reach Garden Level 10",
      icon: "👑",
      completed: false,
      progress: user.gardenLevel,
      total: 10,
      points: 500,
    },
    {
      id: 6,
      name: "Recipe Explorer",
      description: "Cook 20 sustainable recipes",
      icon: "👨‍🍳",
      completed: false,
      progress: 12,
      total: 20,
      points: 150,
    },
  ];

  const rewards = [
    {
      id: 1,
      name: "5% Store Credit",
      cost: 200,
      description: "Get 5% off your next purchase",
      icon: "💳",
      available: user?.ecoPoints ?? 0 >= 200,
    },
    {
      id: 2,
      name: "Free Organic Product",
      cost: 500,
      description: "Choose any organic product under $25",
      icon: "🥕",
      available: user?.ecoPoints ?? 0 >= 500,
    },
    {
      id: 3,
      name: "Premium Membership",
      cost: 1000,
      description: "3 months of premium features",
      icon: "⭐",
      available: user?.ecoPoints ?? 0 >= 1000,
    },
    {
      id: 4,
      name: "Eco Starter Kit",
      cost: 750,
      description: "Curated sustainable living kit",
      icon: "📦",
      available: user?.ecoPoints ?? 0 >= 750,
    },
    {
      id: 5,
      name: "Tree Planting",
      cost: 300,
      description: "Plant a real tree in your name",
      icon: "🌳",
      available: user?.ecoPoints ?? 0 >= 300,
    },
    {
      id: 6,
      name: "Consultation Call",
      cost: 1500,
      description: "1-hour sustainability consultation",
      icon: "📞",
      available: user?.ecoPoints ?? 0 >= 1500,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Your Virtual E-Garden 🌱
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Watch your sustainable choices bloom into a thriving garden and unlock
          amazing rewards
        </p>
      </div>

      {/* Garden Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="bg-gradient-to-r from-pink-400 to-purple-600 text-white">
          <CardContent className="p-6 text-center">
            <Leaf className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-2">
              Level {user.gardenLevel}
            </h3>
            <p className="text-green-100">Garden Level</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-sky-400 to-indigo-600 text-white">
          <CardContent className="p-6 text-center">
            <Coins className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-2">{user.ecoPoints}</h3>
            <p className="text-blue-100">Eco Points</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6 text-center">
            <TreePine className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-2">{co2Saved.toFixed(1)}kg</h3>
            <p className="text-green-100">CO₂ Saved</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <CardContent className="p-6 text-center">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-2">
              {achievements.filter((a) => a.completed).length}
            </h3>
            <p className="text-yellow-100">Achievements</p>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Progress to Level {user?.gardenLevel ?? 0 + 1}
            </h3>
            <Badge className="bg-eco-green text-white">
              {user?.ecoPoints ?? 0 % 200}/200 points
            </Badge>
          </div>
          <Progress value={currentLevelProgress} className="h-4 mb-2" />
          <p className="text-sm text-gray-600">
            Keep making eco-friendly choices to level up your garden!
          </p>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="garden" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="garden">My Garden</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="garden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Garden Visualization */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Flower className="w-6 h-6 text-eco-green" />
                    <span>Your Growing Garden</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-b from-sky-200 to-green-200 rounded-xl p-8 min-h-[400px] relative overflow-hidden">
                    {/* Garden Background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-300 via-green-200 to-sky-200"></div>

                    {/* Plants Grid */}
                    <div className="relative z-10 grid grid-cols-3 gap-8 h-full">
                      {plants.map((plant, index) => (
                        <div
                          key={plant.id}
                          className={`flex flex-col items-center justify-end transition-all duration-300 ${
                            plant.unlocked
                              ? "hover:scale-110 cursor-pointer"
                              : "opacity-50 grayscale"
                          }`}
                        >
                          <div
                            className={`text-6xl mb-2 ${
                              plant.unlocked ? "animate-pulse" : ""
                            }`}
                          >
                            {plant.unlocked ? plant.icon : "🌰"}
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-700">
                              {plant.name}
                            </div>
                            {plant.unlocked ? (
                              <Badge variant="secondary" className="text-xs">
                                Level {plant.level}
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                Locked
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-4 left-4 text-2xl">🦋</div>
                    <div className="absolute top-8 right-8 text-2xl">☀️</div>
                    <div className="absolute bottom-8 right-12 text-2xl">
                      🐝
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Garden Statistics */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Garden Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Sprout className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">Plants Grown</span>
                    </div>
                    <span className="font-bold text-green-600">
                      {plants.filter((p) => p.unlocked).length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium">Achievements</span>
                    </div>
                    <span className="font-bold text-blue-600">
                      {achievements.filter((a) => a.completed).length}/
                      {achievements.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm font-medium">Total Points</span>
                    </div>
                    <span className="font-bold text-yellow-600">
                      {user.ecoPoints}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full bg-green-600 text-white hover:bg-green-700 hover:text-white border-green-600"
                  >
                    Water Plants (+5 points)
                  </Button>
                  <Button variant="outline" className="w-full">
                    Share Garden
                  </Button>
                  <Button variant="outline" className="w-full">
                    Garden Tips
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={achievement.completed ? "ring-2 ring-eco-green" : ""}
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {achievement.description}
                    </p>

                    {achievement.completed ? (
                      <Badge className="bg-green-500 text-white mb-2">
                        Completed • +{achievement.points} points
                      </Badge>
                    ) : achievement.progress !== undefined ? (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>
                            {achievement.progress}/{achievement.total}
                          </span>
                        </div>
                        <Progress
                          value={
                            (achievement?.progress ?? 0 / achievement.total) *
                            100
                          }
                          className="h-2"
                        />
                        <Badge variant="outline" className="mt-2">
                          {achievement.points} points when completed
                        </Badge>
                      </div>
                    ) : (
                      <Badge variant="outline">
                        {achievement.points} points
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rewards">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-700">
                        5% Store Credit
                      </span>
                      <span className="text-sm text-gray-500">
                        {Math.max(0, 200 - (user?.ecoPoints ?? 0 % 200))} points
                        to go
                      </span>
                    </div>
                    <Progress value={nextRewardProgress} className="h-2" />
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-700">
                        Free Eco Product
                      </span>
                      <span className="text-sm text-gray-500">
                        {Math.max(0, 500 - (user?.ecoPoints ?? 0 % 500))} points
                        to go
                      </span>
                    </div>
                    <Progress value={nextFreeProductProgress} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => (
                <Card
                  key={reward.id}
                  className={
                    reward.available ? "ring-2 ring-eco-blue" : "opacity-75"
                  }
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{reward.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {reward.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {reward.description}
                    </p>

                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Coins className="w-4 h-4 text-yellow-600" />
                      <span className="font-semibold text-gray-900">
                        {reward.cost} points
                      </span>
                    </div>

                    <Button
                      className={`w-full ${
                        reward.available
                          ? "active:bg-eco-blue focus:bg-eco-blue"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                      disabled={!reward.available}
                    >
                      {reward.available ? "Claim Reward" : "Not Available"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle>Eco Champions Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border-2 border-yellow-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        EcoMaster2024
                      </div>
                      <div className="text-sm text-gray-600">
                        Level 15 • 3,420 points
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl">🏆</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        GreenWarrior
                      </div>
                      <div className="text-sm text-gray-600">
                        Level 12 • 2,890 points
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl">🥈</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border-2 border-orange-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        SustainableLife
                      </div>
                      <div className="text-sm text-gray-600">
                        Level 10 • 2,156 points
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl">🥉</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-eco-light-green rounded-lg border-2 border-eco-green">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-eco-green font-bold border-2 border-eco-green">
                      8
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {/*user.username*/} Roma (You)
                      </div>
                      <div className="text-sm text-gray-600">
                        Level {/*user.gardenLevel*/}7 • {/*user.ecoPoints*/}1240
                        points
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl">🌟</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
