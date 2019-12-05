import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postComment, addLike } from '../actions/imageActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllImages } from '../actions/imageActions';
import { Link } from 'react-router-dom';
// import { animateScroll } from "react-scroll";

class componentName extends Component {

    constructor() {
        super();

        this.state = {}
    }

    postComment = (e) => {
        e.preventDefault();
        const { isAuth } = this.props.auth;

        if (isAuth) {
            const data = { structId: e.target.id, id: e.target.name, comment: this.state[e.target.name] };
            postComment(data)
                .then(res => {
                    if (res === 200) {
                        this.props.dispatch(getAllImages());
                        this.form.reset()
                    }
                });
        } else {
            toast.error("You must be logged-in to comment on images!");
            this.form.reset();
        }

    }

    updateComment = (key, value) => {
        this.setState({ [key]: value });
    }

    renderComments = (comments) => {
        if (comments.length > 0) {
            return comments.map((info, key) => {
                return (<p className="comment-item" key={key}>{info}</p>);
            });
        } else {
            return (<p style={{ textAlign: 'center' }}>This image has no comments. Be the first.</p>);
        }
    }

    likeImage = (likes, imageStruct, imageId) => {
        const { isAuth, userId } = this.props.auth;
        if (isAuth) {
            var likedImage = false;
            for (let index = 0; index < likes.length; index++) {
                if (likes[index] === userId) {
                    likedImage = true;
                    break;
                }
            }
            if (likedImage === true) {
                return toast.error("You have already liked this image!");
            } else {
                const data = { imageStruct: imageStruct, imageId: imageId, userId: userId };

                addLike(data)
                    .then((status) => {
                        if (status === 200) {
                            this.props.dispatch(getAllImages());
                        }
                    });
            }
        } else {
            toast.error("You must be logged-in to like images!");
        }
    }

    checkRedirectState = () => {
        if (this.props.location.state && this.props.location.state.passwordChange) {
            return (
                <div style={{ width: '30vw', marginTop: '20px' }} className='alert alert-success'>
                    <p>Password successfully changed!</p>
                </div>
            )
        }
    }



    renderAllImages = () => {
        const { allImages } = this.props.images;
        if (allImages.length > 0) {
            return allImages.map((info, key) => {
                return (
                    <div key={key} className="gallery-container">
                        <div className="gallery-item-container">
                            <img src={info.image} alt={key} />
                            <div className="likes-and-comments-container">
                                <span className="like-picture-span">
                                    <i onClick={() => this.likeImage(info.likes, info.imageStructId, info._id)}
                                        className="fa fa-heart fa-2x" style={{ color: 'red', cursor: 'pointer' }}>
                                    </i>{info.likes.length}</span>
                                <span className="comment-picture-span">{info.comments.length}
                                    <i style={{ color: 'gray' }} className="fa fa-comments fa-2x"></i>
                                </span>
                            </div>
                            <div className="comment-section-container">
                                <div style={{ height: '10%' }}>
                                    <p>Comments:</p>
                                </div>
                                <div className="comments-wrapper">
                                    <div className="comment-items" id="comment-div">
                                        {this.renderComments(info.comments)}
                                    </div>
                                </div>
                                <div className="comment-input-wrapper">
                                    <form ref={form => this.form = form} className="comment-form" id={info.imageStructId} name={info._id} onSubmit={this.postComment}>
                                        <input key={info} style={{ outline: 'none' }} className="comment-input" placeholder="leave a comment"
                                            onChange={e => this.updateComment(info._id, e.target.value)} />
                                        <button className="post-comment-button">Comment</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            });
        } else {
            return (
                <div align="center" style={{ marginTop: '20vh' }}>
                    <h1 >There is no images on camagru :(</h1>
                    <p>Be the first to upload by heading to the <Link to='/upload'>upload section.</Link></p>
                </div>

            )
        }
    }

    render() {
        return (
            <div className="container" align="center">
                {this.checkRedirectState()}
                <ToastContainer />
                {this.renderAllImages()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        images: state.images
    }
}

export default connect(mapStateToProps)(componentName);