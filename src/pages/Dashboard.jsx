/*
import useAuthContext from "../hooks/useAuthContext.js";

const Dashboard = () => {
	const { user } = useAuthContext(); // useContext(AuthContext)
  return (
  <div>
	<h2 className="text-2xl text-blue-300">Welcome to dashboard</h2>
	<p className="text-md text-gray-500">welcome {`${user.email}`}</p>
  </div>);
};

export default Dashboard;
*/

import { FiPackage, FiShoppingCart, FiStar, FiUsers } from "react-icons/fi";
import StatCard from "../components/dashboard/StatCard";
import Order from "../components/dashboard/Order";

export default function Dashboard() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FiPackage} title="Total Products" value="245" />
        <StatCard icon={FiShoppingCart} title="Total Orders" value={128} />
        <StatCard icon={FiUsers} title="Total Users" value={573} />
        <StatCard icon={FiStar} title="Average Rating" value={4.8} />
      </div>

      <Order /> {/* Recent Orders */}
    </div>
  );
}