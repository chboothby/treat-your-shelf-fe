import React, { useEffect, useState } from "react";
import "../CSS/TransitionsModalSearch.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getUserInfo } from "../api";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
    textAlign: "center",
    textTransform: "capitalize",
  },
  viewBtn: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  modalBookInfo: {
    marginLeft: "0px 0px 0px 0px",
    padding: "0px 0px 0px 5px",
    textAlign: "center",
    maxWidth: "175px",
  },
  modalImage: {
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
  },
  userInfo: {
    position: "relative",
    bottom: "-20px",
    margin: "-25px",
    textAlign: "center",
  },
  modalBtn: { position: "relative", bottom: "-40px" },
}));

export default function TransitionsModalSearch(props) {
  const {
    title,
    authors,
    thumbnail,
    book_id,
    owner_id,
    book_location,
  } = props.book;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ownerInfo, setOwnerInfo] = useState({});

  const handleOpen = () => {
    setOpen(true);
    getUserInfo(owner_id).then(({ user }) => {
      setOwnerInfo(user);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Button
        variant="outlined"
        size="medium"
        onClick={handleOpen}
        className={classes.viewBtn}
      >
        View
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.modalImage}>
              <img alt="book" src={thumbnail}></img>
            </div>
            <div className={classes.modalBookInfo}>
              <p>{title}</p>
              <p>{authors.split(",").join(", ")}</p>
              <div className={classes.userInfo}>
                <Link to={`/users/${owner_id}/books`}>
                  {ownerInfo.username}
                </Link>
              </div>
              <div>
                <Link to={`/books/${book_id}`} className={classes.modalBtn}>
                  <Button
                    variant="outlined"
                    size="medium"
                    className={classes.viewBtn}
                  >
                    View Book
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
