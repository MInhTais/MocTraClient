import React from "react";
import WheelComponent from "react-wheel-of-prizes";


export default function LuckySpinComponent() {
  const segments = [
    "Chúc may mắn lần sau",
    "1000 xu",
    "2000 xu",
    "Chúc may mắn lần sau",
    "10000",
    "Mã giảm giá 20k",
    "Chúc may mắn lần sau"
  ];
  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
  ];
  const onFinished = (winner) => {
    console.log(winner);
  };
  return (
    <div>
      <WheelComponent
        segments={segments}
        segColors={segColors}
        onFinished={(winner) => onFinished(winner)}
        primaryColor="black"
        contrastColor="white"
        buttonText="Quay"
        isOnlyOnce={false}
        size={290}
        upDuration={500}
        downDuration={1000}
        fontFamily="Arial"
      />
    </div>
  );
}
