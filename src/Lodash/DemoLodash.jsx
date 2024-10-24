import _ from "lodash";
import React from "react";

export default function DemoLodash() {
  const arrAnimals = ["Con mèo", "Con chuột", "Con chó", "Con heo", "Con chim"];
  const arrAnimalsObject = [
    { id: 1, name: "Con mèo" },
    { id: 2, name: "Con chuột" },
    { id: 3, name: "Con chó" },
    { id: 4, name: "Con heo" },
    { id: 5, name: "Con chim" },
  ];
  //es6
  console.log(arrAnimals.join(" - "));
  //Lodash
  console.log("RESULT", _.join(arrAnimals, " and "));
  console.log(
    "RESULT FIND",
    _.find(arrAnimals, (e) => e === "Con chuột")
  );
  console.log(
    "RESULT OBJECT",
    _.find(arrAnimalsObject, (e) => e.id === 2),
    _.findIndex(arrAnimalsObject, (e) => e.id === 2)
  );

  //es6
  console.log("FIRST", arrAnimalsObject[0])
  //lodash
  console.log("FIRST AND LAST", _.first(arrAnimalsObject), _.last(arrAnimalsObject))


  const uniq = [
    { id: 1, name: "Con mèo" },
    { id: 2, name: "Con chuột" },
    { id: 7, name: "Con chó" },
    { id: 8, name: "Con heo" },
    { id: 3, name: "Con chó" },
    { id: 1, name: "Con heo" },
    { id: 2, name: "Con chim" },
  ]

  console.log("UNIQ By ID", _.uniqBy(uniq, 'id'))
  console.log("UNIQ By Name", _.uniqBy(uniq, 'name'))
  console.log("DONT UNIQ", uniq);

  return (
    <div className="container mt-5">
      {_.map(arrAnimalsObject, (e, i) => {
        return (
          <button
            className="p-5 mr-5 shadow-xl bg-yellow-200 text-black hover:bg-yellow-600"
            key={i}
          >
            {e.name}
          </button>
        );
      })}
    </div>
  );
}
