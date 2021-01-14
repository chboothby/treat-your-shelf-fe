import { useState, useEffect } from "react";
import { useAuth } from "../Contexts/UserAuth";
import Button from "@material-ui/core/Button";
import { getSingleBook, getUserName } from "../api";
import "../CSS/Exchanges.css";
import { getAllExchanges, sendBook, receiveBook, removeRequest } from "../api";
import Loading from "./Loading";

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
  const [exchanges, setExchanges] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getAllExchanges(uid).then((exchanges) => {
      exchanges
        .filter((exchange) => exchange.requester_id === uid)
        .forEach((exchange) => {
          const { book_id, owner_id } = exchange;
          const username = getUserName(owner_id);
          const book = getSingleBook(book_id);
          return Promise.all([username, book]).then(([username, book]) => {
            exchange.owner_name = username;
            exchange.artwork = book.book.thumbnail;
            const updatedExchanges = [...exchanges, exchange];
            setExchanges([...new Set(updatedExchanges)]);
          });
        });
    });

    setLoading(false);
  }, []);

  const handleReceived = (exchange_id, i) => {
    receiveBook(exchange_id, uid);
    const newExchanges = [...exchanges];
    newExchanges[i].book_received = true;
    setExchanges(newExchanges);
  };

  const handleCancel = (exchange_id, i) => {
    const newExchanges = [...exchanges];
    newExchanges.splice(i, 1);
    setExchanges(newExchanges);
    removeRequest(exchange_id, uid);
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="container">
        <h2>Books you have requested</h2>
        <div className="requests-container">
          {console.log(exchanges)}
          {exchanges.map((exchange, i) => {
            return (
              <div className="exchange-container" key={i}>
                <div className="book-artwork">
                  <p>Owner: {exchange.owner_name}</p>
                  <img src={exchange.artwork}></img>
                </div>
                {exchange.book_received ? (
                  <Button
                    style={{ width: "40%", margin: "0 auto" }}
                    variant="outlined"
                    size="medium"
                    disabled={exchange.book_received}
                  >
                    Pending...
                  </Button>
                ) : (
                  <div className="actions">
                    {" "}
                    <Button
                      onClick={() => {
                        handleReceived(exchange.exchange_id, i);
                      }}
                      style={{
                        background: "blue",
                        width: "40%",
                        margin: "0 auto",
                      }}
                      variant="outlined"
                      size="medium"
                    >
                      Received
                    </Button>
                    <Button
                      onClick={() => {
                        handleCancel(exchange.exchange_id, i);
                      }}
                      style={{
                        background: "red",
                        width: "40%",
                        margin: "0 auto",
                      }}
                      variant="outlined"
                      size="medium"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
function TheirRequests() {
  const {
    currentUser: { uid },
  } = useAuth();
  const [exchanges, setExchanges] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getAllExchanges(uid).then((exchanges) => {
      exchanges
        .filter((exchange) => exchange.requester_id != uid)
        .forEach((exchange) => {
          const { book_id, owner_id } = exchange;
          const username = getUserName(owner_id);
          const book = getSingleBook(book_id);
          return Promise.all([username, book]).then(([username, book]) => {
            exchange.owner_name = username;
            exchange.artwork = book.book.thumbnail;
            const newExchanges = [...exchanges, exchange];
            setExchanges([...new Set(newExchanges)]);
          });
        });
    });

    setLoading(false);
  }, []);

  const handleSend = (book_id, i) => {
    sendBook(book_id, uid);
    const newExchanges = [...exchanges];
    newExchanges[i].book_sent = true;
    setExchanges(newExchanges);
  };

  const handleDecline = (exchange_id, i) => {
    const newExchanges = [...exchanges];
    newExchanges.splice(i, 1);
    setExchanges(newExchanges);
    removeRequest(exchange_id, uid);
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="container">
        <h2>Books others have requested from you</h2>
        <div className="requests-container">
          {exchanges.map((exchange, i) => {
            return (
              <div className="exchange-container" key={i}>
                <div className="book-artwork">
                  <img src={exchange.artwork}></img>
                </div>
                {exchange.book_sent ? (
                  <Button
                    style={{ width: "40%", margin: "0 auto" }}
                    variant="outlined"
                    size="medium"
                  >
                    Pending...
                  </Button>
                ) : (
                  <div className="actions">
                    <Button
                      onClick={() => {
                        handleSend(exchange.exchange_id, i);
                      }}
                      style={{
                        background: "blue",
                        width: "40%",
                        margin: "0 auto",
                      }}
                      variant="outlined"
                      size="medium"
                    >
                      Send
                    </Button>
                    <Button
                      onClick={() => {
                        handleDecline(exchange.exchange_id, i);
                      }}
                      style={{
                        background: "red",
                        width: "40%",
                        margin: "0 auto",
                      }}
                      variant="outlined"
                      size="medium"
                    >
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Exchanges;
