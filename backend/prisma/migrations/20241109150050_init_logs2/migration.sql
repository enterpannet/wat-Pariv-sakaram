-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "monasticYears" INTEGER,
    "templeAffiliation" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "chronicIllness" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
