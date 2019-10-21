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
                res.json(data);
            } else {
                throw new Error(err.message);
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}

exports.addUser = function (req, res) {
    console.log(req.body)
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
                data.push(req.body);
                console.log(data)
                fs.writeFile('data/dummy_data_users.json', JSON.stringify(data), (err, data) => {
                    if(err) {
                        throw new Error(err);
                    } else {
                        res.send(data);
                    }
                })
            } else {
                throw new Error(err.message);
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}