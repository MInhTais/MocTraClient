import _ from "lodash";
import * as Type from "../../../Common/Const/Product/ProductConst";
import moment from 'moment';
const initProduct = {
  product: {},
  related: [],
  image: {},
  preview: "",
  listProduct: [],
  search: JSON.parse(localStorage.getItem('search')) ? JSON.parse(localStorage.getItem('search')) : [],
  listSearch:[],
  productPagination:[],
  hasMore: false,
  listProductSeller:[],
  keyword: null
};

export const ProductReducer = (state = initProduct, action) => {
  switch (action.type) {
    case Type.FIND_BY_MASP: {
      state.product = action.product;
      return { ...state };
    }
    case Type.FIND_BY_MASP_BY_CATEGORY: {
      state.related = action.related;
      return { ...state };
    }
    case Type.UPLOAD_PICTURE_PRODUCT: {
      state.image = action.image;
      state.preview = action.preview;
      return { ...state };
    }
    case Type.GET_ALL_PRODUCT_BY_KEYWORD: {
      console.log("GET_BY_KEYWORD",action.listProduct)
      let pagination =[...action.listProduct].length >= 3 ? [...action.listProduct]?.splice(0,3) : [...action.listProduct] 
      state.listProduct = [...action.listProduct];
      state.productPagination = _.filter(pagination,e=>e.trangthai && e.conlai);
      state.hasMore = [...action.listProduct]?.length === 0 ? false : [...action.listProduct]?.length - pagination.length >= 0 ? true : false;
      return { ...state };
    }
    case Type.FILTER_BY_PRICE:{
      const {min,max,keyword} = action;
      let listProduct = state.listProduct;
      switch (keyword) {
        case Type.KEYWORD_LESSTHAN_40000:{
          state.productPagination = _.filter(listProduct,e=> e.dongia < max);
          state.hasMore = false;
          return {...state};
        }break;
        case Type.KEYWORD_LESSTHAN_120000_AND_GREATER_THAN_40000:{
          state.productPagination = _.filter(listProduct,e=>e.dongia>=min && e.dongia < max);
          state.hasMore = false;
          return {...state};
        }break;
        case Type.KEYWORD_LESSTHAN_380000_AND_GREATER_THAN_120000:{
          state.productPagination = _.filter(listProduct,e=>e.dongia>=min && e.dongia < max);
          state.hasMore = false;
          return {...state};
        }break;
        case Type.KEYWORD_GREATER_THAN_380000:{
          state.productPagination = _.filter(listProduct,e=>e.dongia > min);
          state.hasMore = false;
          return {...state};
        }
          break;
      
        default:
          break;
      }
     
      
      
    }
    case Type.GET_PRODUCT_PAGINATION:{
      let productPagination = _.filter(action.productPagination, e=>e.trangthai && e.conlai>0);
      state.productPagination =[...state.listProduct].splice(0,productPagination.length+3);
      state.hasMore =  [...state.listProduct].length - state.productPagination.length > 0 ? true : false;
      return {...state};
    }
    case Type.GET_ALL_PRODUCT_BY_SEARCH: {
      state.listSearch = action.listSearch;
      return { ...state };
    }
    case Type.ADD_SEARCH_KEY: {
      let searchUpdate = [...state.search];
      if (searchUpdate === null) {
        searchUpdate.push(action.search);
      } else {
        let index = _.findIndex(
          searchUpdate,
          (s) => s.title === action.search.title
        );
        if (index === -1) {
          searchUpdate.push(action.search);
        }else{
          console.log("SEARCH",action.search)
          searchUpdate[index].datetime = moment();
        }
      }
      state.search = searchUpdate;
      localStorage.setItem("search", JSON.stringify(searchUpdate));
      return { ...state };
    }
    case Type.DELETE_SEARCH_KEY:{
      let searchUpdate = _?.filter([...state.search],(e) => e.title !== action.title);
      localStorage.setItem("search", JSON.stringify(searchUpdate));
      state.search = searchUpdate;
      return { ...state };
    }
    case Type.GET_ALL_PRODUCT_OF_SELLER:{
      state.listProductSeller = action.listProductSeller;
      return {...state};
    }
    case Type.KEYWORD:{
      state.keyword = action.keyword;
      return {...state};
    }
    default: {
      return { ...state };
    }
  }
};
