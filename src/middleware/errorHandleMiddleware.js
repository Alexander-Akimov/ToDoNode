
let errorHandle = (err, req, res, next) => {
    // treat as 404
    if (err.message &&
        (err.message.indexOf('not found') ||
            err.message.indexOf('Cast to ObjectId failed'))) {
        next();
    }
    console.log(err.message);
    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
        res.status(422).json({ message: "500 - Oops! Internal server error occured" });
    }

    // error page
    res.status(500).json({ message: "500 - Oops! Internal server error occured" });
};

let assume404 = (req, res) => {
    const payload = {
        url: req.originalUrl,
        error: 'Not found'
    };
    //if (req.accepts('json')) 
    res.status(404).json(payload);
    // res.status(404).render('404', payload);
};

export { assume404, errorHandle };