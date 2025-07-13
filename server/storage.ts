import {
  users,
  products,
  cartItems,
  recipes,
  categories,
  ecoSwaps,
  notifications,
  gardenProgress,
  orders,
  type User,
  type InsertUser,
  type Product,
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
  type Recipe,
  type InsertRecipe,
  type Category,
  type InsertCategory,
  type EcoSwap,
  type Notification,
  type InsertNotification,
  type GardenProgress,
  type Order,
  type InsertOrder,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserBudget(userId: number, budget: string): Promise<User | undefined>;
  updateUserEcoPoints(
    userId: number,
    points: number
  ): Promise<User | undefined>;

  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProductStock(
    productId: number,
    stock: number
  ): Promise<Product | undefined>;

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
  getEcoSwaps(
    productId: number
  ): Promise<(EcoSwap & { swapProduct: Product })[]>;

  // Notifications
  getUserNotifications(userId: number): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationRead(id: number): Promise<boolean>;

  // Garden Progress
  getUserGardenProgress(userId: number): Promise<GardenProgress[]>;
  addGardenProgress(
    userId: number,
    plantType: string,
    ecoAction: string
  ): Promise<GardenProgress>;

  // Orders
  getUserOrders(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
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
  private orders: Map<number, Order>;
  private currentUserId: number;
  private currentProductId: number;
  private currentCartId: number;
  private currentRecipeId: number;
  private currentCategoryId: number;
  private currentEcoSwapId: number;
  private currentNotificationId: number;
  private currentGardenId: number;
  private currentOrderId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.recipes = new Map();
    this.categories = new Map();
    this.ecoSwaps = new Map();
    this.notifications = new Map();
    this.gardenProgress = new Map();
    this.orders = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentCartId = 1;
    this.currentRecipeId = 1;
    this.currentCategoryId = 1;
    this.currentEcoSwapId = 1;
    this.currentNotificationId = 1;
    this.currentGardenId = 1;
    this.currentOrderId = 1;

    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const categoriesData = [
      { name: "Fresh Produce", icon: "fas fa-apple-alt", color: "eco-green" },
      { name: "Home & Garden", icon: "fas fa-home", color: "eco-blue" },
      {
        name: "Sustainable Fashion",
        icon: "fas fa-tshirt",
        color: "eco-green",
      },
      { name: "Personal Care", icon: "fas fa-shower", color: "eco-blue" },
      { name: "Kitchen", icon: "fas fa-utensils", color: "eco-green" },
      { name: "Baby & Kids", icon: "fas fa-baby", color: "eco-blue" },
      {
        name: "Reusables",
        icon: "♻️",
        color: "green",
      },
      {
        name: "Personal Care",
        icon: "🧴",
        color: "blue",
      },
      { name: "Vegetables", icon: "🥦", color: "#A3D9A5" },
      { name: "Fruits", icon: "🍎", color: "#F28C8C" },
      { name: "Grains", icon: "🌾", color: "#F2E394" },
      { name: "Dairy", icon: "🥛", color: "#C2E7FF" },
      { name: "Snacks", icon: "🍪", color: "#F7D794" },
      { name: "Drinks", icon: "🥤", color: "#D3A4FF" },
      { name: "Bakery", icon: "🍞", color: "#FFBCBC" },
      { name: "Meat", icon: "🥩", color: "#FF9F9F" },
      { name: "Seafood", icon: "🐟", color: "#A0E7E5" },
      { name: "Frozen", icon: "❄️", color: "#B2EBF2" },
    ];

    categoriesData.forEach((cat) => {
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
        imageUrl:
          "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
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
          certifications: ["USDA Organic", "Fair Trade", "Carbon Neutral"],
        },
      },
      {
        name: "Bamboo Toothbrush Set",
        description: "Sustainable bamboo toothbrushes, pack of 4",
        price: "12.99",
        imageUrl:
          "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 4,
        carbonFootprint: "0.1",
        ecoRating: 4,
        stock: 25,
        isBiodegradable: true,
        qrData: {
          origin: "Bamboo farms, Vietnam - 8,500 miles transport",
          manufacturing: "Hand-crafted by local artisans",
          packaging: "Compostable packaging made from recycled paper",
          certifications: ["FSC Certified", "Biodegradable"],
        },
      },
      {
        name: "Glass Container Set",
        description: "Borosilicate glass containers with bamboo lids",
        price: "39.99",
        imageUrl:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 5,
        carbonFootprint: "2.1",
        ecoRating: 5,
        stock: 15,
        isReusable: true,
        qrData: {
          origin: "Glass factory, Czech Republic - 1,800 miles transport",
          manufacturing: "Recycled glass with energy-efficient process",
          packaging: "Minimal cardboard packaging",
          certifications: ["Recyclable", "BPA-Free"],
        },
      },
      {
        name: "Organic Cotton T-Shirt",
        description: "Premium organic cotton with natural dyes",
        price: "22.49",
        originalPrice: "29.99",
        imageUrl:
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
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
          certifications: ["GOTS Certified", "Fair Trade", "Organic"],
        },
      },
      {
        name: "Solar Power Bank",
        description: "20,000mAh portable solar charger",
        price: "79.99",
        imageUrl:
          "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 2,
        carbonFootprint: "12.3",
        ecoRating: 5,
        stock: 12,
        qrData: {
          origin: "Solar panel factory, China - 7,800 miles transport",
          manufacturing: "Solar-powered manufacturing facility",
          packaging: "Recycled cardboard packaging",
          certifications: ["Energy Star", "RoHS Compliant"],
        },
      },
      {
        name: "Organic Tomatoes",
        description:
          "Fresh, ripe, organic tomatoes perfect for salads and cooking.",
        price: "2.50",
        originalPrice: "3.00",
        imageUrl:
          "data:image/jpeg;base64,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",
        categoryId: 1,
        carbonFootprint: "1.20",
        ecoRating: 5,
        stock: 100,
        isOrganic: true,
        isLocal: true,
        isFairTrade: false,
        isReusable: false,
        isBiodegradable: true,
        expiryDiscount: 10,
        expiryDays: 3,
        qrData: {
          origin: "India",
          manufacturing: "Local Farm",
          packaging: "Compostable box",
          certifications: ["Organic Certified", "Local Produce"],
        },
      },
      {
        name: "Whole Wheat Pasta",
        description: "High-fiber organic whole wheat pasta.",
        price: "4.00",
        originalPrice: "5.00",
        imageUrl:
          "data:image/jpeg;base64,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",
        categoryId: 2,
        carbonFootprint: "2.10",
        ecoRating: 4,
        stock: 70,
        isOrganic: true,
        isLocal: false,
        isFairTrade: true,
        isReusable: false,
        isBiodegradable: true,
        expiryDiscount: 5,
        expiryDays: 30,
        qrData: {
          origin: "Italy",
          manufacturing: "EcoPasta Ltd.",
          packaging: "Paper box",
          certifications: ["EU Organic"],
        },
      },
      {
        name: "Fresh Basil",
        description: "Locally grown basil leaves with strong aroma.",
        price: "1.20",
        originalPrice: "1.50",
        imageUrl:
          "data:image/jpeg;base64,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",
        categoryId: 3,
        carbonFootprint: "0.60",
        ecoRating: 5,
        stock: 200,
        isOrganic: true,
        isLocal: true,
        isFairTrade: false,
        isReusable: false,
        isBiodegradable: true,
        expiryDiscount: 15,
        expiryDays: 2,
        qrData: {
          origin: "India",
          manufacturing: "Herbal Garden",
          packaging: "Paper wrap",
          certifications: ["Local Certified"],
        },
      },
      {
        name: "Eco-Friendly Olive Oil",
        description:
          "Cold-pressed extra virgin olive oil in a reusable bottle.",
        price: "8.00",
        originalPrice: "9.50",
        imageUrl:
          "data:image/jpeg;base64,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",
        categoryId: 4,
        carbonFootprint: "3.30",
        ecoRating: 4,
        stock: 80,
        isOrganic: true,
        isLocal: false,
        isFairTrade: true,
        isReusable: true,
        isBiodegradable: false,
        expiryDiscount: 10,
        expiryDays: 180,
        qrData: {
          origin: "Spain",
          manufacturing: "GreenPress Co.",
          packaging: "Reusable glass bottle",
          certifications: ["Fair Trade", "EU Organic"],
        },
      },
      {
        name: "Biodegradable Detergent",
        description: "Plant-based cleaning detergent safe for the environment.",
        price: "5.50",
        originalPrice: "6.50",
        imageUrl:
          "data:image/jpeg;base64,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",
        categoryId: 5,
        carbonFootprint: "4.00",
        ecoRating: 3,
        stock: 60,
        isOrganic: false,
        isLocal: false,
        isFairTrade: false,
        isReusable: false,
        isBiodegradable: true,
        expiryDiscount: 0,
        expiryDays: 365,
        qrData: {
          origin: "USA",
          manufacturing: "EcoClean Ltd.",
          packaging: "Biodegradable bottle",
          certifications: ["EcoSafe"],
        },
      },
      {
        name: "Seed Paper Notebook",
        description: "Plantable pages that grow wildflowers",
        price: "15.99",
        imageUrl:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 2,
        carbonFootprint: "0.3",
        ecoRating: 4,
        stock: 30,
        isBiodegradable: true,
        qrData: {
          origin: "Paper mill, Canada - 2,100 miles transport",
          manufacturing: "Made from recycled paper and embedded seeds",
          packaging: "No plastic packaging, paper band only",
          certifications: ["Plantable", "Recycled Content"],
        },
      },
    ];

    productsData.forEach((prod) => {
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
        isBiodegradable: prod.isBiodegradable || false,
      };
      this.products.set(product.id, product);
    });

    // Initialize recipes
    const recipesData = [
      {
        name: "Mediterranean Salad",
        description: "Fresh tomatoes, cucumbers, olives, feta",
        imageUrl:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        prepTime: 15,
        ecoRating: 5,
        ingredients: [
          {
            name: "Organic Tomatoes",
            quantity: "2",
            unit: "pieces",
            productId: 1,
          },
          { name: "Cucumber", quantity: "1", unit: "piece", productId: 1 },
          { name: "Olives", quantity: "100", unit: "g" },
          { name: "Feta Cheese", quantity: "150", unit: "g" },
          { name: "Olive Oil", quantity: "2", unit: "tbsp" },
          { name: "Herbs", quantity: "1", unit: "bunch" },
        ],
        instructions: [
          "Wash and chop tomatoes and cucumber",
          "Mix vegetables in a large bowl",
          "Add olives and crumbled feta",
          "Drizzle with olive oil",
          "Season with herbs and serve",
        ],
      },
      {
        name: "Tomato Basil Pasta",
        description:
          "A light and eco-friendly pasta dish using fresh tomatoes and basil.",
        imageUrl:
          "data:image/jpeg;base64,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",
        prepTime: 30,
        ingredients: [
          {
            name: "Whole Wheat Pasta",
            quantity: "200",
            unit: "g",
            productId: 2,
          },
          {
            name: "Organic Tomatoes",
            quantity: "3",
            unit: "pcs",
            productId: 1,
          },
          { name: "Fresh Basil", quantity: "10", unit: "leaves", productId: 3 },
          { name: "Olive Oil", quantity: "2", unit: "tbsp", productId: 4 },
        ],
        instructions: [
          "Boil the pasta for 8-10 minutes.",
          "Chop and sauté tomatoes in olive oil.",
          "Mix pasta with tomato sauce.",
          "Garnish with fresh basil and serve.",
        ],
        ecoRating: 5,
      },
      {
        name: "Organic Pasta Primavera",
        description: "Seasonal vegetables with organic pasta",
        imageUrl:
          "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        prepTime: 25,
        ecoRating: 4,
        ingredients: [
          { name: "Organic Pasta", quantity: "300", unit: "g" },
          {
            name: "Mixed Vegetables",
            quantity: "400",
            unit: "g",
            productId: 1,
          },
          { name: "Garlic", quantity: "3", unit: "cloves" },
          { name: "Olive Oil", quantity: "3", unit: "tbsp" },
          { name: "Parmesan", quantity: "50", unit: "g" },
          { name: "Fresh Basil", quantity: "1", unit: "bunch" },
          { name: "Cherry Tomatoes", quantity: "200", unit: "g" },
          { name: "Bell Peppers", quantity: "2", unit: "pieces" },
        ],
        instructions: [
          "Cook pasta according to package instructions",
          "Heat olive oil in a large pan",
          "Sauté garlic until fragrant",
          "Add vegetables and cook until tender",
          "Toss with cooked pasta",
          "Add parmesan and fresh basil",
          "Serve immediately",
        ],
      },
      {
        name: "Eco Oatmeal Bowl",
        description:
          "Healthy and low-carbon breakfast bowl with oats and coconut.",
        imageUrl:
          "data:image/jpeg;base64,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",
        prepTime: 10,
        ingredients: [
          { name: "Rolled Oats", quantity: "1", unit: "cup", productId: 7 },
          { name: "Coconut Milk", quantity: "1", unit: "cup", productId: 9 },
          { name: "Banana", quantity: "1", unit: "pc" },
        ],
        instructions: [
          "Cook oats in coconut milk for 5 minutes.",
          "Top with sliced banana.",
          "Enjoy warm.",
        ],
        ecoRating: 4,
      },
      {
        name: "Green Smoothie Bowl",
        description: "Spinach, banana, berries, chia seeds",
        imageUrl:
          "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        prepTime: 10,
        ecoRating: 5,
        ingredients: [
          { name: "Fresh Spinach", quantity: "2", unit: "cups", productId: 1 },
          { name: "Banana", quantity: "1", unit: "piece" },
          { name: "Mixed Berries", quantity: "1", unit: "cup" },
          { name: "Chia Seeds", quantity: "1", unit: "tbsp" },
          { name: "Almond Milk", quantity: "200", unit: "ml" },
        ],
        instructions: [
          "Add spinach, banana, and almond milk to blender",
          "Blend until smooth",
          "Pour into bowl",
          "Top with berries and chia seeds",
          "Serve immediately",
        ],
      },
    ];

    recipesData.forEach((recipe) => {
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
      co2Saved: "12.40",
      ecoBadges: 0,
      seeds: 0,
      plants: 0,
      fruits: 0,
    };
    this.users.set(sampleUser.id, sampleUser);

    // Initialize eco swaps
    const ecoSwapData = [
      {
        originalProductId: 1,
        swapProductId: 2,
        co2Savings: "1.2",
        description:
          "Replace plastic bags with reusable cotton bags and save 2.3kg CO₂",
      },
    ];

    ecoSwapData.forEach((swap) => {
      const ecoSwap: EcoSwap = { ...swap, id: this.currentEcoSwapId++ };
      this.ecoSwaps.set(ecoSwap.id, ecoSwap);
    });

    // Initialize sample orders
    const sampleOrders = [
      {
        userId: 1,
        total: "67.98",
        status: "completed",
        orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        items: [
          {
            productId: 1,
            productName: "Organic Vegetable Box",
            quantity: 2,
            price: "24.99",
            imageUrl:
              "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          },
          {
            productId: 2,
            productName: "Bamboo Toothbrush Set",
            quantity: 1,
            price: "12.99",
            imageUrl:
              "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          },
        ],
      },
      {
        userId: 1,
        total: "89.47",
        status: "completed",
        orderDate: new Date(
          Date.now() - 14 * 24 * 60 * 60 * 1000
        ).toISOString(), // 14 days ago
        items: [
          {
            productId: 3,
            productName: "Glass Container Set",
            quantity: 1,
            price: "39.99",
            imageUrl:
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          },
          {
            productId: 4,
            productName: "Organic Cotton T-Shirt",
            quantity: 2,
            price: "22.49",
            imageUrl:
              "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          },
        ],
      },
    ];

    sampleOrders.forEach((order) => {
      const orderItem: Order = { ...order, id: this.currentOrderId++ };
      this.orders.set(orderItem.id, orderItem);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: this.currentUserId++,
      ecoPoints: 0,
      gardenLevel: 1,
      co2Saved: "0.00",
    };
    this.users.set(user.id, user);
    return user;
  }

  async updateUserBudget(
    userId: number,
    budget: string
  ): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (user) {
      user.budget = budget;
      this.users.set(userId, user);
    }
    return user;
  }

  async updateUserEcoPoints(
    userId: number,
    points: number
  ): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (user) {
      if (user.ecoPoints !== null && user.gardenLevel !== null) {
        user.ecoPoints += points;
        if (user.ecoPoints >= user.gardenLevel * 200) {
          user.gardenLevel++;
        }
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
    return Array.from(this.products.values()).filter(
      (p) => p.categoryId === categoryId
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (p) =>
        p.name.toLowerCase().includes(lowercaseQuery) ||
        p.description.toLowerCase().includes(lowercaseQuery)
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const product: Product = { ...insertProduct, id: this.currentProductId++ };
    this.products.set(product.id, product);
    return product;
  }

  async updateProductStock(
    productId: number,
    stock: number
  ): Promise<Product | undefined> {
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
    const category: Category = {
      ...insertCategory,
      id: this.currentCategoryId++,
    };
    this.categories.set(category.id, category);
    return category;
  }

  // Cart methods
  async getCartItems(
    userId: number
  ): Promise<(CartItem & { product: Product })[]> {
    const userCartItems = Array.from(this.cartItems.values()).filter(
      (item) => item.userId === userId
    );
    return userCartItems.map((item) => {
      const product = this.products.get(item.productId!);
      return { ...item, product: product! };
    });
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists
    const existingItem = Array.from(this.cartItems.values()).find(
      (item) =>
        item.userId === insertCartItem.userId &&
        item.productId === insertCartItem.productId
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

  async updateCartItem(
    id: number,
    quantity: number
  ): Promise<CartItem | undefined> {
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
    const userCartItems = Array.from(this.cartItems.entries()).filter(
      ([_, item]) => item.userId === userId
    );
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
    return Array.from(this.recipes.values()).filter((recipe) =>
      recipe.ingredients.some(
        (ingredient) => ingredient.productId === productId
      )
    );
  }

  async createRecipe(insertRecipe: InsertRecipe): Promise<Recipe> {
    const recipe: Recipe = { ...insertRecipe, id: this.currentRecipeId++ };
    this.recipes.set(recipe.id, recipe);
    return recipe;
  }

  // Eco swap methods
  async getEcoSwaps(
    productId: number
  ): Promise<(EcoSwap & { swapProduct: Product })[]> {
    const swaps = Array.from(this.ecoSwaps.values()).filter(
      (swap) => swap.originalProductId === productId
    );
    return swaps.map((swap) => {
      const swapProduct = this.products.get(swap.swapProductId!);
      return { ...swap, swapProduct: swapProduct! };
    });
  }

  // Notification methods
  async getUserNotifications(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values()).filter(
      (n) => n.userId === userId
    );
  }

  async createNotification(
    insertNotification: InsertNotification
  ): Promise<Notification> {
    const notification: Notification = {
      ...insertNotification,
      id: this.currentNotificationId++,
      createdAt: new Date().toISOString(),
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
    return Array.from(this.gardenProgress.values()).filter(
      (g) => g.userId === userId
    );
  }

  async addGardenProgress(
    userId: number,
    plantType: string,
    ecoAction: string
  ): Promise<GardenProgress> {
    const progress: GardenProgress = {
      id: this.currentGardenId++,
      userId,
      plantType,
      ecoAction,
      unlockedAt: new Date().toISOString(),
    };
    this.gardenProgress.set(progress.id, progress);
    return progress;
  }

  // Order methods
  async getUserOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter((order) => order.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const order: Order = {
      ...insertOrder,
      id: this.currentOrderId++,
      orderDate: new Date().toISOString(),
    };
    this.orders.set(order.id, order);
    return order;
  }
}

export const storage = new MemStorage();
