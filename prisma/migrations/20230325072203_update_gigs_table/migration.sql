/*
  Warnings:

  - Made the column `rate` on table `gigs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `gigs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stars` on table `gigs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `skills` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `certifications` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `gigs` MODIFY `rate` INTEGER NOT NULL DEFAULT 0,
    MODIFY `price` INTEGER NOT NULL DEFAULT 0,
    MODIFY `picture` VARCHAR(191) NULL,
    MODIFY `stars` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `users` MODIFY `skills` VARCHAR(191) NOT NULL DEFAULT '[]',
    MODIFY `certifications` VARCHAR(191) NOT NULL DEFAULT '[]';
