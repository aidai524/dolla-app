// import Cards from "./cards";
// import Probability from "./charts/probability";
// import DistributionChart from "./charts/distribution";
import React, { useState } from "react";
import CoinFlip from "./coin";
import MultiCoins from "./multi-coins";

const TempDemo: React.FC = () => {
  const [flipResult, setFlipResult] = useState<"heads" | "tails" | null>(null);

  return (
    <div className="temp-demo ml-[100px] mt-[100px]">
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}>
          Three.js Coin Flip Animation - Physics Simulation
        </h2>
        <p style={{ marginBottom: "20px", color: "#666", fontSize: "14px" }}>
          Physics simulation including gravity, air resistance, ground collision
          and bounce effects
        </p>
        <CoinFlip animationDuration={3000} forceResult="tails" />

        {flipResult && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px"
            }}
          >
            <strong>
              Single Coin Result:{" "}
              {flipResult === "heads" ? "DOLLA-S" : "DOLLA-ETH"}
            </strong>
          </div>
        )}
      </div>
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}>
          Multi-Coin Flip Animation - Physics Simulation
        </h2>
        <p style={{ marginBottom: "20px", color: "#666", fontSize: "14px" }}>
          Physics simulation including gravity, air resistance, ground collision
          and bounce effects
        </p>
        <MultiCoins
          animationDuration={3000}
          coinConfigs={[{ result: "heads" }, { result: "tails" }]}
          layout="circle"
          circleConfig={{ radius: 3, centerY: 0 }}
        />
      </div>
    </div>
  );
};

export default TempDemo;
