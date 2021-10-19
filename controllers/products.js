const Product = require("../models/Product")

const newProduct = async (req, res) => {
    try {
    const product = new Product( req.body );    
    
    await product.save();

    return res.status(201).json({
        success: true,
        ...req.body
    })

} catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            msg: 'Error'
        })
    }

}

const getAllProducts = async (req, res) => {
    try {

        const products = await Product.find({})

        res.status(200).json({
            success: true,
            products
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            msg: 'Error'
        })
    }
}

const getProductsPagination = async (req, res) => {

try {
    let {currentPage, pageSize, orderBy} = req.query;
    currentPage = Number(currentPage);
    pageSize = Number(pageSize);
    orderBy.toString();
    //orderBy con un - adelante ordena de mayor a menor
    const totalProducts = await Product.countDocuments({})
    const totalPages = Math.ceil(totalProducts / pageSize);
    const startIndex = (currentPage-1)*pageSize;
    //const endIndex = Math.min(startIndex + pageSize, totalProducts-1);
    const fetchedPageProducts = await Product.find().limit(pageSize).skip(startIndex).sort(`${orderBy}`);

    res.status(200).json({
        success: true,
        totalProducts,
        totalPages,
        startIndex,
    //    endIndex,
        products: fetchedPageProducts
    })

} catch (error) {
    console.log(error);
    res.status(400).json({
        success: false,
        msg: 'Error'
    })
}

    
    
    

}

module.exports = {
    newProduct,
    getAllProducts,
    getProductsPagination
}