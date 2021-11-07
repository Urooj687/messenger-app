var userModel = require('./userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */

module.exports = {
    list: function (req, res) {
        userModel.find({ "userName": { "$ne": req.params.userName } }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            return res.json(user);
        });
    },
    show: function (req, res) {
        console.log(req.params.userName)
        userModel.findOne({
            userName: req.params.userName

        }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    },
    create: async function (req, res) {
        const existingUser = await userModel.findOne({ userName:req.body.userName });
        if (existingUser) return res.status(405).send('Channel already exists');
        console.log(req.body.userName)
        var user = new userModel({
            userName: req.body.userName

        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }
            return res.status(201).json(user);
        });
    },
    remove: function (req, res) {
        var id = req.params.id;
        userModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    
};
