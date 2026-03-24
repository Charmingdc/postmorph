import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function BlogPage() {
 const supabase = await createClient();

 const { data: articles, error } = await supabase
  .from("articles")
  .select("title, slug, created_at")
  .eq("published", true)
  .order("created_at", { ascending: false });

 if (error) {
  return <div className="p-6 text-destructive">Failed to load articles</div>;
 }

 return (
  <div className="min-h-screen px-4 py-10 bg-background text-foreground">
   <div className="max-w-2xl mx-auto">
    <h1 className="text-3xl font-bold mb-6"> Articles </h1>

    <div className="space-y-4">
     {articles?.map(article => (
      <Link
       key={article.slug}
       href={`/blog/${article.slug}`}
       className="block "
      >
       <h2 className="text-md font-normal text-card-foreground transition-all duration-200 hover:underline hover:text-primary">
        {article.title}
       </h2>

       <p className="text-sm text-muted-foreground mt-1">
        - {new Date(article.created_at).toDateString()}
       </p>
      </Link>
     ))}
    </div>
   </div>
  </div>
 );
}
