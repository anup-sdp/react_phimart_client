// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CarouselSlide from "./CarouselSlide";
import book from "../../../assets/images/book.png";
import fashion from "../../../assets/images/fashion.png";
import technology from "../../../assets/images/technology.png"; // if kept in public folder, wont have to write the .. .. s, eg. "/assets/images/technology.png" if public/assets

const HeroCarousel = () => {
  const slides = [
    {
      title: "This Fine Print Book Collections",
      subtitle: "Discount available. Grab it now!",
      image: book,
    },
    {
      title: "Exclusive Fashion Collections",
      subtitle: "A specialists label creating luxury essentials!",
      image: fashion,
    },
    {
      title: "Your Digital World, Connected.",
      subtitle: "Explore a range of devices for seamless living.",
      image: technology,
    },
  ];

  return (
    <>
      <Swiper
        autoplay={{delay: 3000,disableOnInteraction: false,}}
        pagination={{clickable: true,}}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <CarouselSlide
              title={slide.title}
              subtitle={slide.subtitle}
              image={slide.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeroCarousel;


/*
module 31.9:
carousel: srarch react awesome components: https://github.com/brillout/awesome-react-components
swiper (for carousel slider: react, vue, plain js): https://swiperjs.com/get-started
npm install swiper
https://swiperjs.com/demos#autoplay
*/