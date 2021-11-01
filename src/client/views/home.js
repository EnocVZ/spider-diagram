import React from "react";
import './stylr.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setting: "" };
  }
  componentDidMount() {
    var cx = 300;
    var cy = 250;
    var r = 70;
    var lados = 6;
    this.setState({ setting2: this.points(cx, cy, r, lados, 0) });
    this.setState({ setting3: this.points(cx, cy, r, lados, 10) });


    this.calcPoints(
      3, 400, 3
    );
  }
  points(cx, cy, r, lados, suma) {
    var a = 360 / lados;
    // inicia la variable points
    var points = (cx + r) + "," + cy + " ";
    // calcula el resto de los puntos
    for (var i = 1; i <= lados; i++) {
      var aRad = (Math.PI / 180) * (a * i),
        Xp = cx + r * Math.cos(aRad) + suma,
        Yp = cy + r * Math.sin(aRad) - suma;

      points += Xp + "," + Yp + " ";

    }
    // devuelve la variable points			
    return points
  }

  calcPoints = (circleRadius, size, vertices) => {
    const RAD = Math.PI / 180;
    const TWO_PI = Math.PI * 2;
    const points = [];
    const radius = (size / 2) - circleRadius;
    const center = radius + circleRadius;
    const theta = TWO_PI / vertices;
    const angle = RAD * -90;
    let pointsS = "";
    let count = 1;
    for (let i = 0; i < vertices; i++) {
      let x = radius * Math.cos(theta * i + angle) + center;
      let y = radius * Math.sin(theta * i + angle) + center;
      points.push([x, y]);
      count++;
    }
    points.forEach((xy, i) => {
      if (i == 1) {
        pointsS = `M${xy[0]},${xy[1]}L,`;
      } else if ((i + 1) == vertices) {
        pointsS += `${xy[0]},${xy[1]}Z`;
      } else {
        pointsS += `${xy[0]},${xy[1]}L,`;
      }
    })
    this.setState({
      setting: pointsS
    });
  };
  render() {

    return <>
      <svg width="400" height="400">

        <Poly2 sides={6} size={200} cx={100} cy={100} r={60} />
        <Poly2 sides={6} size={200} cx={100} cy={100} r={80} />
        <Poly2 sides={6} size={190} cx={100} cy={100} r={100} />
        <Poly2 sides={6} size={190} cx={100} cy={100} r={120} />

      </svg>
      <RenderEl />
    </>
  }
}

const Poly2 = props => {
  let points = [];
  for (let i = 1; i < props.sides + 2; i++) {
    points.push({
      x:
        props.cx +
        Math.round(props.r * Math.sin((Math.PI / (props.sides / 2)) * i)),
      y:
        props.cy +
        Math.round(props.r * Math.cos((Math.PI / (props.sides / 2)) * i))
    });
  }

  let pointsStr = "";
  points.forEach(val => {
    pointsStr += `${val.x},${val.y} `;
  });

  return (

    <>
      <polyline points={pointsStr} fill="none" stroke="black" />
    </>
  );
};


const Poly = ({ pointsStr }) => {

  return (
    <>
      <path stroke="#ccc" cx="300" cy="250" fill="none"
        d={pointsStr}></path>
    </>
  );
};



class RenderEl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vertices: 5,
      circleRadius: 2,
      size: 200,
      showVertexDots: true,
      showVertexLines: true,
      points: [],
    };
  }




  render() {
    return (
      <React.Fragment>
        <div className='App-wrapper'>
          <Svg
            showVertexDots={true}
            showVertexLines={true}
            width={250}
            height={200}
            setting={{
              vertice: 7,
              ringNumber: 4,
              radius: 40, //si aumenta el numero de anillo disminuir el radio
              ringColors: ["#ffb3b3", "#fbd8c2", "#b2e7cb"]
            }}
          />

        </div>
      </React.Fragment>

    )

  }
}
const Svg = ({
  circleRadius,
  showVertexDots,
  showVertexLines,
  width,
  height,
  setting
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


  let polygonList;
  let radius = setting.radius;
  let pointText;
  const data = [{ title: "Actividad fisica" },
  { title: "Alcohol" },
  { title: "Tabaco" },
  { title: "IMC" },
  { title: "Tensión Arterial" },
  { title: "LDL" },
  { title: "Glicemia" }];
  let segment = [];
  return (

    <svg
      className='Svg'
      viewBox={`0 0 ${height} ${width}`}
      xmlns='http://www.w3.org/2000/svg'
    >
      {[...Array(setting.ringNumber)].map((e, i) => {
        let point = calcPoints(radius, 200, setting.vertice);
        radius = (radius + 20);
        if (i == 0) {
          polygonList = point;
        }
        segment.push(point[0]);
        return <Polygon key={i} points={point.join(' ')}
          color={setting.ringColors[i] || "white"} />
      })}

      {pointText = calcPoints(10, 200, 7)}
      {showVertexLines ?
        polygonList.map((point, i) =>
          <VertexLine key={i} point={point} radius={200} />
        )
        : null}

      {showVertexDots ?
        polygonList.map((point, i) =>
          <VertexDot circleRadius={1} key={i} point={point}
            radius={width} punto={i} />
        )
        : null}
      {
        pointText.map((point, i) =>
          <VerTex key={i} point={point} text={data[i].title}
          />
        )
      }
      {
        console.log(segment)

      }
      <GenerateNumber segment={segment} list={[1, 2, 3]} />
    </svg>
  )
};
const GenerateNumber = ({ segment, list }) => {
  let count = list.length;
   
  return<>
  {
    segment.map((point, i) => {
      let number;
      if (count == 0) {
        number = 0;
      } else {
        number = list[count];
      }
      count++;
      return <text
        className="textTilte"
        x={point[0]} y={point[1]}
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
      className="textTilte"
      x={point[0]} y={point[1]}
      orientation="outer" stroke="none">{text}
    </text>

  )
}


const VertexDot = ({
  circleRadius,
  point,
  punto
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
  color
}) => {

  return (
    <polygon className='polygon' fill={color} points={points} />
  )
}