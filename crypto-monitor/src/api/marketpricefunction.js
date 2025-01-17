import { localApiInstance } from './axiosInstance.js';  // Import both axios instances



export const saveCryptoData = async (data) => {
    try {
      const response = await localApiInstance.post('/save-crypto', data);
      console.log('Crypto data saved:', response.data);
    } catch (error) {
      console.error('Error saving crypto data:', error);
    }
  };

  export const saveAlertData = async (alertData) => {
    try {
      const response = await localApiInstance.post('/create-alert', alertData);
      console.log('Alert data saved:', response.data);
    } catch (error) {
      console.error('Error saving alert data:', error);
    }
  };
  