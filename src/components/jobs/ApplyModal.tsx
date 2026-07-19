"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
}

export function ApplyModal({
  isOpen,
  onClose,
  jobId,
  jobTitle,
}: ApplyModalProps) {
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await api.post(`/api/applications/${jobId}`, {
        coverLetter: coverLetter.trim() || undefined,
      });
      toast.success("Application submitted");
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      setCoverLetter("");
      onClose();
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not submit application"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Apply to ${jobTitle}`}>
      <div className="space-y-4">
        <Textarea
          label="Cover letter (optional)"
          placeholder="Tell the employer why you're a great fit…"
          rows={6}
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
        <p className="text-xs text-slate">
          Resume attachments arrive with the profile milestone — for now your
          application goes through with your account details and cover letter.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            fullWidth
            className="sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="button"
            isLoading={isSubmitting}
            onClick={handleSubmit}
            fullWidth
            className="sm:w-auto sm:px-8"
          >
            Submit Application
          </Button>
        </div>
      </div>
    </Modal>
  );
}
