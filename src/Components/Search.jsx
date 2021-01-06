import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import bookplaceholder from "../bookplaceholder.jpg";
import "./Search.css";
import TransitionsModalSearch from "./TransitionsModalSearch";

function Search() {
  const [books, setBooks] = useState([
    { title: "book 1", image: bookplaceholder, author: "author 1" },
    { title: "book 2", image: bookplaceholder, author: "author 2" },
    { title: "book 3", image: bookplaceholder, author: "author 3" },
    { title: "book 4", image: bookplaceholder, author: "author 4" },
    { title: "book 5", image: bookplaceholder, author: "author 5" },
    { title: "book 6", image: bookplaceholder, author: "author 6" },
    { title: "book 7", image: bookplaceholder, author: "author 7" },
    { title: "book 8", image: bookplaceholder, author: "author 8" },
    { title: "book 9", image: bookplaceholder, author: "author 9" },
    { title: "book 10", image: bookplaceholder, author: "author 10" },
  ]);

  return (
    <div className="search-results-container">
      <div>
        <form className="search-form">
          <TextField
            style={{ margin: "1%" }}
            id="title"
            label="Title"
            variant="filled"
          />
          <TextField
            style={{ margin: "1%" }}
            id="author"
            label="Author"
            variant="filled"
          />
          <Button variant="outlined" style={{ width: "70%", margin: "0 auto" }}>
            Search
          </Button>
        </form>
      </div>
      <div className="results-list">
        {books.map((book) => {
          return (
            // book div below need an ID from our backend
            <div className="book">
              <img src={book.image} alt="book"></img>
              <p>{book.title}</p>
              <TransitionsModalSearch book={book}></TransitionsModalSearch>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
