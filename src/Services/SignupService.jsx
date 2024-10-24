import * as URL from '../Common/API/SignupAPI';
import {commonService} from './commonService';

class SignupService extends commonService{
    constructor(){
        super();
    }
    
    signup=(data)=>{
        return this.post(URL.SIGN_UP_URL, data);
    }
}

export const signUpService = new SignupService();