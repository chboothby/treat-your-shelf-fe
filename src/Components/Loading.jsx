import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loading: {
    color: theme.palette.primary.main,
    padding: "1.5rem",
    margin: "0 auto",
  },
}));

export default function Loading() {
  const classes = useStyles();

  return <CircularProgress className={classes.loading} />;
}
