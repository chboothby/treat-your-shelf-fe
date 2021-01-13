import React, { useState, useEffect, useRef } from "react";
import "../CSS/Bookshelf.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import TransitionsModalShelf from "./TransitionsModalShelf";
import { getUserBookshelf, getUserInfo } from "../api";
import { useAuth } from "../Contexts/UserAuth";

function Bookshelf(props) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { owner_id } = props.match.params;
  const [owner_info, setOwnerInfo] = useState({});
  const { currentUser } = useAuth();

  useEffect(() => {
    const paramsLength = Object.keys(props.match.params).length;

    if (paramsLength === 0) {
      getUserBookshelf(currentUser.uid).then(({ books }) => {
        setBooks(books);
        setLoading(false);
      });
    } else {
      getUserBookshelf(owner_id)
        .then(({ books }) => {
          setBooks(books);
          setLoading(false);
        })
        .then(() => {
          getUserInfo(owner_id).then(({ user }) => {
            setOwnerInfo(user);
            setLoading(false);
          });
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
          {owner_id === undefined ? (
            <h3>Yo bookshelf</h3>
          ) : (
            <h3>{owner_info.username}'s bookshelf</h3>
          )}

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
            <p>Loading...</p>
          ) : (
            books.books.map((book) => {
              return (
                <div className="book-list-card">
                  <img alt="book" src={book.thumbnail}></img>
                  <div className="my-book-info">
                    <strong>{book.title}</strong>
                    <p>{book.authors}</p>
                    <div>
                      <TransitionsModalShelf
                        refreshBookshelf={refreshBookshelf}
                        book={book}
                      ></TransitionsModalShelf>{" "}
                    </div>{" "}
                  </div>
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
