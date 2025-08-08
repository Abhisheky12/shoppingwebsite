import React from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import { FaBox, FaShoppingCart, FaStar, FaDollarSign, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <>
            <Navbar/>
            <PageTitle title="Admin Dashboard" />

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <div className="w-64 pt-21 bg-gray-900 text-white flex-shrink-0">
                    <div className="p-4 text-xl font-bold border-b border-gray-700">
                        Admin Dashboard
                    </div>
                    <nav className="p-4 space-y-4">
                        <div>
                            <p className="text-gray-400 text-sm uppercase">Products</p>
                            <ul className="space-y-2 mt-2">
                                <li><Link to="/admin/getallproduct" className="block hover:text-yellow-400">All Products</Link></li>
                                <li><Link to="" className="block hover:text-yellow-400">Create Product</Link></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm uppercase">Users</p>
                            <ul className="space-y-2 mt-2">
                                <li><Link to="" className="block hover:text-yellow-400">All Users</Link></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm uppercase">Orders</p>
                            <ul className="space-y-2 mt-2">
                                <li><Link to="" className="block hover:text-yellow-400">All Orders</Link></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm uppercase">Reviews</p>
                            <ul className="space-y-2 mt-2">
                                <li><Link to="" className="block hover:text-yellow-400">All Reviews</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>

                <main className="flex-1 bg-gray-100 p-6 pt-21">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Total Products */}
                        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
                            <div className="text-3xl text-yellow-500">
                                <FaBox />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Total Products</p>
                                <h3 className="text-xl font-bold">4</h3>
                            </div>
                        </div>

                        {/* Total Orders */}
                        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
                            <div className="text-3xl text-yellow-500">
                                <FaShoppingCart />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Total Orders</p>
                                <h3 className="text-xl font-bold">5</h3>
                            </div>
                        </div>

                        {/* Total Reviews */}
                        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
                            <div className="text-3xl text-yellow-500">
                                <FaStar />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Total Reviews</p>
                                <h3 className="text-xl font-bold">15</h3>
                            </div>
                        </div>

                        {/* Total Revenue */}
                        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
                            <div className="text-3xl text-yellow-500">
                                <FaDollarSign />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Total Revenue</p>
                                <h3 className="text-xl font-bold">1500/-</h3>
                            </div>
                        </div>

                        {/* Out of Stock */}
                        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
                            <div className="text-3xl text-yellow-500">
                                <FaExclamationCircle />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Out of Stock</p>
                                <h3 className="text-xl font-bold">2</h3>
                            </div>
                        </div>

                        {/* In Stock */}
                        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
                            <div className="text-3xl text-yellow-500">
                                <FaCheckCircle />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">In Stock</p>
                                <h3 className="text-xl font-bold">4</h3>
                            </div>
                        </div>

                    </div>
                </main>

            </div>
        </>
    );
};




export default Dashboard;
