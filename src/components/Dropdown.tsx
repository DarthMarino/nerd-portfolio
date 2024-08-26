import { useState, useRef } from "react";
import chevron from "../assets/chevron.svg";
import "../pages/style.css";
import { useImageStore } from "../stores/useImageStore";

const Dropdown = ({
  text = "",
  images,
  url,
}: {
  text: string;
  images: string[];
  url?: string;
}) => {
  const [isActive, setIsActive] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { previewImage } = useImageStore();

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <button
        className={`dropdown-button ${isActive ? "active" : ""}`}
        onClick={toggleDropdown}
      >
        <span className="dropdown-title">{text}</span>
        <div className="chevron">
          <img src={chevron} alt="chevron-arrow" height="38px" />
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none", marginLeft: "2rem" }}
          >
            <span className="dropdown-title">Link to the project</span>
          </a>
        )}
      </button>
      <div className={`dropdown-container ${isActive ? "expanded" : ""}`}>
        <div className="carousel-container">
          <div className="carousel" ref={carouselRef}>
            {images.map((image, index) => (
              <img
                onClick={() => previewImage(image)}
                key={image}
                src={image}
                alt={`image-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
