-- AlterTable
ALTER TABLE "public"."quests" ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL DEFAULT now() + interval '24 hours';
