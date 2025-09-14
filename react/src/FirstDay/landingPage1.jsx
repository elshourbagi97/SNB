import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/css/tailwind.css";
import "../assets/css/style.css";
import Aos from "aos";
import "aos/dist/aos.css";

// Images
import logo from "../assets/img/logo.svg";
import userWelcome from "../assets/img/UserWelcome.svg";
import firstLogoFooter from "../assets/img/firstLogoFooter.svg";
import secoundLogoFooter from "../assets/img/secoundLogoFooter.svg";

export default function LandingPage1() {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.userName || "الموظف";

  // ✅ language from localStorage OR from login state OR default "ar"
  const [lang, setLang] = useState(
    localStorage.getItem("language") || location.state?.lang || "ar"
  );

  const handelClick = () => {
    // keep passing lang forward
    navigate("/map1", { state: { userName } });
  };

  // ✅ Translations
  const texts = {
    ar: {
      day: "اليوم الاول",
      subHeader: "رحلة ثروة الوطن تبدا اليوم من عبد العزيز",
      welcome: `يا هلا فيكم ! انا عبد العزيز ... رفيقكم فى رحلة ثروة الوطن .
كل يوم عندنا محطة جديدة و لغز جديد .. جاهزين ؟ يلا نبدا`,
      title: "رحلة ثروة الوطن",
      desc: "٥ أيام ← ٥ محطات ← ثروة واحدة",
      button: "ابدا تحدى اليوم الاول",
      switchLang: "English",
    },
    en: {
      day: "Day 1",
      subHeader: "The “Nation’s Treasure” journey begins today… with Abdulaziz",
      welcome: `Welcome! I’m Abdulaziz, your companion on the “Nation’s Treasure” journey.Each day, we unlock a new stop and a different riddle to solve together... bringing us closer to discover the treasure.`,
      title: "“Journey of the Nation’s Treasure”",
      desc: "5 Days →  5 Stations → One treasure",
      button: "Start Day 1 Challenge",
      switchLang: "العربية",
    },
  };

  // ✅ Enter key → Start
  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") {
        handelClick();
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // ✅ update localStorage when lang changes
  useEffect(() => {
    localStorage.setItem("language", lang);
  }, [lang]);

  return (
    <div className="firstStep one">
      {/* Header */}
      <div className="header">
        <img className="logoLanding" src={logo} alt="Logo" />

        {/* ✅ Language Switch Button */}
        <button
          className="absolute top-4 right-4 px-3 py-1 rounded bg-green-600 text-white"
          onClick={() => setLang(lang === "ar" ? "en" : "ar")}
        >
          {texts[lang].switchLang}
        </button>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="864"
          height="928"
          viewBox="0 0 864 928"
          fill="none"
        >
          <path
            d="M0.378906 0V927.1H424.769C586.279 639.67 863.769 558.19 863.769 558.19V0H0.378906Z"
            fill="#004F54"
          />
          <path
            d="M23.4336 860H422.034C576.034 585.9 840.714 508.2 840.714 508.2"
            stroke="#84BD04"
            strokeWidth="2.1"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
        </svg>

        <div className="contentHeader">
          <div className="subHeader">
            <p dir={lang === "ar" ? "rtl" : "ltr"}>{texts[lang].day}</p>
            <p dir={lang === "ar" ? "rtl" : "ltr"}>{texts[lang].subHeader}</p>
          </div>

          <div
            data-aos="zoom-in-up"
            data-aos-delay="100"
            className="containerDateWelcome"
          >
            <img src={userWelcome} alt="User Welcome" />
            <div className="dateWelcome">
              <p
                dir={lang === "ar" ? "rtl" : "ltr"}
                className="para1 whitespace-pre-line"
              >
                {texts[lang].welcome}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto mt-28">
        <div
          className="bodycontent bodyContent1"
          data-aos="fade-right"
          data-aos-delay="300"
          dir={lang === "ar" ? "rtl" : "ltr"}
          style={{ translate: "0px 4.5rem" }}
        >
          <h2>{texts[lang].title}</h2>
          <p style={{wordSpacing:"3px"}}>{texts[lang].desc}</p>
        </div>

        <div
          data-aos="fade-right"
          data-aos-delay="300"
          className="buttonGroup"
          style={{ translate: "0px 3rem" }}
        >
          <button
            className="btn btn-success px-4 py-2 btn1"
            dir={lang === "ar" ? "rtl" : "ltr"}
            onClick={handelClick}
          >
            {texts[lang].button}
          </button>
        </div>

        {/* Pattern Footer */}
        <div className="patterFooter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="858"
            height="441"
            viewBox="0 0 858 441"
            fill="none"
          >
            <g clipPath="url(#clip0_789_92342)">
              <path
                d="M243.719 200.49H323.879L283.799 240.63L243.719 200.49Z"
                fill="#249B98"
              />
            </g>
            <defs>
              <clipPath id="clip0_789_92342">
                <rect width="858" height="441" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Footer */}
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
      </div>
    </div>
  );
}
