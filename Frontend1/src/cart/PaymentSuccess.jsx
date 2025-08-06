import React from 'react'
import { Link, useSearchParams } from 'react-router-dom';
const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const reference = searchParams.get("reference")
    return (
        <>
            <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center font-sans">
                <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md w-full">

                    {/* Green Checkmark Icon */}
                    <div className="mb-4">
                        <svg
                            className="w-16 h-16 mx-auto text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                    </div>

                    {/* Main Text */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Order Confirmed!
                    </h1>

                    {/* Subtext with Reference ID */}
                    <p className="text-gray-600 mb-6">
                         Payment successful. Reference ID:
                        <span className="font-semibold text-gray-700 ml-1">{reference}</span>
                    </p>

                    {/* Explore More Products Button */}
                    <Link
                        to="/" // Link to your homepage or products page
                        className="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors duration-300"
                    >
                        Explore More Products
                    </Link>
                </div>
            </div>
        </>
    )
}

export default PaymentSuccess
