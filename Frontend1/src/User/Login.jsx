import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, removeErrors, removeSuccess } from '../features/user/userSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';



function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { success, loading, error, isAuthenticated } = useSelector((state) => state.user);


    const loginSubmit = (e) => {
        e.preventDefault();
        console.log('hello');
        dispatch(login({email:loginEmail,password:loginPassword}));

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
                toast.success("Login Successful", { position: "top-center", autoClose: 1000 });
                dispatch(removeSuccess());
             
            }
        }, [dispatch, success])
        //redirect to login
        useEffect(()=>{
            if(isAuthenticated){
                navigate("/");
            }
        })
    


    return (
        <div className="mx-auto flex items-center justify-center min-h-screen p-4">

            {/* The card-like content area for the form */}
            <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg w-full max-w-md">

                {/* The form element itself */}
                <form className="space-y-6" onSubmit={loginSubmit}>

                    {/* Form Header */}
                    <h2 className="text-3xl font-bold text-center text-gray-800">Sign In</h2>

                    {/* Email Input */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Form submission button */}
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign In
                    </button>

                    {/* Links */}
                    <div className="text-sm text-center text-gray-600 space-y-2">
                        <p>
                            Forgot your password?{' '}
                            <Link to="/requestresetpassword" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Reset Here
                            </Link>
                        </p>
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
