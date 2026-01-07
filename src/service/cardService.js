import axios from "axios";

const baseUrl = "https://portfolio-backend-8byl.onrender.com/api/v1/card";

export const getCards = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addCard = async (data) => {
  try {
    const response = await axios.post(baseUrl, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCard = async ({ cardId, data }) => {
  try {
    const response = await axios.put(baseUrl, { cardId, data });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCard = async (cardId) => {
  try {
    const response = await axios.delete(`${baseUrl}/${cardId}`);
    return "Deleted Successfully";
  } catch (error) {
    console.log(error);
  }
};
