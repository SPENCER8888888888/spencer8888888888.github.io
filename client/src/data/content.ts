import type { Diary, Photo } from "@/types/content";
import contentData from "./content.json";

interface ContentData {
  diaries: Diary[];
  photos: Photo[];
}

const content = contentData as ContentData;

export const diaries: Diary[] = content.diaries;
export const photos: Photo[] = content.photos;

