import { db } from "../db";
import { users } from "../../shared/schema";

import { eq } from "drizzle-orm";

export async function rewardEcoFriendlyAction(userId: number) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) throw new Error("User not found");

  let updatedBadges = (user.ecoBadges ?? 0) + 1;
  let updatedSeeds = user.seeds ?? 0;
  let updatedPlants = user.plants ?? 0;
  let updatedFruits = user.fruits ?? 0;

  if (updatedBadges >= 10) {
    updatedBadges = 0;
    updatedSeeds += 1;
    updatedPlants += 1;
    updatedFruits += 1;
  }

  await db
    .update(users)
    .set({
      ecoBadges: updatedBadges,
      seeds: updatedSeeds,
      plants: updatedPlants,
      fruits: updatedFruits,
    })
    .where(eq(users.id, userId));
}
