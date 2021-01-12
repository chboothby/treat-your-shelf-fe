import React, { useState, setState, useEffect, useRef } from "react";
import bookplaceholder from "../bookplaceholder.jpg";
import "../CSS/Bookshelf.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import TransitionsModalShelf from "./TransitionsModalShelf";
import ButtonAppBar from "./ButtonAppBar";
import { getUserBookshelf } from "../api";
import { useAuth } from "../Contexts/UserAuth";

function Bookshelf(props) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { owner_id } = props.match.params;
  const { currentUser } = useAuth();
  const ref = useRef();
  useEffect(() => {
    const paramsLength = Object.keys(props.match.params).length;

    if (paramsLength === 0) {
      getUserBookshelf(currentUser.uid).then(({ books }) => {
        setBooks(books);
        setLoading(false);
      });
    } else {
      getUserBookshelf(owner_id).then(({ books }) => {
        setBooks(books);
        setLoading(false);
      });
    }
  }, []);

  const refreshBookshelf = () => {
    getUserBookshelf(currentUser.uid).then(({ books }) => {
      setBooks(books);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="bookshelf-container">
        <div className="bookshelf-header">
          <h3>Yo bookshelf</h3>

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
              return (
                <div className="book-list-card">
                  <img alt="book" src={book.thumbnail}></img>
                  <p>{book.title}</p>
                  <TransitionsModalShelf
                    refreshBookshelf={refreshBookshelf}
                    book={book}
                  ></TransitionsModalShelf>
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
