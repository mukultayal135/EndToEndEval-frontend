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

export const CREATE_ENTRY = (id) => ({
  url: `/${id}/entry`,
  method: 'POST',
});

export const ADD_FIELD = (id) => ({
  url: `/content/${id}/fields`,
  method: 'POST',
});

export const GET_ALL_ENTRIES = (id) => ({
  url: `/${id}/entry`,
  method: 'GET',
});

export const DELETE_ENTRY = (id) => ({
  url: `/${id}/entry/`,
  method: 'DELETE',
});

export const UPDATE_FIELD = (id) => ({
  url: `/content/${id}/fields`,
  method: 'PATCH',
});
