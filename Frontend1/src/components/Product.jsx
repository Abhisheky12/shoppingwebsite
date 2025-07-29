import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {


    return (
        <Link
            to={product._id}
            className="no-underline text-inherit block w-60 h-auto bg-gray-800 rounded-lg shadow-md overflow-hidden
                       transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl"
        >
            <img
                src={product.image[0].url}
                alt={product.name}
                className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col items-center ">
                <h3 className="text-xl font-semibold mb-2 text-gray-200 text-center">
                    {product.name}
                </h3>
                <p className="text-lg text-gray-400 mb-4">
                    <strong className="font-bold">Price:</strong> ${product.price}/-
                </p>
                <div className='rating_container'>
                    <Rating 
                     value={product.ratings}
                     onRatingChange={handleRatingChange}
                     disable={true}
                    />
                </div>
                <button className="px-5 py-2 bg-blue-500 text-white border-none rounded-md cursor-pointer
                                   text-base font-medium transition-colors duration-200 hover:bg-blue-600">
                    Add To Cart
                </button>
            </div>
        </Link>
    );
};

export default Product;

