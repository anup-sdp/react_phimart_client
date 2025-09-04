import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext.js";
import ErroAlert from "../components/ErroAlert";
import { useState } from "react";
import apiClient from "../services/api-client";

const Login = () => {
  const {register, handleSubmit, formState: { errors },} = useForm();
  const navigate = useNavigate();
  const { errorMsg, loginUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [localErrorMsg, setLocalErrorMsg] = useState("");

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    setLocalErrorMsg("");
    setSuccessMsg("");
    try {
      await loginUser(data);
      navigate("/dashboard");
    } catch (error) {
      console.log("Login Failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendActivation = async () => {
    const email = document.getElementById('email').value;
    if (!email) {
      setLocalErrorMsg("Please enter your email address first");
      return;
    }

    setResendLoading(true);
    setLocalErrorMsg("");
    setSuccessMsg("");
    
    try {
      await apiClient.post("/auth/users/resend_activation/", { email });
      setSuccessMsg("If your account needs activation, an email has been sent to your inbox.");
    } catch (error) {
      if (error.response?.data?.email) {
        setLocalErrorMsg(error.response.data.email[0]);
      } else {
        setLocalErrorMsg("Failed to send activation email. Please try again.");
      }
    } finally {
      setResendLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const email = document.getElementById('email').value;
    if (!email) {
      setLocalErrorMsg("Please enter your email address first");
      return;
    }

    setResetLoading(true);
    setLocalErrorMsg("");
    setSuccessMsg("");
    
    try {
      await apiClient.post("/auth/users/reset_password/", { email });
      setSuccessMsg("Password reset email sent successfully! Check your inbox.");
    } catch (error) {
      if (error.response?.data?.email) {
        setLocalErrorMsg(error.response.data.email[0]);
      } else {
        setLocalErrorMsg("Failed to send password reset email. Please try again.");
      }
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          {(errorMsg || localErrorMsg) && <ErroAlert error={errorMsg || localErrorMsg} />}
          {successMsg && (
            <div className="alert alert-success mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}
          
          <h2 className="card-title text-2xl font-bold">Sign in</h2>
          <p className="text-base-content/70">
            Enter your email and password to access your account
          </p>

          <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
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
                className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
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
		  <hr className="border-gray-300 my-4" />

          <div className="text-center mt-4 space-y-2">
            <p className="text-base-content/70">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="link link-primary">Sign up</Link>
            </p>
            
            <p className="text-base-content/70">
              Need account activation?{" "}
              <button
                type="button"
                onClick={handleResendActivation}
                className="link link-primary"
                disabled={resendLoading}
              >
                {resendLoading ? "Sending..." : "Resend activation email"}
              </button>
            </p>
            
            <p className="text-base-content/70">
              Forgot your password?{" "}
              <button
                type="button"
                onClick={handleResetPassword}
                className="link link-primary"
                disabled={resetLoading}
              >
                {resetLoading ? "Sending..." : "Reset password"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// http://localhost:5173/login

// react-hook-form example also in react-intro app

/*
Link
useNavigate
*/