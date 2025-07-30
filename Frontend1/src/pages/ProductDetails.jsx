// Converted Tailwind version of your ProductDetails component
import React, { useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/loader';
import { getProductDetails, removeErrors } from '../features/products/productSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductDetails = () => {

    const { product, error, loading } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const { id } = useParams();

    //get api
    useEffect(() => {
        if (id) {
            console.log("hello");

            dispatch(getProductDetails(id));
        }
        else {
            dispatch(removeErrors());
        }
    }, [dispatch, id])

    //error dispatch
    useEffect(() => {
        if (error) {
            console.log("Error:", error);
            toast.error(error);
            dispatch(removeErrors());
        }
    }, [dispatch, error])


    return (
        <>
            <PageTitle title={`${product?.name}-details`} />
            <Navbar />


            {loading ? (
                <Loader />
            ) : (
                <>
                    {/* product controller */}
                    <div className="p-24 max-sm:w-4/5 max-sm:mx-auto">
                        <div className="max-w-[1200px] mx-auto flex justify-around items-center max-md:flex-col">
                            {/* Image Section */}
                            <div className="sticky top-10 z-10 mb-5 w-[500px] max-md:static">
                                <img
                                    src={product?.image[0].url.replace('./', '/')}
                                    alt={product?.name}
                                    className="w-full max-h-[500px] object-contain rounded bg-white"
                                />
                            </div>

                            {/* Product Info Section */}
                            <div className="p-5 w-[500px] text-left">
                                <h2 className="text-2xl mb-4 text-[#0F1111] font-semibold">Product Name</h2>
                                <p className="mb-2">{product?.description}</p>
                                <p className="mb-2">{product?.price}/-</p>
                                <span className="block">{`${product?.numofReviews} Review`}</span>
                                <div className={product?.stock > 0 ? "text-green-700 text-base my-2" : "text-red-700 text-base my-2"} >{product?.stock > 0 ? `In Stock(${product.stock}) available` : "Out of stock"}</div>
                                {/* Quantity control */}
                                {
                                    product?.stock > 0 ? (<>
                                        <div className="flex items-center gap-2 my-5">
                                            <span className="font-medium mr-2">Quantity:</span>
                                            <button className="w-9 h-9 border border-[#D5D9D9] bg-gradient-to-b from-[#F7F8FA] to-[#E7E9EC] text-lg rounded">-</button>
                                            <input
                                                type="text"
                                                value={1}
                                                readOnly
                                                className="w-[50px] h-9 text-center border border-[#D5D9D9] text-base"
                                            />
                                            <button className="w-9 h-9 border border-[#D5D9D9] bg-gradient-to-b from-[#F7F8FA] to-[#E7E9EC] text-lg rounded">+</button>
                                        </div>
                                    </>) : ""
                                }
                                {/* Add to cart */}
                                <button className="w-full py-3 px-5 border border-[var(--bg-primary)] rounded-lg text-base cursor-pointer my-5 text-[var(--text-primary)] bg-[var(--border-color)] hover:bg-[var(--bg-secondary)]">
                                    Add to Cart
                                </button>

                                <form className="bg-[#F8F8F8] p-5 rounded mb-8">
                                    <h3 className="text-lg font-semibold mb-2">Write a review</h3>
                                    <textarea
                                        placeholder="Write your review here"
                                        className="w-full min-h-[100px] p-2 border border-[#D5D9D9] rounded resize-y mb-3"
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className="bg-[var(--bg-primary)] text-white py-2 px-5 rounded hover:bg-[#374759]"
                                    >
                                        Submit Review
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Review contoller */}
                    <div className="col-span-full mt-10 pt-5 border-t border-[#E7E7E7] px-6">
                        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                        {/* conditionally displaying */}
                        {
                            product?.reviews.length > 0 ? (<div className="mt-6">
                                {
                                    product.reviews.map((item,index) => (
                                        <div className="py-5 border-b border-[#E7E7E7]">
                                            <p className="my-2 text-left text-[#333] font-bold">{item.name}</p>
                                            <p className="my-2 text-left text-[#333] ">{item.comment}</p>
                                        </div>
                                    ))
                                }
                            </div>) : "No reviews yet. Be the first to review this product "
                        }
                    </div>
                </>
            )}

            <Footer />
        </>
    );
};

export default ProductDetails;