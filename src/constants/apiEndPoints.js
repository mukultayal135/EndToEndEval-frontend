export const BACKEND_URL = 'http://localhost:8000';
export const AUTH_URL = 'http://localhost:4000';

export const GET_TOKEN = {
  url: '/login',
  method: 'POST',
};
export const GET_ALL_COLLECTION = {
  url: '/content ',
  method: 'GET',
};

export const CREATE_CONTENT_TYPE = {
  url: '/content',
  method: 'POST',
};

export const UPDATE_CONTENT_TYPE = (id) => ({
  url: `/content/${id}`,
  method: 'PATCH',
});

export const DELETE_FIELD = (id) => ({
  url: `/content/${id}/fields`,
  method: 'DELETE',
});
