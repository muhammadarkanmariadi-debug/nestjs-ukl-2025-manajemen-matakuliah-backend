/*
  Warnings:

  - You are about to drop the column `matakuliahId_matakuliah` on the `jadwal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_user]` on the table `Dosen` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `jadwal` DROP FOREIGN KEY `Jadwal_matakuliahId_matakuliah_fkey`;

-- DropIndex
DROP INDEX `Jadwal_matakuliahId_matakuliah_fkey` ON `jadwal`;

-- AlterTable
ALTER TABLE `dosen` ADD COLUMN `id_user` INTEGER NULL;

-- AlterTable
ALTER TABLE `jadwal` DROP COLUMN `matakuliahId_matakuliah`;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('Admin', 'Mahasiswa', 'Dosen') NOT NULL DEFAULT 'Mahasiswa';

-- CreateIndex
CREATE UNIQUE INDEX `Dosen_id_user_key` ON `Dosen`(`id_user`);

-- AddForeignKey
ALTER TABLE `Dosen` ADD CONSTRAINT `Dosen_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_id_matakuliah_fkey` FOREIGN KEY (`id_matakuliah`) REFERENCES `Matakuliah`(`id_matakuliah`) ON DELETE RESTRICT ON UPDATE CASCADE;
