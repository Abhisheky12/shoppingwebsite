const { Product } = require("../modals/productModel");
const { APIFunctionality } = require("../utils/apiFunctionality");

//create product
const createProducts = async (req, res) => {
    try {
        //extracting user id to store in product body in user field as in productmodel
        req.body.user=req.user._id;
        const product = await Product.create(req.body);
        return res.status(201).json({
            success: true,
            product
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

//getallproduct
const getAllProducts = async (req, res) => {
    try {

        //search
        const { name, category, sort } = req.query;
        const queryObject = {};

        if (name) {
            // queryObject.name=name;->this line will not treat case sensitivity
            queryObject.name = { $regex: name, $options: "i" };
        }
        if (category) {
            queryObject.category = { $regex: category, $options: "i" };
        }



        //sort 
        const sortOption = {};

        if (sort === "lowprice") {
            sortOption.price = 1;
        }
        else if (sort === 'highprice') {
            sortOption.price = -1;
        } else if (sort === 'latest') {
            sortOption.createdAt = -1;
        } else if (sort === 'oldest') {
            sortOption.createdAt = 1;
        }


        //   Count total documents in collect (filtered or not)
        const productCount = await Product.countDocuments(queryObject);

        let productsQuery = Product.find(queryObject);
        //  Apply sorting only if sortOption is not empty
        if (Object.keys(sortOption).length > 0) {
            productsQuery = productsQuery.sort(sortOption);
        }


        //pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 2;

        const skip = (page - 1) * limit;

        productsQuery = productsQuery.skip(skip).limit(limit);



        const products = await productsQuery;

        //totalpages
        const totalPages = Math.ceil(productCount / limit);
        //error if page acceesing number  >totalpages 
        if (page > totalPages && productCount > 0) {
            return res.status(404).json({
                success: false,
                message: "This page doesnot exist"
            })
        }
        //no products found (optional)
        if (productCount == 0) {
            return res.status(200).json(
                {
                    success: true,
                    message: "No product found",
                    products: [],
                    productCount: 0,
                    totalPages: 0,
                    currentPage:page
                }
            )

        }
        // send actual data
        res.status(200).json({
            success: true,
            products,
            productCount,
            totalPages,
            currentPage:page
        })

    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

//update product
const updateProduct = async (req, res) => {
    try {

        const id = req.params.id;
        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }


        return res.status(200).json({
            success: true,
            product
        })


    }
    catch (error) {

        return res.status(404).json({
            success: false,
            message: "some error occured"
        })

    }
}

//delete product
const deleteProduct = async (req, res) => {
    try {

        const id = req.params.id;
        let product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        const deleted = await Product.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "product deleted successfully"
        })


    } catch (error) {

        res.status(404).json({
            success: false,
            message: "some error occured"
        })

    }
}
//getsingle product
const getsingleProduct = async (req, res) => {
    try {

        const id = req.params.id;
        let product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        return res.status(200).json({
            success: true,
            product
        })

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: "some error occured"
        })


    }

}


module.exports = { createProducts, getAllProducts, updateProduct, deleteProduct, getsingleProduct };





//    const apiFunctionality= new APIFunctionality(Product.find(),req.query).search();
//    console.log(apiFunctionality);
// const products = await apiFunctionality.query;
