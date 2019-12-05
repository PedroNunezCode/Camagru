import {
    GET_IMAGES, STORE_ALL_IMAGES,
} from '../actions/types';

const INITIAL_STATE = {
    images: [],
    allImages: [],
}

export const imagesReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_IMAGES:
            return Object.assign({}, state, { images: action.images });
        case STORE_ALL_IMAGES:
            return Object.assign({}, state, {allImages: action.images});
        default:
            return state;
    }
}