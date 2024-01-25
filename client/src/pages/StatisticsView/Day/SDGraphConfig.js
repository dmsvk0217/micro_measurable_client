// chartConfig
export const chartData = {
    labels: ['01시','02시','03시','04시','05시','06시','07시','08시','09시','10시','11시','12시','13시','14시','15시','16시','17시','18시','19시','20시','21시','22시','23시','24시'],
    datasets:[
        {
            label: '미세먼지',
            data: [3,6,5,3,4,2,3,20,30,45,52,60],
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
                suggestedMin: 0,
                suggestedMax: 80,
            }
        }
    }
};
