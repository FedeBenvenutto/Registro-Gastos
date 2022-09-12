import React from "react";
import { categorias, color } from "../database/Listas";
import { VictoryPie } from "victory-native";
import { Svg } from "react-native-svg";
import { View, Text, useWindowDimensions } from "react-native";

const GraficoTorta = ({ sumaCat, sumaTotal }) => {
  const { height, width } = useWindowDimensions();
  let datos = categorias.map((item, i) => {
    return {
      categoria: categorias[i],
      y: sumaCat[i],
      color: color[i],
      id: Number([i]) + 1,
      porcentaje: ((sumaCat[i] * 100) / sumaTotal).toFixed(2),
    };
  });
  return (
    <View>
      <View>
        <Svg width="100%" height={height/2}  style={{ width: "100%", height: "auto" }}>
          <VictoryPie
            data={datos}
            labels={({ datum }) => `${datum.id}`}
            labelRadius={({ innerRadius }) => innerRadius + 100}
            style={{
              labels: { fill: "white", fontSize: height*0.019, fontWeight: "bold" },
            }}
            colorScale={color}
          />
        </Svg>
      </View>

      {datos.map((item, i) => (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginStart: 50,
          }}
          key={i} 
        >
          <Text
            style={{
              width: width/10,
              height: height/39,
              backgroundColor: item.color,
              borderRadius: 5,
              textAlign: "center",
              color: "white",
            }}
          >
            {" "}
            {item.id}{" "}
          </Text>
          <Text> {item.categoria}</Text>
          <Text> {item.porcentaje}%</Text>
        </View>
      ))}
    </View>
  );
};

export default GraficoTorta;
