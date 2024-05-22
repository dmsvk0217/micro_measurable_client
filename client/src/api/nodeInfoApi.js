import axiosInstance from './axiosInstance';

const requestURL = "/api/nodeInfo";

export const fetchNodes = async () => {
    const response = await axiosInstance.get(requestURL);
    console.log("🏃‍♀️🏃‍♀️🏃‍♀️🏃‍♀️ nodeinfoapi", response);

    return response.data;
};

