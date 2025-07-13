// server/eco-action.ts
import { Router } from "express";
import { rewardEcoFriendlyAction } from "./utils/ecoGamification"; // adjust path if inside utils/

const router = Router();

router.post("/", async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    await rewardEcoFriendlyAction(userId);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to reward eco action" });
  }
});

export default router;
