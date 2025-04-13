-- AlterTable
CREATE SEQUENCE choferes_id_seq;
ALTER TABLE "choferes" ALTER COLUMN "id" SET DEFAULT nextval('choferes_id_seq'),
ADD CONSTRAINT "choferes_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE choferes_id_seq OWNED BY "choferes"."id";

-- CreateTable
CREATE TABLE "vehiculos" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "chofer_id" INTEGER NOT NULL,
    "placa" VARCHAR(20) NOT NULL,
    "peso" VARCHAR(20) NOT NULL,
    "estado" VARCHAR(15) NOT NULL,
    "kilometraje" VARCHAR(20) NOT NULL,
    "tipo_vehiculo_id" INTEGER NOT NULL,

    CONSTRAINT "vehiculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_vehiculos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_vehiculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagenes" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(20) NOT NULL,
    "cloudinary_id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "vehiculo_id" INTEGER NOT NULL,

    CONSTRAINT "imagenes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehiculos_chofer_id_key" ON "vehiculos"("chofer_id");

-- AddForeignKey
ALTER TABLE "vehiculos" ADD CONSTRAINT "vehiculos_chofer_id_fkey" FOREIGN KEY ("chofer_id") REFERENCES "choferes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehiculos" ADD CONSTRAINT "vehiculos_tipo_vehiculo_id_fkey" FOREIGN KEY ("tipo_vehiculo_id") REFERENCES "tipo_vehiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagenes" ADD CONSTRAINT "imagenes_vehiculo_id_fkey" FOREIGN KEY ("vehiculo_id") REFERENCES "vehiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
