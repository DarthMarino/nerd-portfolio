import React, { useRef, useEffect, MouseEventHandler } from "react";
import { useImageStore } from "../stores/useImageStore";

export const ImagePreviewProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { imageSrc, closePreview } = useImageStore((state) => ({
    imageSrc: state.imageSrc,
    closePreview: state.closePreview,
  }));

  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const clickingOverlay: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget === overlayRef.current && imageRef.current) {
      const { top, left, width, height } =
        imageRef.current.getBoundingClientRect();
      const { clientX, clientY } = e;
      if (
        clientX < left ||
        clientX > left + width ||
        clientY < top ||
        clientY > top + height
      ) {
        closePreview();
      }
    }
  };

  useEffect(() => {
    if (imageSrc) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [imageSrc]);

  return (
    <>
      {children}
      {imageSrc && (
        <div
          ref={overlayRef}
          onClick={clickingOverlay}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          <button className="close-button" onClick={closePreview}>
            ×
          </button>
          <img
            ref={imageRef}
            src={imageSrc}
            alt="Preview"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              border: "5px solid white",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.8)",
              borderRadius: "10px",
            }}
          />
        </div>
      )}
    </>
  );
};
