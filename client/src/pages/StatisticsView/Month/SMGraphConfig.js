const substanceLineSettings = {
    'PM2.5': [ 0, 15, 35, 75 ],
    'PM10': [ 0,30,80,150 ],
};

const getLineValue = (substance, index) => {
    return substanceLineSettings[substance] ?  substanceLineSettings[substance][index] : 0
}

const getPointColor = (value, substance) => {
    if(substanceLineSettings[substance]){
        if(value > substanceLineSettings[substance][3]) return '#BB7373';//worse
        else if(value > substanceLineSettings[substance][2]) return '#D7E067';//bad
        else if(value > substanceLineSettings[substance][1]) return '#6EB057';//normal
        else if(value > substanceLineSettings[substance][0]) return '#7D9DDB';//good
        else return '#CCCCCC';
    }
    else{
        return '#CCCCCC';
    }

}

export const createGraphDataConfig = (data, substance) => {

    const datasets = data.map(item => {
        let pointColors = item.data.map(() => '#CCCCCC'); // 기본 색상 설정

        // substance가 'PM10'이거나 'PM2.5'일 때만 색상 계산 로직을 실행
        if (substance === 'PM10' || substance === 'PM2.5') {
            pointColors = item.data.map(value => getPointColor(value, substance));
        }

        return ({
        label: item.node + ' - ' + substance, 
        data: item.data,
        fill: false,
        backgroundColor: '#CCCCCC',
        borderColor: '#CCCCCC',
        pointBackgroundColor: pointColors,
    })})
    const dataConfig = {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        datasets: datasets,
    }
    
    return dataConfig;
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
