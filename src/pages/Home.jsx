import HeroCarousel from "../components/home/carousel/HeroCarousel";
import Features from "../components/home/Features";
import Product from "../components/products/Product";
import Category from "../components/home/categories/Category";
import DiscountSection from "../components/home/discount/DiscountSection";

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <Features />
	  <Category />
	  <Product />
	  <DiscountSection/>
    </div>
  );
};

export default Home;