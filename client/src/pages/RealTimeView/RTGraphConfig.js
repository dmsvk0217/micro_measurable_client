// chartConfig

// 측정물질별 라인 설정을 매핑하는 객체
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

    let pointColors = data.map(() => '#CCCCCC'); // 기본 색상 설정

    // substance가 'PM10'이거나 'PM2.5'일 때만 색상 계산 로직을 실행
    if (substance === 'PM10' || substance === 'PM2.5') {
        pointColors = data.map(value => getPointColor(value, substance));
    }


    const dataConfig = {
        labels: ['00시','01시','02시','03시','04시','05시','06시','07시','08시','09시','10시','11시','12시','13시','14시','15시','16시','17시','18시','19시','20시','21시','22시','23시'],
        datasets:[
            {
                label: substance,
                data: data,
                fill: false,
                backgroundColor: '#CCCCCC',
                borderColor: '#CCCCCC',
                pointBackgroundColor: pointColors,
            },
        ],
    }
    

    return dataConfig;
};

export const createGraphOptionsConfig = (substance) => {

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            annotation: {
                annotations: {
                  line1: {
                    type: 'line',
                    yMin: getLineValue(substance,0),
                    yMax: getLineValue(substance,0),
                    borderColor: '#7D9DDB',
                    borderWidth: substanceLineSettings[substance] ? 2:0,
                  },
                  line2: {
                    type: 'line',
                    yMin: getLineValue(substance,1),
                    yMax: getLineValue(substance,1),
                    borderColor: '#6EB057',
                    borderWidth: substanceLineSettings[substance] ? 2:0,
                  },
                  line3: {
                      type: 'line',
                      yMin: getLineValue(substance,2),
                      yMax: getLineValue(substance,2),
                      borderColor: '#D7E067',
                      borderWidth: substanceLineSettings[substance] ? 2:0,
                  },
                  line4: {
                      type: 'line',
                      yMin: getLineValue(substance,3),
                      yMax: getLineValue(substance,3),
                      borderColor: '#BB7373',
                      borderWidth: substanceLineSettings[substance] ? 2:0,
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
    }

    return options;
};
