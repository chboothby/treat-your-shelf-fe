import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { Button, TextField } from "@material-ui/core";
import "../CSS/Messages.css";
import { useAuth } from "../Contexts/UserAuth";
import { Link } from "react-router-dom";
import { getUserName } from "../api";
import Loading from "./Loading";
import { makeStyles } from "@material-ui/core/styles";

const firestore = firebase.firestore();

const useStyles = makeStyles((theme) => ({
  title: { color: theme.palette.primary.main, fontSize: "24px" },
  header: {
    color: theme.palette.primary.dark,
    background: theme.palette.primary.contrastText,
  },
  messageForm: {
    display: "flex",
    position: "relative",
    bottom: "0",
    justifyContent: "space-between",
    textAlign: "center",
    width: "90%",
    // marginBottom: "10%",
    margin: "-7% auto",
    background: theme.palette.secondary.light,
    padding: "1%",
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)",
  },
}));

function IndividualChat({ location }) {
  const classes = useStyles();
  return (
    <div className="messages-container">
      <div className={classes.header}>
        <h2>Messages</h2>
      </div>

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
  const classes = useStyles();

  const {
    currentUser: { uid, displayName },
  } = useAuth();
  let chatId;
  if (info.chat) {
    chatId = info.chat.chat_id;
  }
  if (info.book) {
    const { owner_id } = info.book;
    chatId = [uid, owner_id].sort().join("");

    firestore
      .collection("chats")
      .doc(chatId)
      .set({ users: [uid, owner_id] });
  }

  useEffect(() => {
    if (info.chat) {
      setOtherUser(info.chat.other_user);
    } else if (info.book) {
      const user = {};
      const { owner_id } = info.book;

      user.id = owner_id;
      getUserName(owner_id).then((name) => {
        user.name = name;
        setOtherUser(user);
      });
    }
  }, [info.book, info.chat]);

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
    console.log("setting form value");
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
    });
  }, [getMessagesRef]);

  return (
    <div className="messages">
      {loading ? (
        <Loading />
      ) : (
        <div className="message-content-container">
          <p>
            Chatting with:{" "}
            <Link to={`/users/${otherUser.id}/books`}>{otherUser.name}</Link>
          </p>
          {messages.map((message) => {
            return (
              <>
                {message.uid === uid ? (
                  <div id="you" className="message-content">
                    <div>
                      <p>You:</p>
                      {message.message}
                    </div>
                  </div>
                ) : (
                  <div id="them" className="message-content">
                    <div>
                      <p>{message.displayName}:</p>
                      {message.message}
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      )}

      <form onSubmit={sendMessage} className={classes.messageForm}>
        <TextField
          helperText={
            info.book ? `Hello! I'd like to swap ${info.book.title}` : ""
          }
          autoComplete="off"
          onChange={(e) => setFormValue(e.target.value)}
          value={formValue}
          // style={{ marginRight: "2%", width: "100%" }}
          id="message"
          label="Message"
        ></TextField>
        <Button
          type="submit"
          // style={{ marginRight: "3%", background: "#18331D", color: "white" }}
          variant="outlined"
        >
          Send
        </Button>
      </form>
    </div>
  );
}

export default IndividualChat;
