import axios from 'axios';

const API_BASE_URL = 'https://ss-task-backend.vercel.app/comments';

export const getAllComments = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addComment = async ({ name, email, body }) => {
  const response = await axios.post(API_BASE_URL, { name, email, body });
  return response.data;
};

export const updateComment = async (id, body) => {
  const response = await axios.patch(`${API_BASE_URL}/${id}`, body);
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const getCommentsFromThirdPartyApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/external`);
  return response.data;
}
