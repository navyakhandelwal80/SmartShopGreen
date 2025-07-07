import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Recipe } from "@shared/schema";

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const availableIngredients = recipe.ingredients.filter(ingredient => ingredient.productId).length;

  return (
    <Card 
      className="bg-white rounded-lg hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.name} 
          className="w-full h-32 object-cover rounded-lg mb-3"
        />
        <h4 className="font-semibold text-gray-900 mb-1">{recipe.name}</h4>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{recipe.description}</p>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1 text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{recipe.prepTime} min prep</span>
          </div>
          <Badge variant="secondary" className="text-eco-green font-medium">
            {availableIngredients} ingredients available
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
