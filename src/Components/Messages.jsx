import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Button, TextField } from "@material-ui/core";
import "./Messages.css";
import { CodeSharp } from "@material-ui/icons";

const dbConfig = {
  apiKey: "AIzaSyDHXh0FlBcSAOQo-BT7Zz5bT9GGmNyNDuI",
  authDomain: "treat-yo--shelf.firebaseapp.com",
  projectId: "treat-yo--shelf",
  storageBucket: "treat-yo--shelf.appspot.com",
  messagingSenderId: "1043126135539",
  appId: "1:1043126135539:web:503450c7c93ee62ce0e586",
  measurementId: "G-M2WEX0WKVY",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(dbConfig);
}

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
  const messagesRef = firestore
    .collection("chats")
    .doc("UbnOvg12YVKQ7a5Ol8KB") //
    .collection("messages");

  const [formValue, setFormValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const noMessages = messages.length === 0;

  useEffect(() => {
    messagesRef.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
        setLoading(false);
      });
      setMessages(items);
    });
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();

    await messagesRef.add({
      message: formValue,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setFormValue("");
  };
  return (
    <div className="messages">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="message-content-container">
          {messages.map((message) => {
            return (
              <div className="message-content">
                <p>Message: {message.message}</p>
                <p>{message.time.toDate().toString()}</p>
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
