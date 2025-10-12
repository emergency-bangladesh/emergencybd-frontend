import imageCompression from 'browser-image-compression'
import type { Options } from 'browser-image-compression'

/**
 * A private helper function to compress an image file using browser-image-compression.
 * @param file The image file to compress.
 * @param options The compression options.
 * @returns A promise that resolves with the compressed file.
 */
async function _compress(file: File, options: Options): Promise<File> {
  try {
    const compressedFile = await imageCompression(file, options)
    return compressedFile
  } catch (error) {
    console.error('Image compression failed:', error)
    throw new Error(
      `Image compression failed: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}

/**
 * Compresses an image for NID upload.
 * @param file The image file to compress.
 * @returns A promise that resolves with the compressed file.
 */
export async function compressNidImage(file: File): Promise<File> {
  const options: Options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/webp',
  }
  return _compress(file, options)
}

/**
 * Compresses an image for profile picture upload.
 * @param file The image file to compress.
 * @returns A promise that resolves with the compressed file.
 */
export async function compressProfileImage(file: File): Promise<File> {
  const options: Options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 512,
    useWebWorker: true,
    fileType: 'image/webp',
  }
  return _compress(file, options)
}
