import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AccountContext } from "../contexts/AccountContext";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const user = useContext(AccountContext);

  return (
    <Route>
      {() =>
        user.loggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
