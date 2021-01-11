import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import app from "../firebase";
import { Button, TextField } from "@material-ui/core";
import "./Messages.css";
import { useAuth } from "../Contexts/UserAuth";
import { Link } from "react-router-dom";
const { getUserName } = require("../api");

const dbConfig = app;

const firestore = firebase.firestore();

function Messages() {
  return (
    <div className="messages-container">
      <h1>Chats</h1>
      <Chats />
    </div>
  );
}
function Chats() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [chatIds, setChatIds] = useState([]);

  const {
    currentUser: { uid, displayName },
  } = useAuth();

  const getChatsRef = firestore
    .collection("chats")
    .where("users", "array-contains", uid);

  // .doc(chatId) //
  // .collection("messages")
  // .orderBy("time");

  useEffect(() => {
    getChatsRef.onSnapshot((querySnapshot) => {
      const chatIds = [];
      querySnapshot.forEach((doc, i) => {
        chatIds.push(doc.id);
        doc
          .data()
          .users.filter((id) => id !== uid)
          .forEach((id) => {
            getUserName(id).then((response) => {
              const newUsers = [...users];
              newUsers.push(response);
              setUsers(newUsers);
            });
          });
      });

      setChatIds(chatIds);
      setLoading(false);
    });
  }, []);

  return (
    <div className="messages">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="message-content-container">
          {chatIds.map((chatId, i) => {
            return (
              <Link to={{ pathname: "/message", chatId }} key={i}>
                <div key={i} className="message-content">
                  <p>{users[i]}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// function ChatMessage(props) {
//   const { message, time } = props.message;
// }

export default Messages;
