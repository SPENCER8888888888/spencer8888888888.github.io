import { readdir, readFile, writeFile, stat } from "fs/promises";
import { resolve } from "path";
import yaml from "js-yaml";

interface ContentData {
  diaries: any[];
  photos: any[];
}

async function generateContent() {
  const contentPath = resolve(process.cwd(), "content");
  const outputPath = resolve(process.cwd(), "client", "src", "data", "content.json");
  const data: ContentData = {
    diaries: [],
    photos: [],
  };

  // Load diaries
  try {
    const diariesDir = resolve(contentPath, "diaries");
    const diaryFiles = await readdir(diariesDir);
    for (const file of diaryFiles) {
      if (file.endsWith(".yaml") || file.endsWith(".yml")) {
        const filePath = resolve(diariesDir, file);
        const fileStat = await stat(filePath);
        if (fileStat.isFile()) {
          const content = await readFile(filePath, "utf-8");
          const diary = yaml.load(content) as any;
          const slug = file.replace(/\.(yaml|yml)$/, "");
          diary.slug = slug;
          // Validate image URL
          if (diary.imageUrl && !diary.imageUrl.startsWith("/attached_assets/")) {
            console.warn(`Warning: Diary "${diary.title}" imageUrl should start with "/attached_assets/": ${diary.imageUrl}`);
          }
          data.diaries.push(diary);
        }
      }
    }
    // Sort by date descending
    data.diaries.sort((a, b) => {
      try {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      } catch {
        return 0;
      }
    });
  } catch (error) {
    console.warn("Failed to load diaries:", error);
  }

  // Load photos
  try {
    const photosPath = resolve(contentPath, "photos", "photos.yaml");
    const photosContent = await readFile(photosPath, "utf-8");
    const photosData = yaml.load(photosContent) as any;
    if (photosData.photos && Array.isArray(photosData.photos)) {
      data.photos = photosData.photos.map((photo: any, index: number) => ({
        id: String(index + 1),
        ...photo,
      }));
      // Validate photo URLs
      data.photos.forEach((photo: any) => {
        if (photo.url && !photo.url.startsWith("/attached_assets/")) {
          console.warn(`Warning: Photo "${photo.alt}" url should start with "/attached_assets/": ${photo.url}`);
        }
      });
    }
  } catch (error) {
    console.warn("Failed to load photos:", error);
  }

  // Write to JSON file
  await writeFile(outputPath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Content generated successfully: ${outputPath}`);
  console.log(`  - Diaries: ${data.diaries.length}`);
  console.log(`  - Photos: ${data.photos.length}`);
}

generateContent().catch(console.error);

