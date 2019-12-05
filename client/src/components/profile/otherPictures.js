import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteImageAtIndex } from '../../actions/imageActions';

class OtherPictures extends Component {

    constructor() {
        super();
        this.state = {
            images: []
        }
    }

    deleteImage = (image) => {
        const { _id } = image;
        const { imageStructId } = this.props.auth;
        this.props.dispatch(deleteImageAtIndex(_id, imageStructId));
    }

    renderUserImages = () => {
        const {images} = this.props.images;
        if (images.imageInformation && images.imageInformation.length > 0) {
            return images.imageInformation.map((image, key) => {
                return (
                    <div key={key} name={image} className="user-images-container">
                        <img src={image.image}alt="user images" />
                        <span><button onClick={() => this.deleteImage(image)} className="delete-image-button"><i className="fa fa-trash fa-2x" id={key}></i></button></span>
                    </div>
                )
            });
        } else {
            return (
                <div align="center">
                    <p>Pictures you take will appear here.</p>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="container picture-galary-container" align="center">
                {this.renderUserImages()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        images: state.images,
        auth: state.auth
    }
}

export default connect(mapStateToProps)(OtherPictures);