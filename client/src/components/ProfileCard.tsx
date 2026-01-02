"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Cake, Heart } from "lucide-react";
import profileAvatar from "@assets/generated_images/Anime_style_profile_avatar_4dd60992.png";
import useAvatar from "@/hooks/use-avatar";

export default function ProfileCard() {
  return (
    <Card className="overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-primary via-accent to-primary" />
      
      <CardHeader className="relative pb-4">
        <ProfileAvatar defaultUrl={profileAvatar} />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>台灣 Taiwan</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Cake className="w-4 h-4 text-primary" />
            <span>2005年3月15日</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Heart className="w-4 h-4 text-primary" />
            <span>閱讀、攝影、旅行</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-sm">關於我</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            一個喜歡用文字和照片記錄生活的學生。相信每一天都值得被紀念，每一個小確幸都值得被分享。
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-sm">興趣愛好</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full">📚 閱讀</Badge>
            <Badge variant="secondary" className="rounded-full">📷 攝影</Badge>
            <Badge variant="secondary" className="rounded-full">✈️ 旅行</Badge>
            <Badge variant="secondary" className="rounded-full">☕ 咖啡</Badge>
            <Badge variant="secondary" className="rounded-full">🎨 繪畫</Badge>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">24</div>
            <div className="text-xs text-muted-foreground">日記</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">156</div>
            <div className="text-xs text-muted-foreground">照片</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-xs text-muted-foreground">標籤</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProfileAvatar({ defaultUrl }: { defaultUrl?: string }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { avatarUrl, uploadFile, setAvatarUrl } = useAvatar(defaultUrl);

  return (
    <div className="flex flex-col items-center -mt-16">
      <div className="relative">
        <Avatar className="w-24 h-24 border-4 border-card shadow-xl">
          <AvatarImage src={avatarUrl ?? defaultUrl} alt="陳玄暐" />
          <AvatarFallback>陳玄暐</AvatarFallback>
        </Avatar>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            try {
              await uploadFile(file);
            } catch (err) {
              // ignore
            }
          }}
        />
      </div>

      <h2 className="text-2xl font-bold mt-4">陳玄暐</h2>
      <p className="text-muted-foreground">@陳玄暐</p>

      <div className="mt-2 flex gap-2 text-xs">
        <button
          className="underline text-sm"
          onClick={() => inputRef.current?.click()}
        >
          上傳頭像
        </button>
        <button
          className="underline text-sm"
          onClick={() => {
            const url = window.prompt("輸入圖片網址 (HTTPS)", "");
            if (url) setAvatarUrl(url);
          }}
        >
          使用網址
        </button>
        <button
          className="underline text-sm"
          onClick={() => setAvatarUrl(defaultUrl)}
        >
          還原
        </button>
      </div>
    </div>
  );
}
