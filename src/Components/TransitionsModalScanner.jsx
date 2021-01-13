import React from "react";
import "../CSS/TransitionsModalScanner.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/UserAuth";
import { addBookToMyBookshelf } from "../api";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
}));

export default function TransitionsModalScanner(props) {
  const { title, authors } = props.book;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { currentUser } = useAuth();

  const handleOpen = () => {
    const book = props.book;
    setOpen(true);
    addBookToMyBookshelf(book, currentUser.uid).then((res) => {});
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Add Book
      </Button>

      <Modal
        path="/added"
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
            <div className="modal-scanners-content">
              <h3 id="transition-modal-title">{title}</h3>
              <h4>{authors}</h4>
              <Alert style={{ marginBottom: "5%" }} severity="success">
                Book added to bookshelf!
              </Alert>
              <div className="modal-buttons">
                <Button
                  component={Link}
                  //this path will need to be a parametric endpoint
                  to={`/users/${currentUser.uid}/books`}
                  style={{ border: "solid black 0.5px", marginBottom: "3%" }}
                >
                  View Bookshelf
                </Button>

                <Button href="/scan" style={{ border: "solid black 0.5px" }}>
                  Scan another book
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
