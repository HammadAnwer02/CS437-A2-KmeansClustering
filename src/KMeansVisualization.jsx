import { useState, useEffect } from 'react';

// Dataset definition
const initialDataset = [
  { id: 'A1', x: 2, y: 10, originalLabel: 'A' },
  { id: 'A2', x: 2, y: 5, originalLabel: 'A' },
  { id: 'A3', x: 8, y: 4, originalLabel: 'A' },
  { id: 'B1', x: 5, y: 8, originalLabel: 'B' },
  { id: 'B2', x: 7, y: 5, originalLabel: 'B' },
  { id: 'B3', x: 6, y: 4, originalLabel: 'B' },
  { id: 'C1', x: 1, y: 2, originalLabel: 'C' },
  { id: 'C2', x: 4, y: 9, originalLabel: 'C' },
];

// Initial centroids
const initialCentroids = [
  { id: 1, x: 2, y: 10, color: '#FF5733' }, // Cluster 1 (from A1)
  { id: 2, x: 5, y: 8, color: '#33FF57' },  // Cluster 2 (from B1)
  { id: 3, x: 1, y: 2, color: '#3357FF' },  // Cluster 3 (from C1)
];

// Pre-computed iterations data
const iterationsData = [
  // Iteration 1
  {
    assignments: [
      { id: 'A1', cluster: 1 },
      { id: 'A2', cluster: 3 },
      { id: 'A3', cluster: 2 },
      { id: 'B1', cluster: 2 },
      { id: 'B2', cluster: 2 },
      { id: 'B3', cluster: 2 },
      { id: 'C1', cluster: 3 },
      { id: 'C2', cluster: 2 },
    ],
    centroids: [
      { id: 1, x: 2, y: 10, color: '#FF5733' },
      { id: 2, x: 6, y: 6, color: '#33FF57' },
      { id: 3, x: 1.5, y: 3.5, color: '#3357FF' },
    ],
    distanceMatrix: [
      // Distances from each point to each centroid
      [0, 3.61, 8.06],     // A1
      [5, 4.24, 3.16],     // A2
      [8.49, 5, 7.28],     // A3
      [3.61, 0, 7.21],     // B1
      [7.07, 3.61, 6.71],  // B2
      [7.21, 4.12, 5.39],  // B3
      [8.06, 7.21, 0],     // C1
      [2.24, 1.41, 7.62],  // C2
    ]
  },
  // Iteration 2
  {
    assignments: [
      { id: 'A1', cluster: 1 },
      { id: 'A2', cluster: 3 },
      { id: 'A3', cluster: 2 },
      { id: 'B1', cluster: 2 },
      { id: 'B2', cluster: 2 },
      { id: 'B3', cluster: 2 },
      { id: 'C1', cluster: 3 },
      { id: 'C2', cluster: 1 },
    ],
    centroids: [
      { id: 1, x: 3, y: 9.5, color: '#FF5733' },
      { id: 2, x: 6.5, y: 5.25, color: '#33FF57' },
      { id: 3, x: 1.5, y: 3.5, color: '#3357FF' },
    ],
    distanceMatrix: [
      // Distances from each point to each centroid
      [1.12, 6.54, 6.52],     // A1
      [4.61, 4.51, 1.58],     // A2
      [7.43, 1.95, 6.52],     // A3
      [2.5, 3.13, 5.7],       // B1
      [6.02, 0.56, 5.7],      // B2
      [6.26, 1.35, 4.53],     // B3
      [7.76, 6.39, 1.58],     // C1
      [1.12, 4.51, 6.04],     // C2
    ]
  },
  // Iteration 3
  {
    assignments: [
      { id: 'A1', cluster: 1 },
      { id: 'A2', cluster: 3 },
      { id: 'A3', cluster: 2 },
      { id: 'B1', cluster: 1 },
      { id: 'B2', cluster: 2 },
      { id: 'B3', cluster: 2 },
      { id: 'C1', cluster: 3 },
      { id: 'C2', cluster: 1 },
    ],
    centroids: [
      { id: 1, x: 3.67, y: 9, color: '#FF5733' },
      { id: 2, x: 7, y: 4.33, color: '#33FF57' },
      { id: 3, x: 1.5, y: 3.5, color: '#3357FF' },
    ],
    distanceMatrix: [
      // Distances from each point to each centroid
      [1.94, 7.57, 6.52],     // A1
      [4.33, 5.04, 1.58],     // A2
      [6.62, 1.05, 6.52],     // A3
      [1.66, 4.18, 5.7],      // B1
      [5.21, 0.67, 5.7],      // B2
      [5.52, 1.05, 4.53],     // B3
      [7.49, 6.44, 1.58],     // C1
      [0.33, 5.55, 6.04],     // C2
    ]
  },
  // Iteration 4 (convergence)
  {
    assignments: [
      { id: 'A1', cluster: 1 },
      { id: 'A2', cluster: 3 },
      { id: 'A3', cluster: 2 },
      { id: 'B1', cluster: 1 },
      { id: 'B2', cluster: 2 },
      { id: 'B3', cluster: 2 },
      { id: 'C1', cluster: 3 },
      { id: 'C2', cluster: 1 },
    ],
    centroids: [
      { id: 1, x: 3.67, y: 9, color: '#FF5733' },
      { id: 2, x: 7, y: 4.33, color: '#33FF57' },
      { id: 3, x: 1.5, y: 3.5, color: '#3357FF' },
    ],
    distanceMatrix: [
      // Same as iteration 3 since we've converged
      [1.94, 7.57, 6.52],     // A1
      [4.33, 5.04, 1.58],     // A2
      [6.62, 1.05, 6.52],     // A3
      [1.66, 4.18, 5.7],      // B1
      [5.21, 0.67, 5.7],      // B2
      [5.52, 1.05, 4.53],     // B3
      [7.49, 6.44, 1.58],     // C1
      [0.33, 5.55, 6.04],     // C2
    ]
  }
];

