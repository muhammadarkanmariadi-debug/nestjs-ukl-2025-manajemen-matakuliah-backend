/*
  Warnings:

  - You are about to drop the column `semester` on the `jadwal` table. All the data in the column will be lost.
  - You are about to drop the column `tahun_ajaran` on the `jadwal` table. All the data in the column will be lost.
  - Added the required column `semester` to the `KRS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tahun_ajaran` to the `KRS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jadwal` DROP COLUMN `semester`,
    DROP COLUMN `tahun_ajaran`;

-- AlterTable
ALTER TABLE `krs` ADD COLUMN `semester` INTEGER NOT NULL,
    ADD COLUMN `tahun_ajaran` VARCHAR(191) NOT NULL;
