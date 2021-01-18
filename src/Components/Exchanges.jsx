import { useState, useEffect } from "react";
import { useAuth } from "../Contexts/UserAuth";
import Button from "@material-ui/core/Button";
import { getSingleBook, getUserName } from "../api";
import "../CSS/Exchanges.css";
import { getAllExchanges, sendBook, receiveBook, removeRequest } from "../api";
import Loading from "./Loading";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: { color: theme.palette.primary.dark, paddingTop: "0.75%" },
  subTitle: { color: theme.palette.primary.main },
  recBtn: {
    background: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    width: "45%",
    margin: "1%",
  },
  cancelBtn: {
    color: theme.palette.secondary.main,
    background: "#C21E1E",
    width: "45%",
    margin: "1%",
  },
  requestContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    background: theme.palette.primary.light,
    margin: "3%",
    paddingBottom: "2%",
    borderRadius: "4px",
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  bookDetails: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    background: theme.palette.primary.main,
    height: "30",
    margin: "3%",
    borderRadius: "6px",
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 10px 0 rgba(0,0,0,0.2)",
    color: theme.palette.primary.contrastText,
    fontSize: "16px",
  },
  pendingBtn: { width: "70%", margin: "0 auto" },
  exchangeContainer: { margin: "3%" },
}));

function Exchanges() {
  const classes = useStyles();

  return (
    <div className="exchanges-container">
      <h2 className={classes.title}>Pending Exchanges</h2>
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
  const classes = useStyles();

  useEffect(() => {
    const newExchanges = [];
    getAllExchanges(uid)
      .then((pendingRequests) => {
        pendingRequests
          .filter((pendingRequest) => pendingRequest.requester_id === uid)
          .forEach((exchange, i, arr) => {
            const { book_id, owner_id } = exchange;

            const username = getUserName(owner_id);
            const book = getSingleBook(book_id);
            return Promise.all([username, book, exchange]).then(
              ([username, book, request]) => {
                request.owner_name = username;
                request.artwork = book.book.thumbnail;
                newExchanges.push(request);
                if (newExchanges.length === arr.length) {
                  setExchanges(newExchanges);
                }
              }
            );
          });
      })
      .then(() => {
        setLoading(false);
      });
  }, [uid]);

  const handleReceived = (exchange_id, i) => {
    const newExchanges = [...exchanges];
    if (newExchanges.book_sent) {
      newExchanges.splice(i, 1);
    } else newExchanges[i].book_received = true;
    setExchanges(newExchanges);
    receiveBook(exchange_id, uid);
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
      <div className={classes.container}>
        <h3 className={classes.subTitle}>Your requested books</h3>
        <div className={classes.requestContainer}>
          {exchanges
            .filter((request) => request.artwork)
            .map((exchange, i) => {
              return (
                <div className={classes.exchangeContainer} key={i}>
                  <div className={classes.bookDetails}>
                    <p>Owner: {exchange.owner_name}</p>
                  </div>
                  <img
                    alt="book-artwork"
                    src={exchange.artwork}
                    style={{ margin: "2%" }}
                  ></img>
                  {exchange.book_received ? (
                    <div className="actions">
                      <Button
                        className={classes.pendingBtn}
                        variant="outlined"
                        size="medium"
                        disabled={exchange.book_received}
                      >
                        Pending...
                      </Button>
                    </div>
                  ) : (
                    <div className="actions">
                      {" "}
                      <Button
                        onClick={() => {
                          handleReceived(exchange.exchange_id, i);
                        }}
                        className={classes.recBtn}
                        variant="outlined"
                        size="medium"
                      >
                        Received
                      </Button>
                      <Button
                        onClick={() => {
                          handleCancel(exchange.exchange_id, i);
                        }}
                        className={classes.cancelBtn}
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
  const classes = useStyles();

  useEffect(() => {
    const newExchanges = [];
    getAllExchanges(uid)
      .then((pendingRequests) => {
        pendingRequests
          .filter((pendingRequest) => pendingRequest.requester_id !== uid)
          .forEach((exchange, i, arr) => {
            const { book_id, requester_id } = exchange;
            const username = getUserName(requester_id);
            const book = getSingleBook(book_id);
            return Promise.all([username, book, exchange]).then(
              ([username, book, request]) => {
                request.requester_name = username;
                request.artwork = book.book.thumbnail;
                newExchanges.push(request);
                if (newExchanges.length === arr.length) {
                  setExchanges(newExchanges);
                }
              }
            );
          });
      })
      .then(() => {
        setLoading(false);
      });
  }, [uid]);

  const handleSend = (book_id, i) => {
    const newExchanges = [...exchanges];
    if (newExchanges.book_received) {
      newExchanges.splice(i, 1);
    } else newExchanges[i].book_sent = true;
    setExchanges(newExchanges);
    sendBook(book_id, uid);
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
      <div className={classes.container}>
        <h3 className={classes.subTitle}>
          Books others have requested from you
        </h3>
        <div className={classes.requestContainer}>
          {exchanges
            .filter((request) => request.artwork)
            .map((exchange, i) => {
              return (
                <div className={classes.exchangeContainer} key={i}>
                  <div className={classes.bookDetails}>
                    <p>Requester: {exchange.requester_name}</p>
                  </div>
                  <img
                    alt="book artwork"
                    src={exchange.artwork}
                    style={{ margin: "2%" }}
                  ></img>
                  {exchange.book_sent ? (
                    <div className="actions">
                      <Button
                        className={classes.pendingBtn}
                        variant="outlined"
                        size="medium"
                      >
                        Pending...
                      </Button>
                    </div>
                  ) : (
                    <div className="actions">
                      <Button
                        onClick={() => {
                          handleSend(exchange.exchange_id, i);
                        }}
                        className={classes.recBtn}
                        variant="outlined"
                        size="medium"
                      >
                        Sent
                      </Button>
                      <Button
                        onClick={() => {
                          handleDecline(exchange.exchange_id, i);
                        }}
                        className={classes.cancelBtn}
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
