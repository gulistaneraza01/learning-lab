import { ListObjectsCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Client from '../config/s3Client.js';
import { tryCatch } from '../utils/TryCatch.js';
import { sanitizeKey } from '../utils/sanitizeKey.js';

export const preSignedUrl = tryCatch(async (req, res) => {
  const { fileName, fileType } = req.body;
  const uniqueKey = `${Date.now()}-${sanitizeKey(fileName)}`;

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.SUPABASE_S3_BUCKET,
    Key: uniqueKey,
    ContentType: fileType,
  });

  const presignedUrl = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: 60 * 60, // 1 hour
  });

  res.json({
    status: 'success',
    message: 'Pre-signed URL generated successfully',
    data: {
      url: presignedUrl,
      key: uniqueKey,
    },
  });
});

export const listFiles = tryCatch(async (req, res) => {
  const listObjectsCommand = new ListObjectsCommand({
    Bucket: process.env.SUPABASE_S3_BUCKET,
  });
  const data = await s3Client.send(listObjectsCommand);
  res.json({
    status: 'success',
    message: 'Files listed successfully',
    data: data.Contents,
  });
});
