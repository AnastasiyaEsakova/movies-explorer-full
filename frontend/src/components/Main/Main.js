import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

function Main(props) {
  return (
    <main className="main">

       <Promo>
          <Header>
            <Navigation loggedIn={props.loggedIn} />
          </Header>
       </Promo>
       <NavTab />
       <AboutProject />
       <Techs />
       <AboutMe />
    </main>

  );
}

export default Main;
