import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useMap } from 'react-leaflet';
import heatmapData from './json_T95.json'; // Import your heatmap data directly

const Heatmap = () => {
  const map = useMap(); // Now correctly using useMap within MapContainer context

  const [plotData, setPlotData] = useState([]);
  const [layout, setLayout] = useState({});

  useEffect(() => {
    if (!map) return; // Ensure map is loaded

    const latitudes = heatmapData.map((item) => item.latitude);
    const longitudes = heatmapData.map((item) => item.longitude);
    const temperatures = heatmapData.map((item) => item.t2m);

    // Create plotly data for the heatmap
    const newPlotData = [
      {
        type: 'scattermapbox',
        mode: 'markers',
        lat: latitudes,
        lon: longitudes,
        marker: {
          color: temperatures, // Use temperatures for the color scale
          colorscale: 'Viridis', // Choose a colorscale (you can adjust this)
          size: 10,
          colorbar: {
            title: 'Temperature (°C)', // Custom temperature scale label
            tickvals: [0, 10, 20, 30, 40], // Adjust tick values
            ticktext: ['0°C', '10°C', '20°C', '30°C', '40°C'], // Adjust tick labels
          },
        },
      },
    ];

    // Set layout for Plotly map
    const newLayout = {
      geo: {
        projection: {
          type: 'mercator', // You can adjust this based on your dataset
        },
        showland: true,
        landcolor: 'rgb(255, 255, 255)', // White land color
        subunitcolor: 'rgb(255, 255, 255)', // White subunit color
        countrycolor: 'rgb(255, 255, 255)', // White country borders
      },
      mapbox: {
        style: 'open-street-map', // OpenStreetMap as the base layer
        center: { lat: latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length, lon: longitudes.reduce((sum, lon) => sum + lon, 0) / longitudes.length },
        zoom: 3, // Adjust this zoom level based on the dataset's geographical spread
      },
      title: 'Temperature Heatmap',
    };

    setPlotData(newPlotData);
    setLayout(newLayout);
  }, [map]);

  return (
    <div>
      {/* Use Plotly component for rendering the heatmap */}
      <Plot
        data={plotData}
        layout={layout}
        config={{ responsive: true }}
        useResizeHandler
      />
    </div>
  );
};

export default Heatmap;
