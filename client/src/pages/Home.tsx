import HeroSection from "@/components/HeroSection";
import DiaryCard from "@/components/DiaryCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { diaries } from "@/data/content";

export default function Home() {
  const recentDiaries = diaries.slice(0, 3);

  return (
    <div className="space-y-12">
      <HeroSection />

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">最新日記</h2>
            <p className="text-muted-foreground mt-2">記錄生活中的點點滴滴</p>
          </div>
          <Link href="/diary">
            <Button variant="ghost" className="gap-2" data-testid="link-all-diary">
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentDiaries.map((diary) => (
            <DiaryCard key={diary.id} diary={diary} />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">歡迎來到我的小天地</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          這裡記錄著我的日常生活、學習心得和旅行見聞。希望通過這些文字和照片，能和大家分享生活中的美好時刻。
        </p>
        <Link href="/about">
          <Button variant="default" size="lg" className="mt-4" data-testid="button-learn-more">
            了解更多關於我
          </Button>
        </Link>
      </section>
    </div>
  );
}
