import { X, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { type Product } from "@shared/schema";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default function QRModal({ isOpen, onClose, product }: QRModalProps) {
  if (!product.qrData) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Product Transparency
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <QrCode className="h-16 w-16 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">
              Scan QR code with your camera to view product origin, manufacturing process, and sustainability certifications
            </p>
          </div>

          {/* Transparency Information */}
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-3">
              <h4 className="font-medium text-gray-900 mb-2">🌍 Origin & Source</h4>
              <p className="text-sm text-gray-600">{product.qrData.origin}</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-3">
              <h4 className="font-medium text-gray-900 mb-2">🏭 Manufacturing</h4>
              <p className="text-sm text-gray-600">{product.qrData.manufacturing}</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-3">
              <h4 className="font-medium text-gray-900 mb-2">📦 Packaging</h4>
              <p className="text-sm text-gray-600">{product.qrData.packaging}</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-3">
              <h4 className="font-medium text-gray-900 mb-2">🏆 Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {product.qrData.certifications.map((cert, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Button 
            onClick={onClose}
            className="w-full bg-eco-green text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
