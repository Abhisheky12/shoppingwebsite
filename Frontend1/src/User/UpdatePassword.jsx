import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeErrors, removeSuccess, updatePassword } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Loader from '../components/loader';

const UpdatePassword = () => {



  const {success,loading,error}=useSelector((state=>state.user));
  const dispatch=useDispatch();
  const navigate=useNavigate();


  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldpassword", oldPassword);
    myForm.set("newpassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));

  }
   

   //handling erroro and success message 
    useEffect(() => {
      if (error) {
        toast.error(error, { autoClose: 1000 });
        dispatch(removeErrors());
      }
      if (success) {
        toast.success("Password updated successfully", { autoClose: 1000 });
        dispatch(removeSuccess());
        navigate("/profile");
      }
    }, [error, dispatch, success]);
  
  return (
    <div>
      <Navbar/>
      {
        loading?<Loader/>:(
          <div className="bg-gray-50 min-h-screen flex items-center justify-center font-sans">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">

          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-gray-800" style={{ color: '#4a235a' }}>
            Update Password
          </h2>

          {/* Form */}
          <form className="space-y-6" onSubmit={updatePasswordSubmit}>

            {/* Old Password Input */}
            <div className="relative">
              <input
                id="old-password"
                name="oldPassword"
                type="password"
                className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                placeholder="Old Password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>

            {/* New Password Input */}
            <div className="relative">
              <input
                id="new-password"
                name="newPassword"
                type="password"
                className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 font-semibold text-white rounded-lg transition-colors duration-300"
                style={{
                  backgroundColor: '#4a235a',
                  '--tw-ring-color': '#c084fc'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5b2c6f'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4a235a'}
              >
                Update Password
              </button>
            </div>

          </form>
        </div>
      </div>

        )
      }
    </div>
  )
}

export default UpdatePassword
