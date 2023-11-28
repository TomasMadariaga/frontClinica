import React, { useState, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

function Slider() {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/articles")
      .then((response) => setArticles(response.data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? articles.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === articles.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="mx-auto mx-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
      <h2 className="text-center font-bold text-slate-850 text-teal-600 bg-gray-100 sm:text-5xl sm:leading-tight sm:tracking-tight">
        Clinica Online
      </h2>
      <div className="h-[500px] w-full max-w-screen-2xl mx-auto relative group pt-12">
        {articles.length > 0 && (
          <div
            style={{
              backgroundImage: `url(${articles[currentIndex].imageUrl})`,
              backgroundPosition: "center top",
            }}
            className="w-full h-full rounded-2xl bg-cover duration-500 relative"
          >
            {/* Contenido del artículo sobre la imagen */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
              <h3
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold rounded-md p-4"
                style={{
                  backdropFilter: "blur(7px) brightness(0.8)",
                }}
              >
                {articles[currentIndex].title}
              </h3>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl mt-24 font-semibold rounded-md p-4"
                style={{
                  backdropFilter: "blur(7px) brightness(0.8)",
                }}
              >
                {articles[currentIndex].content}
              </p>
            </div>
          </div>
        )}
        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-1/2 -translate-x-0 translate-y--1/2 left-3 text-lg rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={24} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-1/2 -translate-x-0 translate-y--1/2 right-3 text-lg rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={24} />
        </div>
        <div className="flex top-2 justify-center">
          {articles.map((article, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`text-lg cursor-pointer ${
                currentIndex === index ? "text-teal-600" : "text-gray-400"
              }`}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
