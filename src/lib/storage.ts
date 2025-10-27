import { put, del } from '@vercel/blob'

export interface UploadResult {
  url: string
  pathname: string
}

export async function uploadFile(
  file: File,
  folder: string
): Promise<UploadResult> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('Blob storage not configured')
  }

  try {
    const filename = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

    const blob = await put(filename, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    return {
      url: blob.url,
      pathname: blob.pathname,
    }
  } catch (error) {
    console.error('Failed to upload file:', error)
    throw new Error('Failed to upload file')
  }
}

export async function deleteFile(url: string): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.warn('Blob storage not configured. File not deleted.')
    return
  }

  try {
    await del(url, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })
  } catch (error) {
    console.error('Failed to delete file:', error)
    // Don't throw error - file deletion is not critical
  }
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 5 * 1024 * 1024 // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'File size must be less than 5MB' }
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'File must be a JPG, PNG, or WebP image' }
  }

  return { valid: true }
}

export function validatePdfFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 10 * 1024 * 1024 // 10MB

  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'File size must be less than 10MB' }
  }

  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'File must be a PDF' }
  }

  return { valid: true }
}
