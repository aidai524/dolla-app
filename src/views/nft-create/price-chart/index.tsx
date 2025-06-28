import Chart from "chart.js/auto";
import Title from "./title";
import Annotations from "./annotations";
import { useEffect, useRef, useState } from "react";
import annotationPlugin from "chartjs-plugin-annotation";
import { formatNumber } from "@/utils/format/number";

Chart.register(annotationPlugin);

let diff = 1;
export default function PriceChart({ anchorPrice }: { anchorPrice?: number }) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const anchorDotRef = useRef<HTMLDivElement>(null);
  const [isInit, setIsInit] = useState(false);

  // Function to calculate probability density data
  const calculateDensity = (anchorPrice: number) => {
    const prizeCost = anchorPrice;
    const pricePerUser = 1;
    const maxUsers = Math.floor(prizeCost * 5);

    const sigma = 0.6;
    const desiredMode = anchorPrice * 1.2;
    const mu = Math.log(desiredMode) + sigma ** 2;

    function logNormalPDF(n: number, mu: number, sigma: number) {
      return (
        (1 / (n * sigma * Math.sqrt(2 * Math.PI))) *
        Math.exp(-((Math.log(n) - mu) ** 2) / (2 * sigma ** 2))
      );
    }

    const rawDensity = [];
    let maxF = 0;
    diff = maxUsers <= 100 ? 1 : Math.floor((maxUsers - 1) / 99);
    for (let n = 0; n <= maxUsers; n = n + diff) {
      const x = n * pricePerUser;
      const f = logNormalPDF(x, mu, sigma);
      rawDensity.push({ x: x, y: f });

      if (f > maxF) {
        maxF = f;
      }
    }

    return rawDensity.map((d) => ({
      x: d.x,
      y: (d.y / maxF) * 15
    }));
  };

  // Initialize chart - only executed once when component mounts
  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Probability Density",
            data: [],
            borderColor: "#57FF70",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            backgroundColor: "#57FF7033",
            segment: {
              backgroundColor: (ctx) => {
                const { p0 } = ctx;
                return p0.parsed.x >= (anchorPrice || 0)
                  ? "#57FF7033"
                  : "#FF5A974D";
              }
            }
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false
        },
        plugins: {
          title: {
            display: true,
            text: "",
            font: {},
            padding: {
              top: 36
            }
          },
          legend: {
            display: false
          },
          annotation: {
            annotations: {
              line1: {
                type: "line",
                xMin: anchorPrice || 0,
                xMax: anchorPrice || 0,
                borderColor: "#FFC42F",
                borderWidth: 1,
                borderDash: [2, 2]
              },
              line2: {
                type: "line",
                xMin: anchorPrice ? anchorPrice * 1.2 : 0,
                xMax: anchorPrice ? anchorPrice * 1.2 : 0,
                borderColor: "#8C8B8B",
                borderWidth: 1,
                borderDash: [2, 2]
              }
            }
          },
          tooltip: {
            backgroundColor: "rgba(20, 21, 25, 0.9)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#373737",
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            titleFont: {
              family: "SpaceGrotesk",
              size: 12
            },
            bodyFont: {
              family: "SpaceGrotesk",
              size: 12
            },
            callbacks: {
              title: (items) => {
                return `Total Sales: ${
                  Number(items[0].parsed.x) > 0
                    ? `$${items[0].parsed.x}`
                    : `-$${Math.abs(items[0].parsed.x)}`
                }`;
              },
              label: (item) => {
                return `Probability: ${item.parsed.y.toFixed(2)}%`;
              }
            }
          }
        },
        scales: {
          x: {
            type: "linear",
            title: {
              display: true,
              text: "Total Sales ($)",
              font: {
                family: "SpaceGrotesk",
                size: 12
              },
              color: "#5E6B7D"
            },
            ticks: {
              callback: function (value) {
                return value;
              },
              font: {
                family: "SpaceGrotesk",
                size: 10
              },
              color: "#666"
            },
            grid: {
              color: "rgba(0, 0, 0, 0)"
            }
          },
          y: {
            grid: {
              color: "rgba(94, 107, 125, 0.1)",
              lineWidth: 1
            },
            title: {
              display: true,
              text: "Probability Density",
              font: {
                family: "SpaceGrotesk",
                size: 12
              },
              color: "#5E6B7D"
            },
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return `${Number(value).toFixed(0)}%`;
              },
              font: {
                family: "SpaceGrotesk",
                size: 10
              },
              color: "#666"
            }
          }
        }
      }
    });

    // Cleanup function - only executed when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []); // Empty dependency array, only executes on mount

  // Update chart data - only executed when anchorPrice changes
  useEffect(() => {
    if (!chartInstance.current || !anchorPrice) return;

    const density = calculateDensity(anchorPrice);
    const desiredMode = anchorPrice * 1.2;

    // Update data
    chartInstance.current.data.datasets[0].data = density;

    // Update annotation line positions
    if (chartInstance.current.options.plugins?.annotation?.annotations) {
      const annotations = chartInstance.current.options.plugins.annotation
        .annotations as any;
      annotations.line1.xMin = anchorPrice;
      annotations.line1.xMax = anchorPrice;
      annotations.line2.xMin = desiredMode;
      annotations.line2.xMax = desiredMode;
    }

    // Update segment background color logic
    const dataset = chartInstance.current.data.datasets[0] as any;
    dataset.segment = {
      backgroundColor: (ctx: any) => {
        const { p0 } = ctx;
        return p0.parsed.x >= anchorPrice ? "#57FF7033" : "#FF5A974D";
      }
    };

    // Re-render chart - use 'none' mode to avoid animations
    chartInstance.current.update("none");

    // Update anchor place after chart update
    setTimeout(() => {
      updateAnchorPlace();
      setIsInit(true);
    }, 100);
  }, [anchorPrice]);

  const updateAnchorPlace = () => {
    const chart = chartInstance.current;
    if (!chart || !anchorDotRef.current || !anchorPrice) return;

    anchorDotRef.current.style.left = "0px";
    anchorDotRef.current.style.top = "0px";

    const meta = chart.getDatasetMeta(0);
    meta.data.forEach((point) => {
      const p = point as any;
      const pos = p.getProps(["x", "y"], true);
      if (
        Math.abs(p.raw?.x - anchorPrice * 1.2) < diff &&
        anchorDotRef.current
      ) {
        anchorDotRef.current.style.left = `${pos.x + 15}px`;
        anchorDotRef.current.style.top = `${pos.y - 2}px`;
      }
    });
  };

  return (
    <div className="w-full h-full relative px-[20px] py-[10px]">
      <canvas ref={chartRef} className="w-full h-full relative z-[2]"></canvas>
      {!anchorPrice && (
        <div className="w-full h-full flex justify-center items-center text-[#ABABAB] text-[14px] absolute top-0 left-0">
          Please set the price first
        </div>
      )}
      <div
        ref={anchorDotRef}
        className="absolute z-[20] flex items-center"
        style={{
          opacity: isInit ? 1 : 0
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 8,
            background: "#57FF70",
            pointerEvents: "none"
          }}
        />
        <div className="text-[#57FF70] text-[16px] ml-[10px]">
          ${formatNumber(anchorPrice, 2, true)}
        </div>
      </div>
      <Title />
      <Annotations
        anchorPrice={anchorPrice}
        expectedValue={anchorPrice ? anchorPrice * 1.2 : undefined}
      />
    </div>
  );
}
