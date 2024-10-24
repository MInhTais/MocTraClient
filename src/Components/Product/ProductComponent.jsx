import { IoChevronDownOutline } from "@react-icons/all-files/io5/IoChevronDownOutline";
import { IoChevronUpOutline } from "@react-icons/all-files/io5/IoChevronUpOutline";
import { Rate } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Type from "../../Common/Const/Cart/CartConst";
import * as Action from "../../Common/Action/Authentication/AuthAction";

const customIcons = {
  1: <FrownOutlined />, 
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
}; 
export default function ProductComponent(props) {
  const dispatch = useDispatch();
  const { product } = props;
  const [quantity, setQuantity] = useState(1);
  const { reviews } = useSelector((state) => state.ReviewReducer);
  const { credentials } = useSelector((state) => state.AuthReducer);

  const editQuantity = (increase) => {
    let products = JSON.parse(localStorage.getItem("carts"));
    let pd = products ? products.find((sp) => sp.masp === product?.masp) : {};
    if (increase === true && product?.conlai > quantity + (!pd ? 0 : pd.sl)) {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1 && !increase) {
        setQuantity(quantity - 1);
      }
    }
  };

  const addWishlist = (sanpham) => {
    if (!credentials || credentials === "undefined") {
      setShowModal((prev) => !prev);
    } else {
      let wishlist = {
        mayt: null,
        taikhoan: {},
        sanpham,
      };

      dispatch({
        type: Action.ADD_WISHLIST_ACTION,
        wishlist,
      });
    }
  };

  const renderButtonAddCart = () => {
    let products = JSON.parse(localStorage.getItem("carts"));
    let pd = products ? products.find((sp) => sp.masp === product?.masp) : {};
    if (quantity + (!pd ? 0 : pd.sl) <= product?.conlai) {
      return (
        <button
          className="btn btn-primary"
          onClick={() => {
            product.sl = quantity;
            dispatch({
              type: Type.ADD_CART_QUANTITY_FREE,
              sanpham: product,
              sl: quantity,
            });
            setQuantity(1);
          }}
        >
          Thêm vào giỏ hàng
        </button>
      );
    } else {
      return (
        <button className="btn btn-primary" disabled>
          HẾT HÀNG
        </button>
      );
    }
  };

  return (
    <div>
      <div className="col-md-6 col-sm-6">
        <div className="product-main-image justify-center">
          <img
            src={"/images/product/" + product?.hinhanh}
            // style={{width: 350 }}
            alt="Bách Mộc"
            className="img-responsive h-full w-full fold:h-60 sm:h-80 xl:h-full"
            data-bigimgsrc={"/images/product/" + product?.hinhanh}
          />
        </div>
        <div className="product-other-images flex">
          <a
            href="./assets/pages/img/products/model3.jpg"
            className="fancybox-button w-1/3"
            rel="photos-lib"
          >
            <img alt="Bách Mộc" src="/assets/pages/img/products/model3.jpg" />
          </a>
          <a
            href="/assets/pages/img/products/model4.jpg"
            className="fancybox-button w-1/3"
            rel="photos-lib"
          >
            <img alt="Bách Mộc" src="/assets/pages/img/products/model4.jpg" />
          </a>
          <a
            href="/assets/pages/img/products/model5.jpg"
            className="fancybox-button w-1/3"
            rel="photos-lib"
          >
            <img alt="Bách Mộc" src="/assets/pages/img/products/model5.jpg" />
          </a>
        </div>
      </div>
      <div className="col-md-6 col-sm-6">
        <h1 className="uppercase font-bold text-green-900 text-base fold:text-md md:text-xl xl:text-4xl">{product?.tensp}</h1>
        <div className="price-availability-block clearfix flex flex-nowrap gap-6 fold:flex-wrap">
          <div className="price flex-none fold:flex-grow-0">
            <strong className="text-base fold:text-sm md:text-xl lg:text-2xl 2xl:text-3xl">
              {product?.dongia} 
            </strong><span>{!product?.dongia ? '' : 'đ'}</span>
            {product?.giamgia > 0 ? (
              <em>
                <span>{product?.giamgia}</span>
              </em>
            ) : (
              ""
            )}
          </div>
          <div className="availability flex-none fold:flex-grow-0">
            Trạng thái:
            {product?.conlai > 0 ? (
              <strong>Còn hàng</strong>
            ) : (
              <strong>Hết hàng</strong>
            )}
          </div>
          <div className="availability flex-none fold:flex-grow-0" style={{ marginRight: "10px" }}>
            Đã bán: <b>{product?.daban}</b>
          </div>
        </div>
        <div className="description">
          <p>
            {product?.mota === ""
              ? "Hiện tại chưa có mô tả cho sản phẩm này"
              : product?.mota}
          </p>
        </div>
        <div className="product-page-cart">
          <div className="product-quantity flex flex-nowrap fold:flex-grow-0">
            <input
              type="text"
              value={quantity}
              readOnly
              className="form-control input-sm"
            />
            <button
              className="btn quantity-up"
              onClick={() => editQuantity(true)}
            >
              <IoChevronUpOutline />
            </button>
            <button
              className="btn quantity-down"
              onClick={() => editQuantity(false)}
            >
              <IoChevronDownOutline />
            </button>
          </div>
          <div>{renderButtonAddCart()}</div>
        </div>
        <div className="review flex flex-nowrap gap-6 fold:flex-grow-0">
          <Rate
            defaultValue={3}
            character={({ index }) => customIcons[index + 1]}
          />
          <a>{reviews ? reviews.length : 0} đánh giá</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a style={{ cursor: "pointer" }} onClick={() => addWishlist(product)}>
            Thêm vào yêu thích
          </a>
        </div>
      </div>
    </div>
  ); 
}
