import { pgTable, text, serial, integer, boolean, decimal, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  budget: decimal("budget", { precision: 10, scale: 2 }).default("100.00"),
  ecoPoints: integer("eco_points").default(0),
  gardenLevel: integer("garden_level").default(1),
  co2Saved: decimal("co2_saved", { precision: 10, scale: 2 }).default("0.00"),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  imageUrl: text("image_url").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  carbonFootprint: decimal("carbon_footprint", { precision: 10, scale: 2 }).notNull(),
  ecoRating: integer("eco_rating").notNull().default(3), // 1-5 stars
  stock: integer("stock").notNull().default(0),
  isOrganic: boolean("is_organic").default(false),
  isLocal: boolean("is_local").default(false),
  isFairTrade: boolean("is_fair_trade").default(false),
  isReusable: boolean("is_reusable").default(false),
  isBiodegradable: boolean("is_biodegradable").default(false),
  expiryDiscount: integer("expiry_discount").default(0), // percentage
  expiryDays: integer("expiry_days").default(0),
  qrData: json("qr_data").$type<{
    origin: string;
    manufacturing: string;
    packaging: string;
    certifications: string[];
  }>(),
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  productId: integer("product_id").references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
});

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  prepTime: integer("prep_time").notNull(), // minutes
  ingredients: json("ingredients").$type<{
    name: string;
    quantity: string;
    unit: string;
    productId?: number;
  }[]>().notNull(),
  instructions: text("instructions").array().notNull(),
  ecoRating: integer("eco_rating").default(3),
});

export const ecoSwaps = pgTable("eco_swaps", {
  id: serial("id").primaryKey(),
  originalProductId: integer("original_product_id").references(() => products.id),
  swapProductId: integer("swap_product_id").references(() => products.id),
  co2Savings: decimal("co2_savings", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  type: text("type").notNull(), // 'deal', 'stock', 'budget', 'eco'
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: text("created_at").notNull(),
});

export const gardenProgress = pgTable("garden_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  plantType: text("plant_type").notNull(),
  unlockedAt: text("unlocked_at").notNull(),
  ecoAction: text("eco_action").notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("completed"), // pending, completed, cancelled
  orderDate: text("order_date").notNull(),
  items: json("items").$type<{
    productId: number;
    productName: string;
    quantity: number;
    price: string;
    imageUrl: string;
  }[]>().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  ecoPoints: true,
  gardenLevel: true,
  co2Saved: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
});

export const insertRecipeSchema = createInsertSchema(recipes).omit({
  id: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
});

export const updateUserBudgetSchema = z.object({
  budget: z.string().regex(/^\d+(\.\d{1,2})?$/, "Budget must be a valid decimal number"),
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

export type Recipe = typeof recipes.$inferSelect;
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type EcoSwap = typeof ecoSwaps.$inferSelect;

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;

export type GardenProgress = typeof gardenProgress.$inferSelect;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
