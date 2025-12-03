/*
  Warnings:

  - You are about to drop the column `createdAt` on the `jadwal` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `jadwal` table. All the data in the column will be lost.
  - You are about to drop the column `id_matakuliah` on the `krs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_user]` on the table `Dosen` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `jadwal` DROP FOREIGN KEY `Jadwal_id_dosen_fkey`;

-- DropForeignKey
ALTER TABLE `jadwal` DROP FOREIGN KEY `Jadwal_id_matakuliah_fkey`;

-- DropForeignKey
ALTER TABLE `krs` DROP FOREIGN KEY `KRS_id_matakuliah_fkey`;

-- DropIndex
DROP INDEX `Jadwal_id_dosen_fkey` ON `jadwal`;

-- DropIndex
DROP INDEX `Jadwal_id_matakuliah_fkey` ON `jadwal`;

-- DropIndex
DROP INDEX `KRS_id_matakuliah_fkey` ON `krs`;

-- AlterTable
ALTER TABLE `dosen` ADD COLUMN `id_user` INTEGER NULL;

-- AlterTable
ALTER TABLE `jadwal` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `dosenNidn` INTEGER NULL,
    ADD COLUMN `matakuliahId_matakuliah` INTEGER NULL,
    MODIFY `hari` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `krs` DROP COLUMN `id_matakuliah`,
    ADD COLUMN `matakuliahId_matakuliah` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('Admin', 'Mahasiswa', 'Dosen') NOT NULL DEFAULT 'Mahasiswa';

-- CreateIndex
CREATE UNIQUE INDEX `Dosen_id_user_key` ON `Dosen`(`id_user`);

-- AddForeignKey
ALTER TABLE `Dosen` ADD CONSTRAINT `Dosen_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_dosenNidn_fkey` FOREIGN KEY (`dosenNidn`) REFERENCES `Dosen`(`nidn`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_matakuliahId_matakuliah_fkey` FOREIGN KEY (`matakuliahId_matakuliah`) REFERENCES `Matakuliah`(`id_matakuliah`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KRS` ADD CONSTRAINT `KRS_matakuliahId_matakuliah_fkey` FOREIGN KEY (`matakuliahId_matakuliah`) REFERENCES `Matakuliah`(`id_matakuliah`) ON DELETE SET NULL ON UPDATE CASCADE;
