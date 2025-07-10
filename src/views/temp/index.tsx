import React, { useState } from "react";
import MultiCoins from "./multi-coins";
import CannonCoins from "./cannon-coins";

const TempPage: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<"multi" | "cannon">(
    "cannon"
  );

  const coinConfigs = [
    { result: "heads" as const, scale: 1.0 },
    { result: "tails" as const, scale: 1.0 },
    { result: "heads" as const, scale: 1.0 },
    { result: "tails" as const, scale: 1.0 },
    { result: "heads" as const, scale: 1.0 }
    // { result: "tails" as const, scale: 1.0 },
    // { result: "heads" as const, scale: 1.0 },
    // { result: "tails" as const, scale: 1.0 },
    // { result: "heads" as const, scale: 1.0 },
    // { result: "tails" as const, scale: 1.0 }
  ];

  return (
    <div className="relative">
      {/* Component Selector */}

      {/* Component Rendering */}
      {activeComponent === "cannon" && <CannonCoins />}
      {activeComponent === "multi" && (
        <MultiCoins coinConfigs={coinConfigs} animationDuration={3000} />
      )}
    </div>
  );
};

export default TempPage;
