import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertCartItemSchema,
  insertNotificationSchema,
  insertOrderSchema,
  updateUserBudgetSchema,
  users,
} from "@shared/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "./db";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/eco-swap/accept", async (req, res) => {
    const userId = req.body.userId;

    try {
      await rewardEcoFriendlyAction(userId);
      res.json({ message: "Eco action rewarded!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Eco action failed" });
    }
  });
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

  // Cart (demo userId = 1)
  app.get("/api/cart", async (req, res) => {
    try {
      const cartItems = await storage.getCartItems(1);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const userId = 1;
      const validatedData = insertCartItemSchema.parse({
        ...req.body,
        userId,
      });

      const cartItem = await storage.addToCart(validatedData);

      const product = await storage.getProduct(cartItem.productId!);
      if (product && product.stock > 0) {
        await storage.updateProductStock(
          cartItem.productId!,
          product.stock - cartItem.quantity
        );
      }

      if (product?.isOrganic || product?.isLocal) {
        await storage.updateUserEcoPoints(userId, 10);
      }

      res.json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      const cartItem = await storage.updateCartItem(
        Number(req.params.id),
        quantity
      );
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
      await storage.clearCart(1);
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

  // Eco Swaps
  app.get("/api/eco-swaps/:productId", async (req, res) => {
    try {
      const ecoSwaps = await storage.getEcoSwaps(Number(req.params.productId));
      res.json(ecoSwaps);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch eco swaps" });
    }
  });

  // User
  app.get("/api/user", async (req, res) => {
    try {
      const user = await storage.getUser(1);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Reward user for accepting eco-friendly choice
  app.post("/api/eco-action", async (req, res) => {
    console.log("==> /api/eco-action called");

    try {
      const userId = 1; // Or whatever user logic you have
      console.log(`Fetching user with ID: ${userId}`);

      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
      });

      if (!user) {
        console.log("User not found!");
        return res.status(404).json({ message: "User not found" });
      }

      console.log("User fetched:", user);

      let ecoBadges = user.ecoBadges ?? 0;
      let seeds = user.seeds ?? 0;
      let plants = user.plants ?? 0;
      let fruits = user.fruits ?? 0;

      console.log("Current progress:", { ecoBadges, seeds, plants, fruits });

      ecoBadges += 1;

      if (ecoBadges >= 10) {
        ecoBadges = 0;
        seeds += 1;
      }

      if (seeds >= 3) {
        seeds = 0;
        plants += 1;
      }

      if (plants >= 3) {
        plants = 0;
        fruits += 1;
      }

      console.log("Updated progress:", { ecoBadges, seeds, plants, fruits });

      await db
        .update(users)
        .set({
          ecoBadges,
          seeds,
          plants,
          fruits,
        })
        .where(eq(users.id, userId));

      console.log("Database update successful.");

      res.json({
        message: "Eco action rewarded successfully!",
        progress: { ecoBadges, seeds, plants, fruits },
      });
    } catch (error) {
      console.error("❌ Error in /api/eco-action:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: String(error) });
    }
  });

  app.put("/api/user/budget", async (req, res) => {
    try {
      const validatedData = updateUserBudgetSchema.parse(req.body);
      const user = await storage.updateUserBudget(1, validatedData.budget);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid budget data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update budget" });
    }
  });

  // Notifications
  app.get("/api/notifications", async (req, res) => {
    try {
      const notifications = await storage.getUserNotifications(1);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.post("/api/notifications", async (req, res) => {
    try {
      const validatedData = insertNotificationSchema.parse({
        ...req.body,
        userId: 1,
      });
      const notification = await storage.createNotification(validatedData);
      res.json(notification);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid notification data", errors: error.errors });
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
    console.log("GET /api/garden called");

    try {
      const progress = await storage.getUserGardenProgress(1);
      console.log("Garden progress:", progress);
      res.json(progress);
    } catch (error) {
      console.error("Error in /api/garden:", error);
      res.status(500).json({ message: "Failed to fetch garden progress" });
    }
  });

  app.post("/api/garden", async (req, res) => {
    try {
      const { plantType, ecoAction } = req.body;
      const progress = await storage.addGardenProgress(1, plantType, ecoAction);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to add garden progress" });
    }
  });

  // Orders
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getUserOrders(1);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse({
        ...req.body,
        userId: 1,
      });
      const order = await storage.createOrder(validatedData);
      await storage.clearCart(1);
      res.json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Eco choice reward route (final version)
  app.post("/api/eco-choice", async (req, res) => {
    try {
      const userId = 1;
      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
      });

      if (!user) return res.status(404).json({ message: "User not found" });

      let ecoBadges = user.ecoBadges ?? 0;
      let seeds = user.seeds ?? 0;
      let plants = user.plants ?? 0;
      let fruits = user.fruits ?? 0;

      ecoBadges += 1;
      if (ecoBadges >= 10) {
        ecoBadges = 0;
        seeds += 1;
      }

      if (seeds >= 3) {
        seeds = 0;
        plants += 1;
      }

      if (plants >= 3) {
        plants = 0;
        fruits += 1;
      }

      await db
        .update(users)
        .set({ ecoBadges, seeds, plants, fruits })
        .where(eq(users.id, userId));

      res.json({
        message: "Eco action rewarded successfully",
        progress: { ecoBadges, seeds, plants, fruits },
      });
    } catch (error) {
      console.error("Eco choice error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

import { rewardEcoFriendlyAction } from "../server/utils/ecoGamification"; // adjust path
