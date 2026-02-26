"use client";

import React, { useRef, useMemo, useEffect, useState, FC } from "react";
import { Camera, X, Upload } from "lucide-react";
import Label from "@/components/core/label";
import { imageUrl, TOAST_TYPES } from "@/data/constants";
import { renderToast } from "@/helper/generic";

export type ProfileValueType = File | string | null;

interface IProfilePictureUploadProps {
  value: ProfileValueType;
  setValue: (file: File | null) => void;
  isUpdate?: boolean;
  label?: string;
  size?: number; // px, default 128
}

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_SIZE_MB = 5;

// ─── Component ────────────────────────────────────────────────────────────────

const ProfilePictureUpload: FC<IProfilePictureUploadProps> = ({
  value,
  setValue,
  isUpdate = false,
  label = "Profile Picture",
  size = 128,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Generate preview URL
  const previewUrl = useMemo<string | null>(() => {
    if (!value) return null;
    if (typeof value === "string") return imageUrl(value);
    if (value instanceof File && ALLOWED_TYPES.includes(value.type)) {
      return URL.createObjectURL(value);
    }
    return null;
  }, [value]);

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const validate = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      renderToast(
        "Only PNG, JPEG, or WebP images are allowed.",
        TOAST_TYPES.ERROR,
      );
      return false;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      renderToast(`File size exceeds ${MAX_SIZE_MB}MB.`, TOAST_TYPES.ERROR);
      return false;
    }
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (validate(file)) setValue(file);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClick = () => {
    if (isUpdate) fileInputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && isUpdate) {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isUpdate) return;
    const file = e.dataTransfer.files?.[0];
    if (file && validate(file)) setValue(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (isUpdate) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  // ── Initials fallback ─────────────────────────────────────────────────────

  const initials =
    typeof value === "string"
      ? value
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "?";

  // ── Derived state ─────────────────────────────────────────────────────────

  const showOverlay = isUpdate && (isHovering || isDragging);

  return (
    <div className="flex flex-col gap-2.5">
      {label && <Label>{label}</Label>}

      <div className="relative" style={{ width: size, height: size }}>
        {/* ── Main circle ── */}
        <div
          role={isUpdate ? "button" : undefined}
          tabIndex={isUpdate ? 0 : undefined}
          aria-label={isUpdate ? "Upload profile picture" : "Profile picture"}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className="relative w-full h-full rounded-full overflow-hidden outline-none"
          style={{
            cursor: isUpdate ? "pointer" : "default",
            boxShadow: isDragging
              ? "0 0 0 3px var(--primary-color), 0 0 0 6px oklch(0.62 0.22 275 / 0.2)"
              : isHovering && isUpdate
                ? "0 0 0 2px var(--primary-color)"
                : "0 0 0 2px var(--field-border)",
            transition: "box-shadow 0.2s ease",
          }}
        >
          {/* Image or placeholder */}
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile preview"
              className="w-full h-full object-cover"
              style={{
                filter: showOverlay ? "brightness(0.55)" : "brightness(1)",
                transition: "filter 0.22s ease",
              }}
            />
          ) : (
            // Initials / empty state
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-1"
              style={{
                background: showOverlay
                  ? "oklch(0.62 0.22 275 / 0.15)"
                  : "oklch(0.62 0.22 275 / 0.07)",
                transition: "background 0.22s ease",
              }}
            >
              {value && typeof value === "string" ? (
                <span
                  className="font-semibold tracking-wide select-none"
                  style={{
                    fontSize: size * 0.28,
                    color: "var(--primary-color)",
                  }}
                >
                  {initials}
                </span>
              ) : (
                <Upload
                  style={{
                    width: size * 0.22,
                    height: size * 0.22,
                    color: showOverlay
                      ? "var(--white-color)"
                      : "var(--primary-color)",
                    transition: "color 0.22s ease",
                  }}
                  strokeWidth={1.5}
                />
              )}
              {!value && !showOverlay && isUpdate && (
                <span
                  className="text-center leading-tight select-none"
                  style={{
                    fontSize: size * 0.1,
                    color: "var(--secondary-text-color)",
                    maxWidth: size * 0.7,
                  }}
                >
                  {isDragging ? "Drop it" : "Upload"}
                </span>
              )}
            </div>
          )}

          {/* Hover overlay with camera icon */}
          {isUpdate && previewUrl && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-1 pointer-events-none"
              style={{
                opacity: showOverlay ? 1 : 0,
                transition: "opacity 0.22s ease",
              }}
            >
              <Camera
                style={{
                  width: size * 0.22,
                  height: size * 0.22,
                  color: "var(--white-color)",
                }}
                strokeWidth={1.5}
              />
              <span
                className="font-medium text-center select-none"
                style={{
                  fontSize: size * 0.1,
                  color: "var(--white-color)",
                }}
              >
                {isDragging ? "Drop" : "Change"}
              </span>
            </div>
          )}
        </div>

        {/* ── Clear button ── */}
        {isUpdate && value && (
          <button
            onClick={handleClear}
            aria-label="Remove profile picture"
            className="absolute flex items-center justify-center rounded-full transition-all duration-150"
            style={{
              top: size * 0.04,
              right: size * 0.04,
              width: size * 0.22,
              height: size * 0.22,
              background: "var(--danger-color)",
              border: "2px solid var(--card)",
              color: "var(--white-color)",
              boxShadow: "0 1px 4px oklch(0% 0 0 / 0.2)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.12)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <X
              style={{ width: size * 0.11, height: size * 0.11 }}
              strokeWidth={2.5}
            />
          </button>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES.join(",")}
          className="hidden"
          onChange={handleFileChange}
          disabled={!isUpdate}
        />
      </div>

      {/* Hint text */}
      {isUpdate && (
        <p className="text-xs" style={{ color: "var(--secondary-text-color)" }}>
          PNG, JPEG or WebP · max {MAX_SIZE_MB}MB · drag & drop supported
        </p>
      )}
    </div>
  );
};

export default ProfilePictureUpload;
