import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FIND_ALL_CAROUSEL_ACTION } from "../../Common/Action/Carousel/CarouselAction";
import _ from "lodash";
import { DOMAIN } from "../../Common/API/domain";

export default function CarouselHome(props) {
  const dispatch = useDispatch();
  const { carousel } = useSelector((state) => state.CarouselReducer);
  const {title} = props;
  useEffect(() => {
    dispatch({
      type: FIND_ALL_CAROUSEL_ACTION,
    });
  }, []);
  const contentStyle = {
    height: _.isEqual(title,'NoneSidebarTemplate') ?  "320px"  :'220px',
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    backgroundPosition: "center",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
  };
  const picture = DOMAIN + "/images/background";
  return (
    <div>
      <Carousel autoplay className="relative">
        {_.map(carousel, (item, i) => {
          return (
            <div key={i}>
              <div
                style={{
                  ...contentStyle,
                  backgroundImage: `url(${picture}/${item.hinhanh})`,
                }}
              >
                <img
                  src={picture + "/" + item.hinhanh}
                  className="w-full opacity-0"
                  alt="123"
                />
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
