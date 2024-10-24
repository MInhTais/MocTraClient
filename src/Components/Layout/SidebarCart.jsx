import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import VoucherForm from "../Modal/VoucherForm";
import { OPEN_FORM_MODAL } from "../../Common/Const/Modal/ModalConst";
import LoginForm from "../Modal/LoginForm";
import { history } from "../../libs/History/history";
import FormAddressComponent from "../Checkout/FormAddressComponent";
import { GET_ADDRESS_DETAIL, VISIBLE_SELECT_TAG } from "../../Common/Const/Order/OrderConst";
import { TITLE_LOGIN } from "../../Common/Const/Auth/AuthConst";

export default function SidebarCart(props) {
  const { carts, voucher } = useSelector((state) => state.CartReducer);
  const { credentials } = useSelector((state) => state.AuthReducer);
  const { fee } = useSelector((state) => state.CheckoutReducer);
  const { address,checkout } = useSelector((state) => state.AddressReducer);
  const dispatch = useDispatch();
  const renderVoucherForm = () => {
    const action = {
      type: OPEN_FORM_MODAL,
      Component: credentials ? <VoucherForm /> : <LoginForm />,
      title: credentials ? "MÃ GIẢM GIÁ" : TITLE_LOGIN,
      width: credentials ? 700 : 600,
    };
    dispatch(action);
  };
  const addressDefault = _.find(address, (e) => e.macdinh === true);

  const renderCost = ()=>{
    if(checkout){
      let total_fee = fee?.total_fee ? fee?.total_fee : 0; 
      let sales = voucher?.lgg ? voucher?.lgg?.giagiam :0;
      let total = total_fee - sales;
      return total > 0 ? total : 0;
    }else{
      return 0;
    }
  }

  return (
    <div className="w-full flex flex-col justify-center max-w-md p-6 space-y-4 divide-y divide-gray-300 bg-gray-50 text-gray-800">
      <div className="pt-4 space-y-2 bg-gray-50">
        <div className="m-3">
          <div className="flex justify-between">
            <span className="font-bold">Giao đến</span>
            {addressDefault ? (
              <span
                className="text-green-600 hover:text-green-800 cursor-pointer"
                onClick={() => {
                  dispatch({
                    type: OPEN_FORM_MODAL,
                    Component: <FormAddressComponent />,
                    title: "CHỌN ĐỊA CHỈ GIAO HÀNG",
                    width: 700,
                  });

                  dispatch({
                    type: GET_ADDRESS_DETAIL,
                    detail: addressDefault,
                    edit: true,
                    index: _.findIndex(address, (e) => e.macdinh === true),
                  });
                }}
              >
                Thay đổi
              </span>
            ) : (
              <span
                className="text-green-600 hover:text-green-800 cursor-pointer"
                onClick={() => {
                  dispatch({
                    type: OPEN_FORM_MODAL,
                    Component: <FormAddressComponent />,
                    title: "CHỌN ĐỊA CHỈ GIAO HÀNG",
                    width: 700,
                  });

                  dispatch({
                    type: GET_ADDRESS_DETAIL,
                    detail: null,
                    edit: false,
                  });

                  dispatch({
                    type: VISIBLE_SELECT_TAG,
                  });
                }}
              >
                Chọn địa chỉ
              </span>
            )}
          </div>
        </div>
        {addressDefault ? (
          <div className="flex flex-col justify-between">
            <div className="flex flex-row m-3">
              <span className="flex justify-start font-bold">
                {addressDefault?.hoten} | {addressDefault?.sdt}
              </span>
            </div>
            <div className="flex flex-row flex-wrap">
              <p>
                {addressDefault?.duong}{" "}
                {addressDefault?.thitran?.name
                  ? "-" + addressDefault?.thitran?.name
                  : null}
                {addressDefault?.huyen?.name
                  ? "-" + addressDefault?.huyen?.name
                  : null}
                {addressDefault?.tinh?.name
                  ? "-" + addressDefault?.tinh?.name
                  : null}
              </p>
            </div>
          </div>
        ) : null}
      </div>
      <h2 className="text-2xl font-semibold">HÓA ĐƠN</h2>
      <ul className="flex flex-col pt-4 space-y-2">
        {_.map(_.filter(carts,(e)=>e.stick), (item, i) => {
          return (
            <li className="flex items-start justify-between" key={i}>
              <h3 title={item.tensp}>
                {item.tensp.length > 15
                  ? item.tensp.slice(0, 15) + "..."
                  : item.tensp}
                <span className="text-sm text-red-600"> x{item.sl}</span>
              </h3>
              <div className="text-right">
                <span className="block">
                  {(item.dongia - ((item.dongia*item.giamgia)/100)).toLocaleString()+'đ'}
                </span>
                {item.giamgia ? (
                  <span className="text-sm text-red-600">
                    {" "}
                    {item.giamgia > 0 ? '-'+item.giamgia+'%' : null}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="pt-4 space-y-2">
        <div>
          <div className="flex justify-between">
            <span>Khuyến mãi</span>
            <span>
              {voucher
                ? voucher?.lgg
                  ? voucher?.lgg?.giagiam?.toLocaleString()
                  : 0
                : 0}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-3 h-3 mt-1 fill-current text-red-600"
            >
              <path d="M485.887,263.261,248,25.373A31.791,31.791,0,0,0,225.373,16H64A48.055,48.055,0,0,0,16,64V225.078A32.115,32.115,0,0,0,26.091,248.4L279.152,486.125a23.815,23.815,0,0,0,16.41,6.51q.447,0,.9-.017a23.828,23.828,0,0,0,16.79-7.734L486.581,296.479A23.941,23.941,0,0,0,485.887,263.261ZM295.171,457.269,48,225.078V64A16.019,16.019,0,0,1,64,48H225.373L457.834,280.462Z" />
              <path d="M148,96a52,52,0,1,0,52,52A52.059,52.059,0,0,0,148,96Zm0,72a20,20,0,1,1,20-20A20.023,20.023,0,0,1,148,168Z" />
            </svg>
            <span
              className="text-yellow-600 cursor-pointer hover:text-yellow-800"
              onClick={() => renderVoucherForm()}
            >
              Chọn mã giảm giá
            </span>
          </div>
        </div>
        {credentials ? (
          <div className="flex justify-between">
            <span>Xu</span>
            <span>
              {_.ceil(_?.reduce(_?.filter(carts,(e)=>e.stick),(total, sp, i) => {
                return (total += (sp.dongia-(sp.dongia*sp.giamgia)/100) * sp.sl);
              }, 0) * 0.025)}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="pt-4 space-y-2">
        <div>
          <div className="flex justify-between">
            <span>Tạm tính</span>
            <span>
              {
                _?.reduce(_?.filter(carts,(e)=>e.stick),(total, sp, i) => {
                  return (total += (sp.dongia-(sp.dongia*sp.giamgia)/100) * sp.sl);
                }, 0)
                .toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>Giảm giá</span>
          <span className={voucher?.lgg ? 'text-red-600' : ''}>
            {voucher
              ? voucher?.lgg
                ? '-'+voucher?.lgg?.giagiam?.toLocaleString()
                : 0
              : 0}
          </span>
        </div>
      </div>
      <div className="pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span className={voucher?.lgg ? 'text-green-600' : ''}>
            {renderCost().toLocaleString() +'đ'}
          </span>
        </div>
        <div className="space-y-6">
          <div className="flex justify-between">
            <span>Tổng cộng</span>
            <span className={voucher?.lgg ? 'font-semibold text-green-600' : 'font-semibold'}>
              {(
                _?.reduce(_.filter(carts,e=> e.stick),(total, sp) => {
                  return (total += (sp.dongia-(sp.dongia*sp.giamgia)/100) * sp.sl);
                }, 0)  + renderCost()
              ).toLocaleString()+'đ'}
            </span>
          </div>
          {_.includes(window.location.href.toString(), "/thanh-toan") ? (
            ""
          ) : (
            _?.reduce(_.filter(carts,e=>e.stick),(total,sp)=>{return (total+=sp.dongia*sp.sl);},0) === 0 ? <button
            type="button"
            className="w-full cursor-not-allowed py-2 font-semibold border rounded bg-gray-600 text-gray-50 border-gray-600 hover:bg-gray-900 hover:shadow-lg"
            disabled
          >
            THANH TOÁN
          </button>:
          <button
          type="button"
          className="w-full py-2 font-semibold border rounded bg-red-600 text-gray-50 border-red-600 hover:bg-red-900 hover:shadow-lg"
          onClick={() => {
            if(credentials){
              history.push("/thanh-toan");
            }else{
              dispatch({
                type: OPEN_FORM_MODAL,
                Component: <LoginForm />,
                title: TITLE_LOGIN,
                width: 500,
              });
            }
          }}
        >
          THANH TOÁN
        </button>
          )}
        </div>
      </div>
    </div>
  );
}
