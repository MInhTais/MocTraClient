import {commonService} from './commonService';
import {ADD_CAROUSEL_API, DELETE_CAROUSEL_API, FIND_ALL_CAROUSEL_API, UPDATE_CAROUSEL_API} from '../Common/API/CarouselAPI';
import instance from './TokenService';

class CarouselService extends commonService{
    constructor(){
        super();
    }
    
    getAllCarousel = ()=>{
        return instance.get(FIND_ALL_CAROUSEL_API);
    }

    saveCarousel = (data)=>{
        return instance.post(ADD_CAROUSEL_API, data);
    }

    updateCarousel = (data) =>{
        return instance.put(`${UPDATE_CAROUSEL_API}=${data.id}`, data);
    }

    deleteCarousel = (data) =>{
        return instance.delete(`${DELETE_CAROUSEL_API}/${data.id}`);
    }
}
export const carouselService = new CarouselService();