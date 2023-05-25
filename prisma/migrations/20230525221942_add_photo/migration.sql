/*
  Warnings:

  - Added the required column `photo` to the `Campsite` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Campsite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "photo" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Campsite_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Campsite" ("authorId", "city", "country", "description", "id", "name", "price") SELECT "authorId", "city", "country", "description", "id", "name", "price" FROM "Campsite";
DROP TABLE "Campsite";
ALTER TABLE "new_Campsite" RENAME TO "Campsite";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
