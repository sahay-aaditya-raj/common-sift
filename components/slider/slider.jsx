/* eslint-disable @next/next/no-img-element */
import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.css'

export default function CusSlider() {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
  };

  async function getCovers() {
    const res = await fetch('/api/cover');
    const data = await res.json();
    if (res.status == 200) {
      setSlides(data.data);
    setIsLoading(false);
    } else {
      console.log(data.message);
    }
  }

  useEffect(() => {
    getCovers();
  }, []);

  if (isLoading) {
    return <div className='loader'></div>; // You can replace this with a spinner or other loading indicator
  }

  return (
    <div className="max-w-screen-xl mb-3">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide._id} className="relative">
            <img
              src={`/api/coverImage?id=${slide._id}`}
              alt={slide.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-6 bg-gradient-to-r from-black/80 to-transparent text-white">
              <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
              <p className="text-lg mb-4">{slide.description}</p>
              <a
                href={slide.link}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded"
              >
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
