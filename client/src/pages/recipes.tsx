import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Clock, Users, Star } from "lucide-react";
import { type Recipe, type Product } from "@shared/schema";
import RecipeCard from "@/components/recipe/recipe-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";

export default function Recipes() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { addToCart } = useCart();

  const { data: recipes = [], isLoading } = useQuery<Recipe[]>({
    queryKey: ["/api/recipes"],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const handleAddIngredientsToCart = (recipe: Recipe) => {
    recipe.ingredients.forEach(ingredient => {
      if (ingredient.productId) {
        addToCart({ productId: ingredient.productId, quantity: 1 });
      }
    });
  };

  const getProductForIngredient = (productId?: number) => {
    return productId ? products.find(p => p.id === productId) : null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Recipe-Based Shopping</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover delicious recipes and shop for sustainable ingredients with just one click
        </p>
      </div>

      {/* Featured Banner */}
      <div className="bg-gradient-to-r from-eco-light-green to-eco-light-blue rounded-xl p-8 mb-12">
        <div className="flex items-center space-x-4 mb-6">
          <div className="text-3xl">🍴</div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Smart Recipe Shopping</h2>
            <p className="text-gray-600">Add all recipe ingredients to your cart in one click</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">⏱️</div>
            <h3 className="font-semibold text-gray-900">Save Time</h3>
            <p className="text-sm text-gray-600">No more hunting for ingredients</p>
          </div>
          <div className="bg-white/80 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🌱</div>
            <h3 className="font-semibold text-gray-900">Eco-Friendly</h3>
            <p className="text-sm text-gray-600">Sustainable ingredient suggestions</p>
          </div>
          <div className="bg-white/80 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">💰</div>
            <h3 className="font-semibold text-gray-900">Budget Friendly</h3>
            <p className="text-sm text-gray-600">Track costs as you plan meals</p>
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg p-4 animate-pulse">
              <div className="bg-gray-200 h-32 rounded-lg mb-3"></div>
              <div className="space-y-2">
                <div className="bg-gray-200 h-4 rounded"></div>
                <div className="bg-gray-200 h-3 rounded w-2/3"></div>
                <div className="bg-gray-200 h-3 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onClick={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>
      )}

      {/* Recipe Detail Modal */}
      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedRecipe.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <img 
                  src={selectedRecipe.imageUrl} 
                  alt={selectedRecipe.name}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedRecipe.prepTime} minutes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>4 servings</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{selectedRecipe.ecoRating}/5 eco rating</span>
                  </div>
                </div>

                <p className="text-gray-700">{selectedRecipe.description}</p>

                {/* Ingredients */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
                  <div className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => {
                      const product = getProductForIngredient(ingredient.productId);
                      return (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {product && (
                              <img 
                                src={product.imageUrl} 
                                alt={ingredient.name}
                                className="w-8 h-8 rounded object-cover"
                              />
                            )}
                            <span className="font-medium">{ingredient.name}</span>
                            <span className="text-gray-600">
                              {ingredient.quantity} {ingredient.unit}
                            </span>
                          </div>
                          {product ? (
                            <Badge className="bg-eco-green text-white">
                              Available - ${product.price}
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              Not in stock
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h3>
                  <ol className="space-y-2">
                    {selectedRecipe.instructions.map((step, index) => (
                      <li key={index} className="flex space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-eco-green text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t">
                  <Button 
                    onClick={() => handleAddIngredientsToCart(selectedRecipe)}
                    className="flex-1 bg-eco-green hover:bg-green-600"
                  >
                    Add All Ingredients to Cart
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Save Recipe
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
