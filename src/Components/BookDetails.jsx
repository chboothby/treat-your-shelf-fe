import React, { useEffect, useState } from "react";
import bookplaceholder from "../bookplaceholder.jpg";
import "./BookDetails.css";
import stockProfileImage from "../stockProfileImage.jpg";
import { Button } from "@material-ui/core";
import { getSingleBook } from "../api";
import { Link } from "react-router-dom";

function BookDetails(props) {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const { book_id } = props.match.params;
  console.log(book.owner_id);
  useEffect(() => {
    getSingleBook(book_id).then(({ book }) => {
      setBook(book);
      setLoading(false);
    });
  }, []);

  return (
    <div className="book-details">
      <div className="single-book-header">
        <img alt="book" src={book.thumbnail}></img>
        <div className="single-book-info">
          <h4>{book.title}</h4>
          <h4>{book.authors}</h4>
        </div>
      </div>
      <div className="single-book-description">
        <p>{book.description}</p>
      </div>
      <div className="owner-card">
        <p>Owner:</p>
        <img alt="stock profile" src={stockProfileImage}></img>
        <div className="owner-info">
          <Link to={`/users/${book.owner_id}/books`}>
            <p>charlie123</p>
          </Link>
          <p>📍 Salford (2.0 miles away)</p>
        </div>
      </div>
      <Button
        style={{ width: "60%", margin: "0 auto" }}
        variant="outlined"
        size="medium"
        color="primary"
      >
        Request Swap!
      </Button>
    </div>
  );
}

export default BookDetails;

// make get request with book ID to our backend API
