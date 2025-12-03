/*
  Warnings:

  - You are about to drop the column `matakuliahId_matakuliah` on the `krs` table. All the data in the column will be lost.
  - Added the required column `id_matakuliah` to the `KRS` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `krs` DROP FOREIGN KEY `KRS_matakuliahId_matakuliah_fkey`;

-- DropIndex
DROP INDEX `KRS_matakuliahId_matakuliah_fkey` ON `krs`;

-- AlterTable
ALTER TABLE `krs` DROP COLUMN `matakuliahId_matakuliah`,
    ADD COLUMN `id_matakuliah` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `KRS` ADD CONSTRAINT `KRS_id_matakuliah_fkey` FOREIGN KEY (`id_matakuliah`) REFERENCES `Matakuliah`(`id_matakuliah`) ON DELETE RESTRICT ON UPDATE CASCADE;
