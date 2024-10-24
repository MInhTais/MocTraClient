import { commonService } from "./commonService";
import * as URL from '../Common/API/PictureAPI';
import instance from './TokenService';

class PictureService extends commonService{
    constructor(){
        super();
    }

    save=(hinhanh)=>{
        return this.post(`${URL.UPLOAD_PICTURE_API}/user`,hinhanh);
    }

    savePicture=(hinhanh)=>{
        return this.post(`${URL.UPLOAD_PICTURE_API}/product`,hinhanh);
    }

    savePictureCarousel = (hinhanh) =>{
        return this.post(`${URL.UPLOAD_PICTURE_API}/background`,hinhanh);
    }

    savePictureCategory = (hinhanh)=>{
        return this.post(`${URL.UPLOAD_PICTURE_API}/category`,hinhanh);
    }

    saveListReturnGood=(list)=>{
        return instance.post(`${URL.UPLOAD_LIST_PICTURE_API}/returngood`,list);
    }
}

export const pictureService = new PictureService();