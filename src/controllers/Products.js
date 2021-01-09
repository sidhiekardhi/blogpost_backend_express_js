exports.createProduct = (req, res, next) => {
    const nama = req.body.nama;
    const price = req.body.price
    console.log("req : " + req)
    res.json({
        message : "Create Product Sukses",
        data : {
            id : 1,
            nama : nama,
            price : price
        }
    });
    next()
}

exports.getAllProduct = (req, res, next) => {
    res.json({
        message : "get All Product Sukses",
        data : [
            {
                id : 1,
                nama : "Frisian Flag",
                Price : 30000
            }
        ] 
    });
    next()
}

