import React, { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import axios from "axios";
import "./ScanResults.css";
import bookplaceholder from "../bookplaceholder.jpg";
import { Button, Link } from "@material-ui/core";
import { useAuth } from "../Contexts/UserAuth";
import { addBookToMyBookshelf } from "../api";

function Scanner() {
  const [data, setData] = useState("Not Found");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [clicked, setClick] = useState(false);
  const { currentUser } = useAuth();

  const handleClick = (book) => {
    setClick(true);
    addBookToMyBookshelf(book, currentUser.uid).then((res) => {});
  };

  const getBookByISBN = (isbn) => {
    return axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${isbn}+isbn`)
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

  useEffect(() => {
    if (data !== "Not Found") {
      getBookByISBN(data);
    }
  });

  return (
    <div>
      {error ? (
        <>
          <p>No books found</p>
          <Link to="/scan">
            <Button>Scan Again</Button>
          </Link>
        </>
      ) : data === "Not Found" ? (
        <section className="scanner">
          <h3>Please scan your book's ISBN number</h3>
          <BarcodeScannerComponent
            width={400}
            height={400}
            onUpdate={(err, result) => {
              if (result) {
                setData(result.text);
              }
            }}
          />
        </section>
      ) : (
        <div className="scan-results">
          <Link to="/scan">
            <Button style={{ border: "solid black 0.5px" }}>
              Scan another book
            </Button>
          </Link>

          {books.map((book) => {
            return (
              <div key={book.id} className="book-card">
                <img
                  src={book.images?.thumbnail}
                  alt={`${book.title}'s cover art`}
                ></img>
                <div className="book-info">
                  <p>Title: {book.title}</p>
                  <p>Author(s): {book.authors.map((author) => author)}</p>
                  <p>Published: {book.publishedDate}</p>
                  {!clicked ? (
                    <Button
                      onClick={() => {
                        handleClick(book);
                      }}
                      style={{ background: "white" }}
                    >
                      Add to bookshelf
                    </Button>
                  ) : (
                    <Button style={{ background: "green", color: "white" }}>
                      Added!
                    </Button>
                  )}
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
