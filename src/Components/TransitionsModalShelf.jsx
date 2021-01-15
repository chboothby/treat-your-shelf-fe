import React from "react";
import "../CSS/TransitionsModalShelf.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
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
    padding: theme.spacing(1, 4, 2),
    border: "1px solid #8c8c8c",
    textAlign: "center",
    minWidth: "275px",
  },
  viewBtn: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  modalHeader: {
    textAlign: "center",
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: "1.5%",
    width: "90%",
    borderRadius: "5px",
    margin: "0 auto 10px auto",
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
  },
  removeBtn: {
    background: "#C21E1E",
    color: theme.palette.primary.contrastText,
    marginTop: "2%",
  },
}));

export default function TransitionsModalShelf(props) {
  const { title, authors, thumbnail, book_id, owner_id } = props.book;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { refreshBookshelf } = props;
  const { currentUser } = useAuth();

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
      <Button
        onClick={handleOpen}
        variant="outlined"
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
            <div className={classes.modalHeader}>
              <h3 id="transition-modal-title">{title}</h3>
              <p id="transition-modal-description">
                {authors.split(",").join(", ")}
              </p>
            </div>
            <div className={classes.modalContent}>
              <img alt="book" src={thumbnail}></img>
              <div className="modal-buttons">
                <Button
                  component={Link}
                  //this path will need to be a parametric endpoint
                  to={`/books/${book_id}`}
                  style={{
                    border: "solid black 0.5px",
                    margin: "1%",
                    zIndex: "1",
                  }}
                >
                  View Book
                </Button>

                {/* <Button
                  style={{ border: "solid black 0.5px", marginTop: "2%" }}
                >
                  Hide Book
                </Button> */}

                {currentUser.uid === owner_id ? (
                  <Button
                    onClick={() => {
                      handleClick(book_id);
                      handleClose();
                    }}
                    className={classes.removeBtn}
                  >
                    Remove Book
                  </Button>
                ) : (
                  <> </>
                )}
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
