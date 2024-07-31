-- CreateTable
CREATE TABLE "Runner" (
    "id" SERIAL NOT NULL,
    "athelete_id" BIGINT NOT NULL,
    "athelete_name" TEXT NOT NULL,
    "total_kilometers" DECIMAL(65,30) NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Runner_pkey" PRIMARY KEY ("id")
);
