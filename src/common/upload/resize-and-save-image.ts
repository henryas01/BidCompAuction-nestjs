import sharp from 'sharp';
import { join } from 'path';
import { promises as fs } from 'fs';

interface ResizeImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
  dest?: string; // <-- tambahkan dest folder
}

const DEFAULT_OPTIONS: Required<Omit<ResizeImageOptions, 'dest'>> = {
  width: 800,
  height: 800,
  quality: 80,
  format: 'jpeg',
};

export async function resizeAndSaveImage(
  file: Express.Multer.File,
  options?: ResizeImageOptions,
): Promise<string> {
  const { width, height, quality, format, dest } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const uploadDir = dest
    ? join(process.cwd(), dest)
    : join(process.cwd(), 'uploads/products');
  await fs.mkdir(uploadDir, { recursive: true });

  const baseName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const fileName = `${baseName}.${format}`;
  const outputPath = join(uploadDir, fileName);

  let transformer = sharp(file.buffer).resize(width, height, {
    fit: 'inside',
    withoutEnlargement: true,
  });

  switch (format) {
    case 'png':
      transformer = transformer.png({ quality });
      break;
    case 'webp':
      transformer = transformer.webp({ quality });
      break;
    default:
      transformer = transformer.jpeg({ quality });
      break;
  }

  await transformer.toFile(outputPath);

  // return path relatif agar bisa dipakai di API
  return `/${dest ?? 'uploads/products'}/${fileName}`;
}
