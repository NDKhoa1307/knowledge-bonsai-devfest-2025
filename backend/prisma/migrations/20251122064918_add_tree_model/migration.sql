-- CreateTable
CREATE TABLE
    "Tree" (
        "id" SERIAL NOT NULL,
        "ownerId" INTEGER NOT NULL,
        "title" TEXT NOT NULL,
        "bucket_url" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Tree_pkey" PRIMARY KEY ("id")
    );

-- AddForeignKey
ALTER TABLE "Tree" ADD CONSTRAINT "Tree_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;