import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

type Message = {
  type: "user" | "bot";
  text: string;
};

const recipeData: Record<string, string[]> = {
  pasta: ["Tomatoes", "Olive Oil", "Garlic", "Basil", "Pasta"],
  salad: ["Lettuce", "Tomatoes", "Cucumbers", "Olives", "Feta Cheese"],
  sandwich: ["Bread", "Cheese", "Lettuce", "Tomato", "Mayonnaise"],
};

export default function RecipeChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { addToCart } = useCart();

  const handleSend = () => {
    const recipeName = input.trim().toLowerCase();
    const ingredients = recipeData[recipeName];

    if (recipeName === "") return;

    if (ingredients) {
      setMessages((prev: Message[]) => [
        ...prev,
        { type: "user", text: input },
        { type: "bot", text: `Here are the ingredients for ${recipeName}:` },
        ...ingredients.map((ing) => ({
          type: "bot" as const,

          text: `[ingredient]${ing}`,
        })),
      ]);
    } else {
      setMessages((prev: Message[]) => [
        ...prev,
        { type: "user", text: input },
        {
          type: "bot",
          text: `Sorry, I couldn't find a recipe for "${recipeName}".`,
        },
      ]);
    }

    setInput("");
  };
  const handleAddToCart = (ingredient: string) => {
    addToCart({
      productId: Math.floor(Math.random() * 10000),
      quantity: 1,
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <div className="bg-white p-4 rounded-md shadow-md space-y-4">
        <h2 className="text-xl font-bold text-gray-800">🍳 Recipe ChatBot</h2>

        <div className="space-y-2 max-h-64 overflow-y-auto border p-2 rounded-md">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`text-sm space-y-1 ${
                msg.type === "user"
                  ? "text-blue-700 font-semibold"
                  : "text-green-700"
              }`}
            >
              {msg.type === "bot" && msg.text.startsWith("[ingredient]") ? (
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-gray-800">
                    {msg.text.replace("[ingredient]", "")}
                  </span>
                  <Button
                    size="sm"
                    onClick={() =>
                      handleAddToCart(
                        msg.text.replace("[ingredient]", "").trim()
                      )
                    }
                  >
                    Add to Cart
                  </Button>
                </div>
              ) : (
                <span>{msg.text}</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a recipe name..."
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div>
  );
}
