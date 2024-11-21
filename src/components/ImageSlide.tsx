import React from "react";

type ImageProps = {
  image: Image;
};

type Image = {
  index: number;
  url: string;
  alt: string;
  title: string;
  headline?: string;
};

const ImageSlide: React.FC<ImageProps> = ({ image }) => {
  const {index, url, alt} = image;
  return (
    <div className="carousel w-full">
      <div id={`slide${index}`} className="carousel-item relative w-full">
        <img src={url} alt={alt} className="w-full" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  );
};

export default ImageSlide
