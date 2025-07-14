import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Bell, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/hooks/use-notifications";
import SmartCart from "./smart-cart";

export default function Header() {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { unreadCount } = useNotifications();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/recipes", label: "Recipes" },
    { href: "/e-garden", label: "E-Garden" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md border-b-2 border-eco-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-eco-green to-eco-blue rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🌿</span>
              </div>
              <span className="text-xl font-bold text-gray-900">EcoMart</span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search sustainable products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:border-eco-green focus:outline-none transition-colors"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 
                  transform -translate-y-1/2 
                  bg-gradient-to-r from-eco-green to-green-500
                  hover:from-green-600 hover:to-green-700
                  text-white 
                  px-4 py-1.5 
                  rounded-full 
                  text-sm 
                  transition-colors
                  duration-300"
                >
                  Search
                </Button>
              </form>
            </div>

            {/* Navigation Links - Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors ${
                    location === link.href
                      ? "text-eco-green"
                      : "text-gray-700 hover:text-eco-green"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-gray-700 hover:text-eco-green" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                    {unreadCount}
                  </Badge>
                )}
              </Button>

              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5 text-gray-700 hover:text-eco-green" />
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search sustainable products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-20 py-3 border-2 border-gray-200 rounded-full focus:border-eco-green focus:outline-none transition-colors"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-eco-green text-white px-4 py-1.5 rounded-full text-sm hover:bg-green-600 transition-colors"
              >
                Search
              </Button>
            </form>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-2 font-medium transition-colors ${
                    location === link.href
                      ? "text-eco-green"
                      : "text-gray-700 hover:text-eco-green"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Smart Cart */}
      <SmartCart />
    </>
  );
}
