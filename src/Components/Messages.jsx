import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import app from "../firebase";
import { Button, TextField } from "@material-ui/core";
import "./Messages.css";
import { useAuth } from "../Contexts/UserAuth";

const dbConfig = app;

const firestore = firebase.firestore();

function Messages() {
  return (
    <div className="messages-container">
      <h1>Messages</h1>
      <ChatRoom />
    </div>
  );
}

function ChatRoom() {
  const getMessagesRef = firestore
    .collection("chats")
    .doc("UbnOvg12YVKQ7a5Ol8KB") //
    .collection("messages")
    .orderBy("time");

  const [formValue, setFormValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    getMessagesRef.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setLoading(false);
      setMessages(items);
    });
  }, []);

  const messagesRef = firestore
    .collection("chats")
    .doc("UbnOvg12YVKQ7a5Ol8KB") //
    .collection("messages");

  const sendMessage = async (event) => {
    event.preventDefault();

    await messagesRef
      .add({
        message: formValue,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch();

    setFormValue("");
  };

  return (
    <div className="messages">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="message-content-container">
          {messages.map((message) => {
            // const time = message.time.toDate().toString();
            return (
              <div className="message-content">
                <p>Message: {message.message}</p>
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

function ChatMessage(props) {
  const { message, time } = props.message;
}

export default Messages;
