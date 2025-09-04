import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router";
import { useState } from "react";
import apiClient from "../services/api-client";
import ErroAlert from "../components/ErroAlert";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Watch the password field to validate confirmation
  const password = watch("new_password");

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await apiClient.post("/auth/users/reset_password_confirm/", {
        uid: uid,
        token: token,
        new_password: data.new_password
      });

      setSuccessMsg("Password reset successfully! You can now login with your new password.");
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error) {
      console.log("Password reset error:", error);
      
      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData.uid) {
          setErrorMsg("Invalid reset link. Please request a new password reset.");
        } else if (errorData.token) {
          setErrorMsg("Reset link has expired. Please request a new password reset.");
        } else if (errorData.new_password) {
          setErrorMsg(errorData.new_password.join(" "));
        } else {
          setErrorMsg("Password reset failed. Please try again or request a new reset link.");
        }
      } else {
        setErrorMsg("Password reset failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          {errorMsg && <ErroAlert error={errorMsg} />}
          {successMsg && (
            <div className="alert alert-success mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}
          
          <h2 className="card-title text-2xl font-bold">Reset Password</h2>
          <p className="text-base-content/70">
            Enter your new password below
          </p>

          {!successMsg && (
            <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label" htmlFor="new_password">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  id="new_password"
                  type="password"
                  placeholder="••••••••"
                  className={`input input-bordered w-full ${errors.new_password ? "input-error" : ""}`}
                  {...register("new_password", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  })}
                />
                {errors.new_password && (
                  <span className="label-text-alt text-error">
                    {errors.new_password.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label" htmlFor="confirm_password">
                  <span className="label-text">Confirm New Password</span>
                </label>
                <input
                  id="confirm_password"
                  type="password"
                  placeholder="••••••••"
                  className={`input input-bordered w-full ${errors.confirm_password ? "input-error" : ""}`}
                  {...register("confirm_password", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match"
                  })}
                />
                {errors.confirm_password && (
                  <span className="label-text-alt text-error">
                    {errors.confirm_password.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Resetting Password..." : "Reset Password"}
              </button>
            </form>
          )}

          <div className="text-center mt-4">
            <p className="text-base-content/70">
              Remember your password?{" "}
              <Link to="/login" className="link link-primary">
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;