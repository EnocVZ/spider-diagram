import React from "react";
import { Svg } from "../components/diagram";
import { TitleSelected } from "../components/diagram/childrend";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
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
      <div className="row">
          <div className="col s12">
            <Svg
              width={256}
              height={200}
              circleRadius={200}
              setting={{
                vertice: data.length,
                ringNumber: 3,
                radius: 40, //si aumenta el numero de anillo disminuir el radio
                ringColors: ["#ffb3b3", "#fbd8c2", "#b2e7cb",]
              }}
              list={[1, 2, 3]}
              data={data}
              onCheckText={(value) => {
                 this.setState({title: value.title});
                 }}
            />
            <div className="s12 center-text">
            <TitleSelected title={this.state.title} />
            </div>
          </div>
      </div>)
  }
}

