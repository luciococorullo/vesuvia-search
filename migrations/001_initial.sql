-- CreateTable
CREATE TABLE "stations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trains" (
    "id" SERIAL NOT NULL,
    "train_number" TEXT,
    "direction" TEXT NOT NULL,
    "departure_time" TEXT NOT NULL,
    "operating_days" TEXT NOT NULL,
    "is_campania_express" BOOLEAN NOT NULL DEFAULT false,
    "category" TEXT NOT NULL DEFAULT 'regionale',
    "start_station_id" INTEGER NOT NULL,
    "end_station_id" INTEGER NOT NULL,

    CONSTRAINT "trains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "train_stops" (
    "id" SERIAL NOT NULL,
    "train_id" INTEGER NOT NULL,
    "station_id" INTEGER NOT NULL,
    "arrival_time" TEXT,
    "departure_time" TEXT,
    "stop_order" INTEGER NOT NULL,

    CONSTRAINT "train_stops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stations_code_key" ON "stations"("code");

-- AddForeignKey
ALTER TABLE "trains" ADD CONSTRAINT "trains_end_station_id_fkey" FOREIGN KEY ("end_station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trains" ADD CONSTRAINT "trains_start_station_id_fkey" FOREIGN KEY ("start_station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "train_stops" ADD CONSTRAINT "train_stops_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "train_stops" ADD CONSTRAINT "train_stops_train_id_fkey" FOREIGN KEY ("train_id") REFERENCES "trains"("id") ON DELETE CASCADE ON UPDATE CASCADE;
