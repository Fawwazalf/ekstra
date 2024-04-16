-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nis" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "fullname" TEXT,
    "gender" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,
    "jurusan" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("nis")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Ekstra" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL DEFAULT 'Olahraga',
    "location" TEXT NOT NULL DEFAULT 'Belum tahu',
    "pembimbing" TEXT NOT NULL DEFAULT 'Belum tahu',
    "adminNis" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Ekstra_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nis_key" ON "User"("nis");

-- CreateIndex
CREATE UNIQUE INDEX "User_nisn_key" ON "User"("nisn");

-- AddForeignKey
ALTER TABLE "Ekstra" ADD CONSTRAINT "Ekstra_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ekstra" ADD CONSTRAINT "Ekstra_adminNis_fkey" FOREIGN KEY ("adminNis") REFERENCES "User"("nis") ON DELETE RESTRICT ON UPDATE CASCADE;
