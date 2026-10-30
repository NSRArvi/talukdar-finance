"use client";

import * as React from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Upload,
  Code,
  Undo,
  Redo,
  Loader2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  minHeight?: string;
  allowImageUpload?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  minHeight = "400px",
  allowImageUpload = true,
}: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isSourceMode, setIsSourceMode] = React.useState(false);
  const [isUploadingImage, setIsUploadingImage] = React.useState(false);

  // Initialize or synchronize content safely
  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const exec = (command: string, val: string | undefined = undefined) => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const addLink = () => {
    const url = prompt("Enter hyperlink URL (e.g. https://...):");
    if (url) {
      exec("createLink", url);
    }
  };

  const insertImagePrompt = () => {
    const url = prompt("Enter Image URL (e.g. https://...):");
    if (url) {
      exec("insertImage", url);
    }
  };

  // Upload an inline image to Supabase Storage and insert it directly into the editor
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB");
      return;
    }

    setIsUploadingImage(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const fileName = `editor-${Date.now()}.${ext}`;
      const filePath = `blog-content/${fileName}`;

      const { error } = await supabase.storage
        .from("service-images")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (error) throw error;

      const { data } = supabase.storage
        .from("service-images")
        .getPublicUrl(filePath);

      if (data?.publicUrl) {
        exec("insertImage", data.publicUrl);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image";
      alert(`Image upload error: ${msg}`);
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
      {/* Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1 text-slate-700 select-none">
        <button
          type="button"
          onClick={() => exec("bold")}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => exec("italic")}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => exec("underline")}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors"
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => exec("formatBlock", "<h2>")}
          className="p-1.5 rounded hover:bg-slate-200 text-xs font-bold transition-colors flex items-center gap-0.5"
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => exec("formatBlock", "<h3>")}
          className="p-1.5 rounded hover:bg-slate-200 text-xs font-bold transition-colors flex items-center gap-0.5"
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => exec("formatBlock", "<p>")}
          className="px-2 py-1 rounded hover:bg-slate-200 text-xs font-semibold transition-colors"
          title="Normal Paragraph"
        >
          Paragraph
        </button>

        <div className="h-4 w-px bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => exec("insertUnorderedList")}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => exec("insertOrderedList")}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors"
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={addLink}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors"
          title="Insert Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        {/* Image Support */}
        {allowImageUpload && (
          <>
            <div className="h-4 w-px bg-slate-300 mx-1" />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingImage}
              className="p-1.5 rounded hover:bg-slate-200 transition-colors flex items-center gap-1 text-xs font-medium"
              title="Upload & Insert Image"
            >
              {isUploadingImage ? (
                <Loader2 className="w-4 h-4 animate-spin text-[var(--color-brand-blue)]" />
              ) : (
                <Upload className="w-4 h-4 text-[var(--color-brand-blue)]" />
              )}
              <span className="hidden sm:inline">Image</span>
            </button>

            <button
              type="button"
              onClick={insertImagePrompt}
              className="p-1.5 rounded hover:bg-slate-200 transition-colors"
              title="Insert Image by URL"
            >
              <ImageIcon className="w-4 h-4" />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageFileUpload}
              className="hidden"
            />
          </>
        )}

        <div className="h-4 w-px bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => exec("undo")}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => exec("redo")}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>

        <div className="ml-auto">
          <button
            type="button"
            onClick={() => setIsSourceMode(!isSourceMode)}
            className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-colors ${
              isSourceMode
                ? "bg-[var(--color-brand-blue)] text-white"
                : "bg-slate-200 hover:bg-slate-300 text-slate-700"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>{isSourceMode ? "Visual Editor" : "HTML Source"}</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {isSourceMode ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-4 font-mono text-xs text-slate-100 bg-slate-900 focus:outline-none"
          style={{ minHeight }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="p-6 prose prose-slate max-w-none focus:outline-none text-slate-800 leading-relaxed text-sm [&_img]:rounded-xl [&_img]:max-w-full [&_img]:my-4"
          style={{ minHeight }}
        />
      )}
    </div>
  );
}
