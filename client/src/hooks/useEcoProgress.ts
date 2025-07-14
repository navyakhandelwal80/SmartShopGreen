import { useQueryClient } from "@tanstack/react-query";
import { EcoProgress } from "@/types/eco";

export default function useEcoProgress() {
  const queryClient = useQueryClient();

  const rewardAction = async (): Promise<{ progress: EcoProgress }> => {
    try {
      // Get current progress from localStorage first
      const currentProgress = JSON.parse(
        localStorage.getItem("ecoProgress") || "{}"
      );

      const response = await fetch("/api/eco-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentProgress }), // Send current state to API
      });

      if (!response.ok) throw new Error("Failed to reward eco action");

      const data = await response.json();

      // Update both cache and localStorage atomically
      queryClient.setQueryData(["/api/user"], data.progress);
      localStorage.setItem("ecoProgress", JSON.stringify(data.progress));

      return data;
    } catch (error) {
      console.error("Reward action failed:", error);
      throw error;
    }
  };

  return { rewardAction };
}
