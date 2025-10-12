import { IconPhotoPlus, IconX } from '@tabler/icons-react'
import { useFileUpload } from '@/integrations/file-upload/use-file-upload'
import { Button } from '@/components/ui/button'

interface AvatarUploadProps {
  maxSize?: number
  buttonLabel?: string
  onFileChange: (file: File | undefined) => void
  initialAvatar?: File
  initialAvatarSrc?: string
}

export default function AvatarUpload({
  maxSize,
  onFileChange,
  buttonLabel,
  initialAvatar,
  initialAvatarSrc,
}: AvatarUploadProps) {
  const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp']
  const [
    { files, isDragging },
    {
      removeFile,
      openFileDialog,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
    },
  ] = useFileUpload({
    acceptedTypes,
    maxFiles: 1,
    multiple: false,
    maxSize,
    onFilesChange: (fwp) => onFileChange(fwp[0]?.file),
    initialFiles: initialAvatar ? [initialAvatar] : undefined,
  })

  const previewUrl = files[0]?.preview || initialAvatarSrc || null

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex">
        <button
          type="button"
          className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 relative flex size-32 items-center justify-center overflow-hidden rounded-full border border-dashed transition-colors outline-none focus-visible:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          aria-label={
            previewUrl ? 'Change image' : buttonLabel || 'Upload image'
          }
        >
          {previewUrl ? (
            <img
              className="size-full object-cover"
              src={previewUrl}
              alt={files[0]?.file.name || 'Uploaded image'}
              width={64}
              height={64}
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div aria-hidden="true">
              <IconPhotoPlus className="size-6 opacity-60" />
            </div>
          )}
        </button>
        {previewUrl && (
          <Button
            onClick={() => removeFile(files[0]?.id)}
            size="icon"
            className="border-background focus-visible:border-background absolute -top-1 -right-1 size-6 rounded-full border-2 shadow-none"
            aria-label="Remove image"
          >
            <IconX className="size-3.5" />
          </Button>
        )}
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
          tabIndex={-1}
        />
      </div>
    </div>
  )
}
