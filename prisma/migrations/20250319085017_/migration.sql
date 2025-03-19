-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "youtubeId" TEXT,
    "filePath" TEXT,
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quizId" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicFlashCard" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,

    CONSTRAINT "TopicFlashCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicQuiz" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,

    CONSTRAINT "TopicQuiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicQuizQuestion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,

    CONSTRAINT "TopicQuizQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicQuizOption" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "TopicQuizOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Topic_quizId_key" ON "Topic"("quizId");

-- CreateIndex
CREATE UNIQUE INDEX "TopicQuiz_topicId_key" ON "TopicQuiz"("topicId");

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicFlashCard" ADD CONSTRAINT "TopicFlashCard_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicQuiz" ADD CONSTRAINT "TopicQuiz_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("quizId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicQuizQuestion" ADD CONSTRAINT "TopicQuizQuestion_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "TopicQuiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicQuizOption" ADD CONSTRAINT "TopicQuizOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "TopicQuizQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
