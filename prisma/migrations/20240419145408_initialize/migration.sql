-- CreateTable
CREATE TABLE "Metadata" (
    "id" SERIAL NOT NULL,
    "previous_activities" INTEGER NOT NULL,

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Runner" (
    "id" SERIAL NOT NULL,
    "athelete_id" INTEGER NOT NULL,
    "athelete_name" INTEGER NOT NULL,
    "strava_profile" TEXT NOT NULL,
    "total_kilometers" DOUBLE PRECISION NOT NULL,
    "photoUrl" TEXT NOT NULL,

    CONSTRAINT "Runner_pkey" PRIMARY KEY ("id")
);
