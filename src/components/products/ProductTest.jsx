// my custom try
// for shimmering effect, tailwind class "animate-pulse" used if loading, line 40
import { useEffect, useState } from "react";
import axios from 'axios';

const ProductTest = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const response = await axios.get("http://127.0.0.1:8000/api/products2/product-list/");
				setProducts(response.data);
				setError(null);
			} catch (err) {
				setError(err.message || "An error occurred while fetching products");
				setProducts([]);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	useEffect(()=>{
		console.log(products);
	}, [products])

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 py-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{[...Array(8)].map((_, i) => (
							<div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
								<div className="h-48 bg-gray-300 rounded-md mb-4"></div>
								<div className="h-6 bg-gray-300 rounded mb-3"></div>
								<div className="h-4 bg-gray-300 rounded mb-2"></div>
								<div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
								<div className="h-8 bg-gray-300 rounded"></div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 py-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
						<p>Error: {error}</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>
				
				{products.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-gray-500 text-lg">No products found.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{products.map((product) => (
							<div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
								{/* Product Image */}
								<div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center overflow-hidden">
									{product.images && product.images.length > 0 ? (
										<img
											src={product.images[0].image}
											alt={product.name}
											className="w-full h-full object-cover"
										/>
									) : (
										<div className="text-gray-400">
											<svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
											</svg>
										</div>
									)}
								</div>

								{/* Product Details */}
								<div className="p-6">
									<h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
										{product.name}
									</h3>
									
									<p className="text-gray-600 text-sm mb-4 line-clamp-3">
										{product.description}
									</p>

									<div className="flex items-center justify-between mb-4">
										<div className="flex flex-col">
											<span className="text-2xl font-bold text-gray-900">
												${product.price_with_tax}
											</span>
											<span className="text-sm text-gray-500 line-through">
												${product.price}
											</span>
										</div>
										
										<span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
											product.stock > 50 
												? 'bg-green-100 text-green-800' 
												: product.stock > 10 
												? 'bg-yellow-100 text-yellow-800'
												: 'bg-red-100 text-red-800'
										}`}>
											{product.stock} in stock
										</span>
									</div>

									<div className="flex space-x-3">
										<button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
											Add to Cart
										</button>
										<button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
											<svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
											</svg>
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductTest;