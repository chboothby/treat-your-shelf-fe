import { useState } from "react";
import { useAuth } from "../Contexts/UserAuth";
import Button from "@material-ui/core/Button";

function Exchanges() {
  return (
    <div className="exchanges-container">
      <h1>Pending Exchanges</h1>
      <YourRequests />
      <TheirRequests />
    </div>
  );
}

function YourRequests() {
  const {
    currentUser: { uid },
  } = useAuth();
  const [exchanges, setExchanges] = useState([
    {
      exchange_id: 1,
      owner_id: "knQicRC1k1UGAROHO5HlnSYUIfS2",
      requester_id: "vQyKA3FuWdSAxBVs8MX3rKYCefi1",
      book_id: 4,
      book_sent: false,
      book_recieved: false,
    },
  ]);
  return (
    <div className="requests-container">
      <p>Your requests</p>

      <Button
        style={{ width: "60%", margin: "0 auto" }}
        variant="outlined"
        size="medium"
        color="primary"
      >
        Received
      </Button>
      <Button
        style={{ width: "60%", margin: "0 auto" }}
        variant="outlined"
        size="medium"
        color="secondary"
      >
        Cancel
      </Button>
    </div>
  );
}
function TheirRequests() {
  const {
    currentUser: { uid },
  } = useAuth();
  const [exchanges, setExchanges] = useState([
    {
      exchange_id: 1,
      owner_id: "vQyKA3FuWdSAxBVs8MX3rKYCefi1",
      requester_id: "knQicRC1k1UGAROHO5HlnSYUIfS2",
      book_id: 1,
      book_sent: false,
      book_recieved: false,
    },
  ]);
  return (
    <div className="requests-container">
      <p>Their requests</p>
      <Button
        style={{ width: "60%", margin: "0 auto" }}
        variant="outlined"
        size="medium"
        color="primary"
      >
        Send
      </Button>
      <Button
        style={{ width: "60%", margin: "0 auto" }}
        variant="outlined"
        size="medium"
        color="secondary"
      >
        Decline
      </Button>
    </div>
  );
}
export default Exchanges;
