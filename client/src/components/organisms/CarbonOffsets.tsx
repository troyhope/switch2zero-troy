import { useContext, useEffect, useState } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { SimulationContext } from "../../context/simulatorContext";

import { formatMonthYear, getMonthlyOffset } from "../../utils/helpers";
import useWindowWidth from "../../hooks/useWindow";

const CarbonOffsetsGraph = () => {
  const { simulationData, selectedCountry } = useContext(SimulationContext);
  const [graphData, setGraphData] = useState([]);

  const width = useWindowWidth();

  const isMobile = width <= 768;

  useEffect(() => {
    if (!simulationData) return;

    const selectedCountryData = simulationData;

    if (selectedCountryData) {
      const avgCO2PerMonthKg =
        (selectedCountryData.avgCO2PerPersonPerYear * 1000) / 12;
      let newData = [];

      for (let year = 2023; year <= 2032; year++) {
        for (let month = 1; month <= 12; month++) {
          if (month === 1 || month === 5 || month === 9) {
            const monthYear = formatMonthYear(month, year);
            const monthlyOffset = getMonthlyOffset(
              month,
              year,
              selectedCountryData.purchases
            );
            if (monthlyOffset !== null) {
              newData = [
                ...newData,
                {
                  monthYear,
                  avgCO2: avgCO2PerMonthKg,
                  offset: monthlyOffset,
                },
              ];
            }
          }
        }
      }

      setGraphData(newData);
    }
  }, [selectedCountry, simulationData]);

  return (
    <div className="w-full h-full max-w-screen-md mx-auto">
      <h3 className="text-xl text-center font-bold">Carbon Offsets</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={650}
          height={400}
          data={graphData}
          margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />

          {!isMobile && (
            <XAxis
              dataKey="monthYear"
              angle={-90}
              textAnchor="end"
              interval={0}
            />
          )}

          {!isMobile && <YAxis />}
          <Tooltip />
          <Legend wrapperStyle={{ bottom: -20, left: 50 }} />
          <Line
            type="monotone"
            dataKey="avgCO2"
            stroke="#8884d8"
            name="Average CO2 Consumption (kg/month)"
          />
          <Line
            type="monotone"
            dataKey="offset"
            stroke="#82ca9d"
            name="Your Carbon Offset (kg/month)"
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CarbonOffsetsGraph;
