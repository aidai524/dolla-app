import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const TempChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Generate data points for a normal distribution curve
      const generateNormalDistributionData = () => {
        const data = [];
        // Generate points from -30 to 40
        for (let x = -30; x <= 40; x += 1) {
          // Normal distribution formula with mean=5, stddev=10
          // Adjusted to match the peak at around 0.20 at x=5
          const mean = 5;
          const stdDev = 10;
          const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
          const y = 0.2 * Math.exp(exponent);
          data.push({ x: String(x), y });
        }

        return data;
      };

      const distributionData = generateNormalDistributionData();

      // Parse data
      const xValues = distributionData.map((item) => item.x);
      const yValues = distributionData.map((item) => item.y);

      // Create new chart
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: xValues,
            datasets: [
              {
                label: "Probability Density",
                data: yValues,
                borderColor: "#ff3b30",
                backgroundColor: "rgba(255, 59, 48, 0.1)",
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1, // Set aspect ratio to 1 for a square chart
            plugins: {
              title: {
                display: true,
                text: "LONG-TERM RETURN DISTRIBUTION",
                font: {
                  size: 18,
                  weight: "bold"
                }
              },
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Return (%)",
                  font: {
                    size: 14
                  }
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.1)"
                },
                ticks: {
                  callback: function (value) {
                    return value;
                  },
                  stepSize: 10,
                  // Display specific values on x-axis
                  autoSkip: false,
                  major: {
                    enabled: true
                  },
                  // Include only these specific values
                  includeBounds: true
                },
                // Force specific tick values to be displayed
                afterBuildTicks: (axis) => {
                  // @ts-ignore
                  axis.ticks = [-30, -20, -10, 0, 10, 20, 30, 40].map(
                    (value) => ({
                      value: String(value)
                    })
                  );
                }
              },
              y: {
                title: {
                  display: true,
                  text: "Probability Density",
                  font: {
                    size: 14
                  }
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.1)"
                },
                beginAtZero: true,
                ticks: {
                  callback: function (value) {
                    return Number(value).toFixed(2);
                  },
                  stepSize: 0.05
                },
                max: 0.25,
                min: 0.0
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
    <div className="w-full max-w-[600px] h-[400px] mx-auto">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TempChart;
