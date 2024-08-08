-- CreateTable
CREATE TABLE "Runner_dev" (
    "id" SERIAL NOT NULL,
    "athelete_id" INTEGER NOT NULL,
    "athelete_name" TEXT NOT NULL,
    "total_kilometers" DECIMAL(65,30) NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Runner_dev_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Runner_dev_athelete_id_key" ON "Runner_dev"("athelete_id");
