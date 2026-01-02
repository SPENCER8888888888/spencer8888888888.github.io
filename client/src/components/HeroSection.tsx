"use client";

import { useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Star, BookOpen, Image as ImageIcon } from "lucide-react";
import { Link } from "wouter";
import profileAvatar from "@assets/generated_images/Anime_style_profile_avatar_4dd60992.png";
import heroBg from "@assets/generated_images/Anime_hero_background_gradient_0f6ff2e1.png";
import useAvatar from "@/hooks/use-avatar";

function AvatarUploader({ defaultUrl }: { defaultUrl?: string }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { avatarUrl, uploadFile, setAvatarUrl } = useAvatar(defaultUrl);

  return (
    <div className="flex flex-col items-center mb-6">
      <div
        className="cursor-pointer"
        onClick={() => inputRef.current?.click()}
        title="點擊更換頭像"
      >
        <Avatar className="w-32 h-32 border-4 border-white shadow-xl mb-2">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt="個人頭像" />
          ) : (
            <AvatarImage src={defaultUrl} alt="個人頭像" />
          )}
          <AvatarFallback>陳玄暐</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex gap-2">
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

        <button
          className="text-sm underline text-white/90 hover:text-white"
          onClick={() => {
            const url = window.prompt("輸入圖片網址 (HTTPS)", "");
            if (url) setAvatarUrl(url);
          }}
        >
          使用網址
        </button>

        <button
          className="text-sm underline text-white/90 hover:text-white"
          onClick={() => setAvatarUrl(defaultUrl)}
        >
          還原預設
        </button>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>

      <div className="absolute top-8 left-8 animate-pulse">
        <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
      </div>
      <div className="absolute top-16 right-16 animate-pulse" style={{ animationDelay: '0.5s' }}>
        <Sparkles className="w-8 h-8 text-pink-300" />
      </div>
      <div className="absolute bottom-12 left-12 animate-pulse" style={{ animationDelay: '1s' }}>
        <Heart className="w-5 h-5 text-red-300 fill-red-300" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4 text-white">
        <AvatarUploader defaultUrl={profileAvatar} />

        <h1 className="text-5xl font-bold mb-4 text-center drop-shadow-lg">
          嗨！我是陳玄暐
        </h1>
        <p className="text-xl mb-8 text-center max-w-2xl drop-shadow-md text-white/95">
          一個熱愛生活、喜歡記錄日常的學生 ✨
        </p>

        <div className="flex gap-4">
          <Link href="/diary">
            <Button
              variant="outline"
              size="lg"
              className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30"
              data-testid="button-view-diary"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              查看日記
            </Button>
          </Link>

          <Link href="/gallery">
            <Button
              variant="outline"
              size="lg"
              className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30"
              data-testid="button-view-gallery"
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              生活相簿
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

