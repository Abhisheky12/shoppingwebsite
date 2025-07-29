import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ImageSlider from '../components/ImageSlider';
import Product from '../components/product';

const products = [
    {
        "_id": "683cae263a243bf4a4c9581c",
        "name": "product15",
        "description": "product description 1",
        "price": 100,
        "ratings": 0,
        "image": [
            {
                "public_id": "This is test id1",
                "url": "https://placehold.co/200x200/E0E0E0/333333?text=Product+1",
                "_id": "683cae263a243bf4a4c9581d"
            }
        ],
        "category": "shirt",
        "stock": 1,
        "numofReviews": 0,
        "reviews": [],
        "createdAt": "2025-06-01T19:46:46.683Z",
        "__v": 0
    },
    {
        "_id": "683d6c246544a8279856214a",
        "name": "product14",
        "description": "product description 1",
        "price": 1000,
        "ratings": 8,
        "image": [
            {
                "public_id": "This is test id1",
                "url": "https://placehold.co/200x200/D0D0D0/333333?text=Product+2",
                "_id": "683d6c246544a8279856214b"
            }
        ],
        "category": "shirt",
        "stock": 1,
        "numofReviews": 2,
        "reviews": [
            {
                "user": "68793ff9722abb12e863ab67",
                "name": "Rohit",
                "rating": 7,
                "comment": "Awesome",
                "_id": "6887420df06486c6f15483b7"
            },
            {
                "user": "6887338607c1ddb1bf581f8f",
                "name": "Yadav",
                "rating": 9,
                "comment": "badhiya hai ",
                "_id": "688742b1f06486c6f15483be"
            }
        ],
        "createdAt": "2025-06-02T09:17:24.623Z",
        "__v": 4
    },
     {
        "_id": "683cae263a243bf4a4c9581c",
        "name": "product15",
        "description": "product description 1",
        "price": 100,
        "ratings": 0,
        "image": [
            {
                "public_id": "This is test id1",
                "url": "https://placehold.co/200x200/E0E0E0/333333?text=Product+1",
                "_id": "683cae263a243bf4a4c9581d"
            }
        ],
        "category": "shirt",
        "stock": 1,
        "numofReviews": 0,
        "reviews": [],
        "createdAt": "2025-06-01T19:46:46.683Z",
        "__v": 0
    },
    {
        "_id": "683d6c246544a8279856214a",
        "name": "product14",
        "description": "product description 1",
        "price": 1000,
        "ratings": 8,
        "image": [
            {
                "public_id": "This is test id1",
                "url": "https://placehold.co/200x200/D0D0D0/333333?text=Product+2",
                "_id": "683d6c246544a8279856214b"
            }
        ],
        "category": "shirt",
        "stock": 1,
        "numofReviews": 2,
        "reviews": [
            {
                "user": "68793ff9722abb12e863ab67",
                "name": "Rohit",
                "rating": 7,
                "comment": "Awesome",
                "_id": "6887420df06486c6f15483b7"
            },
            {
                "user": "6887338607c1ddb1bf581f8f",
                "name": "Yadav",
                "rating": 9,
                "comment": "badhiya hai ",
                "_id": "688742b1f06486c6f15483be"
            }
        ],
        "createdAt": "2025-06-02T09:17:24.623Z",
        "__v": 4
    }
];

const Home = () => {
   return (
    <>
      <Navbar />
      <ImageSlider />
      <div className='p-8 text-gray-200 flex flex-col items-center justify-around mt-12'>
        <h2 className='text-4xl font-semibold mb-8 text-blue-700 text-center'>
          Trending Now
        </h2>
      </div>
      <div className='flex flex-wrap gap-6 justify-center w-full max-w-screen-xl mx-auto p-4 lg:gap-8 px-6'>
        {
          products.map((product, index) => (
            <Product product={product} key={index} />
          ))
        }
      </div>
      <Footer />
    </>
  );
};

export default Home;