"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FileText, UploadCloud, CheckCircle2, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";

export function ResumeUpload({
  currentResumeUrl,
}: {
  currentResumeUrl: string | null;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [lastResult, setLastResult] = useState<{
    skillsCount: number;
    hasSummary: boolean;
  } | null>(null);
  const queryClient = useQueryClient();
  const { refreshUser } = useAuth();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsUploading(true);
      setLastResult(null);
      try {
        const formData = new FormData();
        formData.append("resume", file);

        // Don't set Content-Type manually — axios/browser generates the
        // multipart boundary automatically when the body is a FormData object.
        const { data } = await api.post("/api/users/resume", formData);

        setLastResult({
          skillsCount: data.user.skills.length,
          hasSummary: !!data.user.resumeSummary,
        });
        await refreshUser();
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        toast.success("Resume processed — review the prefilled details below");
      } catch (err) {
        toast.error(getErrorMessage(err, "Could not process this resume"));
      } finally {
        setIsUploading(false);
      }
    },
    [queryClient, refreshUser],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isUploading,
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
      <h2 className="mb-1 font-display text-lg font-semibold text-ink">
        Resume
      </h2>
      <p className="mb-5 text-sm text-slate">
        Upload a PDF or DOCX resume — AI will extract your skills, experience,
        and education to prefill the form below.
      </p>

      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          isDragActive
            ? "border-signal bg-signal/5"
            : "border-line hover:border-slate"
        } ${isUploading ? "pointer-events-none opacity-60" : ""}`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin text-signal" />
            <p className="text-sm font-medium text-ink">
              Reading and analyzing your resume…
            </p>
            <p className="text-xs text-slate">This can take a few seconds</p>
          </>
        ) : (
          <>
            <UploadCloud className="h-6 w-6 text-slate" />
            <p className="text-sm font-medium text-ink">
              {isDragActive
                ? "Drop your resume here"
                : "Drag & drop your resume, or click to browse"}
            </p>
            <p className="text-xs text-slate">PDF or DOCX, up to 5MB</p>
          </>
        )}
      </div>

      {lastResult && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-signal/5 px-4 py-3 text-sm text-signal-dark">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Extracted {lastResult.skillsCount} skill
          {lastResult.skillsCount === 1 ? "" : "s"}
          {lastResult.hasSummary ? " and a professional summary" : ""} — review
          and edit below before saving.
        </div>
      )}

      {!lastResult && currentResumeUrl && (
        <a
          href={currentResumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-signal hover:text-signal-dark"
        >
          <FileText className="h-4 w-4" /> View current resume
        </a>
      )}
    </div>
  );
}
