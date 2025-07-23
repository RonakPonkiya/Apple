// components/Carousel.jsx
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// List of local image paths
const imagePaths = [
  "/Carouselimg/Coffee 1.jpg",
  "/Carouselimg/Coffee 2.jpg",
  "/Carouselimg/Coffee 3.webp",
  "/Carouselimg/Coffee 4.jpg",
  "/Carouselimg/Coffee 4.webp",
  "/Carouselimg/Coffee 5.webp",
  "/Carouselimg/Coffee 6.webp",
  "/Carouselimg/Coffee 7.webp",
  "/Carouselimg/Coffee 8.webp",
  "/Carouselimg/Coffee.jpg",
];

const HeroCarousel = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={2000}
      className="rounded-lg overflow-hidden"
    >
      {imagePaths.map((src, index) => (
        <div key={index}>
          <img src={src} alt={`Coffee Slide ${index + 1}`} className="object-contain w-full" />
        </div>
      ))}
    </Carousel>
  );
};

export default HeroCarousel;
