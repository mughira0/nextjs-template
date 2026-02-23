"use client";

import {
  useState,
  useRef,
  useCallback,
  type FormEvent,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import {
  SendHorizonal,
  Paperclip,
  X,
  FileText,
  Film,
  Music,
  Archive,
  File,
} from "lucide-react";
import Button from "../button";
import Image from "next/image";

// ─── Main Component ────────────────────────────────────────────────────────────

interface ChatInputProps {
  onSendMessage: (message: string, attachments: File[]) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState<AttachedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── File handling ──────────────────────────────────────────────────────────

  const addFiles = useCallback((files: FileList | File[]) => {
    const incoming = Array.from(files);
    const newEntries: AttachedFile[] = incoming.map((file) => {
      const type = categorize(file);
      const entry: AttachedFile = { id: uid(), file, type };
      if (type === "image") {
        entry.previewUrl = URL.createObjectURL(file);
      }
      return entry;
    });
    setAttachments((prev) => [...prev, ...newEntries]);
  }, []);

  const removeAttachment = useCallback((id: string) => {
    setAttachments((prev) => {
      const removed = prev.find((a) => a.id === id);
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
      return prev.filter((a) => a.id !== id);
    });
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.length) {
      addFiles(e.target.files);
      e.target.value = ""; // reset so same file can be re-added
    }
  };

  // Drag-and-drop support on the whole form
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
    },
    [addFiles],
  );

  const handleDragOver = (e: React.DragEvent<HTMLFormElement>) =>
    e.preventDefault();

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed && attachments.length === 0) return;
    console.log("Submitting message:", { text: trimmed, attachments });
    onSendMessage(
      trimmed,
      attachments.map((a) => a.file),
    );

    setText("");
    // revoke object URLs to free memory
    attachments.forEach((a) => {
      if (a.previewUrl) URL.revokeObjectURL(a.previewUrl);
    });

    setAttachments([]);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "40px"; // or "auto"
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSend = text.trim().length > 0 || attachments.length > 0;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <form
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="flex shrink-0 flex-col border-t border-[var(--chat-border)] bg-[var(--chat-header-bg)]"
    >
      {/* ── Attachment preview bar ── */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 border-b border-[var(--chat-border)] px-4 py-2">
          {attachments.map((a) => (
            <FileChip key={a.id} attached={a} onRemove={removeAttachment} />
          ))}
        </div>
      )}

      {/* ── Input row ── */}
      <div
        className="flex items-end gap-2 px-4 py-3"
        style={{ minHeight: "var(--chat-input-height)" }}
      >
        {/* Hidden real file input – accepts everything */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="*/*"
          className="hidden"
          onChange={handleFileChange}
          aria-hidden="true"
        />

        {/* Attach button */}
        <Button
          className="shrink-0 py-3"
          variant="ghost"
          size="sm"
          aria-label="Attach file"
          onClick={(e) => {
            e.preventDefault();
            fileInputRef.current?.click();
          }}
        >
          <Paperclip className="size-4 text-[var(--text-color)]" />
        </Button>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={textAreaRef}
          placeholder="Type a message…"
          rows={1}
          className="w-full scrollbar-themed  min-h-[40px] resize-none rounded-[var(--chat-radius-sm)] border border-[var(--chat-border)] bg-[var(--chat-input-bg)] px-3 py-[9px] text-sm text-[var(--chat-text-main)] placeholder:text-[var(--chat-text-muted)] focus-visible:outline-none"
          aria-label="Message input"
          style={{ maxHeight: "160px", overflowY: "auto" }}
          onInput={(e) => {
            const el = e.currentTarget;
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;
          }}
        />

        {/* Send button */}
        <Button
          size="sm"
          disabled={!canSend}
          aria-label="Send message"
          className="shrink-0 py-3"
          variant="ghost"
          onClick={handleSubmit}
        >
          <SendHorizonal className="size-4" />
        </Button>
      </div>
    </form>
  );
} // ─── Types ────────────────────────────────────────────────────────────────────

interface AttachedFile {
  id: string;
  file: File;
  previewUrl?: string; // only set for images
  type: FileCategory;
}

type FileCategory = "image" | "pdf" | "video" | "audio" | "archive" | "other";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function categorize(file: File): FileCategory {
  const mime = file.type;
  if (mime.startsWith("image/")) return "image";
  if (mime === "application/pdf") return "pdf";
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("audio/")) return "audio";
  if (
    mime === "application/zip" ||
    mime === "application/x-rar-compressed" ||
    mime === "application/x-7z-compressed" ||
    mime === "application/x-tar"
  )
    return "archive";
  return "other";
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FileIcon({ type }: { type: FileCategory }) {
  const cls = "size-5 shrink-0";
  switch (type) {
    case "pdf":
      return <FileText className={cls} />;
    case "video":
      return <Film className={cls} />;
    case "audio":
      return <Music className={cls} />;
    case "archive":
      return <Archive className={cls} />;
    default:
      return <File className={cls} />;
  }
}

function FileChip({
  attached,
  onRemove,
}: {
  attached: AttachedFile;
  onRemove: (id: string) => void;
}) {
  const isImage = attached.type === "image";

  return (
    <div className="relative flex items-center gap-2 rounded-lg border border-[var(--chat-border)] bg-[var(--chat-input-bg)] px-2.5 py-1.5 text-xs text-[var(--chat-text-main)] shadow-sm max-w-[160px] group transition-all duration-150 hover:border-[var(--chat-room-active,_#6366f1)]">
      {/* Thumbnail or icon */}
      {isImage && attached.previewUrl ? (
        <Image
          src={attached.previewUrl}
          alt={attached.file.name}
          className="size-8 rounded object-cover shrink-0 ring-1 ring-[var(--chat-border)]"
          width={32}
          height={32}
          unoptimized
        />
      ) : (
        <span className="flex size-8 items-center justify-center rounded bg-[var(--chat-header-bg)] text-[var(--chat-text-muted)]">
          <FileIcon type={attached.type} />
        </span>
      )}

      {/* Name */}
      <span className="truncate leading-tight max-w-[80px]">
        {attached.file.name}
      </span>

      {/* Remove button */}
      <button
        type="button"
        onClick={() => onRemove(attached.id)}
        aria-label={`Remove ${attached.file.name}`}
        className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-[var(--chat-text-muted)] text-[var(--chat-header-bg)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-red-500 focus-visible:opacity-100 focus-visible:outline-none"
      >
        <X className="size-2.5 cursor-pointer" />
      </button>
    </div>
  );
}
