import DiaryCard from '../DiaryCard'

export default function DiaryCardExample() {
  const mockDiary = {
    id: "1",
    slug: "充實的讀書日",
    title: "充實的讀書日",
    date: "2025-11-05",
    tags: ["學習", "日常"],
    mood: "😊",
    imageUrl: "/attached_assets/generated_images/Study_desk_daily_life_8c144379.png",
    content: "今天在圖書館度過了一整天，準備期末考試。雖然很累，但看著筆記本上滿滿的重點，覺得很有成就感。"
  };

  return (
    <div className="max-w-sm">
      <DiaryCard diary={mockDiary} />
    </div>
  )
}
