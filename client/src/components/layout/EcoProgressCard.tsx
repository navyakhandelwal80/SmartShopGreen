import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { type User } from "@shared/schema";
import { Link } from "wouter";

export default function EcoProgressCard() {
  // This is REAL DATA from your database / API
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const ecoBadges = user?.ecoBadges ?? 0;
  const seeds = user?.seeds ?? 0;
  const plants = user?.plants ?? 0;
  const fruits = user?.fruits ?? 0;

  return (
    <Card className="bg-white rounded-lg shadow-sm">
      <CardHeader className="border-b p-4">
        <h3 className="text-lg font-semibold text-gray-800">🌿 Eco Progress</h3>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">
            Badges: {ecoBadges}/10
          </p>
          <Progress
            value={(ecoBadges / 10) * 100}
            className="h-2 animate-pulse"
          />
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <span>🌱 Seeds</span>
          <span>{seeds}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <span>🌿 Plants</span>
          <span>{plants}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <span>🍎 Fruits</span>
          <span>{fruits}</span>
        </div>
        <Link href="/e-garden">
          <Button
            className="
    w-full 
    bg-gradient-to-r from-eco-green to-green-500 
    hover:from-green-600 hover:to-green-700 
    text-white 
    py-3 
    font-semibold 
    transition-all 
    duration-300
  "
          >
            View Garden
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
