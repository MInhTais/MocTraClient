import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_WISHLIST_VOUCHER_ACTION } from "../../Common/Action/Authentication/AuthAction";
import _ from "lodash";
import { STATUS_FORMTWO } from "../../Common/Const/Checkout/StatusConst";
export default function VoucherComponent({ checkout,total, setTotal, Fee,setFee }) {
  const dispatch = useDispatch();
  const { myvoucher } = useSelector((state) => state.isAuthReducer);
  const credentials = JSON.parse(localStorage.getItem('credentials'));
  const carts = JSON.parse(localStorage.getItem('carts'));
  const {formTwo} = useSelector(state=>state.StatusReducer);
  useEffect(() => {
    dispatch({
      type: ORDER_WISHLIST_VOUCHER_ACTION,
    });
  }, []);

  const handleChange = (e) =>{
    let firstTotal = !carts ? 0 : carts.reduce((total, sp, i) => {
        return (total += sp.dongia * sp.sl);
      }, 0)
    const {value} = e.target;
    let {lgg} = _.find(myvoucher,e=> e.magg === value);
    let {order} = formTwo;
    if(lgg && (total > lgg?.giatritoithieu)){
        
        let fee = Fee - lgg?.giagiam > 0 ? Fee - lgg?.giagiam : 0;
        setFee(fee);
        order.phiship = fee;
        order.tongcong = firstTotal + fee;
        dispatch({
            type: STATUS_FORMTWO,
            order
        })
    }
    
  }

  return (
    <>
      {checkout && credentials ? (
        <div className="flex flex-col justify-items-start">
          <label>Mã giảm giá</label>
          <select className="input-responsive" onChange={handleChange}>
            {_.map(myvoucher, (item, i) => {
              return (
                <option value={item.magg} key={i}>
                  {item.magg}
                </option>
              );
            })}
          </select>
        </div>
      ) : null}
    </>
  );
}
