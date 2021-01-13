import React, { useEffect, useState } from "react";
import "../CSS/BookDetails.css";
import { getSingleBook, getUserInfo } from "../api";
import { Link } from "react-router-dom";
import Geocode from "react-geocode";
import { useAuth } from "../Contexts/UserAuth";
import TransitionsModalRequest from "./TransitionsModalRequest";
const geolib = require("geolib");

function BookDetails(props) {
  const { currentUser } = useAuth();
  const [bookInfo, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [location, setLocation] = useState("");
  const [myLocation, setMyLocation] = useState({});
  const [userDistance, setUserDistance] = useState({});
  const { book_id } = props.match.params;

  useEffect(() => {
    getSingleBook(book_id).then(({ book }) => {
      setBook(book);

      getUserInfo(book.owner_id).then(({ user }) => {
        setUserInfo(user);
        const { x, y } = user.location;
        Geocode.fromLatLng(x, -y).then((res) => {
          const city = res.results[0].address_components[2].long_name;
          setLocation(city);
        });
        getUserInfo(currentUser.uid).then((res) => {
          setMyLocation(res.user.location);
          const distance = geolib.getPathLength([
            {
              latitude: res.user.location.x,
              longitude: res.user.location.y,
            },
            {
              latitude: user.location.x,
              longitude: `-${user.location.y}`,
            },
          ]);
          const converted = Math.round(
            geolib.convertDistance(distance, "mi") / 10
          );

          setUserDistance(converted);
          setLoading(false);
        });
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
            <img alt="book" src={bookInfo.thumbnail}></img>
            <div className="single-book-info">
              <h4>{bookInfo.title}</h4>
              <h4>{bookInfo.authors}</h4>
            </div>
          </div>
          <div className="single-book-description">
            <p>{bookInfo.description}</p>
          </div>
          <div className="owner-card">
            <img alt="stock profile" src={userInfo.avatar_pic}></img>
            <div className="owner-info">
              <Link
                style={{ textDecoration: "none", color: "#faf9f4" }}
                to={{ pathname: `/users/${bookInfo.owner_id}/books`, bookInfo }}
              >
                <h3>{userInfo.name}</h3>
              </Link>
              <p>📍 {location}</p>
              <p>{userDistance} miles away</p>
            </div>
          </div>
        </>
      )}
      <div className="request-button">
        {bookInfo.owner_id !== currentUser.uid ? (
          <TransitionsModalRequest book={bookInfo} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default BookDetails;

// make get request with book ID to our backend API
