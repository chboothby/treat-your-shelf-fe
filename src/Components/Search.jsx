import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import bookplaceholder from "../bookplaceholder.jpg";
import "./Search.css";
import TransitionsModalSearch from "./TransitionsModalSearch";
import { getAllBooks } from "../api";

function Search() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBooks().then((data) => {
      console.log(data.books);
      setBooks(data.books);
      setLoading(false);
    });
  }, []);

  const [formValue, setFormValue] = useState({});

  const handleChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // API request in here
    console.log("submitted");
    setFormValue({});
  };

  return (
    <div className="search-results-container">
      <div>
        <form onSubmit={handleSubmit} className="search-form">
          <TextField
            style={{ margin: "1%" }}
            id="title"
            name="title"
            label="Title"
            variant="filled"
            onChange={handleChange}
          />
          <TextField
            name="author"
            onChange={handleChange}
            style={{ margin: "1%" }}
            id="author"
            label="Author"
            variant="filled"
          />
          <Button
            type="submit"
            variant="outlined"
            style={{ width: "70%", margin: "0 auto" }}
          >
            Search
          </Button>
        </form>
      </div>
      <div className="results-list">
        {loading ? (
          <p>Loading Bookshelf</p>
        ) : (
          books.books.map((book) => {
            return (
              // book div below need an ID from our backend
              <div className="book">
                <img src={book.thumbnail} alt="book"></img>
                <p>{book.title}</p>
                <TransitionsModalSearch book={book}></TransitionsModalSearch>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Search;
