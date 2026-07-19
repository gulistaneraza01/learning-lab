import { S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  forcePathStyle: true, // required for Supabase S3 compatibility
  region: process.env.SUPABASE_S3_REGION,
  endpoint: process.env.SUPABASE_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY,
    secretAccessKey: process.env.SUPABASE_S3_SECRET_KEY,
  },
});

export default s3Client;
