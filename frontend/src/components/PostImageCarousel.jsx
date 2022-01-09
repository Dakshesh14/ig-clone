import React, { memo } from "react";

export default memo(function PostImageCarousel({ images, slug }) {
  const handleDoubleClick = () => {
    console.log("has been clicked twice");
  };

  return (
    <div
      id={"carousel" + slug}
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="false"
      onDoubleClick={handleDoubleClick}
    >
      <div className="carousel-inner">
        {images.map(({ id, image }, index) => (
          <div
            key={id}
            className={"carousel-item" + (index === 0 ? " active" : "")}
          >
            <img src={image} className="d-block w-100" alt="can't load image" />
          </div>
        ))}
      </div>
      {images.length > 1 ? (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={"#carousel" + slug}
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={"#carousel" + slug}
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </>
      ) : null}
    </div>
  );
});
