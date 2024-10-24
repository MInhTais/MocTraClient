import * as Type from '../../../Common/Const/Admin/AdminConst';

const initialState = {
    tabsKey:1,
    tabsKeyChartProduct:1,
    dtbh: [],
    cp:[],
    dt:[],
    sp:[],
    spt: [],
    mtdtbh: [],
    mtcp:[],
    mtdt:[],
    mtsp:[],
    bddt:[],
    mtbddt:[],
    bdsp:[],
    dtbdsp:[]
}

export const StatisticalReducer = (state = initialState, action) => {
    switch (action.type) {

    case Type.FIND_ALL_STATISTICAL:{
        const {dtbh,cp,dt,sp,spt,mtdtbh,mtcp,mtdt,mtsp,bddt,mtbddt,bdsp,dtbdsp} = action.data;
        state.dtbh = dtbh;
        state.cp = cp;
        state.dt = dt;
        state.sp = sp;
        state.spt = spt;
        state.mtdtbh = mtdtbh;
        state.mtcp = mtcp;
        state.mtdt = mtdt;
        state.mtsp = mtsp;
        state.bddt = bddt;
        state.mtbddt = mtbddt;
        state.bdsp = bdsp;
        state.dtbdsp = dtbdsp;
        return { ...state}
    }
    case Type.SET_TABS_KEY_STATISTICAL:{
        state.tabsKey = action.key;
        return {...state};
    }
    case Type.SET_CHART_PRODUCT_BY_MONTH:{
        state.bdsp = action.bdsp;
        return {...state};
    }
    case Type.SET_CHART_PRODUCT_PARTNER_BY_MONTH:{
        state.dtbdsp = action.dtbdsp;
        return {...state};
    }
    case Type.SET_TABS_KEY_CHART_PRODUCT:{
        state.tabsKeyChartProduct = action.tabsKey;
        return {...state};
    }
    default:{
        return {...state}
    }
        
    }
}
