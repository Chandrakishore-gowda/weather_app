import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet.heat'; // Import leaflet.heat for heatmap
import L from 'leaflet';
import styles from './my_styles.module.css';
//import heatmapData from './heatmapData.json';
//import heatmapData from './converted_heatmap_data.json';
import heatmapData from './normalized_heatmap_data1.json';

// // Function to provide heatmap data
// const getHeatmapData = () => {
//   return [
//     [28.7041, 77.1025, 0.5],  // New Delhi
//     [19.0760, 72.8777, 0.6],  // Mumbai
//     [12.9716, 77.5946, 1.0],    // Bengaluru
//     [22.5726, 88.3639, 0.4],  // Kolkata
//     [13.0827, 80.2707, 0.8],  // Chennai
//     [31.5497, 74.3436, 0.5],  // Lahore
//     [17.3854, 78.4867, 0.3],  // Hyderabad
//     // Add more coordinates and intensity here
//   ];
// };

// Convert new data format to the format required for heatmap
// const convertToHeatmapData = (data) => {
//   return data.map(item => [
//     item.latitude,    // Latitude
//     item.longitude,   // Longitude
//     item.t2m / 100         // Intensity (t2m as the intensity)
//   ]);
// };

// const getHeatmapData = convertToHeatmapData(heatmapData);

// getHeatmapData function just returns the imported data
const getHeatmapData = () => {
  return heatmapData;
};

const HeatMap = ({}) => {
  const map = useMap(); // Get the map instance
  const [heatLayer, setHeatLayer] = useState(null); // Track the heatmap layer
  const [showHeatmap, setShowHeatmap] = useState(false); // Control heatmap visibility

//   useEffect(() => {
//     if (map ) {
//       // Create the heatmap layer if it's not already created
//       if (!heatLayer) {
//         const newHeatLayer = L.heatLayer(getHeatmapData(), {
//           radius: 25,      // Size of the radius (larger is more spread out)
//           blur: 15,        // Amount of blur (higher makes the heatmap smoother)
//           maxZoom: 4.5,    // Maximum zoom level for heatmap rendering
//           gradient: {
//             0.0: 'blue',   // Low intensity (blue)
//             0.2: 'cyan',   // Medium intensity (cyan)
//             0.4: 'lime',   // Medium-high intensity (lime)
//             0.6: 'yellow', // High intensity (yellow)
//             0.8: 'orange', // Very high intensity (orange)
//             1.0: 'red'     // Maximum intensity (red)
//           },
//         });
//         newHeatLayer.addTo(map);
//         setHeatLayer(newHeatLayer); // Save the heatLayer instance to state
//       }
//     } else if (heatLayer ) {
//       // Remove the heatmap layer if it's currently visible and needs to be hidden
//       map.removeLayer(heatLayer);
//       setHeatLayer(null); // Clear the heatLayer state
//     }
//   }, [map, heatLayer]);

//   return null; // This component doesn't render anything, it's just a side effect
// };


useEffect(() => {
  if (map) {
    if (showHeatmap && !heatLayer) {
      // Create and add the heatmap layer if it should be shown
      const newHeatLayer = L.heatLayer(getHeatmapData(), {
        radius: 1,      // Size of the radius (larger is more spread out)
        blur: 15,        // Amount of blur (higher makes the heatmap smoother)
        maxZoom: 8,    // Maximum zoom level for heatmap rendering
        gradient: {
          0.5: 'blue',   // Low intensity (blue)
          0.6: 'cyan',   // Medium intensity (cyan)
          0.7: 'lime',   // Medium-high intensity (lime)
          0.8: 'yellow', // High intensity (yellow)
          0.9: 'orange', // Very high intensity (orange)
          1.0: 'red'     // Maximum intensity (red)
        },
      });
      newHeatLayer.addTo(map);
      setHeatLayer(newHeatLayer); // Save the heatLayer instance to state
    } else if (!showHeatmap && heatLayer) {
      // Remove the heatmap layer if it should not be shown
      map.removeLayer(heatLayer);
      setHeatLayer(null); // Clear the heatLayer state
    }
  }
}, [map, heatLayer, showHeatmap]);

return (
  <div className={styles.HeatMap}>
    <button onClick={() => setShowHeatmap((prev) => !prev)}>
      {showHeatmap ? 'Hide Heatmap' : 'Show Heatmap'}
    </button>
  </div>
);
};

export default HeatMap;
