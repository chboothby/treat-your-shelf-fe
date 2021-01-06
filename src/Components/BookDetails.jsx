import React from "react";
import bookplaceholder from "../bookplaceholder.jpg";
import "./BookDetails.css";
import stockProfileImage from "../stockProfileImage.jpg";
import { Button } from "@material-ui/core";
const BookDetails = () => {
  return (
    <div className="book-details">
      <div className="single-book-header">
        <img alt="book" src={bookplaceholder}></img>
        <div className="single-book-info">
          <h4>Title</h4>
          <h4>Author</h4>
        </div>
      </div>
      <div className="single-book-description">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione non
          maiores omnis sit perspiciatis? Minima quo maiores a quasi accusamus
          repudiandae, excepturi, autem fugit quisquam expedita earum iste
          debitis magni.
        </p>
      </div>
      <div className="owner-card">
        <p>Owner:</p>
        <img alt="stock profile" src={stockProfileImage}></img>
        <div className="owner-info">
          <a href="#">
            <p>charlie123</p>
          </a>
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
};

export default BookDetails;

// make get request with book ID to our backend API
