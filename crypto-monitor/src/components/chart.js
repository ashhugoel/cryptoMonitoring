const graphOptions = {
  responsive: true,
  animation: false, // Disable animation
  lineTension: 0,
  plugins: {
    colors: {
      forceOverride: true,
    },
    tooltip: {
      enabled: true, // Enable tooltips
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background for the tooltip
      titleColor: '#fff', // White color for the tooltip title
      bodyColor: '#fff', // White color for the tooltip body
      borderWidth: 4, // Tooltip border width
      callbacks: {
        label: function (context) {
          // Format the label to show the price
          const value = context.raw; // The raw data value at the hovered point
          return `Price: $${value.toLocaleString()}`; // Format as a price
        },
      },
    },
  },
  pointStyle: false,
  scales: {
    x: {
      title: {
        display: true,
        text: "Time", // Label for the x-axis
        color: 'rgb(181, 181, 181)',
        font: {
          size: 20, // Font size for y-axis labels
        }, // White color for x-axis label
      },
      ticks: {
        color: 'rgb(181, 181, 181)', // White color for x-axis ticks
      },
    },
    y: {
      title: {
        display: true,
        text: "Price", // Label for the y-axis
        color: 'rgb(181, 181, 181)',
        font: {
          size: 20, // Font size for y-axis labels
        } // White color for y-axis label
      },
      ticks: {
        color: 'rgb(181, 181, 181)', // White color for y-axis ticks
      },
    },
  },
  datasets: [{
    label: 'Price Over Time',
    data: [/* your data array here */],
    borderColor: '#0000ff', // Set the color of the line
    backgroundColor: 'rgba(255, 99, 132, 0.2)', // Optional: Fill color under the line (semi-transparent)
    borderWidth: 1, // Line width
    tension: 0, // Set to 0 for sharp lines
  }],
};

export default graphOptions;
