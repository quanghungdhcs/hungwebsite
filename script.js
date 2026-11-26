const galleryButtons = Array.from(document.querySelectorAll("[data-gallery-image]"));
const lightbox = document.querySelector("#gallery-lightbox");
const lightboxImage = lightbox.querySelector(".lightbox-image");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
const lightboxCounter = lightbox.querySelector(".lightbox-counter");
const closeButton = lightbox.querySelector(".lightbox-close");
const previousButton = lightbox.querySelector(".lightbox-previous");
const nextButton = lightbox.querySelector(".lightbox-next");
let activeImageIndex = 0;

function showImage(index) {
  activeImageIndex = (index + galleryButtons.length) % galleryButtons.length;

  const activeButton = galleryButtons[activeImageIndex];
  const image = activeButton.querySelector("img");
  const caption = activeButton.closest("figure").querySelector("figcaption");

  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = caption.textContent.trim();
  lightboxCounter.textContent = `${activeImageIndex + 1} / ${galleryButtons.length}`;
}

galleryButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    showImage(index);
    lightbox.showModal();
  });
});

closeButton.addEventListener("click", () => lightbox.close());
previousButton.addEventListener("click", () => showImage(activeImageIndex - 1));
nextButton.addEventListener("click", () => showImage(activeImageIndex + 1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    showImage(activeImageIndex - 1);
  } else if (event.key === "ArrowRight") {
    showImage(activeImageIndex + 1);
  } else if (event.key === "Escape") {
    event.preventDefault();
    lightbox.close();
  }
});
