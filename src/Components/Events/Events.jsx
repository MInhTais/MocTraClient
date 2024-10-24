import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FIND_ALL_EVENT_ACTION } from "../../Common/Action/Authentication/AuthAction";
import LuckySpinComponent from "../LuckySpin/LuckySpinComponent";
import moment from "moment";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import JoinedListComponent from "./JoinedListComponent";
import MetaDecorator from "../../libs/Helmet/MetaDecorator";
import { PARTICIPANT_EVENT_PAGE_DESCRIPTION, PARTICIPANT_EVENT_PAGE_TITLE } from "../../Common/Const/Page/PageConst";

export default function Events() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.isAuthReducer);
  useEffect(() => {
    dispatch({
      type: FIND_ALL_EVENT_ACTION,
    });
  }, []);

  const minuteSeconds = 60;
  const hourSeconds = 3600;
  const daySeconds = 86400;

  const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 6,
  };

  const renderTime = (dimension, time) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div>{dimension}</div>
      </div>
    );
  };

  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
  const getTimeDays = (time) => (time / daySeconds) | 0;

  const stratTime = moment().unix();
  const endTime = moment(events.ngaybatdau).unix();
  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;
  const remainHour = moment(events?.ngaybatdau).unix() - stratTime;
  const expired = moment(events?.ngayketthuc).unix() - stratTime;

  return (
    <div className="w-full bg-green-50">
      <MetaDecorator title={PARTICIPANT_EVENT_PAGE_TITLE} description={PARTICIPANT_EVENT_PAGE_DESCRIPTION} />
      {events?.ngaybatdau && remainingTime > 0 ? (
        <div className="flex flex-col py-14">
          <div className="w-full flex flex-row justify-center p-5">
            <label className="text-2xl font-bold text-green-700 animate-pulse">
              SỰ KIỆN SẼ BẮT ĐẦU SAU:{" "}
            </label>
          </div>
          <div className="w-full flex flex-row justify-center gap-10 pt-5">
            <CountdownCircleTimer
              {...timerProps}
              colors={[["#556B2F"]]}
              duration={daySeconds}
              initialRemainingTime={remainingTime % daySeconds}
            >
              {({ elapsedTime }) =>
                renderTime("Ngày", getTimeDays(daysDuration - elapsedTime))
              }
            </CountdownCircleTimer>
            <CountdownCircleTimer
              {...timerProps}
              colors={[["#D14081"]]}
              duration={daySeconds}
              initialRemainingTime={remainHour}
              onComplete={(totalElapsedTime) => [
                remainingTime - totalElapsedTime > hourSeconds,
              ]}
            >
              {({ elapsedTime }) =>
                renderTime("Giờ", getTimeHours(daySeconds - elapsedTime))
              }
            </CountdownCircleTimer>
            <CountdownCircleTimer
              {...timerProps}
              colors={[["#EF798A"]]}
              duration={hourSeconds}
              initialRemainingTime={
                remainHour
                  ? remainHour
                  : moment(new Date(events?.ngaybatdau)).unix() - stratTime
              }
              onComplete={(totalElapsedTime) => [
                remainingTime - totalElapsedTime > minuteSeconds,
              ]}
            >
              {({ elapsedTime }) =>
                renderTime("Phút", getTimeMinutes(hourSeconds - elapsedTime))
              }
            </CountdownCircleTimer>
          </div>
        </div>
      ) : null}
      {events?.ptsk && remainingTime <= 0 ? (
        <div className="w-full flex flex-row justify-center bg-green-50">
          <LuckySpinComponent events={events} reward={events?.ptsk?.ctpt} />
        </div>
      ) : expired <= 0 ? (
        <JoinedListComponent />
      ) : null}
    </div>
  );
}
