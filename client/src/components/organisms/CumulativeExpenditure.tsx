import { useContext, useState, useEffect } from "react";
import { SimulationContext } from "../../context/simulatorContext";

import useWindowWidth from "../../hooks/useWindow";

import {
  ResponsiveContainer,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { CustomizedAxisTick } from "../atoms/CustomizedAxisTick";
import { CustomizedLabel } from "../atoms/CustomizedLabel";

const CumulativeExpenditure = () => {
  const [graphData, setGraphData] = useState([]);

  const { simulationData } = useContext(SimulationContext);
  const width = useWindowWidth();

  const isMobile = width <= 768;

  useEffect(() => {
    if (!simulationData) return;

    const purchases = simulationData.purchases || [];
    let cumulativeExpenditure = 0;
    let totalTrees = 0;

    let newGraphData = [];

    purchases.forEach((purchase) => {
      // Calculate the expenditure for the current purchase
      const purchaseCost = purchase.numberOfTrees * 120;

      // Annual maintenance cost for trees purchased in this transaction
      const currentMaintenanceCost = purchase.numberOfTrees * 12;

      // Annual maintenance cost for all previously purchased trees
      const previousMaintenanceCost = totalTrees * 12;

      // Update the cumulative expenditure
      cumulativeExpenditure +=
        purchaseCost + currentMaintenanceCost + previousMaintenanceCost;

      // Update the total number of trees purchased so far
      totalTrees += purchase.numberOfTrees;

      // Adjust the date format to match axis labels
      const formattedDate = purchase.monthYear.replace("-20", "-");

      newGraphData = [
        ...newGraphData,
        {
          monthYear: formattedDate,
          expenditure: cumulativeExpenditure,
        },
      ];
    });

    setGraphData(newGraphData);
  }, [simulationData]);

  return (
    <div className="w-full h-full max-w-screen-md mx-auto">
      <h3 className="text-xl text-center font-bold">Cumulative Expenditure</h3>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          width={650}
          height={400}
          data={graphData}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {!isMobile && (
            <>
              <XAxis
                dataKey="monthYear"
                height={60}
                textAnchor="end"
                interval={0}
                tick={<CustomizedAxisTick />}
              />
              <YAxis />
            </>
          )}
          <Tooltip />
          <Legend wrapperStyle={{ bottom: -5, left: 50 }} />
          <Area
            type="monotone"
            dataKey="expenditure"
            name="Cumulative Spend"
            stroke="#8884d8"
            fill="#8884d8"
            label={<CustomizedLabel />}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CumulativeExpenditure;
