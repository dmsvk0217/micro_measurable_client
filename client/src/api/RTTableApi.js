import axiosInstance from './axiosInstance';

export const fetchRTTableData = async ({selectedLocation, selectedDate, selectedUnit, selectedHour}) => {
    

    let formattedDate;
    let requestURL;

    //시차 영향 제거
    if (selectedDate) {
        const offset = selectedDate.getTimezoneOffset() * 60000;
        const adjustedDate = new Date(selectedDate.getTime() - offset);
        formattedDate = adjustedDate.toISOString().split('T')[0];
    }

    const requestBody = {
        date: formattedDate,
    };

    if (selectedLocation.match("전체") && selectedUnit.match("일평균")) {
      console.log("전체노드 일평균");
      requestURL =
        "/all-nodes/all-substances/daily-averages";
      /*
        모든 노드에 대한 모든 물질의 일평균 데이터
        /api/all-nodes/all-substances/daily-averages
        {
          date : "2024-01-01"
        }
      */
    }

    if (!selectedLocation.match("전체") && selectedUnit.match("일평균")) {
      console.log("특정노드 일평균");
      requestBody["nodeAddressName"] = selectedLocation;
      requestURL =
        "/node/all-substances/daily-averages";
      /*
        특정 노드에 대한 모든 물질의 일평균 데이터
        /api/node/all-substances/daily-averages
        {
          "date":"2024-01-15"
          "nodeAddressName": "2"
        }
      */
    }

    if (
      selectedLocation.match("전체") &&
      selectedUnit.match("시간평균") &&
      selectedHour.match("전체")
    ) {
      console.log("전체노드 시간평균 전체시간");
      alert("전체시간으로 검색시에는 상세 측정소명을 선택하셔야 합니다.");
    }

    if (
      selectedLocation.match("전체") &&
      selectedUnit.match("시간평균") &&
      !selectedHour.match("전체")
    ) {
      console.log("전체노드 시간평균 특정시간");
      requestBody["hour"] = selectedHour;
      requestURL =
        "/all-nodes/all-substances/hourly-averages";
      /*
        모든 노드에 대한 모든 물질의 시간평균 데이터
        /api/all-nodes/all-substances/hourly-averages
        {
          ”date”:”2024-01-15”
          ”hour”:”08”
        }
      */
    }

    if (
      !selectedLocation.match("전체") &&
      selectedUnit.match("시간평균") &&
      selectedHour.match("전체")
    ) {
      console.log("특정노드 시간평균 전체시간");
      requestBody["nodeAddressName"] = selectedLocation;
      requestURL =
        "/node/all-substances/all-hourly-averages";
      /*
        특정 노드에 대한 모든 물질의 일간 시간평균 데이터
        /api/node/all-substances/all-hourly-averages
        {
          ”date”:”2024-01”
          ”nodeAddressName” : “4”
        }
      */
    }

    if (
      !selectedLocation.match("전체") &&
      selectedUnit.match("시간평균") &&
      !selectedHour.match("전체")
    ) {
      console.log("특정노드 시간평균 특정시간");
      requestBody["hour"] = selectedHour;
      requestBody["nodeAddressName"] = selectedLocation;
      requestURL =
        "/node/all-substances/hourly-averages";
      /*
        특정 노드에 대한 모든 물질의 시간평균 데이터
        /api/node/all-substances/hourly-averages
        {
          ”date”:”2024-01-15”
          ”hour”:”21”
          ”nodeAddressName”:13
        }
      */
    }

    console.log("🚀 ~ handleTableSubmit ~ requestURL:", requestURL);
    console.log("🚀 ~ handleTableSubmit ~ requestBody:", requestBody);

    const response = await axiosInstance.post(requestURL, requestBody);

    return response.data;
};

