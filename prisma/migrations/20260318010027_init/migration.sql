-- CreateTable
CREATE TABLE "Shelter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "rescuedCount" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "urgentNeeds" TEXT,

    CONSTRAINT "Shelter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dog" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "adoptionStatus" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT,
    "distance" DOUBLE PRECISION,
    "shelterId" TEXT,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuccessStory" (
    "id" TEXT NOT NULL,
    "dogName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "shelterId" TEXT,

    CONSTRAINT "SuccessStory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dog" ADD CONSTRAINT "Dog_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "Shelter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuccessStory" ADD CONSTRAINT "SuccessStory_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "Shelter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
