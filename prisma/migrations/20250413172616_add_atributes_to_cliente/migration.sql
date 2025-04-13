-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "direccion" VARCHAR(40),
ALTER COLUMN "telefono" DROP NOT NULL,
ALTER COLUMN "fecha_nacimiento" DROP NOT NULL;
