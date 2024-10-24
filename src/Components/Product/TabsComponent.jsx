import { AutoComplete, Avatar, Rate, Tabs } from "antd";
import React, { useState, useEffect } from "react";
import { Form, Formik, ErrorMessage } from "formik";
import { reportSchema, reviewSchema } from "../../validates/Review";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../Common/Action/Product/Product";
import {
  CommentOutlined,
  EditOutlined,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
  StopOutlined,
} from "@ant-design/icons";
import * as ReviewAction from "../../Common/Action/Review/ReviewAction";
import ReviewComponent from "./ReviewComponent";
import _ from "lodash";
import { OPEN_FORM_MODAL } from "../../Common/Const/Modal/ModalConst";
import LoginForm from "../Modal/LoginForm";
import { CUSTOMER, TITLE_LOGIN } from "../../Common/Const/Auth/AuthConst";
import { FIND_ACCOUNT_RESTRICTED_ACTION } from "../../Common/Action/Authentication/AuthAction";
import { notify } from "../../libs/Notify/Notify";
import { ADD_RESTRICTED_USER_WARNING } from "../../Common/Const/Notify/NotifyConst";
import ListCommentComponent from "./ListCommnentComponent";
const { TabPane } = Tabs;
const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};
export default function TabsComponent(props) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(3);
  const { product } = useSelector((state) => state.ProductReducer);
  const { reviews } = useSelector((state) => state.ReviewReducer);
  const { credentials, restricted } = useSelector((state) => state.AuthReducer);
  const { masp } = props;
  const [callBack,setCallBack] = useState(false);
  const size = useWindowSize();
  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
  }

  useEffect(() => {
    dispatch({
      type: Action.FIND_ALL_BY_MASP_ACTION,
      masp,
    });

    dispatch({
      type: ReviewAction.FIND_ALL_COMMENT_ACTION,
      masp,
    });

    if(credentials){
      dispatch({
        type: FIND_ACCOUNT_RESTRICTED_ACTION,
        tendn: credentials?.tendn
      })
    }

  }, [masp]);

  const handleSubmitReview = (values) => {
    if (credentials) {
      values.spdg = product;
      dispatch({
        type: ReviewAction.ADD_COMMENT_ACTION,
        reviews: values,
        masp: product.masp,
      });
      setCallBack(true)
    } else {
      dispatch({
        type: OPEN_FORM_MODAL,
        Component: <LoginForm />,
        title: TITLE_LOGIN,
        width: 500,
      });
    }
  };

  const handleSubmitReport = (values) => {
    if (!_.find(credentials?.roles, (e) => e === CUSTOMER)) {
      dispatch({
        type: OPEN_FORM_MODAL,
        Component: <LoginForm />,
        title: TITLE_LOGIN,
        width: 500,
      });
    } else {
      if(restricted?.baocao === 5){
        notify('warning',ADD_RESTRICTED_USER_WARNING);
      }else{
        dispatch({
          type: Action.ADD_PRODUCT_VIOLATION_ACTION,
          violation: values
        })
      }
    }
  };
  const options = [
    {
      value: 'Sản phẩm giả mạo',
    },
    {
      value: 'Sản phẩm ảnh hưởng sức khỏe người tiêu dùng',
    },
    {
      value: 'Sản phẩm mang tính đồi trụy',
    },
    {
      value: 'Sản phẩm đạo nhái, ăn cắp ý tưởng',
    },
    {
      value:'Quảng cáo các kênh bán hàng/sàn thương mại điện tử khác trong phần thông tin sản phẩm'
    },
    {
      value:'Nội dung đăng bán không phù hợp bao gồm: Đăng bán những sản phẩm bị cấm, hướng dẫn giao dịch ngoài Shopee, thay đổi nội dung sản phẩm và giảm giá không hợp lệ.'
    },{
      value: 'Sản phẩm hết hạn sử dụng'
    }
  ];
  return (
    <div className="container mt-10 bg-gray-50">
      <Tabs
        defaultActiveKey="2"
        tabPosition={size.width >= 540 ? "left" : "top"}
        centered
      >
        <TabPane
          key="1"
          tab={<Avatar icon={<EditOutlined />} className="bg-green-300" />}
          disabled={_.find(credentials?.roles,e=>e === CUSTOMER) ? false : true}
        >
          <div className="mt-4">
            <h1 className="mt-5 text-xl font-bold text-green-600 hover:text-green-800 cursor-default">
              ĐÁNH GIÁ
            </h1>
            <Formik
              initialValues={{
                tkdg: {
                  tendn:credentials?.tendn
                },
                noidung: "",
                danhgia: rating,
                spdg: props.masp,
              }}
              validationSchema={reviewSchema}
              onSubmit={handleSubmitReview}
            >
              {(formikProps) => (
                <Form className="w-full">
                  <div className="flex flex-col">
                    <div className="mb-4 w-full flex flex-row">
                      <div className="w-1/12">
                      <Avatar src={credentials?.hinhanh ? 'http://localhost:8080/images/user/'+credentials?.hinhanh : 'https://joeschmoe.io/api/v1/random'} alt="Mộc Trà" />
                      </div>
                      <div className="flex flex-col w-11/12">
                      <textarea
                        rows={5}
                        type="text"
                        name="noidung"
                        className="input-responsive"
                        placeholder="Sản phẩm tuyệt vời"
                        onChange={formikProps.handleChange}
                      />
                      <ErrorMessage name="noidung">
                        {(msg) => <div className="text-error">{msg}</div>}
                      </ErrorMessage>
                      </div>
                    </div>
                    <div className="mb-4 w-1/2">
                      <Rate
                        name="danhgia"
                        value={rating}
                        character={({ index }) => customIcons[index + 1]}
                        onChange={(e) => {
                          setRating(e);
                          formikProps.setFieldValue("danhgia", e);
                        }}
                      />
                    </div>
                    <div className="flex flex-row justify-center">
                      <button
                      type="submit"
                        className=" w-1/4 button-3d-green mb-5 rounded-md"
                      >
                        Đánh giá
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </TabPane>
        <TabPane
          key="2"
          tab={<Avatar icon={<CommentOutlined />} className="bg-green-300" />}
        >
          <div className="container">
            <h1 className="mt-5 text-xl font-bold text-green-600 hover:text-green-800 cursor-default">BÌNH LUẬN</h1>
          {reviews?.length > 0 ? (
            <ListCommentComponent reviews={reviews} masp={masp} callBack={callBack} setCallBack={setCallBack} detail={false} props={props} />
          ) : (
            "Chưa có đánh giá nào cho sản phẩm này"
          )}
          </div>
        </TabPane>
        <TabPane
          key="3"
          disabled={_.find(credentials?.roles,e=>e === CUSTOMER) ? false : true}
          tab={<Avatar icon={<StopOutlined />} className="bg-green-300" />}
        >
          <div className="mt-4">
            <h1 className="mt-5 mb-5 text-xl font-bold text-green-600 hover:text-green-800 cursor-default">
              BÁO CÁO SẢN PHẨM VI PHẠM
            </h1>
            <Formik
              initialValues={{
                email: credentials?.tendn,
                noidung: "",
                sp: product,
              }}
              validationSchema={reportSchema}
              onSubmit={handleSubmitReport}
            >
              {(formikProps) => (
                <Form className="w-full">
                  <div className="flex fold:flex-col xl:flex-row gap-6">
                    <div className="mb-4 fold:w-full xl:w-1/2">
                      <AutoComplete
                        style={{
                          width: 550,
                          height:50
                        }}
                        name="noidung"
                        onChange={(e)=>{
                          formikProps.setFieldValue('noidung',e);
                        }}
                        options={options}
                        filterOption={(inputValue, option) =>
                          option.value
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                        }
                      ><input className="input-responsive" /></AutoComplete>
                      <ErrorMessage name="noidung">
                        {(msg) => <div className="text-error">{msg}</div>}
                      </ErrorMessage>
                    </div>
                    <div className="flex flex-row fold:justify-center xl:justify-start fold:w-full xl:w-1/2">
                      <button
                        type="submit"
                        className="fold:w-full duo:w-1/2 button-3d-red mb-5 rounded-md"
                      >
                        Báo cáo vi phạm
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
