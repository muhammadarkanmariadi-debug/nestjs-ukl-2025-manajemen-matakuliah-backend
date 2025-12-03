/*
  Warnings:

  - You are about to drop the column `dosenNidn` on the `jadwal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `jadwal` DROP FOREIGN KEY `Jadwal_dosenNidn_fkey`;

-- DropIndex
DROP INDEX `Jadwal_dosenNidn_fkey` ON `jadwal`;

-- AlterTable
ALTER TABLE `jadwal` DROP COLUMN `dosenNidn`;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_id_dosen_fkey` FOREIGN KEY (`id_dosen`) REFERENCES `Dosen`(`nidn`) ON DELETE RESTRICT ON UPDATE CASCADE;
