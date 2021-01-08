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
  console.log({ user_id, username, email });
  return treatApi.post(`/users`, { user_id, username, email }).catch((err) => {
    console.log(err);
  });
};

export const getUserBookshelf = (user_id) => {
  return treatApi.get(`/users/${user_id}/books`).then((data) => {
    return data.data;
  });
};

export const addBookToMyBookshelf = (book, user_id) => {
  console.log(book);
  const { title, authors, description, publishedDate, images } = book;
  console.log(images.thumbnail);

  const newBook = {
    title,
    authors,
    description,
    quality: 5,
    thumbnail: images.thumbnail,
  };

  return treatApi.post(`/users/${user_id}/books`, newBook).then((res) => {
    console.log(res);
  });
};
