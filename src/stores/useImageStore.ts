import { create } from "zustand";

interface ImageStore {
  imageSrc: string | null;
  previewImage: (src: string) => void;
  closePreview: () => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  imageSrc: null,
  previewImage: (src) => set({ imageSrc: src }),
  closePreview: () => set({ imageSrc: null }),
}));
