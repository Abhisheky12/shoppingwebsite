import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { register, removeErrors, removeSuccess } from '../features/user/userSlice';



const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    // for Send image data to backend
    const [avatar, setAvatar] = useState("");
    // for Display image in the form
    const [avatarPreview, setAvatarpreview] = useState("./public/images/profile.jpeg");
    const { name, email, password } = user;

    const { success, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate=useNavigate();



    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarpreview(reader.result);
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    //function for submitting form
    const registerSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error("Please fill out thre required fields", { autoClose: 1000 })
            return;
        }
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", name);
        myForm.set("avatar", avatar);

        //dispatching register function
        dispatch(register(myForm));

    }

    //error message
    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-center", autoClose: 1000 });
            dispatch(removeErrors());
        }
    }, [dispatch, error])

    //success message 
    useEffect(() => {
        if (success) {
            toast.success("Registration Successful", { position: "top-center", autoClose: 1000 });
            dispatch(removeSuccess());
            navigate("/login")
        }
    }, [dispatch, success])




    return (
        <div className="mx-auto flex items-center justify-center min-h-screen p-4">

            {/* The card-like content area for the form */}
            <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg w-full max-w-md">

                {/* The form element itself */}
                <form className="space-y-6" onSubmit={registerSubmit} encType="multipart/form-data">

                    {/* Form Header */}
                    <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up</h2>

                    {/* Username Input */}
                    <div>
                        <input
                            type="text"
                            placeholder='Username'
                            name="name"
                            className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={name}
                            onChange={registerDataChange}
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <input
                            type="email"
                            placeholder='Email'
                            name="email"
                            className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={email}
                            onChange={registerDataChange}
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <input
                            type="password"
                            placeholder='Password'
                            name="password"
                            className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={password}
                            onChange={registerDataChange}
                        />
                    </div>

                    {/* Avatar Upload Section */}
                    <div className="flex items-center space-x-4">
                        {/* Avatar Preview Image */}
                        <img
                            src={avatarPreview}
                            alt="Avatar Preview"
                            className="w-16 h-16 rounded-full object-cover bg-gray-200"
                        />
                        {/* Custom-styled file input button */}
                        <label htmlFor="avatar-upload" className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Upload Photo
                        </label>
                        <input
                            id="avatar-upload"
                            type="file"
                            name="avatar"
                            className='sr-only'
                            accept='image/*'
                            onChange={registerDataChange}
                        />
                    </div>

                    {/* Form submission button */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading?"Creating... Account":"Create Account"}
                        </button>
                    </div>

                    {/* Link to Sign In page */}
                    <p className='text-sm text-center text-gray-600'>
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in here
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Register
