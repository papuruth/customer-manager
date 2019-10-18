const fs = require('fs');
exports.getUsers = function (req, res) {
    try {
        var readJson = (path, callback) => {
            fs.readFile(require.resolve(path), (err, data) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, JSON.parse(data));
                }
            });
        }
        readJson('../data/dummy_data_users.json', (err, data) => {
            if (!err) {
                console.log(data);
                res.json(data);
            } else {
                throw new Error(err.message);
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}

exports.login = function (req,res) {
    console.log(req.body)
    const {email, password} = req.body;
    if (email === 'admin@admin.com' && password === 'Atom@199') {
        res.status(200).json({
            success: true,
            userDetails: {
                fullname: "admin",
                email: email,
                gender: "Male",
                address: {
                    city: 'Phoenix',
                    state: 'Arizona',
                    country: 'USA'
                }
            }
        });
    } else {
        res.status(401).json({
            success: false,
            userDetails: null
        })
    }
}