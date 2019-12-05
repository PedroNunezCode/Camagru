const { Image, User } = require('../models/UserModel');
const controllerHelpers = require('./controllerHelpers');

/**
 * Required imports for image uploads of the users profile information.
 */
const upload = require('../services/image-upload');
const singleUpload = upload.single('image');

exports.likeImage = (req, res) => {
    const { imageStruct, imageId, userId } = req.body;

    Image.findById({ _id: imageStruct }, (err, foundStruct) => {

        if (err) {
            return res.status(404).send("Error whilst retrieving data");
        }

        if (foundStruct) {
            const { imageInformation } = foundStruct.images;
            imageInformation.forEach(image => {
                if (image._id.toString() === imageId) {
                    image.likes.push(userId);
                }
            });

            foundStruct.save((err, success) => {
                if (err)
                    return res.status(404).send("Error while saving comment. Please try again later");
                if (success)
                    return res.status(200).send();
            })
        }
    })

}


exports.postComment = (req, res) => {
    const { structId, id, comment } = req.body;
    Image.findById({ _id: structId }, (err, foundStruct) => {

        if (err) {
            return res.status(404).send("Error whilst retrieving data");
        }

        if (foundStruct) {
            const { imageInformation } = foundStruct.images;
            imageInformation.forEach(image => {
                if (image._id.toString() === id) {
                    image.comments.push(comment);
                }
            });

            foundStruct.save((err, success) => {
                if (err)
                    return res.status(404).send("Error while saving comment. Please try again later");
                if (success) {
                    User.findById({ _id: success.profileId }, (err, foundUser) => {
                        if (foundUser && foundUser.emailNotifications) {
                            controllerHelpers.sendCommentEmail(foundUser.email, comment);
                        }
                    });
                    return res.status(200).send();
                }
            });
        }
    })
}

exports.getAllImages = (req, res) => {
    Image.find({}, (err, foundImages) => {
        if (err)
            return res.status(404).send("No images to show");
        const images = [];
        foundImages.forEach(function (arrayItem) {
            if (arrayItem.images.imageInformation.length > 0) {
                arrayItem.images.imageInformation.forEach(function (value) {
                    images.push(value);
                });
            }
        });
        if (images.length > 0) {
            images.sort(function (a, b) {
                return b.timePosted.getTime() - a.timePosted.getTime()
            });
        }

        // console.log(new Date(images[0].timePosted).getTime());
        return res.status(200).send(images);
    });
}


exports.deleteImage = (req, res) => {
    const { image, imageStruct } = req.body;

    Image.findById({ _id: imageStruct }, (err, foundStruct) => {
        if (err)
            return res.status(404).send("Images don't exist");
        if (foundStruct) {
            foundStruct.images.imageInformation = foundStruct.images.imageInformation.filter(function (item) {
                if (item._id.toString() !== image)
                    return item;
            });
            foundStruct.save((err, success) => {
                if (err)
                    return res.status(404).send("Error while deleting image. Please try again");
                if (success)
                    return res.status(200).send(success.images);
            });
        }
    })
}

exports.getImages = (req, res) => {
    const { id } = req.params;
    Image.findById({ _id: id }, (err, foundUser) => {
        if (err)
            return res.status(404).send("Something went wrong getting all your pictures");
        if (foundUser)
            return res.status(200).send(foundUser.images);
    });
}

exports.saveImage = (req, res) => {
    const { id } = req.params;
    singleUpload(req, res, function (err) {
        if (err) {
            return res.status(422).send({
                errors: [{
                    title: 'image upload error',
                    description: 'Error while uploading image. must be type jpeg or png'
                }]
            });
        } else {
            Image.findById({ _id: id }, function (err, foundStruct) {
                if (err) {
                    if (err) {
                        res.status(422).send({ errors: [{ title: 'User not found', description: 'User not found' }] });
                    }
                }
                if (foundStruct) {
                    foundStruct.images.imageInformation.push({
                        image: req.file.location,
                        imageStructId: foundStruct._id,
                        comments: [],
                        likes: [],
                    });

                    foundStruct.save();
                    return res.status(200).send(foundStruct.images);
                }
            });
        }
    });
}