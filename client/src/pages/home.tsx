import { useQuery } from "@tanstack/react-query";
import { type Product, type Category, type Recipe } from "@shared/schema";
import ProductCard from "@/components/product/product-card";
import RecipeCard from "@/components/recipe/recipe-card";
import EGardenWidget from "@/components/garden/e-garden-widget";
import NotificationSystem from "@/components/notifications/notification-system";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import EcoProgressCard from "@/components/layout/EcoProgressCard";
import SmartCart from "@/components/layout/smart-cart";
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: recipes = [] } = useQuery<Recipe[]>({
    queryKey: ["/api/recipes"],
  });

  const featuredProducts = products.slice(0, 4);
  const featuredRecipes = recipes.slice(0, 3);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Banner */}
        <section className="relative h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-eco-green/90 to-eco-blue/90"></div>
          <img
            src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600"
            alt="Sustainable Shopping Background"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Shop Sustainably, Live Better
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Discover eco-friendly products with real-time carbon tracking
                and smart budget management
              </p>

              {/* Interactive Deal Banners */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-3xl mb-2">🌿</div>
                  <h3 className="font-semibold mb-1">Eco Deals</h3>
                  <p className="text-sm opacity-90">
                    Up to 30% off sustainable products
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-3xl mb-2">⏰</div>
                  <h3 className="font-semibold mb-1">Limited Stock</h3>
                  <p className="text-sm opacity-90">
                    Only 24 organic meal kits left
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-3xl mb-2">♻️</div>
                  <h3 className="font-semibold mb-1">Carbon Neutral</h3>
                  <p className="text-sm opacity-90">
                    Free shipping on $50+ orders
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="bg-white py-6 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Shop by Category
              </h2>
              <Link href="/products">
                <Button
                  variant="ghost"
                  className="text-eco-green hover:text-green-600 font-medium"
                >
                  View All
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                >
                  <div className="text-center group cursor-pointer">
                    <div
                      className={`w-16 h-16 mx-auto bg-eco-light-${
                        category.color === "eco-green" ? "green" : "blue"
                      } rounded-full flex items-center justify-center group-hover:bg-${
                        category.color
                      } transition-colors`}
                    >
                      <div
                        className={`text-2xl text-${category.color} group-hover:text-white`}
                      >
                        {category.name === "Fresh Produce" && "🍎"}
                        {category.name === "Home & Garden" && "🏠"}
                        {category.name === "Sustainable Fashion" && "👕"}
                        {category.name === "Personal Care" && "🚿"}
                        {category.name === "Kitchen" && "🍴"}
                        {category.name === "Baby & Kids" && "👶"}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 mt-2 block">
                      {category.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Sustainable Products
              </h2>
              <Link href="/products">
                <Button
                  variant="ghost"
                  className="text-eco-green hover:text-green-600"
                >
                  View All Products
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Recipe Interface */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recipe-Based Shopping
              </h2>
              <p className="text-lg text-gray-600">
                Find sustainable ingredients for your favorite recipes
              </p>
            </div>

            <div className="bg-gradient-to-r from-eco-light-green to-eco-light-blue rounded-xl p-6 mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-2xl text-eco-green">🍴</div>
                <h3 className="text-xl font-semibold text-gray-900">
                  What's for dinner tonight?
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>

            <div className="text-center">
              <Link href="/recipes">
                <Button className="bg-gradient-to-r from-eco-green to-green-500 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all duration-300">
                  Explore All Recipes
                </Button>
              </Link>
            </div>
          </div>
        </section>
        {/* Eco Progress Card Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EcoProgressCard />
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Track Your Sustainability Impact
                </h2>
                <p className="text-gray-600">
                  See how your shopping habits contribute to a greener planet.
                </p>
                <Link href="/dashboard">
                  <Button
                    onClick={async () => {
                      try {
                        const res = await fetch("/api/eco-action", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({}), // you can omit userId since it's hardcoded as `1`
                        });
                        if (!res.ok)
                          throw new Error("Failed to reward eco action");
                        const data = await res.json();

                        // ✅ Add this: refresh user query
                        await queryClient.invalidateQueries({
                          queryKey: ["/api/user"],
                          refetchType: "all", // or "active" / "inactive" depending on your need
                        });

                        alert(
                          "✅ Eco action rewarded!\n" +
                            JSON.stringify(data.progress, null, 2)
                        );
                      } catch (error) {
                        console.error(error);
                        alert("❌ Failed to reward eco action");
                      }
                    }}
                    className="bg-eco-green text-white hover:bg-green-600 transition-colors"
                  >
                    🎁 Reward Eco Action
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* E-Garden Dashboard */}
        <section className="py-12 bg-gradient-to-r from-eco-light-green to-eco-light-blue">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <EGardenWidget />
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-eco-green to-eco-blue rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🌿</span>
                  </div>
                  <span className="text-xl font-bold">EcoMart</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Making sustainable shopping accessible, affordable, and
                  rewarding for everyone.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Shop</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <Link
                      href="/products?category=1"
                      className="hover:text-white transition-colors"
                    >
                      Fresh Produce
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products?category=2"
                      className="hover:text-white transition-colors"
                    >
                      Home & Garden
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products?category=4"
                      className="hover:text-white transition-colors"
                    >
                      Personal Care
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products?category=3"
                      className="hover:text-white transition-colors"
                    >
                      Sustainable Fashion
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Features</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <Link
                      href="/cart"
                      className="hover:text-white transition-colors"
                    >
                      Smart Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/recipes"
                      className="hover:text-white transition-colors"
                    >
                      Recipe Shopping
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/e-garden"
                      className="hover:text-white transition-colors"
                    >
                      E-Garden
                    </Link>
                  </li>
                  <li>
                    <span className="hover:text-white transition-colors cursor-pointer">
                      QR Transparency
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <span className="hover:text-white transition-colors cursor-pointer">
                      Help Center
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-white transition-colors cursor-pointer">
                      Sustainability Guide
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-white transition-colors cursor-pointer">
                      Contact Us
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-white transition-colors cursor-pointer">
                      About
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm text-gray-400">
                © 2024 EcoMart. All rights reserved.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  📘
                </span>
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  🐦
                </span>
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  📷
                </span>
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  💼
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <NotificationSystem />
    </>
  );
}
