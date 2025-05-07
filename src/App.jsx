import React from 'react';
import './App.css';
import KMeansVisualization from './KMeansVisualization';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>K-Means Clustering Visualization</h1>
      </header>
      
      <main className="container mx-auto px-4 py-4 flex-grow">
        <KMeansVisualization />
      </main>
      
      <footer className="mt-auto py-6 text-center text-gray-600">
        <p>© 2023 - K-Means Clustering Visualization</p>
      </footer>
    </div>
  );
}

export default App;