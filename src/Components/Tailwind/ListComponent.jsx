import _ from "lodash";
import React, { useState } from "react";

export default function ListComponent() {

  //Axios.get(url).then(resp=>{

  //}).catch(err){

  //}

  //Array
  const array = [
    {
      id: 1,
      name: "Long",
      age: 21,
      weight: 55,
    },
    {
      id: 2,
      name: "Tại",
      age: 15,
      weight: 50,
    },
    {
      id: 3,
      name: "Quyên",
      age: 23,
      weight: 45,
    },
    {
      id: 4,
      name: "Hậu",
      age: 22,
      weight: 60,
    },
    {
      id: 5,
      name: "Ngọc",
      age: 50,
      weight: 65,
    },
    {
      id: 6,
      name: "Sang",
      age: 100,
      weight: 48,
    },
  ];

  const [sort, setSort] = useState({
    asc: null,
    desc: null,
  });

  const [dynamic, setDynamic] = useState({
    id: null,
    age: null,
    weight: null,
  });

  return (
    <div className="container w-full flex flex-col gap-y-6">
      <div className="bg-green-200 p-10 flex flex-row gap-4 ">
        <div className="w-1/2 bg-gray-200">
          <div className="w-full flex flex-row justify-center">
            <label className="font-bold text-xl">VD ORDERBY LODASH</label>
          </div>
          <div className="w-full flex flex-col gap-t-4">
            <div className="w-full flex flex-row justify-center gap-y-4 gap-4">
              <button
                className="button-3d-green"
                onClick={() => {
                  setSort({
                    asc: true,
                    desc: null,
                  });
                }}
              >
                Sắp xếp theo tăng dần
              </button>
              <button
                className="button-3d-blue"
                onClick={() => {
                  setSort({
                    asc: null,
                    desc: true,
                  });
                }}
              >
                Sắp xếp giảm dần
              </button>
            </div>
            <div className="w-full flex flex-row justify-center gap-4 mt-5">
              <button
                className="button-3d-gray"
                onClick={() => {
                  setDynamic({
                    id: true,
                    age: null,
                    weight: null,
                  });
                }}
              >
                Sắp xếp theo ID
              </button>
              <button
                className="button-3d-yellow"
                onClick={() => {
                  setDynamic({
                    id: null,
                    age: true,
                    weight: null,
                  });
                }}
              >
                Sắp xếp theo Tuổi
              </button>
              <button
                className="button-3d-red"
                onClick={() => {
                  setDynamic({
                    id: null,
                    age: null,
                    weight: true,
                  });
                }}
              >
                Sắp xếp theo Cân nặng
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col justify-start text-left p-2">
            {_.map(
              _.orderBy(
                array,
                [dynamic.age ? "age" : dynamic.weight ? "weight" : "id"],
                sort.desc ? "desc" : "asc"
              ),
              (item, i) => {
                return (
                  <>
                    <label key={i}>
                      {item.id} - {item.name} - {item.age + " tuổi"} -{" "}
                      {item.weight + " kg"}
                    </label>
                  </>
                );
              }
            )}
          </div>
        </div>
      </div>

      <div className="bg-green-200 p-10 flex flex-row gap-4">
        <div className="w-1/5 bg-gray-200">
          <div className="w-full flex flex-row justify-center">
            <label className="font-bold text-xl">VD ES6 - MAP</label>
          </div>
          <div className="w-full flex flex-col justify-start">
            {array.map((item, i) => {
              console.log(item);
              return (
                <>
                  <label key={i}>
                    {item.id} - {item.name}
                  </label>
                </>
              );
            })}
          </div>
        </div>
        <div className="w-1/5 bg-green-300">
          <div className="w-full flex flex-row justify-center">
            <label className="font-bold text-xl">VD ES6 - FIND</label>
          </div>
          <div className="w-full flex flex-col justify-start">
            {array.find((e) => e.name === "Quyên") ? (
              <>
                {array.find((e) => e.name === "Quyên").id} -{" "}
                {array.find((e) => e.name === "Quyên").name}
              </>
            ) : (
              <>Không có id này</>
            )}
          </div>
        </div>
        <div className="w-1/5 bg-gray-200">
          <div className="w-full flex flex-row justify-center">
            <label className="font-bold text-xl">VD ES6 - FIND INDEX</label>
          </div>
          <div className="w-full flex flex-col justify-start">
            {array.findIndex((e) => e.id === 5) !== -1 ? (
              <>{array.findIndex((e) => e.id === 2)}</>
            ) : (
              <>Không tồn tại chỉ mục này</>
            )}
          </div>
        </div>
        <div className="w-1/5 bg-green-300">
          <div className="w-full flex flex-row justify-center">
            <label className="font-bold text-xl">VD ES6 - FILTER</label>
          </div>
          <div className="w-full flex flex-col justify-start">
            {array
              .filter((e) => e.id !== 1)
              .map((e) => {
                return (
                  <>
                    <label key={e.id}>
                      {e.id} - {e.name}
                    </label>
                  </>
                );
              })}
          </div>
        </div>
        <div className="w-1/5 bg-yellow-300">
          <div className="w-full flex flex-row justify-center">
            <label className="font-bold text-xl">VD ES6 - SLICE REMOVE</label>
          </div>
          <div className="w-full flex flex-col justify-start">
            {array
              .filter((item) => item.id !== 3)
              .map((item, i) => {
                return (
                  <>
                    <label key={i}>
                      {item.id} - {item.name}
                    </label>
                  </>
                );
              })}
          </div>
        </div>
      </div>

      <div className="bg-pink-200 p-10 flex flex-row gap-4">
        <div className="w-1/5 bg-blue-200">
          <div className="w-full flex flex-row justify-center">
            <label className="font-bold text-xl">VD LODASH - MAP</label>
          </div>
          <div className="w-full flex flex-col justify-start">
            {_.map(array, (item, i) => {
              return (
                <>
                  <label key={i}>
                    {item.id} - {item.name}
                  </label>
                </>
              );
            })}
          </div>
        </div>
        <div className="w-1/5 bg-yellow-200">
          <div className="w-full flex flex-row justify-center">
            <label className="font-bold text-xl">VD LODASH - FIND</label>
          </div>
          <div className="w-full flex flex-col justify-start">
            {_.find(array, (e) => e.name === "Tại") ? (
              <>
                {_.find(array, (e) => e.name === "Tại").id} -{" "}
                {_.find(array, (e) => e.name === "Tại").name}
              </>
            ) : (
              <>Không có id này</>
            )}
          </div>
        </div>
        <div className="w-1/5 bg-blue-200">
          <div className="w-full flex flex-row justify-center">
            <label className="font-bold text-xl">VD LODASH - FIND INDEX</label>
          </div>
          <div className="w-full flex flex-col justify-start">
            {_.findIndex(array, (e) => e.id === 3) !== -1 ? (
              <>{_.findIndex(array, (e) => e.id === 3)}</>
            ) : (
              <>Không tồn tại chỉ mục này</>
            )}
          </div>
        </div>
        <div className="w-1/5 bg-yellow-200">
          <div className="w-full flex flex-row justify-center">
            <label className="font-bold text-xl">VD LODASH - FILTER</label>
          </div>
          <div className="w-full flex flex-col justify-start">
            {_.map(
              _.filter(array, (e) => e.id !== 1),
              (item, i) => {
                return (
                  <>
                    <label key={i}>
                      {item.id} - {item.name}
                    </label>
                  </>
                );
              }
            )}
          </div>
        </div>
        <div className="w-1/5 bg-red-200">
          <div className="w-full flex flex-row justify-center">
            <label className="font-bold text-xl">
              VD LODASH - FILTER REMOVE
            </label>
          </div>
          <div className="w-full flex flex-col justify-start">
            {_.map(
              _.filter(array, (e) => e.id !== 3),
              (item, i) => {
                return (
                  <>
                    <label key={i}>
                      {item.id} - {item.name}
                    </label>
                  </>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
