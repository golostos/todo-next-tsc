-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "archivedAt" TIMESTAMP(3),
ALTER COLUMN "done" SET DEFAULT false;
