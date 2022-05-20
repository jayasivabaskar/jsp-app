import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { IconContext } from "react-icons";
import { FaRegHeart, FaShareSquare, FaRupeeSign } from "react-icons/fa";
import { BackgroudImage } from "./styled";
const ResponsiveGridLayout = WidthProvider(Responsive);

function WelcomePage() {
  const layout = [];
  let prevX = 0, prevY = 0;
  data.forEach((d, i) => {
    const currX = prevX + 2, temp = {i: i.toString(), w: 2, h: 1};
    if (currX === 12) {
      temp.x = prevX;
      temp.y = prevY;
      prevX = 0;
      prevY += prevY;
    } else {
      temp.x = prevX;
      temp.y = prevY;
      prevX += 2;
    }
    layout.push(temp);
  });
  
  return (
    <div className="welcomePage">
      <ResponsiveGridLayout
        className="layout"
        layouts={{lg: layout}}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={250}
        isDraggable={false}
        isResizable={false}
      >
        {
          data.map((d, i) => {
            return (
              <div className="items" key={i.toString()}>
                <div className="itemContainer">
                  <IconContext.Provider
                    value={{ color: "black", size: "25px" }}
                  >
                    <div className="itemTopRow">
                      <FaRegHeart />
                      <FaShareSquare />
                    </div>
                  </IconContext.Provider>
                  <BackgroudImage />
                  <div className="description">
                    <span>{d.name + " RO + UV + Minerals"}</span>
                    <div><FaRupeeSign /> 11,000</div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </ResponsiveGridLayout>
    </div>
  );
}

export default WelcomePage;

const data = [
  {
    name: "Kent",
  },
  {
    name: "Dolphin",
  },
  {
    name: "Aqua Grand",
  },
  {
    name: "Aqua Grand +",
  },
  {
    name: "Kent 1",
  },
  {
    name: "Kent 2",
  },
  {
    name: "Kent 3",
  },
  {
    name: "Kent 4",
  },
  {
    name: "Kent 4",
  },
  {
    name: "Kent 4",
  },
  {
    name: "Kent 4",
  },
  {
    name: "Kent 4",
  },
];
