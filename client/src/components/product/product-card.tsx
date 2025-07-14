import { Star, Leaf, QrCode, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Product } from "@shared/schema";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import QRModal from "@/components/qr/qr-modal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isAddingToCart } = useCart();
  const [showQRModal, setShowQRModal] = useState(false);

  const handleAddToCart = () => {
    addToCart({ productId: product.id, quantity: 1 });
  };

  const renderEcoStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < rating ? "text-green-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const hasDiscount =
    product.originalPrice &&
    parseFloat(product.originalPrice) > parseFloat(product.price);
  const discountPercentage = hasDiscount
    ? Math.round(
        ((parseFloat(product.originalPrice!) - parseFloat(product.price)) /
          parseFloat(product.originalPrice!)) *
          100
      )
    : 0;

  return (
    <>
      <Card className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Eco Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-1">
            {product.isOrganic && (
              <Badge className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Organic
              </Badge>
            )}
            {product.isLocal && (
              <Badge className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                Local
              </Badge>
            )}
            {product.isFairTrade && (
              <Badge className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                Fair Trade
              </Badge>
            )}
            {product.isReusable && (
              <Badge className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                Reusable
              </Badge>
            )}
            {product.isBiodegradable && (
              <Badge className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Biodegradable
              </Badge>
            )}
          </div>

          {/* QR Code Scanner */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowQRModal(true)}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full"
          >
            <QrCode className="w-4 h-4 text-gray-700" />
          </Button>

          {/* Limited Stock Alert */}
          {product.stock > 0 && product.stock <= 10 && (
            <Badge className="absolute bottom-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Only {product.stock} left!
            </Badge>
          )}

          {/* Expiry Discount */}
          {(product?.expiryDiscount ?? 0) > 0 && (
            <Badge className="absolute bottom-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              Expires in {product.expiryDays} days - {product.expiryDiscount}%
              off
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Carbon Footprint */}
          <div className="flex items-center space-x-2 mb-3">
            <Leaf className="w-4 h-4 text-green-500" />
            <span className="text-xs text-gray-600">
              Carbon footprint: {product.carbonFootprint}kg CO₂
            </span>
            <div className="flex">{renderEcoStars(product.ecoRating)}</div>
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>
              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {discountPercentage > 0 && (
              <Badge className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                {discountPercentage}% off
              </Badge>
            )}
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.stock === 0}
            className=" w-full
            bg-gradient-to-r from-eco-green to-green-500
            hover:from-green-600 hover:to-green-700
            text-white
            py-2
            rounded-lg
            font-medium
            transition-colors
            duration-300
            disabled:opacity-50"
          >
            {product.stock === 0 ? (
              "Out of Stock"
            ) : isAddingToCart ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <span>Adding...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      <QRModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        product={product}
      />
    </>
  );
}
