import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import "../CSS/Messages.css";
import { useAuth } from "../Contexts/UserAuth";
import { Link } from "react-router-dom";
const { getUserName } = require("../api");

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
    currentUser: { uid },
  } = useAuth();

  const getChatsRef = firestore
    .collection("chats")
    .where("users", "array-contains", uid);

  useEffect(() => {
    getChatsRef.onSnapshot((querySnapshot) => {
      const chatInfo = [];

      querySnapshot.forEach(async (doc, i) => {
        const other_user = doc.id.split(uid).filter((el) => el !== "");
        getUserName(other_user[0]).then((user) => {
          chatInfo.push({
            chat_id: doc.id,
            other_user: { name: user, id: other_user[0] },
          });
        });
      });

      setChats(chatInfo);
      setLoading(false);
    });
  }, []);

  return (
    <div className="messages">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="message-content-container">
          {chats.length === 0 ? (
            <p>You have no active chats</p>
          ) : (
            chats.map((chat, i) => {
              return (
                <Link to={{ pathname: "/message", chat }} key={i}>
                  <div key={i} className="message-content">
                    <p>{chat.other_user.name}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default Messages;
