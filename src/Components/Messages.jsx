import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import "../CSS/Messages.css";
import { useAuth } from "../Contexts/UserAuth";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { makeStyles } from "@material-ui/core/styles";
const { getUserName } = require("../api");

const firestore = firebase.firestore();

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    maxWidth: "1200px",
    height: "82vh",
    textAlign: "center",
    background: theme.palette.primary.contrastText,
  },
  title: {
    color: theme.palette.primary.main,
    background: theme.palette.primary.contrastText,
    fontSize: "24px",
  },
  header: {
    color: theme.palette.primary.dark,
    background: theme.palette.primary.contrastText,
    paddingTop: "0.75%",
    marginBottom: "-15px",
  },
  accountHeader: {
    padding: "2%",
    margin: "2%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderRadius: "8px",
    background: theme.palette.secondary.light,
  },
  accountBody: {
    textAlign: "center",
    background: theme.palette.primary.light,
    padding: "3%",
    width: "90%",
    borderRadius: "5px",
    margin: "0 auto",
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)",
  },
  img: { width: "200px", height: "200px", borderRadius: "5px", padding: "2%" },
}));

function Messages() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2>Chats</h2>
      </div>

      <Chats />
    </div>
  );
}

function Chats() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);

  const {
    currentUser: { uid },
  } = useAuth();

  useEffect(() => {
    const getChatsRef = firestore
      .collection("chats")
      .where("users", "array-contains", uid);

    getChatsRef.onSnapshot((querySnapshot) => {
      if (querySnapshot.docs.length === 0) {
        setLoading(false);
      }
      const chatInfo = [];
      querySnapshot.forEach((doc, i) => {
        const other_user = doc.id.split(uid).filter((el) => el !== "");
        getUserName(other_user[0])
          .then((user) => {
            chatInfo.push({
              chat_id: doc.id,
              other_user: { name: user, id: other_user[0] },
            });
          })
          .then(() => {
            setChats([...new Set([...chats, ...chatInfo])]);
            setLoading(false);
          });
      });
    });
  }, []);

  return (
    <div className={classes.root}>
      {loading ? (
        <Loading />
      ) : Object.keys(chats).length === 0 ? (
        <p style={{ marginTop: "30px" }}>No chats to display</p>
      ) : (
        <div className="message-content-container">
          {chats.map((chat, i) => {
            return (
              <Link
                to={{ pathname: "/message", chat }}
                key={i}
                style={{ textDecoration: "none", color: "#2C4A41" }}
              >
                <div key={i} className="message-content">
                  <p>{chat.other_user.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Messages;
