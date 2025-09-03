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