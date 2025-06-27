import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import data from "./probability-data";

export default function ChartDemo() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            datasets: [
              {
                label: "Probability",
                data: data,
                backgroundColor: "#4a90e2",
                borderColor: "#2c6cb0",
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Attempt Number",
                  font: {
                    size: 14
                  }
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.1)"
                },
                ticks: {
                  callback: function (value) {
                    return value;
                  },
                  stepSize: 20
                },
                afterBuildTicks: (axis) => {
                  // @ts-ignore
                  axis.ticks = [0, 20, 40, 60, 80, 100].map((value) => ({
                    value
                  }));
                }
              },
              y: {
                title: {
                  display: true,
                  text: "Probability",
                  font: {
                    size: 14
                  }
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.1)"
                },
                beginAtZero: true,
                max: 0.009
              }
            },
            plugins: {
              title: {
                display: true,
                text: "Probability of First Win within First 100 Attempts (p = 1/120)",
                font: {
                  size: 16
                }
              },
              tooltip: {
                enabled: false
              },
              legend: {
                display: false
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

  return (
    <div className="w-[600px] h-[400px]">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
