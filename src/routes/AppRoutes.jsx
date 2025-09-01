import { BrowserRouter, Route, Routes } from "react-router";
import About from "../pages/About";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
//import Products from "../pages/Products";
import ProductTest from "../components/products/ProductTest.jsx"; // my try
import { AuthProvider } from "../context/AuthContext.jsx";
import Login from "../pages/Login";

const AppRoutes = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					{/* <Route index element={<Home />}></Route>
					<Route path="about" element={<About />} /> */}	
					<Route element={<MainLayout />}>
						<Route path="/" element={<Home />} />
						{/* <Route path="/" element={<ProductTest />} /> */}
						{/* <Route path="products" element={<Products />} /> */}
						<Route path="about" element={<About />} />
						<Route path="shop" element={<Shop />} />
						<Route path="login" element={<Login />} />
					</Route>
				</Routes>		
			</BrowserRouter>
		</AuthProvider>	
	);
};

export default AppRoutes;

/*
BrowserRouter
Routes
Route
*/

// https://drf-phimart.vercel.app/api/
// https://drf-phimart.vercel.app/swagger/