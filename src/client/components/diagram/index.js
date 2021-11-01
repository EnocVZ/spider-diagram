import React from "react";
import './style.css';

export const Svg = ({
    circleRadius,
    width,
    height,
    setting,
    list,
    data,
    onCheckText
}) => {
    let polygonList;
    let radius = setting.radius;
    let pointText;
    let segment = [];
    let pointListSegement = [];
    const[textSelected, setTextSelected] = React.useState({});

    /**
     * Metodo para obtener el numero de lados que tendra la figura
     * @param {*} circleRadius 
     * @param {*} size 
     * @param {*} vertices 
     * @returns array
     */
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

    /**
     * Metodo para obtener el punto en el que se desea pintar las coordenadas
     * @returns element
     */
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
            {/**
             * generacion de figurasgeometricas
             */}
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
                    <VerTex key={i} point={point}
                    text={data[i].title}
                    onCheckText = {()=>{onCheckText(data[i]); setTextSelected(data[i])}}
                    active={data[i].title == textSelected.title?true:false}
                    />
                )
            }
            <GenerateNumber segment={segment} list={list} />
            <Polygon points={pointListSegement.join(' ')}
                color={"#0079ff94"}
                classCss="polygon-area" />
        </svg>
    )
};

/**
 * componente para generar los numeros de la lista
 */
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

/**
 * componente para generar los textos alrededor de la grafica
 */
const VerTex = ({
    point,
    text,
    onCheckText,
    active
}) => {
    return (
        <text
            className={`diagram-text ${active?"active" : ""}`}
            x={point[0]} y={point[1]}
            orientation="outer" stroke="none"
            onClick={()=>{onCheckText()}}
            >{text}
        </text>

    )
}


/**
 *componente para dibujar los puntos en las coordenadas
 */
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

/**
 *
 * componente para dibujar las lineas de casa ezquina 
 */
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

/**
 * Componente para dibujar las figuras
 */
const Polygon = ({
    points,
    color,
    classCss
}) => {

    return (
        <polygon className={"polygon " + classCss} fill={color} points={points} />
    )
}