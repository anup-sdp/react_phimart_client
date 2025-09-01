import axios from 'axios';
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import ErroAlert from "../ErroAlert";
import apiClient from "../../services/api-client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
	//axios.get("http://127.0.0.1:8000/api/products2/product-list/")
	//axios.get("https://drf-phimart.vercel.app/api//products2/product-list/")
	apiClient.get("/products2/product-list/")
	.then((res) => setProducts(res.data)) // if res.data.results --> undefined -> not catching error correctly
    .catch((err) => setError(err.message  || "An error occurred while fetching products"))
    .finally(() => setLoading(false));    
  }, []);

  return (
	<section className='bg-gray-50'>
		<div className="py-12 px-4 max-w-7xl mx-auto">
			<div className="flex justify-between items-center px-4 md:px-8 mb-4 bg-gray-50">
				<h2 className="text-3xl md:text-4xl font-bold">Trending Products</h2>
				<a href="#" className="btn btn-secondary px-4 py-3 rounded-full text-lg">View All</a>
			</div>
	
			{/* Spinner  */}
			{isLoading && (
				<div className="flex justify-center items-center py-10">
					<span className="loading loading-spinner loading-xl text-secondary"></span>
				</div>
			)}
	
			{/* error alert  */}
			{error && <ErroAlert error={error}/> }
		
			{/* Product Slider  */}
			{
				!isLoading && !error && products.length > 0 && (
					<Swiper
						modules={[Autoplay, Navigation]}
						autoplay={{delay: 2000, disableOnInteraction: false,}}
    				  spaceBetween={10}
    				  slidesPerView={1}
    				  breakpoints={{640: { slidesPerView: 2 },1024: { slidesPerView: 3 },}}
    				  navigation
    				  className="my-4 px-4 container"
    				>
    				  {products.map((product, index) => (
    				    <SwiperSlide key={product.id} className='p-3 flex justify-center'>
    				      <ProductItem
    				        product={product}
    				      />
    				    </SwiperSlide>
    				  ))}
    				</Swiper>
				)
			}
			{!isLoading && !error && products.length === 0 && (
    	    <p className="text-center text-gray-500 mt-6">No Products Available</p>
    	  )}				
		</div>
	</section>	
  );
};

export default Product;