import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// non-protected Routes
import Landing from "../components/public/Landing";

// Auth
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

// Admin
import Admin from "../components/admin/Admin";
import DetailAdminComplaint from "../components/admin/DetailComplaint";

// Officer
import Officer from "../components/officer/Officer";
import DetailComplaint from "../components/officer/DetailComplaint";

// People
import People from "../components/people/People";
import DetailComplaintUser from "../components/people/DetailComplaintUser";
// import EditComplaintUser from "../components/people/EditComplaintUser";

function noMatch() {
  return <h1>404 Not Found</h1>;
}

const Routing = (props) => (
  <Switch>
    {/* Default */}
    <Route exact path="/" component={Landing} />

    {/* User Will Login */}
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />

    {/* Private Route */}
    {/* User */}
    <PrivateRoute {...props} exact path="/profile/:username" level="user" component={People} />
    <PrivateRoute {...props} exact path="/user/complaint/:id" level="user" component={DetailComplaintUser} />
    {/* <PrivateRoute {...props} exact path="/user/edit_complaint/:id" level="user" component={EditComplaintUser} /> */}

    {/* Petugas */}
    <PrivateRoute {...props} exact path="/dashboard/petugas" level="petugas" component={Officer} />
    <PrivateRoute {...props} exact path="/dashboard/complaint/:id" level="petugas" component={DetailComplaint} />

    {/* Admin */}
    <PrivateRoute {...props} exact path="/dashboard/admin" level="admin" component={Admin} />
    <PrivateRoute
      {...props}
      exact
      path="/dashboard/admin/complaint/:id"
      level="petugas"
      component={DetailAdminComplaint}
    />

    {/* Page not Found */}
    <Route component={noMatch} />
  </Switch>
);

export default Routing;
