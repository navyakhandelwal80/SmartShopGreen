import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { type User } from "@shared/schema";
import { Link } from "wouter";
import { Loader2 } from "lucide-react";

interface EcoProgress {
  ecoBadges?: number;
  seeds?: number;
  plants?: number;
  fruits?: number;
}

export default function EcoProgressCard() {
  // Initialize with localStorage data if available
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<EcoProgress>({
    queryKey: ["/api/user"],
    initialData: () => {
      const localData = localStorage.getItem("ecoProgress");
      return localData ? JSON.parse(localData) : undefined;
    },
  });

  // Safely destructure with defaults
  const { ecoBadges = 0, seeds = 0, plants = 0, fruits = 0 } = user ?? {};

  // Status indicators
  const hasSeeds = seeds > 0;
  const hasPlants = plants > 0;
  const hasFruits = fruits > 0;

  if (isLoading) {
    return (
      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-6 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-eco-green" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white rounded-lg shadow-sm border-red-200">
        <CardContent className="p-4 text-red-500 text-sm">
          Failed to load eco progress
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-lg shadow-sm">
      <CardHeader className="border-b p-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-eco-green">🌿</span> Eco Progress
        </h3>
      </CardHeader>

      <CardContent className="space-y-4 p-4">
        <div>
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Badges: {ecoBadges}/10</span>
            <span className="text-eco-green">
              {Math.round((ecoBadges / 10) * 100)}%
            </span>
          </div>
          <Progress
            value={(ecoBadges / 10) * 100}
            className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-eco-green [&>div]:to-green-500"
          />
        </div>

        <div className="space-y-2">
          <div
            className={`flex justify-between items-center py-2 px-3 rounded-md ${
              hasSeeds ? "bg-green-50" : "bg-gray-50"
            }`}
          >
            <span className="flex items-center gap-2 text-sm">
              {hasSeeds ? "🌱" : "○"} Seeds
            </span>
            <span
              className={`font-medium ${
                hasSeeds ? "text-green-600" : "text-gray-400"
              }`}
            >
              {seeds}
            </span>
          </div>

          <div
            className={`flex justify-between items-center py-2 px-3 rounded-md ${
              hasPlants ? "bg-green-50" : "bg-gray-50"
            }`}
          >
            <span className="flex items-center gap-2 text-sm">
              {hasPlants ? "🌿" : "○"} Plants
            </span>
            <span
              className={`font-medium ${
                hasPlants ? "text-green-600" : "text-gray-400"
              }`}
            >
              {plants}
            </span>
          </div>

          <div
            className={`flex justify-between items-center py-2 px-3 rounded-md ${
              hasFruits ? "bg-green-50" : "bg-gray-50"
            }`}
          >
            <span className="flex items-center gap-2 text-sm">
              {hasFruits ? "🍎" : "○"} Fruits
            </span>
            <span
              className={`font-medium ${
                hasFruits ? "text-green-600" : "text-gray-400"
              }`}
            >
              {fruits}
            </span>
          </div>
        </div>

        <Link href="/e-garden">
          <Button className="w-full bg-gradient-to-r from-eco-green to-green-500 hover:from-green-600 hover:to-green-700 text-white py-3 font-semibold transition-all duration-300 shadow-sm hover:shadow-md">
            View Garden
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
