import React, { useEffect, useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import HeaderUser from "../people/HeaderUser";
import LandingUser from "../people/LandingUser";
import LandingContent from "./LandingContent";

import shapeBG from "../../assets/img/Shape.png";

const Landing = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userdata, setUserdata] = useState({
    nik: "",
    username: "",
  });

  useEffect(() => {
    let state_of_state = localStorage.getItem("appState");
    if (state_of_state) {
      let AppState = JSON.parse(state_of_state);

      if (AppState.user.level === "user") {
        setIsLoggedIn(true);
        setUserdata(() => {
          return {
            nik: AppState.user.nik,
            username: AppState.user.username,
          };
        });
      } else if (AppState.user.level === "petugas") {
        props.history.push("/dashboard/petugas");
      } else if (AppState.user.level === "admin") {
        props.history.push("/dashboard/admin");
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div
        className="relative overflow-hidden bg-white z-1"
        style={
          isLoggedIn
            ? {
                backgroundImage: `url(${shapeBG})`,
                backgroundRepeat: "no-repeat",
                backgroundPositionY: "-200px",
              }
            : {}
        }>
        {isLoggedIn ? <HeaderUser {...props} userdata={{ ...userdata }} /> : <Header {...props} />}
        {isLoggedIn ? (
          <LandingUser {...props} userdata={{ ...userdata }} />
        ) : (
          <>
            <LandingContent {...props} />
            <div className="hidden lg:block absolute circle-landing bg-primary -right-32 -top-52 rounded-full"></div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Landing;
