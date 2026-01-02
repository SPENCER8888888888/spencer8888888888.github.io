import DiaryCard from "@/components/DiaryCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { diaries } from "@/data/content";

export default function Diary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allDiaries = diaries;

  const allTags = Array.from(new Set(allDiaries.flatMap((d) => d.tags)));

  const filteredDiaries = useMemo(() => {
    return allDiaries.filter((diary) => {
      const matchesSearch = diary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           diary.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = !selectedTag || diary.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [allDiaries, searchQuery, selectedTag]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold">我的日記</h1>
          <p className="text-muted-foreground mt-2">記錄生活中的每一個瞬間</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="搜尋日記..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-diary"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedTag === null ? "default" : "outline"}
            className="cursor-pointer rounded-full"
            onClick={() => setSelectedTag(null)}
            data-testid="badge-filter-all"
          >
            全部
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className="cursor-pointer rounded-full"
              onClick={() => setSelectedTag(tag)}
              data-testid={`badge-filter-${tag}`}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiaries.map((diary) => (
          <DiaryCard key={diary.id} diary={diary} />
        ))}
      </div>

      {filteredDiaries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">沒有找到相關的日記</p>
        </div>
      )}
    </div>
  );
}
