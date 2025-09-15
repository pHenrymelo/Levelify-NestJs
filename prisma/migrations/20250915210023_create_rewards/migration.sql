-- CreateEnum
CREATE TYPE "public"."RewardTypes" AS ENUM ('XP', 'GOLD', 'ITEM');

-- AlterTable
ALTER TABLE "public"."quests" ALTER COLUMN "dueDate" SET DEFAULT now() + interval '24 hours';

-- CreateTable
CREATE TABLE "public"."rewards" (
    "id" TEXT NOT NULL,
    "type" "public"."RewardTypes" NOT NULL DEFAULT 'XP',
    "amount" INTEGER NOT NULL DEFAULT 0,
    "quest_id" TEXT,
    "goal_id" TEXT,

    CONSTRAINT "rewards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."rewards" ADD CONSTRAINT "rewards_quest_id_fkey" FOREIGN KEY ("quest_id") REFERENCES "public"."quests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rewards" ADD CONSTRAINT "rewards_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "public"."goals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
