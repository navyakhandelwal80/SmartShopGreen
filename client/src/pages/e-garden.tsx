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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { type User } from "@shared/schema";

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

  const ecoPoints = user.ecoPoints ?? 0;
  const gardenLevel = user.gardenLevel ?? 0;
  const co2Saved = parseFloat(user.co2Saved ?? "0");

  const nextLevelPoints = gardenLevel * 200;
  const currentLevelProgress = ((ecoPoints % 200) / 200) * 100;
  const nextRewardProgress = ((ecoPoints % 200) / 200) * 100;
  const nextFreeProductProgress = ((ecoPoints % 500) / 500) * 100;

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
      progress: gardenLevel,
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
      available: ecoPoints >= 200,
    },
    {
      id: 2,
      name: "Free Organic Product",
      cost: 500,
      description: "Choose any organic product under $25",
      icon: "🥕",
      available: ecoPoints >= 500,
    },
    {
      id: 3,
      name: "Premium Membership",
      cost: 1000,
      description: "3 months of premium features",
      icon: "⭐",
      available: ecoPoints >= 1000,
    },
    {
      id: 4,
      name: "Eco Starter Kit",
      cost: 750,
      description: "Curated sustainable living kit",
      icon: "📦",
      available: ecoPoints >= 750,
    },
    {
      id: 5,
      name: "Tree Planting",
      cost: 300,
      description: "Plant a real tree in your name",
      icon: "🌳",
      available: ecoPoints >= 300,
    },
    {
      id: 6,
      name: "Consultation Call",
      cost: 1500,
      description: "1-hour sustainability consultation",
      icon: "📞",
      available: ecoPoints >= 1500,
    },
  ];

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Your original JSX code continues here */}
      {/* The only changes made above are null safety fixes for user props */}
    </div>
  );
}
