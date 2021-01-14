import React, { useState, useEffect } from "react";
import "../CSS/Bookshelf.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import TransitionsModalShelf from "./TransitionsModalShelf";
import { getUserBookshelf, getUserInfo } from "../api";
import { useAuth } from "../Contexts/UserAuth";
import Loading from "./Loading";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: { color: theme.palette.primary.main, fontSize: "24px" },
  header: {
    color: theme.palette.secondary.light,
    background: theme.palette.primary.light,
    height: "50px",
    paddingBottom: "3%",
    paddingTop: "0.75%",
  },

  book: {
    textAlign: "center",
    background: theme.palette.secondary.light,
    padding: "3%",
    maxWidth: "50%",
    width: "40%",
    display: "flex",
    flexDirection: "column",
    alignContent: "space-between",
    justifyContent: "space-between",
    borderRadius: "5px",
    margin: "1% auto",
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)",
  },
}));

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
  const classes = useStyles();

  return (
    <>
      <div id="bookshelf-container" className="bookshelf-container">
        <div id="bookshelf-header" className={classes.header}>
          {owner_id === undefined ? (
            <h2>Yo bookshelf</h2>
          ) : (
            <h2>{owner_info.username}'s bookshelf</h2>
          )}
        </div>
        <Link to="/scan" className="add-button">
          <Fab id="add-button" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
        <div id="book-grid" className="book-grid">
          {loading ? (
            <Loading />
          ) : (
            books.books.map((book) => {
              return (
                <div id="book-list-card" className={classes.book}>
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
