import { BrowserRouter, Route, Routes } from "react-router";
import About from "../pages/About";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
//import Products from "../pages/Products";
import ProductTest from "../components/products/ProductTest.jsx"; // my try
import { AuthProvider } from "../context/AuthContext.jsx";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard  from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import ActivateAccount from "../components/registration/ActivateAccount";

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
						<Route path="register" element={<Register />} />
						<Route path="activate/:uid/:token" element={<ActivateAccount />} />  
						{/* url values in react-router, from eg. http://localhost:5173/activate/OQ/cmewh1-009c16c67f002127368d56c1b99a831b */}
						<Route
							path="dashboard"
							element={
								<PrivateRoute>
									<Dashboard />
								</PrivateRoute>
							}
						/>
						
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