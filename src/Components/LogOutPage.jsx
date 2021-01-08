import React from "react";
import { Link } from "react-router-dom";
const LogOutPage = () => {
  return (
    <div>
      <p>You've logged out!</p>
      <p>
        Click <Link to="/login">here</Link> to log back in.
      </p>
    </div>
  );
};

export default LogOutPage;
