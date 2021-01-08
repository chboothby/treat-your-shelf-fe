import axios from "axios";

const treatApi = axios.create({
  baseURL: "https://treat-yo-shelf-backend.herokuapp.com/api/",
});

export const getAllBooks = () => {
  return treatApi.get("/books").then((data) => {
    return data.data;
  });
};

export const getSingleBook = (book_id) => {
  return treatApi.get(`/books/${book_id}`).then((data) => {
    return data.data;
  });
};
export const createNewUser = (user_id, username, email) => {
  return treatApi.post(`/users`, { user_id, username, email }).catch((err) => {
    console.log(err);
  });
};

export const getUserBookshelf = (user_id) => {
  return treatApi.get(`/users/${user_id}/books`).then((data) => {
    return data.data;
  });
};

export const changeUsername = (user_id, username) => {
  return treatApi.patch(`/users/${user_id}`, { username }).catch((err) => {
    console.log(err);
  });
};
