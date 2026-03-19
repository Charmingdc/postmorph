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

    <article className="max-w-none text-foreground/80 leading-relaxed">
     <ReactMarkdown
      components={{
       h1: props => (
        <h1 className="text-2xl font-semibold mt-6 mb-3" {...props} />
       ),
       h2: props => (
        <h2 className="text-xl font-semibold mt-6 mb-2" {...props} />
       ),
       h3: props => (
        <h3 className="text-lg font-semibold mt-5 mb-2" {...props} />
       ),
       p: props => <p className="mb-4 text-muted-foreground" {...props} />,
       strong: props => (
        <strong className="text-foreground font-semibold" {...props} />
       ),
       a: props => (
        <a
         className="text-primary underline underline-offset-4"
         target="_blank"
         {...props}
        />
       ),
       ul: props => <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />,
       ol: props => (
        <ol className="list-decimal pl-5 mb-4 space-y-1" {...props} />
       ),
       li: props => <li className="text-muted-foreground" {...props} />,
       hr: () => <hr className="my-6 border-border opacity-50" />,
       blockquote: props => (
        <blockquote
         className="border-l-4 border-border pl-4 italic text-muted-foreground my-4"
         {...props}
        />
       )
      }}
     >
      {article.content}
     </ReactMarkdown>
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
