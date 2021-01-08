import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import "./TransitionsModalShelf.css";
import { Link } from "react-router-dom";
import { deleteBookFromBookshelf } from "../api";

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

export default function TransitionsModalShelf(props) {
  const { title, author, image, book_id } = props.book;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (book_id) => {
    deleteBookFromBookshelf(book_id).then((res) => {
      console.log(res, "deleted!");
    });
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
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
            <div className="modal-content">
              <img alt="book" src={image}></img>
              <div className="modal-buttons">
                <Button
                  component={Link}
                  //this path will need to be a parametric endpoint
                  to="/book"
                  style={{ border: "solid black 0.5px" }}
                >
                  View Book
                </Button>

                <Button style={{ border: "solid black 0.5px" }}>
                  Hide Book
                </Button>

                <Button
                  onClick={() => {
                    handleClick(book_id);
                  }}
                  style={{ background: "red" }}
                >
                  Remove Book
                </Button>
              </div>
            </div>

            <div className="modal-footer">
              <h2 id="transition-modal-title">{title}</h2>
              <p id="transition-modal-description">{author}</p>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
