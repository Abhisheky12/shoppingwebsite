import React from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/product'
import { getProduct, removeErrors } from '../features/products/productSlice'

const Products = () => {
    const { loading, error, products } = useSelector();
    const dispatch = useDispatch();
    //call api 
    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    //error dispatch
    useEffect(() => {
        if (error) {
            console.log("Error:", error);
            toast.error(error.message);
            dispatch(removeErrors());
        }
    }, [dispatch, error])


    return (
        <>
            <PageTitle title="All Products" />
            <Navbar />
            <div className="products-layout">
                <div className="filter-section">
                    <h3 className="filter-heading">CATEGORIES</h3>
                    {/* Render Categories */}
                </div>

                <div className="product-section">
                    <div className="product-product-container">
                        {products.map((product, index) => (
                            <Product key={index} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Products
