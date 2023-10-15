import { SimulationProvider } from "./context/simulatorContext";

import SimulationTool from "./pages/SimulationTool";
import Summary from "./components/organisms/Summary";
import Graphs from "./pages/Graphs";

function App() {
  return (
    <SimulationProvider>
      <div className="flex flex-col mx-auto w-full p-2 xl:p-10 xl:space-x-20  xl:flex-row xl:w-11/12">
        <div className="w-full xl:w-1/2">
          <SimulationTool />
          <Summary />
        </div>
        <div className="w-full xl:w-1/2">
          <Graphs />
        </div>
      </div>
    </SimulationProvider>
  );
}

export default App;
