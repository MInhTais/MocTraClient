import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../Common/Action/Product/Product";
import * as ReviewAction from "../../Common/Action/Review/ReviewAction";
import TabsComponent from "./TabsComponent";
import RelatedComponent from "./RelatedComponent";
import ProductDetailComponent from "./ProductDetailComponent";
import _ from "lodash";
import { SELLER } from "../../Common/Const/Auth/AuthConst";
import {GET_MY_STORE_ACTION} from '../../Common/Action/Admin/SellerAction';
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import { DETAIL_PRODUCT_PAGE_DESCRIPTION } from "../../Common/Const/Page/PageConst";
export default function ProductDetail(props) {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.ProductReducer);
  const { reviews } = useSelector((state) => state.ReviewReducer);
  const {masp} = props.match.params;
  const {credentials} = useSelector((state)=>state.AuthReducer);
  const [viewDetail,setViewDetail] = useState(true);
  const {size} = props;
  useEffect(() => {
    if(!product){
      dispatch({
        type: Action.FIND_ALL_BY_MASP_ACTION,
        masp,
      });
    }

    if(!reviews){
      dispatch({
        type: ReviewAction.FIND_ALL_COMMENT_ACTION,
        masp,
      });
    }

   if(_.find(credentials?.roles,e=>e===SELLER)){
      dispatch({
        type: GET_MY_STORE_ACTION
      })
   }
  }, []);

  return (
    <>
      <div className="md:container product-page w-full">
        <MetaDecorator title={product?.tensp} description={DETAIL_PRODUCT_PAGE_DESCRIPTION} />
        <div className="flex flex-col mt-5">
          <ProductDetailComponent size={size} viewDetail={viewDetail} setViewDetail={setViewDetail} product={product} reviews={reviews} />
          <TabsComponent masp={masp} />  
          <RelatedComponent />
        </div>
      </div>
    </>
  );
}
