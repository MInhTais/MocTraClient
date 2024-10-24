import * as AUTH from '../Common/API/AuthAPI';
import * as ISAUTH from '../Common/API/isAuthenticationAPI';
import { commonService } from './commonService';
import instant from './TokenService';

class AuthService extends commonService{
    constructor(){
        super();
    }
    
    updateToken = (tendn) =>{
        return instant.get(`${AUTH.UPDATE_TOKEN_API}=${tendn}`)
    }

    login=(data)=>{
        return this.post(AUTH.LOGIN_URL, data);
    }

    loginOAuth2 = (data) =>{
        return this.post(AUTH.LOGIN_WITH_OAUTH2_API,data);
    }

    changedpwd=(data)=>{
        return instant.put(ISAUTH.CHANGED_PASSWORD_URL, data);
    }

    newpassword = (data) =>{
        return this.put(ISAUTH.NEW_PASSWORD_API, data);
    }

    findUserAPI=(username)=>{
        return instant.get(`${ISAUTH.FIND_USER_BY_USERNAME_API}/${username}`);
    }

    findVerificationCodeAPI=(data)=>{
        return instant.put(`${ISAUTH.FIND_VERIFICATION_CODE_API}`, data)
    }

    editprofile=(data)=>{
        const {refreshtoken} = JSON.parse(localStorage.getItem('credentials'));
        return instant.put(`${ISAUTH.EDIT_PROFILE_URL}?refreshtoken=${refreshtoken}`, data);
    }

    orderWishlistVoucher=()=>{
        return instant.get(AUTH.ORDER_WISHLIST_VOUCHER_URL);
    }

    addWilish=(data)=>{
        return instant.post(ISAUTH.ADD_WISHLIST_URL, data);
    }

    deleteWishlist=(mayt)=>{
        return instant.delete(ISAUTH.DELETE_WISHLIST_URL+`?mayt=${mayt}`);
    }

    deleteOrdering=(madh)=>{
        return instant.delete(`${AUTH.DELETE_ORDERING_API_URL}?madh=${madh}`);
    }

    addVoucher=(data)=>{
        return instant.post(AUTH.ADD_VOUCHER_API_URL, data)
    }

    findAccountRestricted=(username)=>{
        return instant.get(`${AUTH.FIND_ACCOUNT_RESTRICTED_API}/${username}`)
    }

    findAllEvents=()=>{
        return instant.get(AUTH.FIND_ALL_EVENT_API)
    }

    wheelLuckySpin=(tenchitiet,mapt,mask)=>{
        return instant.put(`${AUTH.LUCKY_SPIN_EVENT_API}?tenchitiet=${tenchitiet}&mapt=${mapt}&mask=${mask}`);
    }

    findAllRewardJoined=()=>{
        return instant.get(AUTH.FIND_ALL_REWARD_JOINED_API);
    }

    findAllNotifyByUsernameAPI=(username)=>{
        return instant.get(`${AUTH.FIND_ALL_NOTIFY_BY_USERNAME_API}/${username}`);
    }

    updateStatusViewedAPI=(username)=>{
        return instant.put(`${AUTH.UPDATE_STATUS_VIEWED_BY_USERNAME_API}/${username}`,username);
    }

    updateStatusReadAPI=(notify)=>{
        return instant.put(AUTH.UPDATE_STATUS_READ_BY_USERNAME_API,notify);
    }

    giveToVoucherAPI=(tendn)=>{
        return instant.get(`${AUTH.GIVE_TO_VOUCHER_API}/${tendn}`);
    }
}

export const authService = new AuthService();