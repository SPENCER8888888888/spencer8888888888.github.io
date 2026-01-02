# 內容管理說明

本專案使用 YAML 檔案來管理日記和相簿內容。

## 資料夾結構

```
content/
  diaries/        # 日記資料夾
    *.yaml        # 每個 YAML 檔案對應一篇日記
  photos/         # 相簿資料夾
    photos.yaml   # 單一 YAML 檔案包含所有照片的相對路徑
```

## 日記格式

在 `content/diaries/` 資料夾中，每個 YAML 檔案對應一篇日記。檔案名稱（不含副檔名）會自動成為該日記的 URL slug。

### YAML 檔案範例

```yaml
id: "1"
title: "充實的讀書日"
date: "2025-11-05"
tags:
  - "學習"
  - "日常"
mood: "😊"
imageUrl: "/attached_assets/generated_images/Study_desk_daily_life_8c144379.png"
content: |
  # 日記標題

  這是日記內容，可以使用 Markdown 語法撰寫。

  ## 重點整理

  - 重點一
  - 重點二

  ### 詳細說明

  這裡可以寫更詳細的內容...
```

### 欄位說明

- `id`: 日記的唯一識別碼（字串）
- `title`: 日記標題
- `date`: 發布日期（格式：YYYY-MM-DD）
- `tags`: 標籤列表（陣列）
- `mood`: 心情符號（可選）
- `imageUrl`: 封面圖片 URL（必須以 `/attached_assets/` 開頭）
- `content`: 日記內容（支援 Markdown 語法）

### 重要注意事項

1. **檔案名稱 = URL slug**：YAML 檔案的名稱（不含 `.yaml` 或 `.yml`）會自動成為該日記的 URL slug。例如：`充實的讀書日.yaml` 的 URL 會是 `/diary/充實的讀書日`。

2. **Markdown 支援**：`content` 欄位支援完整的 Markdown 語法，包括：
   - 標題（#、##、###）
   - 列表（有序和無序）
   - 程式碼區塊（```）
   - 粗體、斜體
   - 連結
   - 等等

3. **圖片路徑**：`imageUrl` 必須以 `/attached_assets/` 開頭，圖片檔案應放在 `client/public/attached_assets/` 資料夾中。

## 相簿格式

在 `content/photos/photos.yaml` 檔案中，定義所有照片的相對路徑。

### YAML 檔案範例

```yaml
photos:
  - url: "/attached_assets/generated_images/photo1.png"
    alt: "照片描述"
    caption: "照片標題"
  - url: "/attached_assets/generated_images/photo2.png"
    alt: "另一張照片"
    caption: "另一張照片的標題"
```

### 欄位說明

- `url`: 照片的相對路徑（必須以 `/attached_assets/` 開頭）
- `alt`: 照片的替代文字（用於無障礙）
- `caption`: 照片標題（可選）

### 重要注意事項

1. **圖片路徑**：所有照片的 `url` 必須以 `/attached_assets/` 開頭，圖片檔案應放在 `client/public/attached_assets/` 資料夾中。

2. **單一檔案**：所有照片資訊都放在 `content/photos/photos.yaml` 這一個檔案中。

## 生成內容

在開發或建置前，需要先執行內容生成腳本：

```bash
npm run content:generate
```

這個腳本會：
1. 讀取 `content/diaries/` 資料夾中的所有 YAML 檔案
2. 讀取 `content/photos/photos.yaml` 檔案
3. 為每個日記自動生成 `slug`（基於檔案名稱）
4. 驗證圖片 URL 是否正確
5. 將所有內容合併成一個 JSON 檔案（`client/src/data/content.json`）
6. 按日期排序日記（最新的在前）

## 開發流程

1. 在 `content/diaries/` 資料夾中新增或編輯 YAML 檔案
2. 在 `content/photos/photos.yaml` 中新增或編輯照片資訊
3. 執行 `npm run content:generate` 生成內容
4. 執行 `npm run dev` 啟動開發伺服器
5. 在瀏覽器中查看日記和相簿

## 建置流程

執行 `npm run build` 時會自動執行內容生成，無需手動執行。

