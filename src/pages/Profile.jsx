import { useForm } from "react-hook-form";
import ProfileForm from "../components/dashboard/profile/ProfileForm";
import { useEffect, useState } from "react";
import ProfileButtons from "../components/dashboard/profile/ProfileButtons";
import PasswordChangeForm from "../components/dashboard/profile/PasswordChangeForm";
import useAuthContext from "../hooks/useAuthContext";
import ErroAlert from "../components/ErroAlert";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const { user, updateUserProfile, changePassword, errorMsg } = useAuthContext();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    Object.keys(user).forEach((key) => setValue(key, user[key]));
  }, [user, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    setSuccessMsg("");
    
    try {
      // Profile update - filter out unchanged fields
      const profilePayload = {};
      
      // Only include fields that might have changed
      if (data.first_name !== undefined) profilePayload.first_name = data.first_name;
      if (data.last_name !== undefined) profilePayload.last_name = data.last_name;
      if (data.address !== undefined) profilePayload.address = data.address;
      if (data.phone_number !== undefined) profilePayload.phone_number = data.phone_number;
      
      console.log("Profile payload to send:", profilePayload);

      const profileResult = await updateUserProfile(profilePayload);
      if (profileResult && !profileResult.success) {
        return; // Stop if profile update failed
      }

      // Password Change - only if password fields are filled
      if (data.current_password && data.new_password) {
        const passwordResult = await changePassword({
          current_password: data.current_password,
          new_password: data.new_password,
        });
        
        if (passwordResult && !passwordResult.success) {
          return; // Stop if password change failed
        }
        
        setSuccessMsg("Profile and password updated successfully!");
      } else {
        setSuccessMsg("Profile updated successfully!");
      }
      
      setIsEditing(false); // Exit edit mode on success
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
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
        
        <h2 className="card-title text-2xl mb-4">Profile Information</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ProfileForm
            register={register}
            errors={errors}
            isEditing={isEditing}
          />

          <PasswordChangeForm
            errors={errors}
            register={register}
            isEditing={isEditing}
            watch={watch}
          />

          <ProfileButtons
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;