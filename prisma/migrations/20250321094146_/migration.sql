/*
  Warnings:

  - You are about to drop the column `quizId` on the `Topic` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TopicQuiz" DROP CONSTRAINT "TopicQuiz_topicId_fkey";

-- DropIndex
DROP INDEX "Topic_quizId_key";

-- DropIndex
DROP INDEX "TopicQuiz_topicId_key";

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "quizId";

-- AddForeignKey
ALTER TABLE "TopicQuiz" ADD CONSTRAINT "TopicQuiz_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
