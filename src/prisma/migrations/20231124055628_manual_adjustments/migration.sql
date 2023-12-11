-- Alter the `title` column in the `posts` table to be nullable
ALTER TABLE "posts" ALTER COLUMN "title" DROP NOT NULL;

-- Change the default value of the `image` column in the `posts` table
ALTER TABLE "posts" ALTER COLUMN "image" SET DEFAULT 'https://xa09cquxuk1zok5f.public.blob.vercel-storage.com/IoGBwOC-9CvtiYRSGCNZAuY0UAemMZ0UzFtuZ7.jpeg';

-- Change the default value of the `logo` column in the `sites` table
ALTER TABLE "sites" ALTER COLUMN "logo" SET DEFAULT 'https://xa09cquxuk1zok5f.public.blob.vercel-storage.com/SgQEI5B-KRu6KULIVq8OXj0eKRn7drD4RRCGf1.png';

-- Change the default value of the `image` column in the `sites` table
ALTER TABLE "sites" ALTER COLUMN "image" SET DEFAULT 'https://xa09cquxuk1zok5f.public.blob.vercel-storage.com/qbRcbkW-GSx1IuBuKyVEbOJkFlkxBCVaCy5qfD.jpeg';