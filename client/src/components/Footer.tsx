import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>by 陳玄暐</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © 2025 我的日常部落格. 記錄生活中的每一個美好瞬間
          </p>
        </div>
      </div>
    </footer>
  );
}
