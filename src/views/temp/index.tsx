import Cards from "./cards";
import Probability from "./charts/probability";
import DistributionChart from "./charts/distribution";

export default function Temp() {
  return (
    <div>
      <Probability />
      <DistributionChart />
      <Cards />
    </div>
  );
}
