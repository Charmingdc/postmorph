import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Calendar } from "lucide-react";

export default async function ArticlePage({
 params
}: {
 params: Promise<{ slug: string }>;
}) {
 const { slug } = await params;

 const supabase = await createClient();

 const { data: article, error } = await supabase
  .from("articles")
  .select("title, content, created_at")
  .eq("slug", slug)
  .eq("published", true)
  .single();

 if (error || !article) {
  return notFound();
 }

 return (
  <div className="min-h-screen px-4 py-10 bg-background text-foreground">
   <div className="max-w-2xl mx-auto">
    <h1 className="text-2xl font-semibold mb-2">{article.title}</h1>

    <p className="flex items-center gap-1 text-sm text-mono text-muted-foreground mb-10">
     <Calendar size={16} />
     <span>{new Date(article.created_at).toDateString()}</span>
    </p>

    <article className="text-foreground/70 prose max-w-none">
     <ReactMarkdown>{article.content}</ReactMarkdown>
    </article>

    <div className="mt-10 p-4 rounded-xl border border-border bg-muted">
     <p className="mb-2 font-medium">Want to repurpose content faster?</p>

     <a href="/auth/signup" className="text-primary font-medium">
      Try Postmorph →
     </a>
    </div>
   </div>
  </div>
 );
}
