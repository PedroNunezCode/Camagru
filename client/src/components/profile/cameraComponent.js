import React, { Component } from 'react';
import Webcam from "react-webcam";
import { saveImage } from '../../actions/imageActions';
import { connect } from 'react-redux';
import FileBase64 from 'react-file-base64';
import Draggable from 'react-draggable';
import mergeImages from 'merge-images';

//Sticker Images
import Boom from '../../images/boom.png';
import Joker from '../../images/joker.png';
import Santa from '../../images/santa.png';
import Skelletor from '../../images/skelletor.png';
import Apple from '../../images/apple.png';


class CameraComponent extends Component {

    constructor(props) {
        super()

        this.state = {
            selectedSticker: -1,
            imageData: null,
            saveImage: false,
            images: props.images.images,
            uploadButton: true,
            showUpload: false,
            stickers: [],
        }

        document.addEventListener("keydown", (event) => {
            const { stickers } = this.state;
            let newStickers = stickers;
            if (event.keyCode === 8 && this.state.selectedSticker !== -1) {
                newStickers.splice(this.state.selectedSticker, 1);
                this.setState({ stickers: newStickers });
                return;
            }
        });
    }

    handleStop = (index, position) => {
        let newStickers = this.state.stickers;
        newStickers[index].x = Math.round(position.x);
        newStickers[index].y = Math.round(position.y);
        this.setState({ stickers: newStickers, selectedSticker: -1 });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.images.images !== prevState.images) {
            return { images: nextProps.images.images, imageData: null, saveImage: false };
        }
        else return null;
    }

    setRefs = (webcam) => {
        this.webcam = webcam
    }

    capture = () => {
        const image_src = this.webcam.getScreenshot();
        this.setState({ imageData: image_src, uploadButton: true, showUpload: false });
    }

    onClickRetake = (e) => {
        e.persist();
        this.setState({ imageData: null, saveImage: false, stickers: [] });
    }


    onClickSaveImage = (e) => {
        e.preventDefault();
        const { imageData, stickers } = this.state;
        let finalImage = [];
        if (stickers.length > 0) {
            finalImage[0] = {src: imageData};
            stickers.map((sticker) => {
                return finalImage.push({src: `http://localhost:3000/stickers/${sticker.name}.png`, x: sticker.x, y: sticker.y});
            });
        } else {
            finalImage[0] = imageData;
        }
        mergeImages(finalImage)
            .then((b64) => {
                let imageObject = {
                    userId: this.props.auth.imageStructId,
                    imageData: b64,
                }
                this.props.dispatch(saveImage(imageObject));
            })
            .catch(error => console.log(error))
    }

    getFiles = (files) => {
        this.setState({ imageData: files.base64, uploadButton: true, showUpload: false });
    }

    showUploadButton = () => {
        this.setState({ uploadButton: false, showUpload: true });
    }

    addSticker = (e) => {
        this.setState({
            stickers: [...this.state.stickers, { name: e.target.name, x: 0, y: 0 }],
        });
    }



    render() {
        const { showUpload, uploadButton, stickers } = this.state;
        return (
            <div className="container" align="center">
                {this.state.imageData ?
                    <div>
                        <div className="image-container">
                            {stickers.length > 0 ? stickers.map((sticker, index) => {
                                return (
                                    <Draggable
                                        key={index}
                                        axis='both'
                                        bounds='parent'
                                        position={{ x: sticker.x, y: sticker.y }}
                                        onStart={() => this.setState({ selectedSticker: index })}
                                        onStop={(e, position) => this.handleStop(index, position)}>
                                        <img style={{ width: '20%', position: 'absolute' }} src={'http://localhost:3000/stickers/' + sticker.name + '.png'} ui="false" alt="sticker" />
                                    </Draggable>
                                )
                            })
                                : ''
                            }
                            <img src={this.state.imageData} alt="current" />
                        </div>

                        <div className="take-image-button-container">
                            <span><button onClick={this.onClickRetake} className="redo-image-button"><i className="fa fa-undo fa-2x"></i></button></span>
                            <span><button onClick={this.onClickSaveImage} className="save-image-button"><i className="fa fa-save fa-2x"></i></button></span>
                        </div>
                        <div className="image-filter-component">
                            <h5>Add stickers to your image:</h5>
                            <div className="row">
                                <div className="col-sm">
                                    <img src={Boom} alt="boom word sticker" onClick={this.addSticker} name="boom"></img>
                                </div>
                                <div className="col-sm">
                                    <img src={Joker} alt="joker sticker" onClick={this.addSticker} name="joker"></img>
                                </div>
                                <div className="col-sm">
                                    <img src={Santa} alt="santa petting a dog" onClick={this.addSticker} name="santa"></img>
                                </div>
                                <div className="col-sm">
                                    <img src={Skelletor} alt="Fancy skelletor" onClick={this.addSticker} name="skelletor"></img>
                                </div>
                                <div className="col-sm">
                                    <img src={Apple} alt="Stevie Jobs" onClick={this.addSticker} name="apple"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div>
                            <Webcam
                                audio={false}
                                height={'100%'}
                                ref={this.setRefs}
                                screenshotFormat="image/jpeg"
                                width={'100%'}
                            />
                        </div>
                        <div className="take-image-button-container">
                            <button onClick={this.capture} className="take-image-button">
                                <i className="fa fa-camera fa-2x"></i>
                            </button>
                        </div>
                        <div className="upload-image-container">
                            <p>You can also select a picture from your computer:</p>
                            {uploadButton &&
                                <button className="btn btn-primary" onClick={this.showUploadButton}>Choose Picture</button>
                            }
                            {showUpload &&
                                <FileBase64
                                    multiple={false}
                                    onDone={this.getFiles} />
                            }

                        </div>
                    </div>
                }
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

export default connect(mapStateToProps)(CameraComponent);