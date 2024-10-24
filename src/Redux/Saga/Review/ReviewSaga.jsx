import * as LOADING from '../../../Common/Const/Loading/Loading';
import {takeLatest, put, call, delay} from 'redux-saga/effects';
import * as System from '../../../Common/API/domain';
import {reviewService} from '../../../Services/ReviewService';
import * as Type from '../../../Common/Const/Review/ReviewAction';
import * as Action from '../../../Common/Action/Review/ReviewAction';
import { notify } from '../../../libs/Notify/Notify';
import * as MESSAGE from '../../../Common/Const/Notify/NotifyConst';
import { CLOSE_MODAL } from '../../../Common/Const/Modal/ModalConst';
import { CLOSE_DRAWER } from '../../../Common/Const/Admin/Drawer';

function * findAllCommentByMaSPAPI(action){
    const {masp}  = action;
    yield delay(1000);
    try {
        let {data, status} = yield call(()=>{return reviewService.findAllByMasp(masp)});
        if(status === System.STATUS.SUCCESS){
            yield put({
                type: Type.FIND_ALL_COMMENT,
                reviews: data
            })
        }else{
            console.log("Error", status);
        }
    } catch (error) {
        console.log("Error", error)
    }
}

function * saveCommentAPI(action){
    const {reviews, masp} = action;
    yield put({
        type: LOADING.DISPLAY_LOADING
    })
    yield delay(500);
    try {
        let {status} = yield call(()=>{return reviewService.saveComment(reviews)});
        if(status === System.STATUS.SUCCESS){
            yield put({
                type: Action.FIND_ALL_COMMENT_ACTION,
                masp
            })
            notify('success', MESSAGE.ADD_REVIEW_SUCCESS)

            yield put({
                type: CLOSE_DRAWER
            })
        }else{
            console.log("Error", status);
            notify('error', MESSAGE.ADD_REVIEW_FAILED)
        }
    } catch (error) {
        notify('error', MESSAGE.ADD_REVIEW_FAILED)
        console.log("Error REVIEWS", error);
    }
    yield put({
        type: LOADING.HIDE_LOADING
    })
}

function * updateCommentAPI(action){
    const {review,masp} = action;
    yield put({
        type: LOADING.DISPLAY_LOADING
    })
    yield delay(500);
    try {
        let {status} = yield call(()=>{return reviewService.updateComment(review)});
        if(status === System.STATUS.SUCCESS){
            yield put({
                type: Action.FIND_ALL_COMMENT_ACTION,
                masp
            })

            yield put({
                type: CLOSE_DRAWER
            })

            notify('success', MESSAGE.UPDATE_REVIEW_SUCCESS)
        }else{
            console.log("Error", status);
        }
    } catch (error) {
        console.log("Error REVIEWS", error);
        notify('error',MESSAGE.UPDATE_REVIEW_FAILED)
    }
    yield put({
        type: LOADING.HIDE_LOADING
    })
}

function * deleteCommentAPI(action){
    const {review,masp} = action;
    yield put({
        type: LOADING.DISPLAY_LOADING
    })
    yield delay(500);
    try {
        let {status} = yield call(()=>{return reviewService.deleteComment(review)});
        if(status === System.STATUS.SUCCESS){
            yield put({
                type: Action.FIND_ALL_COMMENT_ACTION,
                masp
            })
            notify('success',MESSAGE.DELETE_SUCCESS_MESSAGE)
        }else{
            console.log("Error", status);
            notify('error',MESSAGE.DELETE_ERROR_MESSAGE)
        }
    } catch (error) {
        console.log("Error REVIEWS", error);
        notify('error',MESSAGE.DELETE_ERROR_MESSAGE)
    }
    yield put({
        type: LOADING.HIDE_LOADING
    })
}

function * saveReplyAPI(action){
    const {reply, masp} = action;
    yield put({
        type: LOADING.DISPLAY_LOADING
    })
    yield delay(500);
    try {
        let { status} = yield call(()=>{return reviewService.saveReply(reply)});
        if(status === System.STATUS.SUCCESS){
            yield put({
                type: Action.FIND_ALL_COMMENT_ACTION,
                masp
            })
            yield put({
                type: CLOSE_MODAL
            })
            notify('success', MESSAGE.REPLY_SUCCESS)
        }else{
            console.log("Error", status);
        }
    } catch (error) {
        console.log("Error", error);
        notify('error', MESSAGE.REPLY_FAILED)
    }
    yield put({
        type: LOADING.HIDE_LOADING
    })
}

export function * ActionFindAllSanphamByMaspAPI(){
    yield takeLatest(
        Action.FIND_ALL_COMMENT_ACTION,
        findAllCommentByMaSPAPI
    )
}

export function * ActionSaveCommentAPI(){
    yield takeLatest(
        Action.ADD_COMMENT_ACTION,
        saveCommentAPI
    )
}

export function * ActionUpdateCommentAPI(){
    yield takeLatest(
        Action.UPDATE_COMMENT_ACTION,
        updateCommentAPI
    )
}

export function * ActionDeleteCommentAPI(){
    yield takeLatest(
        Action.DELETE_COMMENT_ACTION,
        deleteCommentAPI
    )
}

export function * ActionSaveReplyAPI(){
    yield takeLatest(
        Action.ADD_REPLY_ACTION,
        saveReplyAPI
    )
}
