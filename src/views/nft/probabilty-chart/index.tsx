import { useEffect, useMemo, useRef, useState } from "react";
import Chart from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";
import Annotations from "./annotations";
import Title from "./title";
import { motion } from "framer-motion";

Chart.register(annotationPlugin);

let diff = 1;

export default function WinningProbabiltyChart({
  totalBids = 0,
  selectedBids = 0,
  anchorPrice = 0
}: {
  totalBids?: number;
  selectedBids?: number;
  anchorPrice?: number;
}) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const redDotRef = useRef<HTMLDivElement>(null);
  const [isInit, setIsInit] = useState(false);

  const bids = useMemo(() => {
    return totalBids + selectedBids;
  }, [totalBids, selectedBids]);
  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        data: {
          datasets: [
            {
              type: "line",
              data: [],
              borderColor: "#000000",
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 6,
              pointHoverBackgroundColor: "#FFC42F",
              pointHoverBorderColor: "#FFC42F",
              segment: {
                borderColor: "#FFC42F"
              },
              yAxisID: "y1"
            },
            {
              type: "bar",
              data: [],
              backgroundColor: "#323B48",
              borderColor: "rgba(94, 107, 125, 0.3)",
              borderWidth: 1,
              barPercentage: 1,
              categoryPercentage: 1,
              yAxisID: "y"
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
              padding: {
                top: 40
              }
            },
            legend: {
              display: false
            },
            annotation: {
              annotations: {
                anchorLine: {
                  type: "line",
                  xMin: anchorPrice,
                  xMax: anchorPrice,
                  borderColor: "#FFC42F",
                  borderWidth: 1,
                  borderDash: [2, 2],
                  label: {
                    display: true,
                    content: `Anchor Price=$${anchorPrice}`,
                    position: "end",
                    backgroundColor: "transparent",
                    color: "#5E6B7D",
                    font: {
                      family: "SpaceGrotesk",
                      size: 10
                    },
                    rotation: -90,
                    yAdjust: -10,
                    xAdjust: 8
                  }
                }
              }
            },
            tooltip: {
              backgroundColor: "#1A1E24",
              titleColor: "#fff",
              bodyColor: "#fff",
              borderColor: "#484848",
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
                  return `Total Bid: ${items[0].parsed.x}`;
                },
                label: (item) => {
                  if (item.datasetIndex !== 0) return "";
                  const values = {
                    density:
                      (
                        item.chart.data.datasets[0].data[item.dataIndex] as any
                      )?.y?.toFixed(2) || "0",
                    cumulative:
                      (
                        item.chart.data.datasets[1].data[item.dataIndex] as any
                      )?.y?.toFixed(2) || "0"
                  };
                  return [
                    `Probability Density: ${values.density}%`,
                    `Cumulative Probability: ${values.cumulative}%`
                  ];
                }
              }
            }
          },
          scales: {
            x: {
              type: "linear",
              grid: {
                display: true,
                color: (context) => {
                  return context.tick?.value === 0
                    ? "rgba(94, 107, 125, 0.3)"
                    : "transparent";
                }
              },
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
                color: "#5E6B7D",
                stepSize: 1
              }
            },
            y: {
              type: "linear",
              display: true,
              position: "left",
              grid: {
                color: "rgba(94, 107, 125, 0.3)"
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
              max: 10,
              ticks: {
                callback: function (value) {
                  return `${Number(value).toFixed(0)}%`;
                },
                font: {
                  family: "SpaceGrotesk",
                  size: 10
                },
                stepSize: 2.5,
                color: "#5E6B7D"
              }
            },
            y1: {
              type: "linear",
              display: true,
              position: "right",
              grid: {
                display: false
              },
              title: {
                display: true,
                text: "Cumulative Probability",
                font: {
                  family: "SpaceGrotesk",
                  size: 12
                },
                color: "#5E6B7D"
              },
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function (value) {
                  return `${Number(value).toFixed(0)}%`;
                },
                font: {
                  family: "SpaceGrotesk",
                  size: 10
                },
                stepSize: 25,
                color: "#5E6B7D"
              }
            }
          }
        }
      });
    }
    return () => {
      chartInstance.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!chartInstance.current) return;
    setIsInit(false);
    const chart = chartInstance.current;

    const maxN = anchorPrice * 2;
    function calcLineData(n: number) {
      return 1 - (1 - 1 / maxN) ** n;
    }
    function calcBarData(n: number) {
      const alpha = 3.5;
      const min = 0.001;
      const ratio = Math.max(0, 1 - n / maxN);
      return min + (0.1 - min) * Math.pow(ratio, alpha);
    }
    const lineData = [];
    const barData = [];

    diff = maxN <= 100 ? 1 : Math.floor((maxN - 1) / 99);

    for (let n = 0; n <= maxN; n = n + diff) {
      lineData.push({
        x: n,
        y: calcLineData(n) * 100
      });
      if (n % 5 === 0) {
        barData.push({
          x: n,
          y: calcBarData(n) * 100
        });
      }
    }
    chart.data.datasets[0].data = lineData;
    chart.data.datasets[1].data = barData;

    const annotations = (chart.options.plugins?.annotation?.annotations ??
      {}) as any;
    if (annotations.anchorLine) {
      annotations.anchorLine.xMin = anchorPrice;
      annotations.anchorLine.xMax = anchorPrice;
      if (annotations.anchorLine.label) {
        annotations.anchorLine.label.content = `Anchor Price=$${anchorPrice}`;
      }
    }
    setTimeout(() => {
      updateBidPlace();
      setIsInit(true);
    }, 3000);
  }, [anchorPrice]);

  const updateBidPlace = () => {
    const chart = chartInstance.current;
    if (!chart || !iconRef.current || !redDotRef.current) return;
    iconRef.current.style.left = "0px";
    iconRef.current.style.top = "0px";
    redDotRef.current.style.left = "0px";
    redDotRef.current.style.top = "0px";
    chart.data.datasets.forEach((dataset, datasetIndex) => {
      if (dataset.type === "bar") return;
      const meta = chart.getDatasetMeta(datasetIndex);
      meta.data.forEach((point) => {
        const p = point as any;
        const pos = p.getProps(["x", "y"], true);
        if (Math.abs(p.raw?.x - bids) < diff && iconRef.current) {
          iconRef.current.style.left = `${pos.x + 7}px`;
          iconRef.current.style.top = `${pos.y - 26}px`;
        }

        if (Math.abs(p.raw?.x - totalBids) < diff && redDotRef.current) {
          redDotRef.current.style.left = `${pos.x + 10}px`;
          redDotRef.current.style.top = `${pos.y}px`;
        }
      });
    });
    chart.update();
  };
  useEffect(() => {
    if (isInit) {
      updateBidPlace();
    }
  }, [isInit, bids]);

  return (
    <div className="w-full h-full relative p-[4px_14px_14px] bg-[#1A1E24] rounded-[10px]">
      <Title />
      <Annotations />
      <canvas ref={chartRef}></canvas>
      <div
        ref={redDotRef}
        className="absolute z-[20]"
        style={{
          width: 8,
          height: 8,
          borderRadius: 8,
          background: "#FF3B30",
          pointerEvents: "none",
          opacity: isInit ? 1 : 0
        }}
      />
      <div
        className="absolute top-0 left-0 z-[10]"
        ref={iconRef}
        style={{
          opacity: isInit && anchorPrice * 2.4 > bids ? 1 : 0
        }}
      >
        <div className="text-[#88A3FF] text-[10px] ml-[-10px]">Your bid</div>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="11"
          viewBox="0 0 13 11"
          fill="none"
          animate={{
            y: [0, -5, 0]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path
            d="M5.63398 10.5C6.01888 11.1667 6.98113 11.1667 7.36603 10.5L12.1292 2.25C12.5141 1.58333 12.0329 0.75 11.2631 0.75H1.73686C0.967059 0.75 0.485935 1.58333 0.870835 2.25L5.63398 10.5Z"
            fill="#4470FF"
          />
        </motion.svg>
      </div>
    </div>
  );
}
