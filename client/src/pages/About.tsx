import ProfileCard from "@/components/ProfileCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Coffee, Camera, Book } from "lucide-react";

export default function About() {
  const interests = [
    {
      icon: Book,
      title: "閱讀",
      description: "喜歡各種類型的書籍，尤其是小說和散文。閱讀讓我能夠探索不同的世界和思想。",
    },
    {
      icon: Camera,
      title: "攝影",
      description: "熱愛用鏡頭記錄生活的美好瞬間。每一張照片都是一個故事，一段回憶。",
    },
    {
      icon: Coffee,
      title: "咖啡",
      description: "咖啡愛好者，喜歡探索不同的咖啡廳，品嚐各種風味的咖啡。",
    },
    {
      icon: Heart,
      title: "旅行",
      description: "相信旅行能開闊視野，每一次旅程都是成長的機會。期待探索更多的地方。",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">關於我</h1>
        <p className="text-muted-foreground mt-2">了解更多關於我的故事</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ProfileCard />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">我的故事</h2>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                嗨！我是陳玄暐，一個熱愛生活、喜歡記錄日常的學生。創建這個部落格的初衷，是希望能有一個地方記錄下生活中的點點滴滴，無論是學習的心得、旅行的見聞，還是日常的小確幸。
              </p>
              <p>
                我相信生活中的每一個瞬間都值得被紀念。一杯咖啡的香氣、一本好書的感動、一次旅行的回憶，這些看似平凡的事物，組成了我們豐富多彩的人生。
              </p>
              <p>
                通過這個部落格，我希望能和大家分享我的生活，也希望能夠記錄下自己的成長軌跡。如果我的文字和照片能給你帶來一點點的快樂或啟發，那就是我最大的幸福了。
              </p>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-semibold mb-4">我的興趣</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interests.map((interest) => {
                const Icon = interest.icon;
                return (
                  <Card key={interest.title} className="hover-elevate active-elevate-2">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">{interest.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {interest.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
