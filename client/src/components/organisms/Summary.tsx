import { useContext } from "react";
import { SimulationContext } from "../../context/simulatorContext";
import {
  calculateNeutralityDate,
  calculateMonthlyMaintenanceCost,
  calculateExpenditure,
} from "../../utils/calculations";

function Summary() {
  const { simulationData, calculateTotalTrees } = useContext(SimulationContext);

  if (!simulationData) return null;

  const totalTrees = calculateTotalTrees();
  const { achieved, date } = calculateNeutralityDate(
    simulationData.avgCO2PerPersonPerYear,
    simulationData.purchases
  );
  const monthlyMaintenanceCost = calculateMonthlyMaintenanceCost(totalTrees);
  const expenditure = calculateExpenditure(simulationData.purchases);

  return (
    <div className="mx-auto p-1 mt-10">
      <h2 className="mb-5 font-bold">Summary</h2>
      <ul className="list-disc">
        {achieved ? (
          <li className="mb-5">
            You will achieve carbon neutrality in <strong>{date}</strong> with{" "}
            <strong>{totalTrees} trees </strong>
            planted. Your monthly maintenance cost for carbon neutrality at that
            point is{" "}
            <strong>
              USD{" "}
              {monthlyMaintenanceCost.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </strong>
            .
          </li>
        ) : (
          <li className="mb-5">
            Carbon neutrality not achieved, please plant more trees!
          </li>
        )}
        <li>
          Your estimated expenditure over 10 years is USD{" "}
          <strong>
            {expenditure.total.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </strong>
          . This comprises USD{" "}
          <strong>
            {expenditure.purchaseCosts.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </strong>{" "}
          in purchase costs and USD{" "}
          <strong>
            {expenditure.maintenanceFees.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </strong>{" "}
          in maintenance fees.
        </li>
      </ul>
    </div>
  );
}

export default Summary;
