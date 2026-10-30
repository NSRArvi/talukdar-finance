import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Plus, Edit2, ExternalLink, BookOpen, Clock, Calendar } from "lucide-react";
import { DeletePostButton } from "./delete-post-button";
import type { BlogPost } from "@/types";

export const metadata = {
  title: "Blog & Insights | Talukdar Finance Admin",
  description: "Create, edit, and organize Australian finance articles and research.",
};

export default async function AdminPostsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  const posts = (data as BlogPost[]) || [];

  return (
    <div className="min-h-screen bg-[var(--color-brand-soft-blue)] flex flex-col lg:flex-row">
      <AdminSidebar userEmail={user.email} />

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-8 flex flex-col gap-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-brand-navy)]">
              Blog &amp; Market Insights
            </h1>
            <p className="text-xs text-[var(--color-brand-text-muted)] mt-1">
              Publish educational articles, interest rate analysis, and property guides for Australian clients.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/insights"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <span>View Public Blog</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-brand-navy)] hover:bg-[var(--color-brand-blue)] text-white text-xs font-bold transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Write Article</span>
            </Link>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[var(--color-brand-navy)]">
              All Articles ({posts.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Article</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Published Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="font-semibold text-slate-600">
                        No articles published yet.
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Click &quot;Write Article&quot; to publish your first market insight.
                      </p>
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                            {post.thumbnail_url && (
                              <Image
                                src={post.thumbnail_url}
                                alt={post.title}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            )}
                          </div>
                          <div className="flex flex-col min-w-0 max-w-md">
                            <span className="font-bold text-[var(--color-brand-navy)] truncate">
                              {post.title}
                            </span>
                            <span className="text-[11px] text-slate-400 truncate">
                              /{post.id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 capitalize">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[var(--color-brand-blue)] font-semibold text-[10px]">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            post.is_published
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {post.is_published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                        {post.created_at
                          ? new Date(post.created_at).toLocaleDateString(
                              "en-AU",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "—"}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/insights/${post.id}`}
                            target="_blank"
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                            title="View live article"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/admin/posts/${post.id}`}
                            className="p-1.5 text-slate-400 hover:text-[var(--color-brand-blue)] hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit article"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                          <DeletePostButton
                            postId={post.id}
                            postTitle={post.title}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

