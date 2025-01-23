/*
  Warnings:

  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `authorId` VARCHAR(191) NOT NULL,
    ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `summary` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `role` VARCHAR(191) NULL DEFAULT 'normal',
    ADD COLUMN `status` VARCHAR(191) NULL DEFAULT 'active',
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
