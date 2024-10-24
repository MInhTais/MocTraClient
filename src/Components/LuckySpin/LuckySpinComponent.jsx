import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import WheelComponent from "react-wheel-of-prizes";
import { LUCKY_SPIN_EVENT_ACTION } from "../../Common/Action/Authentication/AuthAction";
import { CUSTOMER } from "../../Common/Const/Auth/AuthConst";
import { notify } from "../../libs/Notify/Notify";
import AccessDenied from '../Error/AccessDenied';

const segColors = [
  "#EE4040",
  "#F0CF50",
  "#815CD1",
  "#3DA5E0",
  '#BC8F8F',
  "#34A24F",
  "#F9AA1F",
  "#EC3F3F",
  "#FF9000",
  
];
export default function LuckySpinComponent(props) {
  const {reward,events} = props;
  const dispatch = useDispatch();
  const {credentials} = useSelector(state => state.AuthReducer);
  const renderSegments = () =>{
      return _.map(reward,(e)=>{
        return e.tenchitiet;
      })
  }

 
  const onFinished = (winner) => {
      notify('success',winner);
      dispatch({
        type: LUCKY_SPIN_EVENT_ACTION,
        tenchitiet:winner,
        mapt: _.first(reward)?.mapt,
        mask: events?.mask
      })
  };

  return (
      <>
        {_.find(credentials?.roles,e=> e===CUSTOMER) ? <WheelComponent
        segments={renderSegments()}
        segColors={segColors}
        onFinished={(winner) => onFinished(winner)}
        primaryColor="black"
        contrastColor="white"
        buttonText="Quay"
        isOnlyOnce={false}
        size={200}
        upDuration={500}
        downDuration={1000}
        fontFamily="Arial"
      /> : <AccessDenied />}
      </>
  )
}
