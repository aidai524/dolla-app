import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { motion } from "framer-motion";

export default function WinningProbabiltyChart({ data }: { data: any }) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            datasets: [
              {
                data: [],
                borderColor: "#000000",
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                segment: {
                  borderColor: (ctx) => {
                    const value = ctx.p1.parsed.x;
                    return value >= data.sold_shares
                      ? "#FF60A8"
                      : "rgb(55,34,47)";
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
                text: "Winning Probabilty",
                font: {
                  size: 12,
                  family: "SpaceGrotesk"
                },
                color: "#666"
              },
              legend: {
                display: false
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
                    return `Attempts: ${items[0].parsed.x}`;
                  },
                  label: (item) => {
                    return `Probability: ${item.parsed.y.toFixed(0)}%`;
                  }
                }
              }
            },
            scales: {
              x: {
                type: "linear",
                grid: {
                  color: "rgba(0, 0, 0, 0.1)"
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
                }
              },
              y: {
                grid: {
                  color: "rgba(0, 0, 0, 0.1)"
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
                  stepSize: 25,
                  color: "#666"
                }
              }
            }
          }
        });
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const _d = data.cumulative_win_chart?.points || [];
    if (_d.length === 0 || !chartInstance.current || !iconRef.current) return;

    try {
      const chart = chartInstance.current;
      const sortedData = [..._d].sort(
        (a, b) => Number(a.attempts) - Number(b.attempts)
      );

      chart.data.datasets[0].data = sortedData.map((item) => ({
        x: item.attempts,
        y: item.cumulative_probability * 100
      }));

      chart.update("none");

      chart.data.datasets.forEach((dataset, datasetIndex) => {
        const meta = chart.getDatasetMeta(datasetIndex);
        meta.data.forEach((point, i) => {
          const pos = point.getProps(["x", "y"], true);
          // @ts-ignore
          if (point.raw.x === data.sold_shares && iconRef.current) {
            iconRef.current.style.left = `${pos.x + 7}px`;
            iconRef.current.style.top = `${pos.y - 5}px`;
          }
        });
      });
    } catch (error) {
      console.error("Error updating chart:", error);
    }
  }, [data]);

  return (
    <div className="w-full h-[229px] relative p-[14px] border border-[#373737] bg-[#141519] rounded-[10px] mt-[12px]">
      <canvas ref={chartRef}></canvas>
      <div className="absolute top-0 left-0 " ref={iconRef}>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="10"
          viewBox="0 0 14 10"
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
            d="M5.45709 9.12932C6.25706 10.0992 7.74294 10.0992 8.54291 9.12932L12.9611 3.77257C14.037 2.46809 13.1091 0.5 11.4182 0.5H2.58183C0.890891 0.5 -0.0370021 2.46809 1.03892 3.77257L5.45709 9.12932Z"
            fill="#FF60A8"
          />
        </motion.svg>
      </div>
    </div>
  );
}