// Calculate the Euclidean distance between two points
const calculateDistance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export default function KMeansVisualization() {
  const [currentIteration, setCurrentIteration] = useState(0);
  const [showDistances, setShowDistances] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [dataset, setDataset] = useState([]);
  const [centroids, setCentroids] = useState([]);
  
  const maxIterations = iterationsData.length;

  // Initialize dataset with cluster assignments
  useEffect(() => {
    const newDataset = initialDataset.map((point, index) => {
      const assignment = iterationsData[currentIteration].assignments[index];
      const centroidColor = iterationsData[currentIteration].centroids.find(
        c => c.id === assignment.cluster
      ).color;
      
      return {
        ...point,
        cluster: assignment.cluster,
        color: centroidColor
      };
    });
    
    setDataset(newDataset);
    setCentroids(iterationsData[currentIteration].centroids);
  }, [currentIteration]);

  // Handle auto-play
  useEffect(() => {
    let intervalId;
    if (autoPlay && currentIteration < maxIterations - 1) {
      intervalId = setInterval(() => {
        setCurrentIteration(prev => {
          const next = prev + 1;
          if (next >= maxIterations) {
            setAutoPlay(false);
            return maxIterations - 1;
          }
          return next;
        });
      }, 2000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoPlay, currentIteration, maxIterations]);

  const handlePrevious = () => {
    if (currentIteration > 0) {
      setCurrentIteration(currentIteration - 1);
    }
  };

  const handleNext = () => {
    if (currentIteration < maxIterations - 1) {
      setCurrentIteration(currentIteration + 1);
    }
  };

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  const toggleShowDistances = () => {
    setShowDistances(!showDistances);
  };

  const isInitialState = currentIteration === 0;
  const isFinalState = currentIteration === maxIterations - 1;
  
  // These are the chart bounds with a bit of padding
  const xMin = 0;
  const xMax = 10;
  const yMin = 0;
  const yMax = 12;
  
  // Chart dimensions
  const chartWidth = 600;
  const chartHeight = 400;
  
  // Function to convert data coordinates to SVG coordinates
  const xScale = (x) => (x - xMin) / (xMax - xMin) * chartWidth;
  const yScale = (y) => chartHeight - (y - yMin) / (yMax - yMin) * chartHeight;

  return (
    <div className="flex flex-col p-4 w-full max-w-6xl mx-auto">
      <div className="App-header mb-8">
        <h1 className="text-3xl font-bold mb-2">K-Means Clustering Visualization</h1>
        <p className="text-lg">An interactive demonstration of the K-Means algorithm</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Chart area */}
        <div className="w-full lg:w-2/3 card p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-1">Visualization</h2>
            <p className="text-gray-600">Watch the algorithm find optimal clusters</p>
          </div>
          
          <svg width={chartWidth} height={chartHeight} className="mb-6">
            {/* Grid lines */}
            {Array.from({ length: 11 }, (_, i) => (
              <line 
                key={`x-grid-${i}`} 
                x1={xScale(i)} 
                y1={0} 
                x2={xScale(i)} 
                y2={chartHeight} 
                stroke="#e0e0e0" 
                strokeWidth="1"
              />
            ))}
            {Array.from({ length: 11 }, (_, i) => (
              <line 
                key={`y-grid-${i}`} 
                x1={0} 
                y1={yScale(i)} 
                x2={chartWidth} 
                y2={yScale(i)} 
                stroke="#e0e0e0" 
                strokeWidth="1"
              />
            ))}

            {/* Axes */}
            <line 
              x1={0} 
              y1={chartHeight} 
              x2={chartWidth} 
              y2={chartHeight} 
              stroke="black" 
              strokeWidth="1"
            />
            <line 
              x1={0} 
              y1={0} 
              x2={0} 
              y2={chartHeight} 
              stroke="black" 
              strokeWidth="1"
            />
            
            {/* X axis labels */}
            {Array.from({ length: 11 }, (_, i) => (
              <text 
                key={`x-label-${i}`} 
                x={xScale(i)} 
                y={chartHeight + 20} 
                textAnchor="middle" 
                fontSize="12"
              >
                {i}
              </text>
            ))}
            
            {/* Y axis labels */}
            {Array.from({ length: 13 }, (_, i) => (
              <text 
                key={`y-label-${i}`} 
                x={-20} 
                y={yScale(i)} 
                textAnchor="middle" 
                fontSize="12" 
                dominantBaseline="middle"
              >
                {i}
              </text>
            ))}
            
            {/* Data points */}
            {dataset.map((point) => (
              <g key={point.id}>
                <circle
                  cx={xScale(point.x)}
                  cy={yScale(point.y)}
                  r={8}
                  fill={point.color}
                  stroke="black"
                  strokeWidth="1"
                  filter="drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))"
                />
                <text
                  x={xScale(point.x)}
                  y={yScale(point.y)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill="white"
                >
                  {point.id}
                </text>
              </g>
            ))}
            
            {/* Centroids */}
            {centroids.map((centroid) => (
              <g key={`centroid-${centroid.id}`}>
                <circle
                  cx={xScale(centroid.x)}
                  cy={yScale(centroid.y)}
                  r={10}
                  fill={centroid.color}
                  stroke="black"
                  strokeWidth="2"
                  opacity="0.8"
                  filter="drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.3))"
                />
                <text
                  x={xScale(centroid.x)}
                  y={yScale(centroid.y)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill="white"
                >
                  C{centroid.id}
                </text>
              </g>
            ))}
          </svg>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            {/* Control buttons in a row */}
            <div className="flex justify-between items-center">
              <button 
                onClick={handlePrevious} 
                disabled={isInitialState}
                className={`btn-primary ${isInitialState ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                ← Previous
              </button>
              
              <button 
                onClick={toggleAutoPlay} 
                className={autoPlay ? 'btn-danger' : 'btn-success'}
              >
                {autoPlay ? '■ Stop' : '▶ Auto Play'}
              </button>
              
              <button 
                onClick={handleNext} 
                disabled={isFinalState}
                className={`btn-primary ${isFinalState ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next →
              </button>
            </div>
            
            {/* Iteration count below */}
            <div className="iteration-counter">
              <div className="text-xl font-bold">
                Iteration {currentIteration} {isFinalState ? '(Converged)' : ''}
              </div>
            </div>
          </div>
        </div>
        
        {/* Data panel */}
        <div className="w-full lg:w-1/3 card p-6 flex flex-col">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold mb-2">Iteration Details</h2>
            <button 
              onClick={toggleShowDistances}
              className="btn-secondary"
            >
              {showDistances ? 'Hide Distances' : 'Show Distances'}
            </button>
          </div>
          
          <div className="overflow-auto flex-grow text-center">
            <h3 className="font-semibold text-xl mb-3 text-gray-800">Centroids</h3>
            <table className="mb-6">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-center">Cluster</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Position</th>
                </tr>
              </thead>
              <tbody>
                {centroids.map((centroid) => (
                  <tr key={`centroid-detail-${centroid.id}`}>
                    <td className="border border-gray-300 px-4 py-2">
                      <span 
                        className="inline-block w-4 h-4 rounded-full mr-2" 
                        style={{ backgroundColor: centroid.color }}
                      ></span>
                      Cluster {centroid.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      ({centroid.x.toFixed(2)}, {centroid.y.toFixed(2)})
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <h3 className="font-semibold text-xl mb-3 text-gray-800">Cluster Assignments</h3>
            <table>
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-center">Point</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Position</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Assigned Cluster</th>
                  {showDistances && (
                    <th className="border border-gray-300 px-4 py-2 text-center">Distances</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {dataset.map((point, index) => (
                  <tr key={`point-detail-${point.id}`}>
                    <td className="border border-gray-300 px-4 py-2 font-medium">{point.id}</td>
                    <td className="border border-gray-300 px-4 py-2">({point.x}, {point.y})</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span 
                        className="inline-block w-4 h-4 rounded-full mr-2" 
                        style={{ backgroundColor: point.color }}
                      ></span>
                      Cluster {point.cluster}
                    </td>
                    {showDistances && (
                      <td className="border border-gray-300 px-4 py-2 text-sm">
                        {iterationsData[currentIteration].distanceMatrix[index].map((distance, i) => (
                          <div key={`distance-${point.id}-${i}`} className="mb-1 text-left">
                            C{i+1}: <span className="font-medium">{distance.toFixed(2)}</span>
                            {iterationsData[currentIteration].assignments[index].cluster === i+1 && 
                              <span className="text-green-600 font-bold ml-1">✓</span>}
                          </div>
                        ))}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Activity log */}
      <div className="mt-8 card p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Iteration Summary</h2>
        <div className="card p-6 border-t-4 border-blue-500">
          {currentIteration === 0 ? (
            <div className="text-center">
              <p className="font-bold text-xl mb-3 text-blue-800">Initial Setup:</p>
              <p className="mb-2">• Initial centroids selected: <span className="font-semibold">A1(2,10)</span>, <span className="font-semibold">B1(5,8)</span>, and <span className="font-semibold">C1(1,2)</span></p>
              <p>• Calculating distances and making initial assignments</p>
            </div>
          ) : currentIteration === maxIterations - 1 ? (
            <div className="text-center">
              <p className="font-bold text-xl mb-3 text-green-800">Final Result (Convergence Reached):</p>
              <p className="mb-2">• No change in assignments from previous iteration</p>
              <p className="mb-2">• Final clusters:</p>
              <ul className="list-none space-y-2 mt-4">
                <li><span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5733' }}></span> Cluster 1: <span className="font-medium">A1(2,10), B1(5,8), C2(4,9)</span> → Centroid at <span className="font-semibold">(3.67, 9)</span></li>
                <li><span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#33FF57' }}></span> Cluster 2: <span className="font-medium">A3(8,4), B2(7,5), B3(6,4)</span> → Centroid at <span className="font-semibold">(7, 4.33)</span></li>
                <li><span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#3357FF' }}></span> Cluster 3: <span className="font-medium">A2(2,5), C1(1,2)</span> → Centroid at <span className="font-semibold">(1.5, 3.5)</span></li>
              </ul>
            </div>
          ) : (
            <div className="text-center">
              <p className="font-bold text-xl mb-3 text-blue-800">Iteration {currentIteration}:</p>
              <p className="mb-2">• Recalculated centroids from previous assignments</p>
              <p className="mb-2">• New centroids:</p>
              <div className="flex flex-col items-center space-y-1 my-3">
                {centroids.map(c => (
                  <p key={`log-centroid-${c.id}`}>
                    <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: c.color }}></span>
                    Cluster {c.id}: <span className="font-semibold">({c.x.toFixed(2)}, {c.y.toFixed(2)})</span>
                  </p>
                ))}
              </div>
              <p className="mt-2">• Calculated new distances and updated assignments</p>
              {currentIteration === maxIterations - 2 && (
                <p className="text-green-700 font-bold mt-4 p-2 bg-green-100 rounded">Next iteration will show convergence!</p>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="footer-like">
        <p>K-Means Clustering Algorithm Visualization © 2023</p>
      </div>
    </div>
  );
}