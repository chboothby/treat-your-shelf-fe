import React from "react";
import "../CSS/TransitionsModalShelf.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/UserAuth";
import { addExchangeRequest } from "../api";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #8c8c8c",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 4, 2),
    textAlign: "center",
  },
  confirm: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  cancel: {
    background: "#C21E1E",
    color: theme.palette.primary.contrastText,
    marginTop: "10px",
  },
  modalHeader: {
    color: theme.palette.primary.dark,
  },
}));

export default function TransitionsModalRequest({ book }) {
  const { title, book_id, thumbnail } = book;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {
    currentUser: { uid },
  } = useAuth();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    addExchangeRequest(book_id, uid);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        style={{ background: "#C21E1E", color: "#f0efeb" }}
      >
        Request Swap
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
            <div className="modal-content">
              <div className={classes.modalHeader}>
                <h2 id="transition-modal-title">{title}</h2>
              </div>
            </div>
            <img alt="book" src={thumbnail}></img>
            <div className="modal-buttons">
              <Button
                onClick={() => {
                  handleClick();
                }}
                component={Link}
                to={{ pathname: "/message", book }}
                className={classes.confirm}
              >
                Confirm request
              </Button>

              <Button
                onClick={() => {
                  handleClose();
                }}
                className={classes.cancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
