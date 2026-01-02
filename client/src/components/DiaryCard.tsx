import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart } from "lucide-react";
import { Link } from "wouter";

import type { Diary } from "@/types/content";

interface DiaryCardProps {
  diary: Diary;
}

export default function DiaryCard({ diary }: DiaryCardProps) {
  const { id, slug, title, date, tags, mood, imageUrl, content } = diary;
  const excerpt = content.substring(0, 150) + "...";
  
  return (
    <Link href={`/diary/${slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 h-full flex flex-col" data-testid={`card-diary-${id}`}>
        <div className="aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <CardHeader className="space-y-2 flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
            {mood && (
              <>
                <span className="text-muted-foreground/50">•</span>
                <span>{mood}</span>
              </>
            )}
          </div>
          <h3 className="text-xl font-semibold line-clamp-2">{title}</h3>
          <p className="text-muted-foreground line-clamp-3 leading-relaxed">{excerpt}</p>
        </CardHeader>

        <CardFooter className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full" data-testid={`badge-tag-${tag}`}>
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
