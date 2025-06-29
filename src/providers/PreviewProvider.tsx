import { createEffect, onCleanup, type Component, type JSX } from "solid-js";
import { useImageStore } from "../stores/useImageStore";

export const ImagePreviewProvider: Component<{ children: JSX.Element }> = (props) => {
  const { imageSrc, imageGroup, currentIndex, nextImage, prevImage, closePreview } = useImageStore();

  // Handle keyboard navigation
  const handleKeyPress = (e: KeyboardEvent) => {
    if (!imageSrc()) return;
    
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        prevImage();
        break;
      case "ArrowRight":
        e.preventDefault();
        nextImage();
        break;
      case "Escape":
        e.preventDefault();
        closePreview();
        break;
    }
  };

  // Add/remove event listeners and body scroll lock
  createEffect(() => {
    if (imageSrc()) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyPress);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyPress);
    }
  });

  onCleanup(() => {
    document.body.style.overflow = "auto";
    document.removeEventListener("keydown", handleKeyPress);
  });

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePreview();
    }
  };

  return (
    <>
      {props.children}
      {imageSrc() && (
        <div
          onClick={handleOverlayClick}
          class="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000] overflow-hidden"
        >
          {/* Close Button */}
          <button 
            onClick={closePreview}
            class="close-button"
          >
            ×
          </button>

          {/* Navigation Buttons */}
          {imageGroup().length > 1 && (
            <>
              <button
                onClick={prevImage}
                class="fixed left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white border-none p-3 cursor-pointer rounded-full text-2xl z-[1002] hover:bg-black/70 transition-all"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                class="fixed right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white border-none p-3 cursor-pointer rounded-full text-2xl z-[1002] hover:bg-black/70 transition-all"
              >
                ›
              </button>
            </>
          )}

          {/* Image Counter */}
          {imageGroup().length > 1 && (
            <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm z-[1002]">
              {currentIndex() + 1} / {imageGroup().length}
            </div>
          )}

          {/* Main Image */}
          <img
            src={imageSrc()!}
            alt="Preview"
            class="max-w-[90%] max-h-[90%] border-4 border-white shadow-2xl rounded-lg z-[1001] object-contain"
          />
        </div>
      )}
    </>
  );
};