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
  const [chats, setChats] = useState([]);

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
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.id);
      });
      setLoading(false);
      setChats(items);
    });
  }, []);

  return (
    <div className="messages">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="message-content-container">
          {chats.map((chat, i) => {
            return (
              <Link to="/message">
                <div key={i} className="message-content">
                  <p>{chat}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ChatMessage(props) {
  const { message, time } = props.message;
}

export default Messages;
