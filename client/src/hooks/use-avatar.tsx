"use client"

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "site_avatar_url";

export default function useAvatar(defaultUrl?: string) {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAvatarUrl(stored);
        return;
      }
    } catch (e) {
      // ignore
    }
    if (defaultUrl) setAvatarUrl(defaultUrl);
  }, [defaultUrl]);

  const save = useCallback((url?: string) => {
    try {
      if (!url) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, url);
      }
    } catch (e) {
      // ignore
    }
    setAvatarUrl(url);
  }, []);

  const uploadFile = useCallback((file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        save(result);
        resolve(result);
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }, [save]);

  return { avatarUrl, setAvatarUrl: save, uploadFile } as const;
}
