import axios from 'axios';
import { dataURLtoFile } from './helpers/image-helpers';

import { getImages, storeAllImagesInStore } from './helpers/image-dispatch-functions';

export const addLike = (data) => {
    return axios.post('/images/like-image', data)
        .then(res => res.status)
}

export const postComment = (data) => {
        return axios.post('/images/post-comment', data)
        .then(res => res.status)
        .catch(err => {
            console.log(err);
        })
}


export const getAllImages = () => {
    return dispatch => {
        return axios.get('/images/get-all-images')
            .then(res => {
                dispatch(storeAllImagesInStore(res.data));
            })
    }
}



export const deleteImageAtIndex = (image, imageStructId) => {
    const data = { image: image, imageStruct: imageStructId };
    return dispatch => {
        return axios.post('/images/delete-image', data)
            .then(res => dispatch(getImages(res.data)));
    }
}




export const saveImage = (imageInformation) => {
    var file = dataURLtoFile(imageInformation.imageData, imageInformation.imageName)
    const formData = new FormData();
    formData.append('image', file);

    return dispatch => {
        return axios.post(`/images/save-image/${imageInformation.userId}`, formData)
            .then(res => {
                dispatch(getImages(res.data));
            });
    }
}

export const getUserImages = (imageStructId) => {
    return dispatch => {
        return axios.get(`/images/get-images/${imageStructId}`)
            .then(res => {
                dispatch(getImages(res.data));
            });
    }
}