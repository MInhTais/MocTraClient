import Axios from 'axios';

export class commonService{
    put =(url,data) =>{
        return Axios({
            url,
            method: 'PUT',
            data,
            headers:{
                Authorization: JSON.parse(localStorage.getItem('credentials'))?.accesstoken
            }
        })
    }

    post = (url,data)=>{
        return Axios({
            url,
            method: 'POST',
            data,
            headers:{
                Authorization: JSON.parse(localStorage.getItem('credentials'))?.accesstoken,
                'Content-Type':'application/json'
            }
        })
    }

    get = (url)=>{
        return Axios({
            url,
            method:'GET',
            headers:{
                Authorization: JSON.parse(localStorage.getItem('credentials'))?.accesstoken
            }
        })
    }

    delete = (url)=>{
        return Axios({
            url,
            method:'DELETE',
            headers:{
                Authorization: JSON.parse(localStorage.getItem('credentials'))?.accesstoken
            }
        })
    }
}