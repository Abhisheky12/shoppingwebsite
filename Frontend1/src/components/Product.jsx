import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
    //   const [rating,setrating]=useState(0);
    //   const handleRatingChange=(newRating)=>{
    //     setrating(rating);
    //     console.log(newRating);
        
    //   }

    return (
        <Link
            to={`/product/${product._id}`}
            className="no-underline text-inherit block w-60 h-auto bg-gray-700 rounded-lg shadow-md overflow-hidden
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
                <p className="text-lg text-white mb-4">
                    <strong className="font-bold ">Price:</strong> ${product.price}/-
                </p>
                {/* <div className='rating_container'>
                    <Rating 
                     value={product.ratings}
                     onRatingChange={handleRatingChange}
                     disabled={true}
                    />
                </div> */}
                <span className='productCardSpan '>
                   ({product.numofReviews} Review)
                </span>
                <button className="px-5 py-2 my-2 bg-blue-500 text-white border-none rounded-md cursor-pointer
                                   text-base font-medium transition-colors duration-200 hover:bg-blue-600">
                    Add To Cart
                </button>
            </div>
        </Link>
    );
};

export default Product;

