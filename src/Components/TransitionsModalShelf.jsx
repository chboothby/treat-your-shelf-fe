import React from "react";
import "../CSS/TransitionsModalShelf.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { deleteBookFromBookshelf } from "../api";
import { useAuth } from "../Contexts/UserAuth";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
}));

export default function TransitionsModalShelf(props) {
  const { title, authors, thumbnail, book_id } = props.book;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { refreshBookshelf } = props;
  const { currentUser } = useAuth();
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (book_id) => {
    deleteBookFromBookshelf(book_id).then((res) => {
      refreshBookshelf();
    });
  };

  return (
    <div>
      <Link>
        <Button onClick={handleOpen} variant="outlined">
          View
        </Button>
      </Link>

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
            <div className="modal-footer">
              <h3 id="transition-modal-title">{title}</h3>
              <p id="transition-modal-description">{authors}</p>
            </div>
            <div className="modal-content">
              <img alt="book" src={thumbnail}></img>
              <div className="modal-buttons">
                <Button
                  component={Link}
                  //this path will need to be a parametric endpoint
                  to={`/books/${book_id}`}
                  style={{ border: "solid black 0.5px", marginBottom: "2%" }}
                >
                  View Book
                </Button>

                <Button
                  style={{ border: "solid black 0.5px", marginTop: "2%" }}
                >
                  Hide Book
                </Button>

                <Button
                  onClick={() => {
                    handleClick(book_id);
                  }}
                  // href={`/users/${currentUser.uid}/books`}
                  style={{ background: "red", marginTop: "2%" }}
                >
                  Remove Book
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
