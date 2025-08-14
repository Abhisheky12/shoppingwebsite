import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle'; // Assuming you have this component
import { useDispatch, useSelector } from 'react-redux';
import { createProducts, removeCreatesuccess, removeErrors, removeSuccess } from '../features/admin/adminSlice';
import { toast } from 'react-toastify';

const CreateProduct = () => {
    const [name, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const categories = ["GLASS", "SHIRT", "MOBILE", "DRESS", "TV", "RING", "SHOES", "WATCH", "BAG", "PANT", "T-SHIRT"];
    const {  createsuccess, loading, error } = useSelector((state) => state.admin);
    const dispatch = useDispatch();


        // Handle file input change
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files); // store the File objects
        setImagePreviews(files.map(file => URL.createObjectURL(file))); // preview URLs
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);
        images.forEach((img) => {
            myForm.append("images", img);
        })

        dispatch(createProducts(myForm));


    };


    useEffect(() => {
        if (error) {
            toast.error(error, { autoClose: 1000 });
            dispatch(removeErrors());
        }
        if ( createsuccess) {
            toast.success("Product created successfully", { autoClose: 1000 });
            dispatch(removeCreatesuccess());
            setProductName("");
            setPrice("");
            setDescription("");
            setCategory("");
            setStock("");
            setImages([]);
            setImagePreviews([]);
        }
    }, [error, dispatch,  createsuccess]);




    return (
        <>
            <Navbar />
            <PageTitle title="Create Product" />

            <div className="bg-gray-50 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                    <form className="space-y-6" onSubmit={handleSubmit} encType='multipart/form-data'>
                        <h1 className='text-center font-bold text-2xl'>Create Product</h1>
                        {/* Product Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="Enter product name"
                                value={name}
                                onChange={(e) => setProductName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <input
                                type="number"
                                placeholder="Enter product price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <textarea
                                placeholder="Enter product description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                rows="3"
                                required
                            ></textarea>
                        </div>

                        {/* Category */}
                        <div>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                required
                            >
                                <option value="">Choose a Category</option>
                                {
                                    categories.map((item, index) => {
                                        return <option value={item} key={item}>{item}</option>
                                    })
                                }

                            </select>
                        </div>

                        {/* Stock */}
                        <div>
                            <input
                                type="number"
                                placeholder="Enter product stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        {/* File Input */}
                        <div>
                            <input
                                type="file"
                                name="productImages"
                                accept="image/*"
                                onChange={handleImageChange}
                                multiple
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                            />
                        </div>

                        {/* Image Previews */}
                        {imagePreviews.length > 0 && (
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                                {imagePreviews.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt="Product Preview"
                                        className="h-20 w-20 object-cover rounded-md"
                                    />
                                ))}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ${loading?" bg-gray-400 cursor-not-allowed":""}`}
                                disabled={loading}
                            >
                                {loading ? "creating product" : "create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateProduct;
