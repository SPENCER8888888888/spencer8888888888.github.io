import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Heart } from "lucide-react";
import { diaries } from "@/data/content";
import MarkdownContent from "@/components/MarkdownContent";

export default function DiaryDetail() {
  const [, params] = useRoute("/diary/:slug");
  const slug = params?.slug;

  const diary = diaries.find((d) => d.slug === slug);

  if (!diary) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">找不到這篇日記</p>
        <Link href="/diary">
          <Button variant="outline" className="mt-4" data-testid="button-back-diary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回日記列表
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/diary">
        <Button variant="ghost" className="gap-2" data-testid="button-back">
          <ArrowLeft className="w-4 h-4" />
          返回日記
        </Button>
      </Link>

      <article className="space-y-6">
        <div className="aspect-video overflow-hidden rounded-2xl">
          <img
            src={diary.imageUrl}
            alt={diary.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{diary.title}</h1>

          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{diary.date}</span>
            </div>
            {diary.mood && (
              <>
                <span>•</span>
                <span className="text-2xl">{diary.mood}</span>
              </>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {diary.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <MarkdownContent content={diary.content} />
        </div>

        <div className="flex items-center justify-center gap-2 pt-8 border-t border-border">
          <Heart className="w-5 h-5 text-primary" />
          <span className="text-muted-foreground">感謝閱讀</span>
        </div>
      </article>
    </div>
  );
}
