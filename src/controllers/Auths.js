exports.register = (req, res, next) => {
    const nama = req.body.nama;
    const email = req.body.email;
    const password = req.body.password;

    console.log("req : " + req)
    res.json({
        message : "Create Product Sukses",
        data : {
            id : 1,
            nama : nama,
            email : email,
            password : password
        }
    });
    res.status(201).json();
    next()
}