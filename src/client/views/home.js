import React from "react";
import './stylr.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <>
      <RenderEl />
    </>
  }
}

class RenderEl extends React.Component {
  constructor(props) {
    super(props);
    
  }


  render() {
    const data = [{ title: "Actividad fisica", cantidad: 0 },
  { title: "Alcohol", cantidad: 3 },
  { title: "Tabaco", cantidad: 3 },
  { title: "IMC", cantidad: 1 },
  { title: "Tensión Arterial", cantidad: 2 },
  { title: "LDL", cantidad: 1 },
  { title: "Glicemia", cantidad: 3 }];

    return (
      <React.Fragment>
        <div className='App-wrapper'>
          <Svg
            width={250}
            height={300}
            circleRadius={200}
            setting={{
              vertice: data.length,
              ringNumber: 3,
              radius: 40, //si aumenta el numero de anillo disminuir el radio
              ringColors: ["#ffb3b3", "#fbd8c2", "#b2e7cb",]
            }}
            list={[1, 2, 3]}
            data={data}
          />

        </div>
      </React.Fragment>

    )
  }
}
const Svg = ({
  circleRadius,
  width,
  height,
  setting,
  list,
  data
}) => {

  const calcPoints = (circleRadius, size, vertices) => {
    const RAD = Math.PI / 180;
    const TWO_PI = Math.PI * 2;
    const points = [];
    const radius = (size / 2) - circleRadius;
    const center = radius + circleRadius;
    const theta = TWO_PI / vertices;
    const angle = RAD * -90;

    for (var i = 0; i < vertices; i++) {
      let x = radius * Math.cos(theta * i + angle) + center;
      let y = radius * Math.sin(theta * i + angle) + center;
      points.push([x, y]);
    }

    return points;
  };

  const calcTextPoints = (circleRadius, size, vertices) => {
    const RAD = Math.PI / 180;
    const TWO_PI = Math.PI * 2;
    const points = [];
    const radius = (size / 2) - circleRadius;
    const center = radius + circleRadius;
    const theta = TWO_PI / vertices;
    const angle = RAD * -90;

    for (var i = 0; i < vertices; i++) {
      let x = radius * Math.cos(theta * i + angle) + center;
      let y = radius * Math.sin(theta * i + angle) + center;
      points.push([x, y]);
    }

    return points;
  };


  let polygonList;
  let radius = setting.radius;
  let pointText;
  let segment = [];
  let pointListSegement = [];

  const getData = () => {
    return [...Array(setting.vertice)].map((e, vert) => {
      let pointPos;
      let radiusInternal = setting.radius;
      let listData = [];
      const ringList = [...Array(setting.ringNumber + 1)];
      let reverseList = JSON.parse(JSON.stringify(list)).reverse();
      let newListPoint = [];

      ringList.forEach((e, i) => {
        let point = calcPoints(radiusInternal, circleRadius, setting.vertice);
        radiusInternal = (radiusInternal + 20);
        listData.push(point[vert]);
      });


      for (let index = ringList.length - 1; index >= 0; index--) {
        newListPoint.push(listData[index])
      }

      reverseList.push(0);

      reverseList.forEach((el, number) => {
        if (data[vert].cantidad > reverseList[number + 1] && data[vert].cantidad <= el) {
          pointPos = listData[number];
        }
        if (data[vert].cantidad >= 0 && data[vert].cantidad < reverseList[reverseList.length - 2]) {
          pointPos = listData[number];
        }
      });
      pointListSegement.push(pointPos);
      return <VertexDot circleRadius={1} key={vert} point={pointPos}
        radius={width} />
    });

  }

  return (
    <svg
      className='Svg'
      viewBox={`0 0 ${height} ${width}`}
      xmlns='http://www.w3.org/circleRadius0/svg'
    >
      {[...Array(setting.ringNumber + 1)].map((e, i) => {
        let point = calcPoints(radius, circleRadius, setting.vertice);
        radius = (radius + 20);
        if (i == 0) {
          polygonList = point;
        }
        segment.push(point[0]);
        return <Polygon key={i} points={point.join(' ')}
          color={setting.ringColors[i] || "white"} />
      })}
      {pointText = calcTextPoints(20, circleRadius, setting.vertice)}
      {
        polygonList.map((point, i) =>
          <VertexLine key={i} point={point} radius={circleRadius} />
        )
      }
      
      {getData()}
      {
        pointText.map((point, i) =>
          <VerTex key={i} point={point} text={data[i].title}
          />
        )
      }
      <GenerateNumber segment={segment} list={list} />
      <Polygon  points={pointListSegement.join(' ')}
          color={"#0079ff94"}
          classCss="polygon-area" />
    </svg>
  )
};
const GenerateNumber = ({ segment, list }) => {
  let count = 0;
  const initial = () => {
    const point = segment[segment.length - 1];
    if (count == 0) return <text
      className="diagram-text"
      x={point[0] - 9} y={point[1] + 2}
      orientation="outer" stroke="none">0
    </text>

  };
  return <>
    {
      initial()
    }
    {
      segment.map((point, i) => {
        const reversed = list.reverse();
        let number;
        number = reversed[count];
        count++;
        return <text
          key={i}
          className="diagram-text"
          x={point[0] - 9} y={point[1] + 2}
          orientation="outer" stroke="none">{number}
        </text>
      })
    }
  </>
}

const VerTex = ({
  point,
  text,
}) => {
  return (
    <text
      className="diagram-text"
      x={point[0]} y={point[1]}
      orientation="outer" stroke="none">{text}
    </text>

  )
}


const VertexDot = ({
  circleRadius,
  point
}) => {
  return (
    <circle
      cx={point[0]}
      cy={point[1]}
      r={circleRadius}
      className='circle'
    />
  )
}

const VertexLine = ({
  point,
  radius
}) => {
  const centerX = radius / 2;
  const centerY = radius / 2;
  return (
    <line
      x1={centerX}
      y1={centerY}
      x2={point[0]}
      y2={point[1]}
      className='App-line'
    />
  )
}

const Polygon = ({
  points,
  color,
  classCss
}) => {

  return (
    <polygon className={"polygon " + classCss} fill={color} points={points} />
  )
}