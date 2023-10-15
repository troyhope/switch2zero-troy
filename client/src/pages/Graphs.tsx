import CarbonOffsets from "../components/organisms/CarbonOffsets";

import CumulativeExpenditure from "../components/organisms/CumulativeExpenditure";

function Graphs() {
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <CarbonOffsets />
      <div className="h-20"></div>
      <CumulativeExpenditure />
    </div>
  );
}

export default Graphs;
