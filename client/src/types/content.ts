export interface Diary {
  id: string;
  slug: string;
  title: string;
  date: string;
  tags: string[];
  mood?: string;
  imageUrl: string;
  content: string;
}

export interface Photo {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

