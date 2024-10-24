import { FIND_ALL_CAROUSEL, UPLOAD_PICTURE_CAROUSEL } from "../../../Common/Const/Carousel/CarouselConst";

const initialState = {
  carousel: [],
  image:{},
    preview:''
};

export const CarouselReducer =  (state = initialState, action) => {
  switch (action.type) {
    case FIND_ALL_CAROUSEL: {
      state.carousel = action.carousel;
      return { ...state };
    }
    case UPLOAD_PICTURE_CAROUSEL:{
      state.image = action.image;
      state.preview = action.preview;
      return {...state};
  }
    default: {
      return { ...state };
    }
  }
};
