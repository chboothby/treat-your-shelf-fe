import React, { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import axios from "axios";
import "../CSS/ScanResults.css";
import { Button, Link } from "@material-ui/core";
import TransitionsModalScanner from "./TransitionsModalScanner";

function Scanner() {
  const [data, setData] = useState("Not Found");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const getBookByISBN = (isbn) => {
    return axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${isbn}+isbn&maxResults=10`
      )
      .then(({ data: { items } }) => {
        if (!items) {
          setError("No books found");
        } else {
          const books = [];

          items.forEach(({ id, volumeInfo }) => {
            const book = {
              id,
              title: volumeInfo.title,
              authors: volumeInfo.authors,
              publisher: volumeInfo.publisher,
              publishedDate: volumeInfo.publishedDate,
              description: volumeInfo.description,
              genres: volumeInfo.categories,
              images: volumeInfo.imageLinks,
            };
            books.push(book);
          });
          setBooks(books);
        }
      });
  };
  console.log(books);
  useEffect(() => {
    if (data !== "Not Found") {
      getBookByISBN(data);
    }
  });

  return (
    <div id="scan-page">
      {error ? (
        <div id="scan-error">
          <p>No books found</p>
          <Link to="/scan">
            <Button>Scan Again</Button>
          </Link>
        </div>
      ) : data === "Not Found" ? (
        <section id="scanner" className="scanner">
          <h3>Please scan your book's ISBN number</h3>
          <BarcodeScannerComponent
            width={400}
            height={400}
            onUpdate={(err, result) => {
              if (result) {
                setData(result.text);
              } else {
                setData("Not Found");
              }
            }}
          />
        </section>
      ) : (
        <div id="scan-results" className="scan-results">
          <Link to="/scan">
            <Button style={{ border: "solid black 0.5px" }}>
              Scan another book
            </Button>
          </Link>

          {books.map((book) => {
            return (
              <div id="book-card" key={book.id} className="book-card">
                <img
                  src={book.images?.thumbnail}
                  alt={`${book.title}'s cover art`}
                ></img>
                <div id="book-info" className="book-info">
                  <p>Title: {book.title}</p>
                  <p>Author(s): {book.authors.map((author) => author)}</p>
                  <p>Published: {book.publishedDate}</p>

                  <TransitionsModalScanner
                    book={book}
                  ></TransitionsModalScanner>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Scanner;
