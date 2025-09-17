import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/css/tailwind.css";
import "../assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Aos from "aos";
import "aos/dist/aos.css";

import logo from "../assets/img/logo.svg";
// import userWelcome from "../assets/img/UserWelcome.svg";

import userWelcome from "../assets/img/HSA - Charachter Animation 01 - Neutral.gif";
import firstLogoFooter from "../assets/img/firstLogoFooter.svg";
import secoundLogoFooter from "../assets/img/secoundLogoFooter.svg";
export default function Footer(){
    return(
         <footer>
                       <img
                         className="firstLogoFooter"
                         src={firstLogoFooter}
                         alt="First Logo"
                       />
                       <img
                         className="secoundLogoFooter"
                         src={secoundLogoFooter}
                         alt="Second Logo"
                       />
                     </footer>
    )
}