import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../CSS/Search.css";
import TransitionsModalSearch from "./TransitionsModalSearch";
import { getAllBooks, getUserInfo } from "../api";
import { useAuth } from "../Contexts/UserAuth";
import Loading from "./Loading";
import { makeStyles } from "@material-ui/core/styles";
const geolib = require("geolib");

const useStyles = makeStyles((theme) => ({
  title: { color: theme.palette.primary.main, fontSize: "24px" },
  header: {
    color: theme.palette.secondary.light,
    background: theme.palette.primary.light,
    height: "50px",
    paddingBottom: "3%",
    paddingTop: "0.75%",
  },
  btn: {
    background: theme.palette.primary.light,
    width: "45%",
  },
  book: {
    textAlign: "center",
    background: theme.palette.secondary.light,
    padding: "3%",
    maxWidth: "300px",
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

function Search() {
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState({});
  const { currentUser } = useAuth();

  useEffect(() => {
    const geolib = require("geolib");
    let usersLocation = {};

    getAllBooks().then((data) => {
      const filtered = data.books.books.filter((book) => {
        return book.owner_id !== currentUser.uid;
      });
      console.log(filtered);
      setBooks(filtered);
      setLoading(false);
    });
  }, []);

  const [formValue, setFormValue] = useState({});
  const handleChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title } = formValue;
    const { author } = formValue;

    getAllBooks(title, author).then((data) => {
      const filtered = data.books.books.filter((book) => {
        return book.owner_id !== currentUser.uid;
      });

      // const sortedBooks = filtered.map((book) => {
      //   return {
      //     distance: geolib.getPathLength([
      //       {
      //         latitude: book.book_location.x,
      //         longitude: book.book_location.y,
      //       },
      //       {
      //         latitude: userLocation.x,
      //         longitude: userLocation.y,
      //       },
      //     ]),
      //     book,
      //   };
      // });
      setBooks(filtered);
      setLoading(false);
    });
  };
  console.log(books);
  return (
    <div className="books-container">
      <div className={classes.header}>
        <h2>All Books</h2>
      </div>
      <div className="search-results-container">
        <div>
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
            className="search-form"
          >
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
              className={classes.btn}
              type="submit"
              variant="outlined"
              style={{ width: "70%", margin: "2% auto" }}
            >
              Search
            </Button>
          </form>
        </div>
        <div className="results-list">
          {loading ? (
            <Loading />
          ) : (
            books.map((book, i) => {
              console.log(book);
              return (
                <div key={i} className={classes.book}>
                  <img src={book.thumbnail} alt="book"></img>
                  <div className="search-book-info">
                    <strong>{book.title}</strong>
                    <p>{book.authors.split(",").join(", ")}</p>
                    <TransitionsModalSearch
                      book={book}
                    ></TransitionsModalSearch>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
