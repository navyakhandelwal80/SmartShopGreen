import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Filter } from "lucide-react";
import { type Product, type Category } from "@shared/schema";
import ProductCard from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Products() {
  const [location] = useLocation();
  const [sortBy, setSortBy] = useState("eco-rating");
  
  // Extract query parameters
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const categoryParam = urlParams.get('category');
  const searchParam = urlParams.get('search');

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { category: categoryParam, search: searchParam }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (categoryParam) params.append('category', categoryParam);
      if (searchParam) params.append('search', searchParam);
      
      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    },
  });

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price);
      case "carbon-footprint":
        return parseFloat(a.carbonFootprint) - parseFloat(b.carbonFootprint);
      case "eco-rating":
      default:
        return b.ecoRating - a.ecoRating;
    }
  });

  const selectedCategory = categories.find(c => c.id === Number(categoryParam));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {searchParam ? `Search Results for "${searchParam}"` : 
           selectedCategory ? selectedCategory.name : 
           "All Products"}
        </h1>
        <p className="text-gray-600">
          {searchParam ? `Found ${products.length} sustainable products` :
           selectedCategory ? `Browse our ${selectedCategory.name.toLowerCase()} collection` :
           "Discover our full range of sustainable products"}
        </p>
      </div>

      {/* Filters and Sorting */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </Button>
        </div>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="eco-rating">Sort by: Eco Rating</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="carbon-footprint">Carbon Footprint</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-4 animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="space-y-3">
                <div className="bg-gray-200 h-4 rounded"></div>
                <div className="bg-gray-200 h-3 rounded w-2/3"></div>
                <div className="bg-gray-200 h-8 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            {searchParam ? 
              "Try adjusting your search terms or browse our categories" :
              "Check back soon for new sustainable products"
            }
          </p>
          <Button className="bg-eco-green hover:bg-green-600">
            Browse All Products
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Load More (if needed) */}
      {sortedProducts.length >= 12 && (
        <div className="text-center mt-12">
          <Button variant="outline" className="bg-white hover:bg-gray-50">
            Load More Products
          </Button>
        </div>
      )}
    </div>
  );
}
