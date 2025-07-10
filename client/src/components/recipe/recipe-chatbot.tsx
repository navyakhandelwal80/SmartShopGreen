import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

          text: `${ing} - [Add to Cart]`,
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

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-md shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-800">🍳 Recipe ChatBot</h2>

      <div className="space-y-2 max-h-64 overflow-y-auto border p-2 rounded-md">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm ${
              msg.type === "user"
                ? "text-blue-700 font-semibold"
                : "text-green-700"
            }`}
          >
            {msg.text}
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
  );
}
