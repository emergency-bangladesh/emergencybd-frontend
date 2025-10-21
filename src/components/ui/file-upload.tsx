import {
  IconAlertCircle,
  IconArchive,
  IconFile,
  IconFileSpreadsheet,
  IconFileText,
  IconFileUpload,
  IconHeadphones,
  IconPhoto,
  IconVideo,
  IconX,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  formatBytes,
  useFileUpload,
} from "@/integrations/file-upload/use-file-upload";

const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
  const fileType = file.file instanceof File ? file.file.type : file.file.type;
  const fileName = file.file instanceof File ? file.file.name : file.file.name;

  if (
    fileType.includes("pdf") ||
    fileName.endsWith(".pdf") ||
    fileType.includes("word") ||
    fileName.endsWith(".doc") ||
    fileName.endsWith(".docx")
  ) {
    return <IconFileText className="size-4 opacity-60" />;
  } else if (
    fileType.includes("zip") ||
    fileType.includes("archive") ||
    fileName.endsWith(".zip") ||
    fileName.endsWith(".rar")
  ) {
    return <IconArchive className="size-4 opacity-60" />;
  } else if (
    fileType.includes("excel") ||
    fileName.endsWith(".xls") ||
    fileName.endsWith(".xlsx")
  ) {
    return <IconFileSpreadsheet className="size-4 opacity-60" />;
  } else if (fileType.includes("video/")) {
    return <IconVideo className="size-4 opacity-60" />;
  } else if (fileType.includes("audio/")) {
    return <IconHeadphones className="size-4 opacity-60" />;
  } else if (fileType.startsWith("image/")) {
    return <IconPhoto className="size-4 opacity-60" />;
  }
  return <IconFile className="size-4 opacity-60" />;
};

type FileUploadProps = {
  initialFiles?: Array<File>;
  maxSize?: number;
  maxFiles?: number;
  title: string;
  description: string;
  onFilesChange: (files: Array<File>) => void;
  buttonText?: string;
  acceptedTypes?: Array<File["type"]>;
};

export function FileUpload({
  initialFiles,
  maxFiles,
  maxSize,
  title,
  description,
  onFilesChange,
  acceptedTypes = ["*"],
}: FileUploadProps) {
  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    multiple: true,
    maxFiles,
    maxSize,
    onFilesChange: (fwp) => {
      onFilesChange(fwp.map((file) => file.file));
    },
    acceptedTypes,
    initialFiles,
  });

  const showDropArea = !maxFiles || files.length < maxFiles;

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      {showDropArea && (
        <button
          type="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload files"
          />

          <div className="flex flex-col items-center justify-center text-center">
            <div
              className="bg-background mb-2 flex size-12 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <IconFileUpload className="size-4 opacity-60" />
            </div>
            <p className="mt-0! pt-0! text-sm font-medium">{title}</p>
            <p className="leading-normal mt-0! pt-0! text-muted-foreground text-xs">
              {description}
            </p>
            <p className="leading-normal mt-0! pt-0! text-muted-foreground/70 text-xs">
              Accepted File Types:{" "}
              {acceptedTypes.length > 0 && acceptedTypes[0] === "*"
                ? "All"
                : acceptedTypes
                    .map((t) => t.split("/")[1].toUpperCase())
                    .map((t) => (t.includes("+") ? t.split("+")[0] : t))
                    .join(", ")}
            </p>
          </div>
        </button>
      )}

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <IconAlertCircle className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
                  {getFileIcon(file)}
                </div>
                <div className="flex min-w-0 flex-col">
                  <p className="mt-0! pt-0! leading-normal truncate text-sm font-medium">
                    {file.file.name}
                  </p>
                  <p className="mt-0! pt-0! leading-normal text-muted-foreground text-xs">
                    {formatBytes(file.file.size)}
                  </p>
                </div>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                onClick={() => removeFile(file.id)}
                aria-label="Remove file"
              >
                <IconX className="size-4" aria-hidden="true" />
              </Button>
            </div>
          ))}

          {/* Remove all files button */}
          {files.length > 1 && (
            <div>
              <Button size="sm" variant="outline" onClick={clearFiles}>
                Remove all files
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
