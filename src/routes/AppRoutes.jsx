import { BrowserRouter, Route, Routes } from "react-router";
import About from "../pages/About";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
//import Products from "../pages/Products";
import ProductTest from "../components/products/ProductTest.jsx"; // my try
import ProductDetail from "../pages/ProductDetail"; // details of a product
import { AuthProvider } from "../context/AuthContext.jsx";
import { CartProvider } from "../context/CartContext.jsx";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard  from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import ActivateAccount from "../components/registration/ActivateAccount";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import PaymentSuccess from "../pages/PaymentSuccess";
import AddProduct from "../pages/AddProduct";


const AppRoutes = () => {
	return (
		<AuthProvider>
			<CartProvider>
				<BrowserRouter>
					<Routes>
						{/* public routes */}	
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
							<Route path="password/reset/confirm/:uid/:token" element={<ResetPassword />} />
							{/* url values from email link, eg. http://localhost:5173/password/reset/confirm/OQ/cmewh1-009c16c67f002127368d56c1b99a831b */}
							<Route path="shop/:productId" element={<ProductDetail />} />
						</Route>

						{/* Private Routes  */}
						<Route
							path="dashboard"
							element={
								<PrivateRoute>
									<DashboardLayout />
								</PrivateRoute>
							}
						>
							<Route index element={<Dashboard />} />   {/* http://localhost:5173/dashboard */}
							<Route path="profile" element={<Profile />} />    {/* http://localhost:5173/dashboard/profile */}
							<Route path="cart" element={<Cart />} />
							<Route path="orders" element={<Orders />} />
							<Route path="payment/success/" element={<PaymentSuccess />} />
							<Route path="products/add" element={<AddProduct />} />
						</Route>

					</Routes>		
				</BrowserRouter>
			</CartProvider>
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