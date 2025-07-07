import { 
  users, products, cartItems, recipes, categories, ecoSwaps, notifications, gardenProgress,
  type User, type InsertUser, type Product, type InsertProduct, 
  type CartItem, type InsertCartItem, type Recipe, type InsertRecipe,
  type Category, type InsertCategory, type EcoSwap, type Notification, type InsertNotification,
  type GardenProgress
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserBudget(userId: number, amount: number): Promise<User | undefined>;
  updateUserEcoPoints(userId: number, points: number): Promise<User | undefined>;

  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProductStock(productId: number, stock: number): Promise<Product | undefined>;

  // Categories
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Cart
  getCartItems(userId: number): Promise<(CartItem & { product: Product })[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(userId: number): Promise<boolean>;

  // Recipes
  getRecipes(): Promise<Recipe[]>;
  getRecipe(id: number): Promise<Recipe | undefined>;
  getRecipesByIngredient(productId: number): Promise<Recipe[]>;
  createRecipe(recipe: InsertRecipe): Promise<Recipe>;

  // Eco Swaps
  getEcoSwaps(productId: number): Promise<(EcoSwap & { swapProduct: Product })[]>;

  // Notifications
  getUserNotifications(userId: number): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationRead(id: number): Promise<boolean>;

  // Garden Progress
  getUserGardenProgress(userId: number): Promise<GardenProgress[]>;
  addGardenProgress(userId: number, plantType: string, ecoAction: string): Promise<GardenProgress>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private recipes: Map<number, Recipe>;
  private categories: Map<number, Category>;
  private ecoSwaps: Map<number, EcoSwap>;
  private notifications: Map<number, Notification>;
  private gardenProgress: Map<number, GardenProgress>;
  private currentUserId: number;
  private currentProductId: number;
  private currentCartId: number;
  private currentRecipeId: number;
  private currentCategoryId: number;
  private currentEcoSwapId: number;
  private currentNotificationId: number;
  private currentGardenId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.recipes = new Map();
    this.categories = new Map();
    this.ecoSwaps = new Map();
    this.notifications = new Map();
    this.gardenProgress = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentCartId = 1;
    this.currentRecipeId = 1;
    this.currentCategoryId = 1;
    this.currentEcoSwapId = 1;
    this.currentNotificationId = 1;
    this.currentGardenId = 1;

    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const categoriesData = [
      { name: "Fresh Produce", icon: "fas fa-apple-alt", color: "eco-green" },
      { name: "Home & Garden", icon: "fas fa-home", color: "eco-blue" },
      { name: "Sustainable Fashion", icon: "fas fa-tshirt", color: "eco-green" },
      { name: "Personal Care", icon: "fas fa-shower", color: "eco-blue" },
      { name: "Kitchen", icon: "fas fa-utensils", color: "eco-green" },
      { name: "Baby & Kids", icon: "fas fa-baby", color: "eco-blue" },
    ];

    categoriesData.forEach(cat => {
      const category: Category = { ...cat, id: this.currentCategoryId++ };
      this.categories.set(category.id, category);
    });

    // Initialize products
    const productsData = [
      {
        name: "Organic Vegetable Box",
        description: "Fresh seasonal vegetables from local farms",
        price: "24.99",
        originalPrice: "29.99",
        imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 1,
        carbonFootprint: "0.8",
        ecoRating: 5,
        stock: 5,
        isOrganic: true,
        isLocal: true,
        expiryDiscount: 17,
        expiryDays: 2,
        qrData: {
          origin: "Organic Farm, Valencia, Spain - 1,200 miles transport",
          manufacturing: "Solar-powered facility with zero waste production",
          packaging: "100% recyclable cardboard with plant-based inks",
          certifications: ["USDA Organic", "Fair Trade", "Carbon Neutral"]
        }
      },
      {
        name: "Bamboo Toothbrush Set",
        description: "Sustainable bamboo toothbrushes, pack of 4",
        price: "12.99",
        imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 4,
        carbonFootprint: "0.1",
        ecoRating: 4,
        stock: 25,
        isBiodegradable: true,
        qrData: {
          origin: "Bamboo farms, Vietnam - 8,500 miles transport",
          manufacturing: "Hand-crafted by local artisans",
          packaging: "Compostable packaging made from recycled paper",
          certifications: ["FSC Certified", "Biodegradable"]
        }
      },
      {
        name: "Glass Container Set",
        description: "Borosilicate glass containers with bamboo lids",
        price: "39.99",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 5,
        carbonFootprint: "2.1",
        ecoRating: 5,
        stock: 15,
        isReusable: true,
        qrData: {
          origin: "Glass factory, Czech Republic - 1,800 miles transport",
          manufacturing: "Recycled glass with energy-efficient process",
          packaging: "Minimal cardboard packaging",
          certifications: ["Recyclable", "BPA-Free"]
        }
      },
      {
        name: "Organic Cotton T-Shirt",
        description: "Premium organic cotton with natural dyes",
        price: "22.49",
        originalPrice: "29.99",
        imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 3,
        carbonFootprint: "5.2",
        ecoRating: 4,
        stock: 8,
        isOrganic: true,
        isFairTrade: true,
        expiryDiscount: 25,
        expiryDays: 2,
        qrData: {
          origin: "Organic cotton farms, India - 4,200 miles transport",
          manufacturing: "Fair trade certified facility with renewable energy",
          packaging: "Biodegradable poly bags",
          certifications: ["GOTS Certified", "Fair Trade", "Organic"]
        }
      },
      {
        name: "Solar Power Bank",
        description: "20,000mAh portable solar charger",
        price: "79.99",
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 2,
        carbonFootprint: "12.3",
        ecoRating: 5,
        stock: 12,
        qrData: {
          origin: "Solar panel factory, China - 7,800 miles transport",
          manufacturing: "Solar-powered manufacturing facility",
          packaging: "Recycled cardboard packaging",
          certifications: ["Energy Star", "RoHS Compliant"]
        }
      },
      {
        name: "Seed Paper Notebook",
        description: "Plantable pages that grow wildflowers",
        price: "15.99",
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 2,
        carbonFootprint: "0.3",
        ecoRating: 4,
        stock: 30,
        isBiodegradable: true,
        qrData: {
          origin: "Paper mill, Canada - 2,100 miles transport",
          manufacturing: "Made from recycled paper and embedded seeds",
          packaging: "No plastic packaging, paper band only",
          certifications: ["Plantable", "Recycled Content"]
        }
      }
    ];

    productsData.forEach(prod => {
      const product: Product = { 
        ...prod, 
        id: this.currentProductId++,
        originalPrice: prod.originalPrice || null,
        expiryDiscount: prod.expiryDiscount || 0,
        expiryDays: prod.expiryDays || 0,
        isOrganic: prod.isOrganic || false,
        isLocal: prod.isLocal || false,
        isFairTrade: prod.isFairTrade || false,
        isReusable: prod.isReusable || false,
        isBiodegradable: prod.isBiodegradable || false
      };
      this.products.set(product.id, product);
    });

    // Initialize recipes
    const recipesData = [
      {
        name: "Mediterranean Salad",
        description: "Fresh tomatoes, cucumbers, olives, feta",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        prepTime: 15,
        ecoRating: 5,
        ingredients: [
          { name: "Organic Tomatoes", quantity: "2", unit: "pieces", productId: 1 },
          { name: "Cucumber", quantity: "1", unit: "piece", productId: 1 },
          { name: "Olives", quantity: "100", unit: "g" },
          { name: "Feta Cheese", quantity: "150", unit: "g" },
          { name: "Olive Oil", quantity: "2", unit: "tbsp" },
          { name: "Herbs", quantity: "1", unit: "bunch" }
        ],
        instructions: [
          "Wash and chop tomatoes and cucumber",
          "Mix vegetables in a large bowl",
          "Add olives and crumbled feta",
          "Drizzle with olive oil",
          "Season with herbs and serve"
        ]
      },
      {
        name: "Organic Pasta Primavera",
        description: "Seasonal vegetables with organic pasta",
        imageUrl: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        prepTime: 25,
        ecoRating: 4,
        ingredients: [
          { name: "Organic Pasta", quantity: "300", unit: "g" },
          { name: "Mixed Vegetables", quantity: "400", unit: "g", productId: 1 },
          { name: "Garlic", quantity: "3", unit: "cloves" },
          { name: "Olive Oil", quantity: "3", unit: "tbsp" },
          { name: "Parmesan", quantity: "50", unit: "g" },
          { name: "Fresh Basil", quantity: "1", unit: "bunch" },
          { name: "Cherry Tomatoes", quantity: "200", unit: "g" },
          { name: "Bell Peppers", quantity: "2", unit: "pieces" }
        ],
        instructions: [
          "Cook pasta according to package instructions",
          "Heat olive oil in a large pan",
          "Sauté garlic until fragrant",
          "Add vegetables and cook until tender",
          "Toss with cooked pasta",
          "Add parmesan and fresh basil",
          "Serve immediately"
        ]
      },
      {
        name: "Green Smoothie Bowl",
        description: "Spinach, banana, berries, chia seeds",
        imageUrl: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        prepTime: 10,
        ecoRating: 5,
        ingredients: [
          { name: "Fresh Spinach", quantity: "2", unit: "cups", productId: 1 },
          { name: "Banana", quantity: "1", unit: "piece" },
          { name: "Mixed Berries", quantity: "1", unit: "cup" },
          { name: "Chia Seeds", quantity: "1", unit: "tbsp" },
          { name: "Almond Milk", quantity: "200", unit: "ml" }
        ],
        instructions: [
          "Add spinach, banana, and almond milk to blender",
          "Blend until smooth",
          "Pour into bowl",
          "Top with berries and chia seeds",
          "Serve immediately"
        ]
      }
    ];

    recipesData.forEach(recipe => {
      const recipeItem: Recipe = { ...recipe, id: this.currentRecipeId++ };
      this.recipes.set(recipeItem.id, recipeItem);
    });

    // Initialize sample user
    const sampleUser: User = {
      id: this.currentUserId++,
      username: "eco_shopper",
      password: "password123",
      email: "eco@example.com",
      budget: "100.00",
      ecoPoints: 1240,
      gardenLevel: 7,
      co2Saved: "12.40"
    };
    this.users.set(sampleUser.id, sampleUser);

    // Initialize eco swaps
    const ecoSwapData = [
      {
        originalProductId: 1,
        swapProductId: 2,
        co2Savings: "1.2",
        description: "Replace plastic bags with reusable cotton bags and save 2.3kg CO₂"
      }
    ];

    ecoSwapData.forEach(swap => {
      const ecoSwap: EcoSwap = { ...swap, id: this.currentEcoSwapId++ };
      this.ecoSwaps.set(ecoSwap.id, ecoSwap);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = { 
      ...insertUser, 
      id: this.currentUserId++,
      ecoPoints: 0,
      gardenLevel: 1,
      co2Saved: "0.00"
    };
    this.users.set(user.id, user);
    return user;
  }

  async updateUserBudget(userId: number, amount: number): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (user) {
      const currentBudget = parseFloat(user.budget);
      user.budget = (currentBudget - amount).toFixed(2);
      this.users.set(userId, user);
    }
    return user;
  }

  async updateUserEcoPoints(userId: number, points: number): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (user) {
      user.ecoPoints += points;
      if (user.ecoPoints >= user.gardenLevel * 200) {
        user.gardenLevel++;
      }
      this.users.set(userId, user);
    }
    return user;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.categoryId === categoryId);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(p => 
      p.name.toLowerCase().includes(lowercaseQuery) || 
      p.description.toLowerCase().includes(lowercaseQuery)
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const product: Product = { ...insertProduct, id: this.currentProductId++ };
    this.products.set(product.id, product);
    return product;
  }

  async updateProductStock(productId: number, stock: number): Promise<Product | undefined> {
    const product = this.products.get(productId);
    if (product) {
      product.stock = stock;
      this.products.set(productId, product);
    }
    return product;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const category: Category = { ...insertCategory, id: this.currentCategoryId++ };
    this.categories.set(category.id, category);
    return category;
  }

  // Cart methods
  async getCartItems(userId: number): Promise<(CartItem & { product: Product })[]> {
    const userCartItems = Array.from(this.cartItems.values()).filter(item => item.userId === userId);
    return userCartItems.map(item => {
      const product = this.products.get(item.productId!);
      return { ...item, product: product! };
    });
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.userId === insertCartItem.userId && item.productId === insertCartItem.productId
    );

    if (existingItem) {
      existingItem.quantity += insertCartItem.quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }

    const cartItem: CartItem = { ...insertCartItem, id: this.currentCartId++ };
    this.cartItems.set(cartItem.id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (cartItem) {
      cartItem.quantity = quantity;
      this.cartItems.set(id, cartItem);
    }
    return cartItem;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(userId: number): Promise<boolean> {
    const userCartItems = Array.from(this.cartItems.entries()).filter(([_, item]) => item.userId === userId);
    userCartItems.forEach(([id]) => this.cartItems.delete(id));
    return true;
  }

  // Recipe methods
  async getRecipes(): Promise<Recipe[]> {
    return Array.from(this.recipes.values());
  }

  async getRecipe(id: number): Promise<Recipe | undefined> {
    return this.recipes.get(id);
  }

  async getRecipesByIngredient(productId: number): Promise<Recipe[]> {
    return Array.from(this.recipes.values()).filter(recipe =>
      recipe.ingredients.some(ingredient => ingredient.productId === productId)
    );
  }

  async createRecipe(insertRecipe: InsertRecipe): Promise<Recipe> {
    const recipe: Recipe = { ...insertRecipe, id: this.currentRecipeId++ };
    this.recipes.set(recipe.id, recipe);
    return recipe;
  }

  // Eco swap methods
  async getEcoSwaps(productId: number): Promise<(EcoSwap & { swapProduct: Product })[]> {
    const swaps = Array.from(this.ecoSwaps.values()).filter(swap => swap.originalProductId === productId);
    return swaps.map(swap => {
      const swapProduct = this.products.get(swap.swapProductId!);
      return { ...swap, swapProduct: swapProduct! };
    });
  }

  // Notification methods
  async getUserNotifications(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values()).filter(n => n.userId === userId);
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const notification: Notification = { 
      ...insertNotification, 
      id: this.currentNotificationId++,
      createdAt: new Date().toISOString()
    };
    this.notifications.set(notification.id, notification);
    return notification;
  }

  async markNotificationRead(id: number): Promise<boolean> {
    const notification = this.notifications.get(id);
    if (notification) {
      notification.isRead = true;
      this.notifications.set(id, notification);
      return true;
    }
    return false;
  }

  // Garden progress methods
  async getUserGardenProgress(userId: number): Promise<GardenProgress[]> {
    return Array.from(this.gardenProgress.values()).filter(g => g.userId === userId);
  }

  async addGardenProgress(userId: number, plantType: string, ecoAction: string): Promise<GardenProgress> {
    const progress: GardenProgress = {
      id: this.currentGardenId++,
      userId,
      plantType,
      ecoAction,
      unlockedAt: new Date().toISOString()
    };
    this.gardenProgress.set(progress.id, progress);
    return progress;
  }
}

export const storage = new MemStorage();
