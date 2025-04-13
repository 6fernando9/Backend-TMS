/*
  Warnings:

  - You are about to drop the column `createdAt` on the `bitacora_usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `bitacora_usuarios` table. All the data in the column will be lost.
  - You are about to alter the column `ip` on the `bitacora_usuarios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `tipo_sesion` on the `bitacora_usuarios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4)`.
  - You are about to alter the column `username` on the `bitacora_usuarios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the column `createdAt` on the `permisos` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `permisos` table. All the data in the column will be lost.
  - You are about to alter the column `nombre` on the `permisos` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to drop the column `createdAt` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `roles` table. All the data in the column will be lost.
  - You are about to alter the column `nombre` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to drop the column `createdAt` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `usuarios` table. All the data in the column will be lost.
  - You are about to alter the column `nombre` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `password` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - Added the required column `updated_at` to the `bitacora_usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `permisos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bitacora_usuarios" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "ip" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "tipo_sesion" SET DATA TYPE VARCHAR(4),
ALTER COLUMN "username" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "permisos" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profile_icon" VARCHAR(60),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" VARCHAR(50) NOT NULL,
ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(20);

-- CreateTable
CREATE TABLE "choferes" (
    "id" INTEGER NOT NULL,
    "ci" VARCHAR(40) NOT NULL,
    "direccion" VARCHAR(40) NOT NULL,
    "estado" VARCHAR(10) NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "choferes_usuario_id_key" ON "choferes"("usuario_id");

-- AddForeignKey
ALTER TABLE "choferes" ADD CONSTRAINT "choferes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
