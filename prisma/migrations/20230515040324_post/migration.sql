/*
  Warnings:

  - You are about to drop the column `image` on the `Campsite` table. All the data in the column will be lost.

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
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Campsite_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Campsite" ("authorId", "city", "country", "description", "id", "name", "price") SELECT "authorId", "city", "country", "description", "id", "name", "price" FROM "Campsite";
DROP TABLE "Campsite";
ALTER TABLE "new_Campsite" RENAME TO "Campsite";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
