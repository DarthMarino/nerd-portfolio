import { createSignal } from "solid-js";

// Global store for image preview state with navigation
const [currentImageSrc, setCurrentImageSrc] = createSignal<string | null>(null);
const [imageGroup, setImageGroup] = createSignal<string[]>([]);
const [currentIndex, setCurrentIndex] = createSignal<number>(0);

export const useImageStore = () => {
  const previewImage = (src: string, group: string[] = []) => {
    const index = group.findIndex(img => img === src);
    setCurrentImageSrc(src);
    setImageGroup(group);
    setCurrentIndex(index >= 0 ? index : 0);
  };

  const nextImage = () => {
    const group = imageGroup();
    const index = currentIndex();
    if (group.length > 0) {
      const nextIndex = (index + 1) % group.length;
      setCurrentIndex(nextIndex);
      setCurrentImageSrc(group[nextIndex]);
    }
  };

  const prevImage = () => {
    const group = imageGroup();
    const index = currentIndex();
    if (group.length > 0) {
      const prevIndex = (index - 1 + group.length) % group.length;
      setCurrentIndex(prevIndex);
      setCurrentImageSrc(group[prevIndex]);
    }
  };

  const closePreview = () => {
    setCurrentImageSrc(null);
    setImageGroup([]);
    setCurrentIndex(0);
  };

  return {
    imageSrc: currentImageSrc,
    imageGroup,
    currentIndex,
    previewImage,
    nextImage,
    prevImage,
    closePreview
  };
};