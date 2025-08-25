import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import profile1 from "../assets/stroyimage.jpg";

const baseImages = [
  profile1,
  profile1,
  profile1,
  profile1,
];

// Extra images to prepend for seamless slider effect (last 2 images)
const images = [
  baseImages[baseImages.length - 2],
  baseImages[baseImages.length - 1],
  ...baseImages,
  baseImages[0],
  baseImages[1],
];

function SuccessStorySlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,       // Show 2 images at once
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,        // Enable auto sliding
    autoplaySpeed: 3000,   // Slide every 3 seconds
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-block-700">
        Success Story
      </h2>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="px-2">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{ width: "680px", height: "220px", objectFit: "cover" }}
              className="rounded-md shadow-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SuccessStorySlider;

