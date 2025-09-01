import { useForm } from "react-hook-form"; // package: npm install react-hook-form
import { Link, useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext.js";
import ErroAlert from "../components/ErroAlert";
import { useState } from "react";

const Login = () => {
  const {register, handleSubmit, formState: { errors },} = useForm(); // react-hook-form
  const navigate = useNavigate();
  const { errorMsg, loginUser } = useAuthContext(); // useContext(AuthContext)
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
	console.log(data); // ---
    setLoading(true);
    try {
      await loginUser(data);
      navigate("/dashboard");
    } catch (error) {
      console.log("Login Failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          {errorMsg && <ErroAlert error={errorMsg} />}
          <h2 className="card-title text-2xl font-bold">Sign in</h2>
          <p className="text-base-content/70">
            Enter your email and password to access your account
          </p>

          <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}> {/* login form */}
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (<span className="label-text-alt text-error">{errors.email.message}</span>)}              
            </div>

            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (<span className="label-text-alt text-error">{errors.password.message}</span>)}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-base-content/70">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="link link-primary">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// http://localhost:5173/login

/*
after login with email and password getting error:
useAuth.js:22  GET https://drf-phimart.vercel.app/api/auth/users/me/ 403 (Forbidden)
dispatchXhrRequest @ axios.js?v=8ea3b65f:1672
xhr @ axios.js?v=8ea3b65f:1552
dispatchRequest @ axios.js?v=8ea3b65f:2027
_request @ axios.js?v=8ea3b65f:2248
request @ axios.js?v=8ea3b65f:2139
Axios.<computed> @ axios.js?v=8ea3b65f:2267
wrap @ axios.js?v=8ea3b65f:8
fetchUserProfile @ useAuth.js:22
loginUser @ useAuth.js:39
await in loginUser
onSubmit @ Login.jsx:33
(anonymous) @ react-hook-form.js?v=8ea3b65f:1506
await in (anonymous)
callCallback2 @ chunk-NXESFFTV.js?v=8ea3b65f:3680
invokeGuardedCallbackDev @ chunk-NXESFFTV.js?v=8ea3b65f:3705
invokeGuardedCallback @ chunk-NXESFFTV.js?v=8ea3b65f:3739
invokeGuardedCallbackAndCatchFirstError @ chunk-NXESFFTV.js?v=8ea3b65f:3742
executeDispatch @ chunk-NXESFFTV.js?v=8ea3b65f:7046
processDispatchQueueItemsInOrder @ chunk-NXESFFTV.js?v=8ea3b65f:7066
processDispatchQueue @ chunk-NXESFFTV.js?v=8ea3b65f:7075
dispatchEventsForPlugins @ chunk-NXESFFTV.js?v=8ea3b65f:7083
(anonymous) @ chunk-NXESFFTV.js?v=8ea3b65f:7206
batchedUpdates$1 @ chunk-NXESFFTV.js?v=8ea3b65f:18966
batchedUpdates @ chunk-NXESFFTV.js?v=8ea3b65f:3585
dispatchEventForPluginEventSystem @ chunk-NXESFFTV.js?v=8ea3b65f:7205
dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay @ chunk-NXESFFTV.js?v=8ea3b65f:5484
dispatchEvent @ chunk-NXESFFTV.js?v=8ea3b65f:5478
dispatchDiscreteEvent @ chunk-NXESFFTV.js?v=8ea3b65f:5455Understand this error
useAuth.js:25 Error Fetching user AxiosError {message: 'Request failed with status code 403', name: 'AxiosError', code: 'ERR_BAD_REQUEST', config: {…}, request: XMLHttpRequest, …}


however after page refresh the error is gone.
*/