"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface DeleteServiceButtonProps {
  serviceId: string;
  serviceTitle: string;
}

export function DeleteServiceButton({
  serviceId,
  serviceTitle,
}: DeleteServiceButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${serviceTitle}" (${serviceId})? This will immediately remove it from public view.`
    );

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", serviceId);

      if (error) {
        alert(`Failed to delete service: ${error.message}`);
        setIsDeleting(false);
        return;
      }

      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unknown error occurred";
      alert(`Error deleting service: ${msg}`);
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      aria-label={`Delete ${serviceTitle}`}
      title="Delete service"
      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}

