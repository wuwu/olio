import React from "react";
import ImageSlide from "./ImageSlide"

type Image = {
  index: number,
  url: string,
  alt: string,
  title: string,
  headline?: string
}

const ImageSlider = () => {

  const slide: Image = {
    url: "/_MG_9471.jpg",
    index: 1,
    alt: "test",
    title: "title for img 1"
  }

  return (
    <div className="carousel w-full">
      <ImageSlide image={slide} />
    </div>
  )
}

export default ImageSlider
