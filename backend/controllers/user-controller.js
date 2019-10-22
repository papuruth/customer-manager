const fs = require('fs');

// Reading the users data from file
const bufferData = fs.readFileSync('data/dummy_data_users.json');
const userData = JSON.parse(bufferData);

exports.getUsers = function (req, res) {
    res.status(200).send(userData);
}

exports.addUser = function (req, res) {
    console.log(req.body)
    try {
        let tempData = userData;
        tempData.push(req.body);
        console.log(tempData)
        fs.writeFile('data/dummy_data_users.json', JSON.stringify(tempData), (err, data) => {
            if (err) {
                throw new Error(err);
            } else {
                res.status(201).send({
                    success: true,
                    message: 'User added successfully'
                });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            success: false,
            message: error.message
        })
    }
}