import * as React from "react";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { PostForm } from "@/components/admin/post-form";
import { getBlogPostBySlug, getServiceCategories } from "@/lib/services";

export const metadata = {
  title: "Edit Article | Talukdar Finance Admin",
  description: "Modify an existing market insight article.",
};

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const [post, categories] = await Promise.all([
    getBlogPostBySlug(id),
    getServiceCategories(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--color-brand-soft-blue)] flex flex-col lg:flex-row">
      <AdminSidebar userEmail={user.email} />

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--color-brand-navy)]">
            Edit Article: {post.title}
          </h1>
          <p className="text-xs text-[var(--color-brand-text-muted)] mt-1">
            Updating slug: <code className="font-mono">{post.id}</code>
          </p>
        </div>

        <PostForm initialPost={post} categories={categories} isEditing={true} />
      </main>
    </div>
  );
}

