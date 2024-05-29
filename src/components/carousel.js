import React, { useEffect, useRef, useState } from "react";

import "./carousel.css";

function Carousel({
  images = [],
  isLoading = false,
  imageLimit = images.length - 1,
  customPrevButton,
  customNextButton,
  imagePerSlide,
  onImgClick = () => {},
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const imgRef = useRef(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  console.log(imgRef.current?.offsetWidth);

  return (
    <>
      {isLoading && <p>Loading</p>}
      <div className="carousel" style={{ width: imagePerSlide * imageWidth }}>
        <div
          className="image-container"
          style={{ transform: `translateX(-${currentIndex * imageWidth}px)` }}
        >
          {images.map((image, index) => (
            <img
              onLoad={() => setImageWidth(imgRef.current?.offsetWidth)}
              ref={imgRef}
              key={image.id}
              src={image.thumbnail}
              alt={image.title}
              onClick={() => onImgClick(image, index)}
              className="image"
            />
          ))}
        </div>
        {customPrevButton instanceof Function ? (
          customPrevButton(handlePrev)
        ) : (
          <button className="btn prev" onClick={handlePrev}>
            PREV
          </button>
        )}

        {customNextButton instanceof Function ? (
          customNextButton(handleNext)
        ) : (
          <button className="btn next" onClick={handleNext}>
            NEXT
          </button>
        )}
      </div>
    </>
  );
}

export default Carousel;
