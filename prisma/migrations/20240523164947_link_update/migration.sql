/*
  Warnings:

  - You are about to drop the column `accountId` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Link` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Link` DROP FOREIGN KEY `Link_accountId_fkey`;

-- AlterTable
ALTER TABLE `Link` DROP COLUMN `accountId`,
    DROP COLUMN `createdAt`,
    ADD COLUMN `userId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `idx_link_userId` ON `Link`(`userId`);

-- AddForeignKey
ALTER TABLE `Link` ADD CONSTRAINT `Link_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
