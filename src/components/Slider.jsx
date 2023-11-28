import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

function Slider() {
  const slides = [
    {
      url: "https://blogs.iadb.org/salud/wp-content/uploads/sites/15/2020/08/SPH_Newsletters_Blogs_AUG10_GS-POST.png",
    },
    {
      url: "https://cdn.aarp.net/content/dam/aarp/health/conditions_treatments/2020/04/1140-emergency-room-esp.jpg",
    },
    {
      url: "https://intef.es/wp-content/uploads/2021/12/32_RED_RRSS_Día-Mundial-de-la-Salud.jpg",
    },

    {
      url: "https://blogs.iadb.org/salud/wp-content/uploads/sites/15/2020/05/SPH_Blog-04-18-2020_PP-POST_PP-POST_PP-POST-copia-2.png",
    },
    {
      url: "https://png.pngtree.com/background/20220726/original/pngtree-hospital-building-for-healthcare-cartoon-background-vector-illustration-with-picture-image_1806881.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="mx-auto mx-w-7xl bg-white px-4 pt-12 sm:px-6 lg:px-8">
      <h2 className="text-center font-bold text-slate-850 text-teal-600 bg-slate-50 sm:text-5xl sm:leading-tight sm:tracking-tight">
        Clinica Online
      </h2>
      {/*<div className="mx-auto mx-w-7xl bg-white px-4 pt-12 sm:px-6 lg:px-8">
        <h1 className="text-center font-bold">About us</h1>
        <p className="text-justify font-semibold mx-64">
          Bienvenidos a [Nombre del Hospital], donde su salud y bienestar son
          nuestras principales prioridades. En [Nombre del Hospital], hemos
          estado dedicados a proporcionar servicios de atención médica de alta
          calidad a nuestra comunidad durante [número de años] años.
        </p>
        <h1 className="text-center font-bold pt-4">Our mission</h1>
        <p className="text-center font-semibold mx-64">
          Es brindar atención médica compasiva y de vanguardia a nuestros
          pacientes, garantizando su comodidad y recuperación. Estamos
          comprometidos en promover una comunidad más saludable y feliz.
        </p>
  </div>*/}
      <div className="h-[780px] w-full m-auto py-16 px-4 relative group">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        ></div>
        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-1/2 -translate-x-0 translate-y--1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-1/2 -translate-x-0 translate-y--1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
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
