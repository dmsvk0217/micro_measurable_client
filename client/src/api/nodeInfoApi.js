import axiosInstance from './axiosInstance';

const requestURL = "/api/nodeInfo";

export const fetchNodes = async () => {
    const response = await axiosInstance.get(requestURL);
    console.log("🏃‍♀️🏃‍♀️🏃‍♀️🏃‍♀️ nodeinfoapi", response);

    return response.data;
};

export const createNode = async (nodeAddress,location,latitude,longitude) => {
  const lat = +latitude; // double 형태로 변환
  const long = +longitude; // double 형태로 변환
  const requestBody = {
    nodeAddress,
    location,
    latitude: lat,
    longitude: long,
  };

  const response = await axiosInstance.post(requestURL, requestBody);

  return response.data;
};

export const updateNode = async (id, nodeAddress, location, latitude, longitude) => { 
  const lat = +latitude; // double 형태로 변환
  const long = +longitude; // double 형태로 변환
  const requestBody = {
    id,
    nodeAddress,
    location,
    latitude: lat,
    longitude: long,
  };

  console.log("asdf", requestBody);
  const response = await axiosInstance.put(requestURL, requestBody);

  return response.data;
};

export const deleteNode = async (id) => {
  const requestBody = {
    data: {
      id,
    }
  };

  const response = await axiosInstance.delete(requestURL, requestBody);

  return response.data;
};
