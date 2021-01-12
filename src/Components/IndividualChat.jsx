import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import app from "../firebase";
import { Button, TextField } from "@material-ui/core";
import "../CSS/Messages.css";
import { useAuth } from "../Contexts/UserAuth";
import { Link } from "react-router-dom";
import { getUserName } from "../api";

const dbConfig = app;

const firestore = firebase.firestore();

function IndividualChat({ location }) {
  return (
    <div className="messages-container">
      <h1>Messages</h1>
      <Link to="/messages"></Link>
      <ChatRoom info={location} />
    </div>
  );
}

function ChatRoom({ info }) {
  const [formValue, setFormValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [otherUser, setOtherUser] = useState({});
  // get current user_id
  const {
    currentUser: { uid, displayName },
  } = useAuth();

  let chatId = info?.chat.chat_id;

  useEffect(() => {
    if (info.chat) {
      setOtherUser(info.chat.other_user);
    } else if (info.bookInfo) {
      const user = {};
      const { owner_id } = info.bookInfo;
      user.id = owner_id;
      getUserName(owner_id).then((name) => {
        user.name = name;
        setOtherUser(user);
      });

      chatId = [uid, owner_id].sort().join("");
      firestore
        .collection("chats")
        .doc(chatId)
        .set({ users: [uid, owner_id] });
    }
  });

  const getMessagesRef = firestore
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .orderBy("time");

  const messagesRef = firestore
    .collection("chats")
    .doc(chatId)
    .collection("messages");

  const sendMessage = async (event) => {
    event.preventDefault();

    await messagesRef
      .add({
        message: formValue,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
      })
      .catch((err) => {
        console.log(err);
      });

    setFormValue("");
  };

  useEffect(() => {
    getMessagesRef.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setLoading(false);
      setMessages(items);
      if (info.bookInfo) {
        setFormValue(
          `Hi there! I'd like to request to swap "${info.bookInfo.title}".`
        );
      }
    });
  }, []);

  return (
    <div className="messages">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="message-content-container">
          <p>
            Chatting with:{" "}
            <Link to={`/users/${otherUser.id}/books`}>{otherUser.name}</Link>
          </p>
          {messages.map((message) => {
            // const time = message.time.toDate().toString();
            return (
              <div className="message-content">
                <p>
                  {message.uid === uid ? (
                    <p>You:</p>
                  ) : (
                    <p>{message.displayName}:</p>
                  )}
                  {message.message}
                </p>
                {/* <p>{time}</p> */}
              </div>
            );
          })}
        </div>
      )}

      <form onSubmit={sendMessage} className="message-form">
        <TextField
          autoComplete="off"
          onChange={(e) => setFormValue(e.target.value)}
          value={formValue}
          style={{ marginRight: "2%", width: "100%" }}
          id="message"
          label="Message"
        ></TextField>
        <Button
          type="submit"
          style={{ marginRight: "3%", background: "green", color: "white" }}
          variant="outlined"
        >
          Send
        </Button>
      </form>
    </div>
  );
}

export default IndividualChat;
