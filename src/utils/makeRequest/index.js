/* eslint-disable no-alert */
/* eslint-disable consistent-return */
import axios from 'axios';

const makeRequest = async (URL, apiEndPoint, dynamicConfig) => {
  const requestDetails = {
    baseURL: URL,
    url: apiEndPoint.url,
    method: apiEndPoint.method,
    ...dynamicConfig,
  };
  const { data } = await axios(requestDetails);
  return data;
};

export default makeRequest;
