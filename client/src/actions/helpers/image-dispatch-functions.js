import {
    GET_IMAGES,
    STORE_ALL_IMAGES
} from '../types';

export const getImages = (images) => {
    return {
        type: GET_IMAGES,
        images
    }
}

export const storeAllImagesInStore = (images) => {
    return {
        type: STORE_ALL_IMAGES,
        images
    }
}