import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { BsAirplaneFill } from "react-icons/bs";
import decode from "jwt-decode";
import useStyles from "./styles";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavBar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile")) || null
  );
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutModalOpen = () => {
    setIsModalOpen(true);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("profile");
    navigate("/");
    window.location.reload();
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogoutModalOpen();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <BsAirplaneFill className={classes.icon} />
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Blog
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt[0]}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={() => setIsModalOpen(true)}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Signin
          </Button>
        )}
      </Toolbar>
      <ConfirmationModal
        isModalOpen={isModalOpen}
        action={logout}
        actionName="logout"
        closeModal={() => setIsModalOpen(false)}
      />
    </AppBar>
  );
};

export default NavBar;
