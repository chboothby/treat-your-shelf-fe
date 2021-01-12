import { useState, useEffect } from "react";
import { useAuth } from "../Contexts/UserAuth";
import Button from "@material-ui/core/Button";
import { getSingleBook, getUserName } from "../api";
import "../CSS/Exchanges.css";

function Exchanges() {
  return (
    <div className="exchanges-container">
      <h1>Pending Exchanges</h1>
      <YourRequests />
      <TheirRequests />
    </div>
  );
}

function YourRequests() {
  const {
    currentUser: { uid },
  } = useAuth();
  const [exchanges, setExchanges] = useState([
    {
      exchange_id: 1,
      owner_id: "knQicRC1k1UGAROHO5HlnSYUIfS2",
      requester_id: "vQyKA3FuWdSAxBVs8MX3rKYCefi1",
      book_id: 4,
      book_sent: false,
      book_recieved: false,
    },
  ]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const updatedExchanges = [];
    exchanges.forEach((exchange) => {
      const { book_id, owner_id } = exchange;
      const username = getUserName(owner_id);
      const book = getSingleBook(book_id);
      return Promise.all([username, book]).then(([username, book]) => {
        exchange.owner_name = username;
        exchange.artwork = book.book.thumbnail;
        updatedExchanges.push(exchange);
      });
    });
    setExchanges(updatedExchanges);
    setLoading(false);
  }, []);

  if (isLoading) {
    return <p>Loading</p>;
  } else {
    return (
      <div className="requests-container">
        <h2>Your requests</h2>
        {exchanges.map((exchange, i) => {
          return (
            <div className="exchange-container" key={i}>
              <div className="book-artwork">
                <p>Owner: {exchange.owner_name}</p>
                <img src={exchange.artwork}></img>
              </div>
              <div className="actions">
                {" "}
                <Button
                  style={{ width: "40%", margin: "0 auto" }}
                  variant="outlined"
                  size="medium"
                  color="primary"
                >
                  Received
                </Button>
                <Button
                  style={{ width: "40%", margin: "0 auto" }}
                  variant="outlined"
                  size="medium"
                  color="secondary"
                >
                  Cancel
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
function TheirRequests() {
  const {
    currentUser: { uid },
  } = useAuth();
  const [exchanges, setExchanges] = useState([
    {
      exchange_id: 1,
      owner_id: "vQyKA3FuWdSAxBVs8MX3rKYCefi1",
      requester_id: "knQicRC1k1UGAROHO5HlnSYUIfS2",
      book_id: 1,
      book_sent: false,
      book_recieved: false,
    },
  ]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const updatedExchanges = [];
    exchanges.forEach((exchange) => {
      const { book_id } = exchange;

      getSingleBook(book_id).then((book) => {
        exchange.artwork = book.book.thumbnail;
        updatedExchanges.push(exchange);
      });
    });

    setExchanges(updatedExchanges);
    setLoading(false);
  }, []);

  if (isLoading) {
    return <p>Loading</p>;
  } else {
    return (
      <div className="requests-container">
        <h2>Their requests</h2>
        {exchanges.map((exchange, i) => {
          return (
            <div className="exchange-container" key={i}>
              <div className="book-artwork">
                <img src={exchange.artwork}></img>
              </div>
              <div className="actions">
                <Button
                  style={{ width: "40%", margin: "0 auto" }}
                  variant="outlined"
                  size="medium"
                  color="primary"
                >
                  Send
                </Button>
                <Button
                  style={{ width: "40%", margin: "0 auto" }}
                  variant="outlined"
                  size="medium"
                  color="secondary"
                >
                  Decline
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Exchanges;
