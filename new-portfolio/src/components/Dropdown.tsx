import { createSignal, For } from "solid-js";
import chevron from "../assets/chevron.svg";
import { useImageStore } from "../stores/useImageStore";

const Dropdown = ({
  text = "",
  images = [],
  url,
}: {
  text: string;
  images: string[];
  url?: string;
}) => {
  const [isActive, setIsActive] = createSignal(true); // Start open by default
  const { previewImage } = useImageStore();

  const toggleDropdown = () => {
    setIsActive(!isActive());
  };

  const handleImageClick = (image: string) => {
    previewImage(image, images); // Pass the entire image group for navigation
  };

  return (
    <div class="collapse bg-transparent">
      <input 
        type="checkbox" 
        checked={isActive()} 
        onChange={toggleDropdown}
        class="collapse-toggle"
      />
      <div class="collapse-title p-0">
        <button
          class={`dropdown-button ${isActive() ? "active" : ""}`}
          onClick={toggleDropdown}
        >
          <span class="dropdown-title">{text}</span>
          <div class="chevron">
            <img src={chevron} alt="chevron-arrow" />
          </div>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              class="link link-hover ml-8"
            >
              <span class="dropdown-title">Link to the project</span>
            </a>
          )}
        </button>
      </div>
      <div class="collapse-content p-0">
        <div class="carousel carousel-center w-full space-x-4 bg-transparent">
          <For each={images}>
            {(image, index) => (
              <div class="carousel-item">
                <img
                  onClick={() => handleImageClick(image)}
                  src={image}
                  alt={`image-${index()}`}
                  class="h-80 cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;