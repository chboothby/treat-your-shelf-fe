import React, { useState, useEffect } from "react";
import "../CSS/Bookshelf.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import TransitionsModalShelf from "./TransitionsModalShelf";
import { getUserBookshelf, getUserInfo } from "../api";
import { useAuth } from "../Contexts/UserAuth";
import Loading from "./Loading";

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
      <div id="bookshelf-container" className="bookshelf-container">
        <div id="bookshelf-header" className="bookshelf-header">
          {owner_id === undefined ? (
            <h3>Yo bookshelf</h3>
          ) : (
            <h3>{owner_info.username}'s bookshelf</h3>
          )}
        </div>
        {owner_id === undefined ? (
          <Link to="/scan" className="add-button">
            <Fab id="add-button" color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        ) : (
          <> </>
        )}

        <div id="book-grid" className="book-grid">
          {loading ? (
            <Loading />
          ) : (
            books.books.map((book) => {
              return (
                <div id="book-list-card" className="book-list-card">
                  <img alt="book" src={book.thumbnail}></img>
                  <div id="my-book-info" className="my-book-info">
                    <strong>{book.title}</strong>
                    <p>{book.authors.split(",").join(", ")}</p>
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
