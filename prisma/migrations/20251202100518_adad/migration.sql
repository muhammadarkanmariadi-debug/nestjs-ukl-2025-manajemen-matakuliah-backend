/*
  Warnings:

  - You are about to drop the column `jadwal_waktu` on the `jadwal` table. All the data in the column will be lost.
  - Added the required column `hari` to the `Jadwal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jam_mulai` to the `Jadwal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jam_selesai` to the `Jadwal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `Jadwal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tahun_ajaran` to the `Jadwal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jadwal` DROP COLUMN `jadwal_waktu`,
    ADD COLUMN `hari` VARCHAR(191) NOT NULL,
    ADD COLUMN `jam_mulai` DATETIME(3) NOT NULL,
    ADD COLUMN `jam_selesai` DATETIME(3) NOT NULL,
    ADD COLUMN `semester` INTEGER NOT NULL,
    ADD COLUMN `tahun_ajaran` VARCHAR(191) NOT NULL;
