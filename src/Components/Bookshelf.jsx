
import React, { Component } from "react";
import bookplaceholder from "../bookplaceholder.jpg";
import "./Bookshelf.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "@reach/router";
import TransitionsModalShelf from "./TransitionsModalShelf";

class Bookshelf extends Component {
  state = {
    books: [
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
    ],
  };

  render() {
    const { books } = this.state;

    return (
      <div className="bookshelf-container">
        <div className="bookshelf-header">
          <h3>Users bookshelf </h3>

          <Link to="/scan">
            <IconButton>
              <AddCircleOutlineIcon
                style={{ fontSize: "36px" }}
                className="add-icon"
              ></AddCircleOutlineIcon>
            </IconButton>
          </Link>
        </div>

        <div className="book-grid">
          {books.map((book) => {
            return (
              <div className="book-list-card">
                <img alt="book" src={book.image}></img>
                <p>{book.title}</p>
                <TransitionsModalShelf book={book}></TransitionsModalShelf>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Bookshelf;


