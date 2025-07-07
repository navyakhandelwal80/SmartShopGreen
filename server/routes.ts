import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema, insertNotificationSchema, insertOrderSchema, updateUserBudgetSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const { category, search } = req.query;
      let products;

      if (search) {
        products = await storage.searchProducts(search as string);
      } else if (category) {
        products = await storage.getProductsByCategory(Number(category));
      } else {
        products = await storage.getProducts();
      }

      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(Number(req.params.id));
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Cart - using hardcoded user ID for demo
  app.get("/api/cart", async (req, res) => {
    try {
      const userId = 1; // Hardcoded for demo
      const cartItems = await storage.getCartItems(userId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const userId = 1; // Hardcoded for demo
      const validatedData = insertCartItemSchema.parse({
        ...req.body,
        userId
      });
      
      const cartItem = await storage.addToCart(validatedData);
      
      // Update product stock
      const product = await storage.getProduct(cartItem.productId!);
      if (product && product.stock > 0) {
        await storage.updateProductStock(cartItem.productId!, product.stock - cartItem.quantity);
      }

      // Award eco points
      if (product?.isOrganic || product?.isLocal) {
        await storage.updateUserEcoPoints(userId, 10);
      }

      res.json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      const cartItem = await storage.updateCartItem(Number(req.params.id), quantity);
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const success = await storage.removeFromCart(Number(req.params.id));
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      const userId = 1; // Hardcoded for demo
      await storage.clearCart(userId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Recipes
  app.get("/api/recipes", async (req, res) => {
    try {
      const recipes = await storage.getRecipes();
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recipes" });
    }
  });

  app.get("/api/recipes/:id", async (req, res) => {
    try {
      const recipe = await storage.getRecipe(Number(req.params.id));
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recipe" });
    }
  });

  // Eco swaps
  app.get("/api/eco-swaps/:productId", async (req, res) => {
    try {
      const ecoSwaps = await storage.getEcoSwaps(Number(req.params.productId));
      res.json(ecoSwaps);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch eco swaps" });
    }
  });

  // User info
  app.get("/api/user", async (req, res) => {
    try {
      const userId = 1; // Hardcoded for demo
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.put("/api/user/budget", async (req, res) => {
    try {
      const userId = 1; // Hardcoded for demo
      const validatedData = updateUserBudgetSchema.parse(req.body);
      
      const user = await storage.updateUserBudget(userId, validatedData.budget);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid budget data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update budget" });
    }
  });

  // Notifications
  app.get("/api/notifications", async (req, res) => {
    try {
      const userId = 1; // Hardcoded for demo
      const notifications = await storage.getUserNotifications(userId);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.post("/api/notifications", async (req, res) => {
    try {
      const userId = 1; // Hardcoded for demo
      const validatedData = insertNotificationSchema.parse({
        ...req.body,
        userId
      });
      
      const notification = await storage.createNotification(validatedData);
      res.json(notification);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid notification data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create notification" });
    }
  });

  app.put("/api/notifications/:id/read", async (req, res) => {
    try {
      const success = await storage.markNotificationRead(Number(req.params.id));
      if (!success) {
        return res.status(404).json({ message: "Notification not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  // Garden progress
  app.get("/api/garden", async (req, res) => {
    try {
      const userId = 1; // Hardcoded for demo
      const progress = await storage.getUserGardenProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch garden progress" });
    }
  });

  app.post("/api/garden", async (req, res) => {
    try {
      const userId = 1; // Hardcoded for demo
      const { plantType, ecoAction } = req.body;
      const progress = await storage.addGardenProgress(userId, plantType, ecoAction);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to add garden progress" });
    }
  });

  // Orders
  app.get("/api/orders", async (req, res) => {
    try {
      const userId = 1; // Hardcoded for demo
      const orders = await storage.getUserOrders(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const userId = 1; // Hardcoded for demo
      const validatedData = insertOrderSchema.parse({
        ...req.body,
        userId
      });
      
      const order = await storage.createOrder(validatedData);
      
      // Clear the cart after successful order
      await storage.clearCart(userId);
      
      res.json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
