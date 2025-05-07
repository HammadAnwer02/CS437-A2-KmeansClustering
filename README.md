# K-Means Clustering Visualization

An interactive web application that demonstrates the K-Means clustering algorithm through a visual and step-by-step process. This project helps users understand how the K-Means algorithm works by showing the movement of centroids and cluster assignments in real-time.

![K-Means Visualization](https://via.placeholder.com/800x400?text=K-Means+Visualization)

## Features

- Interactive visualization of the K-Means clustering algorithm
- Step-by-step iteration display
- Real-time centroid movement tracking
- Detailed distance calculations between points and centroids
- Auto-play functionality to watch the algorithm converge
- Responsive design that works on both desktop and mobile devices

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kmeans-visualization.git
cd kmeans-visualization
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

## Usage

1. **Initial State**: The application starts with predefined data points and initial centroids.
2. **Navigation**:
   - Use the "Previous" and "Next" buttons to move through iterations
   - Click "Auto Play" to watch the algorithm converge automatically
   - Use "Show Distances" to view the distance calculations between points and centroids
3. **Visualization**:
   - Data points are shown as circles with their IDs
   - Centroids are shown as larger circles with "C1", "C2", etc.
   - Colors indicate cluster assignments
   - Grid lines help in understanding the coordinate system

## Technical Details

The visualization uses:
- React for the user interface
- SVG for rendering the visualization
- Tailwind CSS for styling
- Pre-computed iterations for accurate demonstration

## Project Structure

```
kmeans-visualization/
├── src/
│   ├── App.jsx              # Main application component
│   ├── App.css              # Global styles
│   └── KMeansVisualization.jsx  # Core visualization component
├── public/
│   └── index.html          # HTML template
├── package.json            # Project dependencies and scripts
└── README.md              # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The K-Means algorithm implementation is based on standard clustering techniques
- Special thanks to the React and Tailwind CSS communities for their excellent documentation and tools

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/kmeans-visualization](https://github.com/yourusername/kmeans-visualization)
