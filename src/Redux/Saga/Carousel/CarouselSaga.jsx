import {DISPLAY_LOADING, HIDE_LOADING} from '../../../Common/Const/Loading/Loading';
import {put, takeLatest, delay, call} from 'redux-saga/effects';
import {carouselService} from '../../../Services/CarouselService';
import {STATUS} from '../../../Common/API/domain';
import {FIND_ALL_CAROUSEL} from '../../../Common/Const/Carousel/CarouselConst';
import {FIND_ALL_CAROUSEL_ACTION} from '../../../Common/Action/Carousel/CarouselAction';
import { ADD_CAROUSEL_ACTION, DELETE_CAROUSEL_ACTION, UPDATE_CAROUSEL_ACTION } from '../../../Common/Action/Admin/AdminAction';
import { CLOSE_DRAWER } from '../../../Common/Const/Admin/Drawer';
import { notify } from '../../../libs/Notify/Notify';
import { ADD_ERROR_MESSAGE, ADD_SUCCESS_MESSAGE, DELETE_ERROR_MESSAGE, DELETE_SUCCESS_MESSAGE, UPDATE_ERROR_MESSAGE, UPDATE_SUCCESS_MESSAGE } from '../../../Common/Const/Notify/NotifyConst';

function * getAllCarousel(action){
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(1000);

    try {
        const {data, status} = yield call(carouselService.getAllCarousel);
        if(status === STATUS.SUCCESS){
            yield put({
                type: FIND_ALL_CAROUSEL,
                carousel: data
            })
        }else{
            console.log("Error", status)
        }
    } catch (error) {
        console.log("Error", error);
    }

    yield put({
        type: HIDE_LOADING
    })
}

function * saveCarousel(action){
    const {carousel} = action;
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    try {
        const {status} = yield call(()=>{return carouselService.saveCarousel(carousel)});
        if(status === STATUS.SUCCESS){
            yield put({
                type: FIND_ALL_CAROUSEL_ACTION,
            })
            yield put({
                type: CLOSE_DRAWER
            })
            notify('success', ADD_SUCCESS_MESSAGE);
        }else{
            console.log("Error", status)
        }
    } catch (error) {
        console.log("Error", error);
        notify('error', ADD_ERROR_MESSAGE);
    }

    yield put({
        type: HIDE_LOADING
    })
}

function * updateCarousel(action){
    const {carousel} = action;
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    try {
        const {status} = yield call(()=>{return carouselService.updateCarousel(carousel)});
        if(status === STATUS.SUCCESS){
            yield put({
                type: FIND_ALL_CAROUSEL_ACTION,
            })
            yield put({
                type:CLOSE_DRAWER
            })
            notify('success',UPDATE_SUCCESS_MESSAGE)
        }else{
            console.log("Error", status)
        }
    } catch (error) {
        console.log("Error", error);
        notify('error', UPDATE_ERROR_MESSAGE);
    }

    yield put({
        type: HIDE_LOADING
    })
}


function * deleteCarousel(action){
    const {carousel} = action;
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    try {
        const {status} = yield call(()=>{return carouselService.deleteCarousel(carousel)});
        if(status === STATUS.SUCCESS){
            yield put({
                type: FIND_ALL_CAROUSEL_ACTION,
            })
            yield put({
                type: CLOSE_DRAWER
            })
            notify('success', DELETE_SUCCESS_MESSAGE);
        }else{
            console.log("Error", status)
        }
    } catch (error) {
        console.log("Error", error);
        notify('error', DELETE_ERROR_MESSAGE);
    }

    yield put({
        type: HIDE_LOADING
    })
}


export function * ActionGetAllCarousel(){
    yield takeLatest(
        FIND_ALL_CAROUSEL_ACTION,
        getAllCarousel
    )
}

export function * ActionSaveCarousel(){
    yield takeLatest(
        ADD_CAROUSEL_ACTION,
        saveCarousel
    )
}

export function * ActionUpdateCarousel(){
    yield takeLatest(
        UPDATE_CAROUSEL_ACTION,
        updateCarousel
    )
}

export function * ActionDeleteCarousel(){
    yield takeLatest(
        DELETE_CAROUSEL_ACTION,
        deleteCarousel
    )
}