import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import heatmapData from './json_T95.json'; // Import your heatmap data directly

const Heatmap = () => {
  const [plotData, setPlotData] = useState([]);
  const [layout, setLayout] = useState({});

  useEffect(() => {
    const latitudes = heatmapData.map((item) => item.latitude);
    const longitudes = heatmapData.map((item) => item.longitude);
    const temperatures = heatmapData.map((item) => item.t2m);

    // Calculate the center of the map (average latitude and longitude)
    const avgLat = latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
    const avgLon = longitudes.reduce((sum, lon) => sum + lon, 0) / longitudes.length;

    // Calculate the bounds (min/max latitudes and longitudes) to adjust zoom level
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLon = Math.min(...longitudes);
    const maxLon = Math.max(...longitudes);

    // Adjust zoom based on the spread of the data
    const latDiff = maxLat - minLat;
    const lonDiff = maxLon - minLon;
    const zoom = Math.max(2, Math.min(10, Math.log(1 / Math.max(latDiff, lonDiff)) * 3)); // Dynamic zoom

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

    // Set layout for Plotly map with dynamic zoom and centered map
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
        center: { lat: avgLat, lon: avgLon },
        zoom: zoom, // Dynamically adjusted zoom
        zoomControl: true, // Enable zoom control buttons
        scrollwheelzoom: true,
        padding: { t: 50, b: 50, l: 50, r: 50 }, // Adds padding for better view
      },
      title: 'Temperature Heatmap',
    };

    setPlotData(newPlotData);
    setLayout(newLayout);
  }, []);

  return (
    <div style={{ width: '100%', height: '600px' }}>
      {/* Use Plotly component for rendering the heatmap */}
      <Plot
        data={plotData}
        layout={layout}
        config={{
          responsive: true,
          displayModeBar: true,    // Ensure the mode bar is always visible
          displaylogo: false,      // Hide the Plotly logo on the mode bar
          modeBarButtonsToRemove: [], // Keep all default buttons
          showAxisDragHandles: true, // Prevents hiding mode bar when zooming or panning
          showTips: true,          // Enable tooltips for the mode bar buttons
        }}
        useResizeHandler
      />
    </div>
  );
};

export default Heatmap;
