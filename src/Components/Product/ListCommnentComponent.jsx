import React, { useEffect } from "react";
import { List, Avatar, Space, Rate, Popconfirm, Comment, Progress } from "antd";
import {
  MessageOutlined,
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DELETE_COMMENT_ACTION } from "../../Common/Action/Review/ReviewAction";
import _ from "lodash";
import { OPEN_FORM_MODAL } from "../../Common/Const/Modal/ModalConst";
import ReplyComponent from "./ReplyComponent";
import { OPEN_FORM } from "../../Common/Const/Admin/Drawer";
import {
  EDIT_REVIEW,
  EDIT_REVIEW_TITLE,
} from "../../Common/Const/Review/ReviewAction";
import { BUTTON_EDIT } from "../../Common/Const/Admin/AdminConst";
import ReviewForm from "../isAuthentication/Modal/ReviewForm";
import { MANAGER, SELLER, STAFF } from "../../Common/Const/Auth/AuthConst";
import { GET_MY_STORE_ACTION } from "../../Common/Action/Admin/SellerAction";
export default function ListCommnentComponent() {
  const { reviews } = useSelector((state) => state.ReviewReducer);
  const dispatch = useDispatch();
  const { credentials } = useSelector((state) => state.AuthReducer);
  const { cuahang } = useSelector((state) => state.SellerReducer);
  const { product } = useSelector((state) => state.ProductReducer);

  useEffect(() => {
    if (_.find(credentials?.roles, (e) => e === SELLER)) {
      dispatch({
        type: GET_MY_STORE_ACTION,
      });
    }
  }, []);

  const renderByRole = (item) => {
    if (_.find(credentials?.roles, (e) => e === STAFF || e === MANAGER)) {
      return (
        <IconText
          icon={
            <EllipsisOutlined
              className="text-gray-600 hover:text-gray-700 animate-ping"
              onClick={() => {
                dispatch({
                  type: OPEN_FORM_MODAL,
                  Component: <ReplyComponent review={item} />,
                  title: "Phản hồi",
                  width: 550,
                });
              }}
            />
          }
          text={
            <label
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => {
                dispatch({
                  type: OPEN_FORM_MODAL,
                  Component: <ReplyComponent review={item} />,
                  title: "Phản hồi",
                  width: 550,
                });
              }}
            >
              Phản hồi
            </label>
          }
          key="list-vertical-reply"
        />
      );
    } else {
      if (product?.nhacungcap?.cuahang) {
        if (
          _.isEqual(
            product?.nhacungcap?.cuahang?.tencuahang,
            cuahang?.tencuahang
          ) &&
          credentials
        ) {
          return (
            <IconText
              icon={
                <EllipsisOutlined
                  className="text-gray-600 hover:text-gray-700 animate-ping"
                  onClick={() => {
                    dispatch({
                      type: OPEN_FORM_MODAL,
                      Component: <ReplyComponent review={item} />,
                      title: "Phản hồi",
                      width: 550,
                    });
                  }}
                />
              }
              text={
                <label
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    dispatch({
                      type: OPEN_FORM_MODAL,
                      Component: <ReplyComponent review={item} />,
                      title: "Phản hồi",
                      width: 550,
                    });
                  }}
                >
                  Phản hồi
                </label>
              }
              key="list-vertical-reply"
            />
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  };

  const IconText = ({ icon, text }) => (
    <Space>
      <div className="w-full flex flex-row justify-start gap-2">
        <label> {icon}</label>
        <label>{text}</label>
      </div>
    </Space>
  );

  return (
    <div>
      <div className="flex flex-col w-full justify-center">
        <div className="w-full flex justify-center p-8 shadow-sm rounded-xl lg:p-12 bg-gray-50 text-gray-800">
          <div className="flex flex-col w-1/2">
            <h2 className="text-3xl font-semibold text-center">
              Khách hàng đánh giá
            </h2>
            <div className="flex flex-wrap justify-center items-center mt-2 mb-1 space-x-2">
              <div className="flex">
                <Rate
                  disabled
                  character={<HeartOutlined />}
                  value={_.ceil(
                    (_.reduce(
                      reviews,
                      (total, review) => {
                        return (total += review?.danhgia);
                      },
                      0
                    ) /
                      (reviews?.length * 5)) *
                      5,
                    2
                  )}
                  allowHalf
                />
              </div>
              <span className="text-gray-600">
                {_.ceil(
                  (_.reduce(
                    reviews,
                    (total, review) => {
                      return (total += review?.danhgia);
                    },
                    0
                  ) /
                    (reviews?.length * 5)) *
                    5,
                  2
                )}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Tổng {reviews?.length} đánh giá
            </p>
            <div className="flex flex-col justify-center w-full mt-4">
              <Progress
                percent={_?.ceil(
                  (_.filter(reviews, (e) => e.danhgia === 5)?.length /
                    reviews?.length) *
                    100,
                  2
                )}
                strokeColor={"#A2CD5A"}
              />
              <Progress
                percent={_?.ceil(
                  (_.filter(reviews, (e) => e.danhgia === 4)?.length /
                    reviews?.length) *
                    100,
                  2
                )}
                strokeColor={"#BCEE68"}
              />
              <Progress
                percent={_?.ceil(
                  (_.filter(reviews, (e) => e.danhgia === 3)?.length /
                    reviews?.length) *
                    100,
                  2
                )}
                strokeColor={"#CAFF70"}
              />
              <Progress
                percent={_?.ceil(
                  (_.filter(reviews, (e) => e.danhgia === 2)?.length /
                    reviews?.length) *
                    100,
                  2
                )}
                strokeColor={"#BCEE68"}
              />
              <Progress
                percent={_?.ceil(
                  (_.filter(reviews, (e) => e.danhgia === 1)?.length /
                    reviews?.length) *
                    100,
                  2
                )}
                strokeColor={"#CCFF66"}
              />
            </div>
          </div>
        </div>
      </div>

      <List
        itemLayout="vertical"
        size="large"
        className="text-left"
        pagination={{
          onChange: (page) => {
          },
          pageSize: 3,
        }}
        dataSource={reviews}
        footer={
          <div>
            <b className="text-green-700 animate-pulse">Mộc Trà</b>
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.madg}
            actions={[
              _.isEqual(item.tkdg?.tendn, credentials?.tendn) ? (
                <div className="w-full flex flex-row justify-start gap-6">
                  <IconText
                    icon={
                      <EditOutlined onClick={() => {
                        const action = {
                          type: OPEN_FORM,
                          Component: <ReviewForm />,
                          title: EDIT_REVIEW_TITLE,
                          nameButton: BUTTON_EDIT,
                          footer: false,
                        };
                        dispatch(action);
                        dispatch({
                          type: EDIT_REVIEW,
                          reviewEdit: item,
                        });
                      }} className="cursor-pointer text-gray-500 hover:text-gray-700" />
                    }
                    text={
                      <label
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                        onClick={() => {
                          const action = {
                            type: OPEN_FORM,
                            Component: <ReviewForm />,
                            title: EDIT_REVIEW_TITLE,
                            nameButton: BUTTON_EDIT,
                            footer: false,
                          };
                          dispatch(action);
                          dispatch({
                            type: EDIT_REVIEW,
                            reviewEdit: item,
                          });
                        }}
                      >
                        Chỉnh sửa
                      </label>
                    }
                    key="list-vertical-edit"
                  />

                  <IconText
                    icon={
                      <Popconfirm
                        onConfirm={() => {
                          dispatch({
                            type: DELETE_COMMENT_ACTION,
                            review:item,
                            masp: item?.spdg?.masp,
                          });
                        }}
                        okText="Đồng ý"
                        cancelText="Hủy bỏ"
                        title="Bạn có muốn xóa bình luận này?"
                        placement={"top"}
                      >
                        <DeleteOutlined className="cursor-pointer text-gray-500 hover:text-gray-700" />
                      </Popconfirm>
                    }
                    text={
                      <Popconfirm
                        onConfirm={() => {
                          dispatch({
                            type: DELETE_COMMENT_ACTION,
                            review:item,
                            masp: item?.spdg?.masp,
                          });
                        }}
                        okText="Đồng ý"
                        cancelText="Hủy bỏ"
                        title="Bạn có muốn xóa bình luận này?"
                        placement={"top"}
                      >
                        <label className="cursor-pointer text-gray-500 hover:text-gray-700">
                          Xóa
                        </label>
                      </Popconfirm>
                    }
                    key="list-vertical-delete"
                  />
                </div>
              ) : null,
              renderByRole(item),
              <IconText
                icon={
                  <MessageOutlined className="text-gray-600 hover:text-gray-700" />
                }
                text={
                  <label className="cursor-pointer text-gray-500 hover:text-gray-700">
                    {item?.phanhoi?.length}
                  </label>
                }
                key="list-vertical-message"
              />,
            ]}
            extra={<Rate disabled value={item?.danhgia} />}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={
                    "http://localhost:8080/images/user/" + item?.tkdg?.hinhanh
                  }
                />
              }
              title={<a href={item.href}>{item?.tkdg?.hoten}</a>}
              description={moment(item?.ngaygui).format("DD/MM/YYYY HH:ss:mm")}
            />
            {item.noidung}

            {_?.map(item?.phanhoi, (ph, i) => {
              return (
                <Comment
                key={i}
                  author={<a>Phản hồi của người bán</a>}
                  avatar={
                    <Avatar
                      src="https://joeschmoe.io/api/v1/random"
                      alt="Mộc Trà"
                    />
                  }
                  content={
                    <small className="text-xs font-light italic">
                      {moment(ph.ngaytraloi).format("DD-MM-YYYY HH:mm:ss")}
                    </small>
                  }
                >
                  {ph.noidung}
                </Comment>
              );
            })}
          </List.Item>
        )}
      />
    </div>
  );
}
