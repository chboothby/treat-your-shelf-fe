import React, { useEffect, useState } from "react";
import "../CSS/BookDetails.css";
import { getSingleBook, getUserInfo } from "../api";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/UserAuth";
import TransitionsModalRequest from "./TransitionsModalRequest";
import Loading from "./Loading";
import { geocodeApi } from "../api";
import Geocode from "react-geocode";

Geocode.setApiKey(geocodeApi);
Geocode.setRegion("gb");
const geolib = require("geolib");

function BookDetails(props) {
  Geocode.setApiKey(geocodeApi);
  Geocode.setRegion("gb");
  const { currentUser } = useAuth();
  const [bookInfo, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [location, setLocation] = useState("");
  const [userDistance, setUserDistance] = useState({});
  const { book_id } = props.match.params;
  const { book_location } = props.location;

  useEffect(() => {
    getSingleBook(book_id).then(({ book }) => {
      setBook(book);
      console.log("here");
      getUserInfo(book.owner_id).then(({ user }) => {
        const userLocation = user.location;

        setUserInfo(user);
        const { x, y } = user.location;

        Geocode.fromLatLng(x, y).then((res) => {
          console.log(x, y);
          console.log(res);
          const city = res.results[0].address_components[2].long_name;
          console.log(city);
          setLocation(city);
          console.log(city);
        });
        console.log(userLocation);

        getUserInfo(currentUser.uid).then((res) => {
          console.log(res.user.location);
          const distance = geolib.getDistance(
            {
              latitude: res.user.location.x,
              longitude: res.user.location.y,
            },
            {
              latitude: userLocation.x,
              longitude: userLocation.y,
            }
          );

          console.log(geolib.convertDistance(distance, "mi"));
          const converted = Math.round(geolib.convertDistance(distance, "mi"));
          console.log(converted);
          setUserDistance(converted);
          setLoading(false);
        });
      });
    });
  }, [book_id, currentUser.uid]);
  console.log(userInfo.avatar_pic);
  return (
    <div className="book-details">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="single-book-header">
            <img alt="book" src={bookInfo.thumbnail}></img>
            <div className="single-book-info">
              <h4>{bookInfo.title}</h4>
              <p>{bookInfo.authors.split(",").join(", ")}</p>
            </div>
          </div>
          <div className="single-book-description">
            <strong>Description:</strong>
            <p>{bookInfo.description}</p>
          </div>
          <div className="owner-card">
            {userInfo.avatar_pic === undefined ||
            userInfo.avatar_pic === null ? (
              <>
                <img
                  alt="stock profile"
                  src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg"
                ></img>
              </>
            ) : (
              <img alt="stock profile" src={userInfo.avatar_pic}></img>
            )}

            <div className="owner-info">
              <Link
                style={{ textDecoration: "none", color: "#faf9f4" }}
                to={{ pathname: `/users/${bookInfo.owner_id}/books`, bookInfo }}
              >
                <h4>{userInfo.username}</h4>
              </Link>
              <>
                {bookInfo.owner_id !== currentUser.uid ? (
                  <>
                    {" "}
                    <p>{location}📍 </p>
                    <p>{userDistance} miles away</p>{" "}
                  </>
                ) : (
                  <> </>
                )}
              </>
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
