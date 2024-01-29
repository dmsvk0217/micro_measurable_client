export const chartData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    datasets: [
        {
            label: '미세먼지',
            data: [5, 15, 26, 20, 45, 32, 42, 60, 43],
            fill: false,
            backgroundColor: '#CCCCCC',
            borderColor: '#CCCCCC',
        },
    ],
};

export const chartOptions = {
    plugins: {
        legend: {
            display: false,
        },
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              yMin: 0,
              yMax: 0,
              borderColor: '#7D9DDB',
              borderWidth: 2,
            },
            line2: {
              type: 'line',
              yMin: 16,
              yMax: 16,
              borderColor: '#6EB057',
              borderWidth: 2,
            },
            line3: {
                type: 'line',
                yMin: 36,
                yMax: 36,
                borderColor: '#D7E067',
                borderWidth: 2,
            },
            line4: {
                type: 'line',
                yMin: 76,
                yMax: 76,
                borderColor: '#BB7373',
                borderWidth: 2,
            },
          }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 10,
                suggestedMin: 0, // Suggests a minimum value for the scale
                suggestedMax: 80, // Suggests a maximum value for the scale
              }
        }
    }
};
