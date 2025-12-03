/*
  Warnings:

  - You are about to drop the column `id_user` on the `dosen` table. All the data in the column will be lost.
  - The values [Dosen] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- DropForeignKey
ALTER TABLE `dosen` DROP FOREIGN KEY `Dosen_id_user_fkey`;

-- DropIndex
DROP INDEX `Dosen_id_user_key` ON `dosen`;

-- AlterTable
ALTER TABLE `dosen` DROP COLUMN `id_user`;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('Admin', 'Mahasiswa') NOT NULL DEFAULT 'Mahasiswa';
