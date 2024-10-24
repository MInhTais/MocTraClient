import Axios from 'axios';
import * as ReviewAPI from '../Common/API/ReviewAPI';
import {commonService} from './commonService';
import instance from './TokenService';

class ReviewService extends commonService{
    constructor(){
        super();
    }
    
    findAllByMasp=(masp)=>{
        return instance.get(`${ReviewAPI.REVIEW_URL}/${masp}`)
    }

    saveComment=(reviews)=>{
        return instance.post(ReviewAPI.SAVE_REVIEW_API,reviews)
    }

    updateComment=(review)=>{
        return instance.put(ReviewAPI.UPDATE_REVIEW_API,review);
    }

    deleteComment = (review)=>{
        return instance.delete(`${ReviewAPI.DELETE_REVIEW_API}/${review.madg}`)
    }

    saveReply=(reply)=>{
        return instance.post(ReviewAPI.REPLY_URL,reply);
    }

}
export const reviewService = new ReviewService();