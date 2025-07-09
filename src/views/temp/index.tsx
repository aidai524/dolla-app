// import Cards from "./cards";
// import Probability from "./charts/probability";
// import DistributionChart from "./charts/distribution";
import React from "react";
// import CoinFlip from "./coin";
import MultiCoins from "./multi-coins";

const TempDemo: React.FC = () => {
  return (
    <div className="temp-demo">
      <MultiCoins
        autoFlip={false}
        animationDuration={5000}
        coinConfigs={[
          { result: "heads" as const, scale: 1.0 },
          { result: "tails" as const, scale: 1.0 },
          { result: "heads" as const, scale: 1.0 },
          { result: "tails" as const, scale: 1.0 },
          { result: "heads" as const, scale: 1.0 }
        ]}
      />
    </div>
  );
};

export default TempDemo;
