/*
  Warnings:

  - The `monasticYears` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `age` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "IsSetdown" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "age",
ADD COLUMN     "age" INTEGER NOT NULL,
DROP COLUMN "monasticYears",
ADD COLUMN     "monasticYears" INTEGER,
ALTER COLUMN "isActive" SET DEFAULT false;
