/*
  Warnings:

  - You are about to drop the `Ekstra` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ekstra" DROP CONSTRAINT "Ekstra_adminNis_fkey";

-- DropForeignKey
ALTER TABLE "Ekstra" DROP CONSTRAINT "Ekstra_categoryName_fkey";

-- DropTable
DROP TABLE "Ekstra";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "nis" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "password" TEXT,
    "fullname" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,
    "jurusan" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("nis")
);

-- CreateTable
CREATE TABLE "ekstras" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "location" TEXT NOT NULL DEFAULT 'Belum tahu',
    "pembimbing" TEXT NOT NULL DEFAULT 'Belum tahu',
    "adminNis" TEXT,
    "image" TEXT NOT NULL,

    CONSTRAINT "ekstras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "handle" TEXT NOT NULL,
    "userNis" TEXT,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "user_nis" TEXT,

    CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_nis_key" ON "users"("nis");

-- CreateIndex
CREATE UNIQUE INDEX "users_nisn_key" ON "users"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_handle_key" ON "sessions"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- AddForeignKey
ALTER TABLE "ekstras" ADD CONSTRAINT "ekstras_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ekstras" ADD CONSTRAINT "ekstras_adminNis_fkey" FOREIGN KEY ("adminNis") REFERENCES "users"("nis") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userNis_fkey" FOREIGN KEY ("userNis") REFERENCES "users"("nis") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_user_nis_fkey" FOREIGN KEY ("user_nis") REFERENCES "users"("nis") ON DELETE SET NULL ON UPDATE CASCADE;
