import React from "react";
import Carousel from "react-multi-carousel";
import { useSelector } from "react-redux";
import _ from "lodash";
import { responsiveProductHome } from "../Home/ResponsiveCarousel";
import ProductSingleComponent from '../Home/ProductSingleComponent';
export default function RelatedComponent(props) {
  
  const { related,product } = useSelector((state) => state.ProductReducer);
  
  return (
    <div className="mt-5">
      <h1 className="text-base fold:text-md md:text-lg lg:text-xl">SẢN PHẨM LIÊN QUAN</h1>
      <Carousel
    responsive={responsiveProductHome}
  >
        {_.map(_?.filter(related, e=> e.masp !== product?.masp && e.conlai >0),(product,i) => {
          return (
            <ProductSingleComponent product={product} i={i} key={i} />
          );
        })}
      </Carousel>
    </div>
  );
}
