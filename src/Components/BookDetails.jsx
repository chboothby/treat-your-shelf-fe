import React, { useEffect, useState } from "react";
import "./BookDetails.css";
import stockProfileImage from "../stockProfileImage.jpg";
import { Button } from "@material-ui/core";
import { getSingleBook, getUserInfo } from "../api";
import { Link } from "react-router-dom";
import Geocode from "react-geocode";
import { useAuth } from "../Contexts/UserAuth";

// Geocode.setApiKey("AIzaSyBzdjkehz-69slvbPIwKPOVGzIkG_fuU3I");

function BookDetails(props) {
  const { currentUser } = useAuth();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [location, setLocation] = useState("");
  const [myLocation, setMyLocation] = useState([]);
  const { book_id } = props.match.params;

  useEffect(() => {
    getSingleBook(book_id).then(({ book }) => {
      setBook(book);
      getUserInfo(book.owner_id).then(({ user }) => {
        const { x, y } = user.location;
        setUserInfo(user);
        Geocode.fromLatLng(x, -y)
          .then((res) => {
            const city = res.results[0].address_components[2].long_name;
            setLocation(city);
          })
          .catch((err) => {
            console.log(err);
          })
          .then(() => {
            getUserInfo(currentUser.uid).then((res) => {
              console.log(res);
            });
          });
        setLoading(false);
      });
    });
  }, []);

  return (
    <div className="book-details">
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
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
                <p>{userInfo.name}</p>
              </Link>
              <p>📍 {location}</p>
            </div>
          </div>{" "}
        </>
      )}

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
