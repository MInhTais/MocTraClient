import * as URL from '../Common/API/Category';
import { commonService } from './commonService';


export class CategoryService extends commonService{
    constructor(){
        super();
    }
    
    findAll=()=>{
        return this.get(URL.GET_CATEGORIES_API_URL)
    }

    findAllById = (categoryid) =>{
        return this.get(`${URL.GET_CATEGORIES_API_URL}/${categoryid}`);
    }
}

export const categoryService = new CategoryService();