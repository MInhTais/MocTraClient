import * as Loading from '../../../Common/Const/Loading/Loading';
import {call, takeLatest, put, delay} from 'redux-saga/effects';
import {categoryService} from '../../../Services/CategoryService';
import * as system from '../../../Common/API/domain';
import * as Category from '../../../Common/Const/Category/CategoryConst';
import * as Action from '../../../Common/Action/Category/CategoryAction';

function * findAllCategoryAPI(action){
    yield put({
        type: Loading.DISPLAY_LOADING
    });
    yield delay(1000);
    try {
        let {data, status} = yield call(categoryService.findAll);
        if(status === system.STATUS.SUCCESS){
            yield put({
                type: Category.FIND_ALL_CATEGORIES,
                categories: data
            });
        }else{
            console.log("Error", status);
        }
    } catch (error) {
        console.log("Error", error);
    }
    yield put({
        type: Loading.HIDE_LOADING
    });
}

export function * ActionFindAllCategoryAPI(){
    yield takeLatest(
        Action.FIND_ALL_CATEGORIES_ACTION,
        findAllCategoryAPI
    );
}