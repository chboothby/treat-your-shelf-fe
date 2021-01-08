import React, { useState, setState, useEffect } from "react";
import bookplaceholder from "../bookplaceholder.jpg";
import "./Bookshelf.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import TransitionsModalShelf from "./TransitionsModalShelf";
import ButtonAppBar from "../Components/ButtonAppBar";
import { getUserBookshelf } from "../api";

function Bookshelf(props) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user_id } = props.match.params;

  useEffect(() => {
    getUserBookshelf(user_id).then(({ books }) => {
      setBooks(books);
      setLoading(false);
    });
  }, []);

  return (
    <>
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
          {loading ? (
            <p>Loading</p>
          ) : (
            books.books.map((book) => {
              console.log(book);
              return (
                <div className="book-list-card">
                  <img alt="book" src={book.thumbnail}></img>
                  <p>{book.title}</p>
                  <TransitionsModalShelf book={book}></TransitionsModalShelf>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Bookshelf;
