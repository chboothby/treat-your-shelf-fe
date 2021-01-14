import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../CSS/Search.css";
import TransitionsModalSearch from "./TransitionsModalSearch";
import { getAllBooks, getUserInfo } from "../api";
import { useAuth } from "../Contexts/UserAuth";
import Loading from "./Loading";
const geolib = require("geolib");

function Search() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState({});
  const [bookLocation, setBookLocation] = useState([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    const geolib = require("geolib");
    let usersLocation = {};
    getUserInfo(currentUser.uid)
      .then(({ user }) => {
        usersLocation = user.location;
        setUserLocation(user.location);
      })
      .then(() => {})
      .then(() => {
        getAllBooks().then((data) => {
          const filtered = data.books.books.filter((book) => {
            return book.owner_id !== currentUser.uid;
          });

          const sortedBooks = filtered.map((book) => {
            return {
              distance: geolib.getPathLength([
                {
                  latitude: book.book_location.x,
                  longitude: book.book_location.y,
                },
                {
                  latitude: usersLocation.x,
                  longitude: usersLocation.y,
                },
              ]),
              book,
            };
          });
          setBooks(sortedBooks);
          setLoading(false);
        });
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

      const sortedBooks = filtered.map((book) => {
        return {
          distance: geolib.getPathLength([
            {
              latitude: book.book_location.x,
              longitude: book.book_location.y,
            },
            {
              latitude: userLocation.x,
              longitude: userLocation.y,
            },
          ]),
          book,
        };
      });
      setBooks(sortedBooks);
      setLoading(false);
    });
  };

  return (
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
          <Loading />
        ) : (
          books.map(({ distance, book }) => {
            return (
              <div className="book">
                <img src={book.thumbnail} alt="book"></img>
                <div className="search-book-info">
                  <strong>{book.title}</strong>
                  <p>{book.authors}</p>
                  <p>
                    {Math.round(geolib.convertDistance(distance, "mi") / 10)}{" "}
                    miles away
                  </p>

                  <TransitionsModalSearch book={book}></TransitionsModalSearch>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Search;
