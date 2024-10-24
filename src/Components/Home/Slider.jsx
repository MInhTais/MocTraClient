import React, { useEffect, useState } from "react";
import BannerAnim from "rc-banner-anim";
import TweenOne, { TweenOneGroup } from "rc-tween-one";
import _ from "lodash";
import { DOMAIN } from "../../Common/API/domain";
const { Element, Arrow, Thumb } = BannerAnim;
const BgElement = Element.BgElement;

export default function Slider({size}) {

  
  const carousel =[
    {
      hinhanh:'carousel-1.png',
      noidung:'ABC'
    },
    {
      hinhanh:'carousel-2.png',
      noidung:'CDDCD'
    },
    {
      hinhanh:'carousel-3.png',
      noidung:'cdf'
    }
  ]

  const [state, setState] = useState({
    intShow: 0,
    prevEnter: false,
    nextEnter: false,
    thumbEnter: false,
  });


  const onChange = (type, int) => {
    if (type === "before") {
      setState({
        intShow: int,
      });
    }
  };
  const contentStyle = {
    height: size?.width >=1000 ?  "220px": size?.width>=768 && size?.width<1000 ? '210px':'300px',
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    backgroundPosition: 'center',
    backgroundSize:'100%',
    backgroundRepeat:'no-repeat'
  };

  const getNextPrevNumber = () => {
    let nextInt = state.intShow + 1;
    let prevInt = state.intShow - 1;
    if (nextInt >= carousel.length) {
      nextInt = 0;
    }
    if (prevInt < 0) {
      prevInt = carousel.length - 1;
    }

    return [prevInt, nextInt];
  };

  const prevEnter = () => {
    setState({
      prevEnter: true,
    });
  };

  const prevLeave = () => {
    setState({
      prevEnter: false,
    });
  };

  const nextEnter = () => {
    setState({
      nextEnter: true,
    });
  };

  const nextLeave = () => {
    setState({
      nextEnter: false,
    });
  };

  const onMouseEnter = () => {
    setState({
      thumbEnter: true,
    });
  };

  const onMouseLeave = () => {
    setState({
      thumbEnter: false,
    });
  };
  const picture = DOMAIN+'/images/carousel';
  const intArray = getNextPrevNumber();
  const thumbChildren = _?.map(carousel,(img, i) => (
    <span key={i}>
      <i style={{ backgroundImage: `url(${picture}/${img?.hinhanh})` }} />
    </span>
  ));

  return (
      <BannerAnim
        onChange={onChange}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        prefixCls="custom-arrow-thumb"
        autoPlay={true}
      >
        {_?.map(carousel, (item, i) => {
          return (
            <Element key={i} prefixCls="banner-user-elem">
              <BgElement
                key="bg"
                className="bg"
                style={{
                  ...contentStyle, backgroundImage:`url(${picture}/${item.hinhanh})`
                }}
              />
              <TweenOne
                className="banner-user-title"
                animation={{ y: 30, opacity: 0, type: "from" }}
              >
               
              </TweenOne>
              <TweenOne
                className="banner-user-text"
                animation={{ y: 30, opacity: 0, type: "from", delay: 100 }}
              >
                
              </TweenOne>
            </Element>
          );
        })}
        <Arrow
          arrowType="prev"
          key="prev"
          prefixCls="user-arrow"
          component={TweenOne}
          onMouseEnter={prevEnter}
          onMouseLeave={prevLeave}
          animation={{ left: state.prevEnter ? 0 : -120 }}
        >
          <div className="arrow"></div>
          <TweenOneGroup
            enter={{ opacity: 0, type: "from" }}
            leave={{ opacity: 0 }}
            appear={false}
            className="img-wrapper"
            component="ul"
          >
            <li
              style={{ backgroundImage: `url(${picture}/${_.first(carousel)?.hinhanh})` }}
              key={intArray[0]}
            />
          </TweenOneGroup>
        </Arrow>
        <Arrow
          arrowType="next"
          key="next"
          prefixCls="user-arrow"
          component={TweenOne}
          onMouseEnter={nextEnter}
          onMouseLeave={nextLeave}
          animation={{ right: state.nextEnter ? 0 : -120 }}
        >
          <div className="arrow"></div>
          <TweenOneGroup
            enter={{ opacity: 0, type: "from" }}
            leave={{ opacity: 0 }}
            appear={false}
            className="img-wrapper"
            component="ul"
          >
            <li
              style={{ backgroundImage: `url(${picture}/${_.last(carousel)?.hinhanh})` }}
              key={intArray[1]}
            />
          </TweenOneGroup>
        </Arrow>
        <Thumb
          prefixCls="user-thumb"
          key="thumb"
          component={TweenOne}
          animation={{ bottom: state.thumbEnter ? 0 : -70 }}
        >
          {thumbChildren}
        </Thumb>
      </BannerAnim>
  );
}
