"use client";

import { useRef, useState, useEffect, KeyboardEvent, DragEvent } from "react";
import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  X,
} from "lucide-react";
import Image from "next/image";

interface UploadFieldProps {
  label: string;
  helperText?: string;
  required?: boolean;
  accept?: string;
  error?: string;
  onFileChange: (file: File) => void;
}

export function UploadField({
  label,
  helperText,
  required,
  accept,
  error,
  onFileChange,
}: UploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);

  // Generate preview
  useEffect(() => {
    if (!file) return;

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  useEffect(() => {
    if (!file) return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [file]);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    onFileChange(selectedFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    handleFile(selectedFile);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;
    handleFile(droppedFile);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setProgress(0);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-800">
        {label} {required && "*"}
      </label>

      <div
        role="button"
        tabIndex={0}
        aria-label={`Upload ${label}`}
        onKeyDown={handleKeyDown}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`
          relative rounded-xl border-2 border-dashed p-3 transition
          cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-600
          ${
            dragActive
              ? "border-teal-600 bg-teal-50"
              : "border-gray-300 bg-gray-50"
          }
          ${error ? "border-red-500" : ""}
        `}
      >
        {!file && (
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <UploadCloud className="h-8 w-8 text-gray-500" />
            <p className="text-sm font-medium text-gray-700">
              Drag & drop file here or click to browse
            </p>
            <p className="text-xs text-gray-500">
              {helperText || "PDF, JPG, PNG (max 5MB)"}
            </p>
          </div>
        )}

        {file && (
          <div className="space-y-4">
            {/* Preview */}
            <div className="flex items-center gap-4">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Preview"
                  className="h-16 w-16 object-cover rounded-lg border"
                />
              ) : file.type === "application/pdf" ? (
                <FileText className="h-12 w-12 text-red-500" />
              ) : (
                <ImageIcon className="h-12 w-12 text-gray-500" />
              )}

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <button
                type="button"
                aria-label="Remove file"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="p-1 rounded hover:bg-gray-200"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* Progress bar */}
            {progress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-teal-600 h-2 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {progress === 100 && (
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <CheckCircle className="h-4 w-4" />
                Upload complete
              </div>
            )}
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          aria-hidden="true"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
