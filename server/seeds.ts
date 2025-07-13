import dotenv from "dotenv";
dotenv.config();

import { db } from "./db";
import {
  users,
  products,
  categories,
  recipes,
  cartItems,
  ecoSwaps,
  notifications,
  gardenProgress,
  orders,
} from "../shared/schema";

async function seed() {
  try {
    // Clear existing data
    //await db.delete(users);
    //await db.delete(products);
    //await db.delete(categories);

    // First insert some categories
    await db.insert(categories).values([
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
    ]);

    // Insert demo users (fixed to match schema)
    await db.insert(users).values([
      {
        username: "EcoUser1",
        password: "securepassword1",
        email: "eco1@example.com",
        budget: "100.00",
        ecoPoints: 25,
        gardenLevel: 1,
        co2Saved: "50.00",
        ecoBadges: 2,
        seeds: 1,
        plants: 0,
        fruits: 0,
      },
      {
        username: "EcoUser2",
        password: "securepassword2",
        email: "eco2@example.com",
        budget: "150.00",
        ecoPoints: 50,
        gardenLevel: 2,
        co2Saved: "100.00",
        ecoBadges: 5,
        seeds: 2,
        plants: 1,
        fruits: 0,
      },
      {
        username: "churchkathleen",
        password: "1_EacIZ3(#",
        email: "wcox@hatfield.biz",
        budget: "125.81",
      },
      {
        username: "patrick69",
        password: "CV^2TsiOIz",
        email: "alyssa74@davis-townsend.com",
        budget: "192.05",
      },
      {
        username: "urandall",
        password: "*9%o7JZjEi",
        email: "stevensfrank@harris-williams.info",
        budget: "125.41",
      },
      {
        username: "omcgee",
        password: "!y7F+PDnB4",
        email: "hschwartz@gmail.com",
        budget: "145.11",
      },
      {
        username: "john59",
        password: "Kvi!7Qsmq#",
        email: "hmorris@bowman.biz",
        budget: "143.59",
      },
      {
        username: "davisallison",
        password: "!0VYZmag)+",
        email: "shelly99@hotmail.com",
        budget: "54.60",
      },
      {
        username: "molinacharles",
        password: "!17bJCs5cn",
        email: "alicianelson@yahoo.com",
        budget: "116.13",
      },
      {
        username: "pfreeman",
        password: "FoC5DWtLT*",
        email: "tdouglas@moore-mercado.info",
        budget: "193.72",
      },
      {
        username: "afuentes",
        password: "O3ePlYio$K",
        email: "grodriguez@gmail.com",
        budget: "98.45",
      },
      {
        username: "groman",
        password: "Q$7tVWmsYz",
        email: "tiffanylynch@evans-costa.info",
        budget: "111.86",
      },
    ]);

    // Insert products (fixed to match schema)
    await db.insert(products).values([
      {
        name: "Reusable Cotton Bag",
        description: "Eco-friendly reusable shopping bag",
        price: "5.99",
        originalPrice: "7.99",
        imageUrl: "/images/bag.jpg",
        categoryId: 1,
        carbonFootprint: "0.50",
        ecoRating: 5,
        stock: 100,
        isOrganic: true,
        isLocal: false,
        isFairTrade: true,
        isReusable: true,
        isBiodegradable: true,
        expiryDiscount: 0,
        expiryDays: 0,
        qrData: {
          origin: "India",
          manufacturing: "Organic cotton",
          packaging: "Recycled paper",
          certifications: ["GOTS", "FairTrade"],
        },
      },
      {
        name: "Bamboo Toothbrush",
        description: "Biodegradable bamboo toothbrush",
        price: "3.99",
        originalPrice: "4.99",
        imageUrl: "/images/toothbrush.jpg",
        categoryId: 2,
        carbonFootprint: "0.20",
        ecoRating: 4,
        stock: 50,
        isOrganic: false,
        isLocal: true,
        isFairTrade: false,
        isReusable: false,
        isBiodegradable: true,
        expiryDiscount: 0,
        expiryDays: 0,
        qrData: {
          origin: "Local",
          manufacturing: "Bamboo",
          packaging: "Cardboard",
          certifications: ["Biodegradable"],
        },
      },
      {
        name: "Organic Tomatoes",
        description:
          "Fresh, ripe, organic tomatoes perfect for salads and cooking.",
        price: "2.50",
        originalPrice: "3.00",
        imageUrl:
          "https://images.unsplash.com/photo-1604908177225-697f8e7f83e4",
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
          "https://images.unsplash.com/photo-1613145998131-740cf9e78f9a",
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
          "https://images.unsplash.com/photo-1590080876643-47b63e3f1b1e",
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
          "https://images.unsplash.com/photo-1627556702641-70aaed29a9fc",
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
          "https://images.unsplash.com/photo-1619983081563-57609e98dfb7",
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
    ]);
    await db.insert(gardenProgress).values([
      {
        userId: 3,
        plantType: "Basil",
        unlockedAt: "2025-07-02T19:21:41.022Z",
        ecoAction: "Purchased eco-friendly product",
      },
      {
        userId: 5,
        plantType: "Tomato",
        unlockedAt: "2025-07-03T19:21:41.022Z",
        ecoAction: "Completed recipe with eco ingredients",
      },
      {
        userId: 2,
        plantType: "Mint",
        unlockedAt: "2025-07-04T19:21:41.022Z",
        ecoAction: "Used reusable bag",
      },
      {
        userId: 1,
        plantType: "Lettuce",
        unlockedAt: "2025-07-05T19:21:41.022Z",
        ecoAction: "Chose local produce",
      },
      {
        userId: 2,
        plantType: "Sunflower",
        unlockedAt: "2025-07-06T19:21:41.022Z",
        ecoAction: "Composted organic waste",
      },
      {
        userId: 5,
        plantType: "Carrot",
        unlockedAt: "2025-07-07T19:21:41.022Z",
        ecoAction: "Avoided plastic packaging",
      },
      {
        userId: 5,
        plantType: "Spinach",
        unlockedAt: "2025-07-08T19:21:41.022Z",
        ecoAction: "Reduced food waste",
      },
      {
        userId: 3,
        plantType: "Coriander",
        unlockedAt: "2025-07-09T19:21:41.022Z",
        ecoAction: "Planted a seed",
      },
      {
        userId: 4,
        plantType: "Rosemary",
        unlockedAt: "2025-07-10T19:21:41.022Z",
        ecoAction: "Recycled packaging",
      },
      {
        userId: 2,
        plantType: "Pea",
        unlockedAt: "2025-07-11T19:21:41.022Z",
        ecoAction: "Bought fair trade item",
      },
    ]);
    await db.insert(ecoSwaps).values([
      {
        originalProductId: 1,
        swapProductId: 9,
        co2Savings: "1.2",
        description: "Swap plastic water bottles with reusable steel bottles.",
      },
      {
        originalProductId: 2,
        swapProductId: 10,
        co2Savings: "0.8",
        description: "Use organic bananas instead of regular ones.",
      },
      {
        originalProductId: 3,
        swapProductId: 8,
        co2Savings: "0.9",
        description: "Use compostable plates instead of plastic ones.",
      },
      {
        originalProductId: 4,
        swapProductId: 11,
        co2Savings: "1.5",
        description: "Choose biodegradable packaging over plastic wrap.",
      },
      {
        originalProductId: 6,
        swapProductId: 12,
        co2Savings: "0.6",
        description: "Replace plastic cups with bamboo cups.",
      },
      {
        originalProductId: 5,
        swapProductId: 13,
        co2Savings: "1.1",
        description: "Switch to local carrots to reduce transport emissions.",
      },
      {
        originalProductId: 7,
        swapProductId: 14,
        co2Savings: "0.7",
        description: "Use reusable cotton bags instead of plastic carry bags.",
      },
      {
        originalProductId: 15,
        swapProductId: 16,
        co2Savings: "2.3",
        description: "Buy local strawberries instead of imported ones.",
      },
      {
        originalProductId: 17,
        swapProductId: 18,
        co2Savings: "1.6",
        description: "Choose fair trade chocolate over standard bars.",
      },
      {
        originalProductId: 19,
        swapProductId: 20,
        co2Savings: "2.1",
        description: "Use LED bulbs instead of incandescent ones.",
      },
    ]);
    await db.insert(notifications).values([
      {
        userId: 1,
        type: "eco",
        title: "Eco Badge Unlocked!",
        message: "You’ve unlocked the Green Starter badge!",
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        userId: 2,
        type: "order",
        title: "Order Delivered",
        message: "Your order #122 has been successfully delivered.",
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        userId: 1,
        type: "tip",
        title: "Eco Tip",
        message: "Reuse shopping bags to reduce waste.",
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        userId: 3,
        type: "order",
        title: "New Order Confirmation",
        message: "Thank you for shopping green!",
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        userId: 4,
        type: "eco",
        title: "CO2 Milestone!",
        message: "You've saved 10kg of CO2!",
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        userId: 5,
        type: "promo",
        title: "10% Off",
        message: "Get 10% off on your next eco product order.",
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        userId: 1,
        type: "badge",
        title: "Plant Unlocked",
        message: "You’ve earned a new seed! Grow your garden now.",
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        userId: 6,
        type: "eco",
        title: "Eco Swap Saved CO2",
        message: "Your recent eco swap saved 1.2kg of CO2!",
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        userId: 7,
        type: "order",
        title: "Order Confirmed",
        message: "Order #234 is being processed.",
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        userId: 8,
        type: "eco",
        title: "Eco Journey Started",
        message: "Welcome! Start earning eco points.",
        isRead: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    await db.insert(orders).values([
      {
        userId: 1,
        total: "24.50",
        status: "completed",
        orderDate: new Date().toISOString(),
        items: [
          {
            productId: 1,
            productName: "Reusable Bottle",
            quantity: 1,
            price: "10.50",
            imageUrl:
              "https://m.media-amazon.com/images/I/51LJKT7cyiL._AC_SL1000_.jpg",
          },
          {
            productId: 5,
            productName: "Carrots (Organic)",
            quantity: 2,
            price: "7.00",
            imageUrl:
              "https://images.unsplash.com/photo-1606788075761-0e7b20a5d1cd",
          },
        ],
      },
      {
        userId: 2,
        total: "16.00",
        status: "completed",
        orderDate: new Date().toISOString(),
        items: [
          {
            productId: 2,
            productName: "Organic Bananas",
            quantity: 3,
            price: "16.00",
            imageUrl:
              "https://images.unsplash.com/photo-1589927986089-35812388d1d7",
          },
        ],
      },
      {
        userId: 3,
        total: "14.75",
        status: "completed",
        orderDate: new Date().toISOString(),
        items: [
          {
            productId: 3,
            productName: "Compostable Plates",
            quantity: 1,
            price: "14.75",
            imageUrl:
              "https://m.media-amazon.com/images/I/71gRxC9f6cL._AC_SL1500_.jpg",
          },
        ],
      },
      {
        userId: 4,
        total: "28.99",
        status: "completed",
        orderDate: new Date().toISOString(),
        items: [
          {
            productId: 4,
            productName: "Biodegradable Packaging",
            quantity: 1,
            price: "28.99",
            imageUrl:
              "https://m.media-amazon.com/images/I/61WZAv0LHzL._SL1500_.jpg",
          },
        ],
      },
      {
        userId: 5,
        total: "35.00",
        status: "completed",
        orderDate: new Date().toISOString(),
        items: [
          {
            productId: 6,
            productName: "Bamboo Cups",
            quantity: 2,
            price: "35.00",
            imageUrl:
              "https://m.media-amazon.com/images/I/61NaWe2rQbL._AC_SL1500_.jpg",
          },
        ],
      },
      {
        userId: 6,
        total: "13.50",
        status: "completed",
        orderDate: new Date().toISOString(),
        items: [
          {
            productId: 7,
            productName: "Cotton Shopping Bag",
            quantity: 1,
            price: "13.50",
            imageUrl:
              "https://m.media-amazon.com/images/I/51VZKZ2HvCL._SL1000_.jpg",
          },
        ],
      },
      {
        userId: 7,
        total: "29.00",
        status: "completed",
        orderDate: new Date().toISOString(),
        items: [
          {
            productId: 8,
            productName: "Reusable Cutlery Set",
            quantity: 2,
            price: "29.00",
            imageUrl:
              "https://m.media-amazon.com/images/I/61jxNKVbgzL._SL1500_.jpg",
          },
        ],
      },
      {
        userId: 8,
        total: "18.25",
        status: "completed",
        orderDate: new Date().toISOString(),
        items: [
          {
            productId: 9,
            productName: "Eco Soap",
            quantity: 3,
            price: "18.25",
            imageUrl:
              "https://m.media-amazon.com/images/I/61GyJ+Bl7lL._SL1200_.jpg",
          },
        ],
      },
      {
        userId: 9,
        total: "22.00",
        status: "completed",
        orderDate: new Date().toISOString(),
        items: [
          {
            productId: 10,
            productName: "Natural Shampoo",
            quantity: 2,
            price: "22.00",
            imageUrl:
              "https://m.media-amazon.com/images/I/81vHxTevshL._SL1500_.jpg",
          },
        ],
      },
      {
        userId: 10,
        total: "9.99",
        status: "completed",
        orderDate: new Date().toISOString(),
        items: [
          {
            productId: 11,
            productName: "Steel Straw Set",
            quantity: 1,
            price: "9.99",
            imageUrl:
              "https://m.media-amazon.com/images/I/71zk1g8ovtL._SL1500_.jpg",
          },
        ],
      },
    ]);
    const recipeData = [
      {
        name: "Tomato Basil Pasta",
        description:
          "A light and eco-friendly pasta dish using fresh tomatoes and basil.",
        imageUrl:
          "https://images.unsplash.com/photo-1601924582975-4c30fd40f7ec",
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
        name: "Eco Oatmeal Bowl",
        description:
          "Healthy and low-carbon breakfast bowl with oats and coconut.",
        imageUrl:
          "https://images.unsplash.com/photo-1617191510605-5a5c745ea6c4",
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
      // Add more recipes if desired (min 2-3 more)
    ];
    const cartItemData = [
      { userId: 1, productId: 1, quantity: 2 },
      { userId: 1, productId: 2, quantity: 1 },
      { userId: 2, productId: 4, quantity: 1 },
      { userId: 3, productId: 6, quantity: 3 },
      { userId: 4, productId: 3, quantity: 2 },
      { userId: 5, productId: 7, quantity: 1 },
      { userId: 6, productId: 9, quantity: 1 },
      { userId: 7, productId: 5, quantity: 1 },
      { userId: 8, productId: 8, quantity: 2 },
      { userId: 9, productId: 10, quantity: 1 },
    ];

    console.log("Seeding recipes...");
    await db.insert(recipes).values(recipeData);

    console.log("Seeding cart items...");
    await db.insert(cartItems).values(cartItemData);
    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
