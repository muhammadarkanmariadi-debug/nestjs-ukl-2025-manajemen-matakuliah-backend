/*
  Warnings:

  - You are about to drop the column `semester` on the `krs` table. All the data in the column will be lost.
  - You are about to drop the column `sks` on the `krs` table. All the data in the column will be lost.
  - You are about to drop the column `tahun_ajaran` on the `krs` table. All the data in the column will be lost.
  - Added the required column `id_penjadwalan` to the `KRS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `krs` DROP COLUMN `semester`,
    DROP COLUMN `sks`,
    DROP COLUMN `tahun_ajaran`,
    ADD COLUMN `id_penjadwalan` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `KRS` ADD CONSTRAINT `KRS_id_penjadwalan_fkey` FOREIGN KEY (`id_penjadwalan`) REFERENCES `Jadwal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
