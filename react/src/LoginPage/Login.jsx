import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/css/tailwind.css";
import "../assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Aos from "aos";
import "aos/dist/aos.css";

import logo from "../assets/img/logo.svg";
// import userWelcome from "../assets/img/UserWelcome.svg";

import userWelcome from "../assets/img/Neutral.gif";
import firstLogoFooter from "../assets/img/firstLogoFooter.svg";
import secoundLogoFooter from "../assets/img/secoundLogoFooter.svg";
import Footer from "../footer/footer";

export default function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("language") || "ar");

  const texts = {
    ar: {
      welcome: "مرحباً بالموظفين الكرام",
      enterId: "من فضلك أدخل رقم التعرف الخاص بك",
      placeholder: "رقم التعرف",
      login: "تسجيل الدخول",
      alert: "تنبيه",
      emptyId: "من فضلك أدخل رقم التعرف الخاص بك ",
      wrongId: "رقم التعرف غير صحيح ",
      back: "رجوع",
      switchLang: "English",
    },
    en: {
      welcome: "Welcome dear employees",
      enterId: "Please enter your identification number",
      placeholder: "Identification Number",
      login: "Login",
      alert: "Alert",
      emptyId: "Please enter your ID ",
      wrongId: "Invalid ID ",
      back: "Back",
      switchLang: "العربية",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId.trim()) {
      setPopupMessage(texts[lang].emptyId);
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch("http://thekingdomstreasure.com:5000/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error("Network error");

      const data = await response.json();

      if (data) {
        // ✅ Save user info
        localStorage.setItem("userId", userId);
        localStorage.setItem("language", lang);

        // ✅ Decide next route
        let nextRoute = "/Home1"; // default if currentStage is null or undefined
        if (data.currentStage === 2) nextRoute = "/map2";
        else if (data.currentStage === 3) nextRoute = "/map3";
        else if (data.currentStage === 4) nextRoute = "/map4";
        else if (data.currentStage === 5) nextRoute = "/map5";

        navigate(nextRoute, { state: { userId } });
      } else {
        setPopupMessage(texts[lang].wrongId);
        setShowPopup(true);
      }
    } catch (error) {
      console.error(" Error:", error);
      setPopupMessage(texts[lang].wrongId);
      setShowPopup(true);
    }
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    
    <div className="firstStep one">
      

      <div className="header">
        <img className="logoLanding" src={logo} alt="Logo" />

        {/* Language Switch */}
        <button
          className="absolute top-4 right-4 px-3 py-1 rounded bg-green-600 text-white"
          onClick={() => {
            const newLang = lang === "ar" ? "en" : "ar";
            setLang(newLang);
            localStorage.setItem("language", newLang);
          }}
        >
          {texts[lang].switchLang}
        </button>

      
      </div>

      {/* Body */}
      <div className="fullcontainer">
        <div className="bodycontent loginbody  ">
            <div className="questionUser">
          <div data-aos="fade-right" className="dateWelcome">
            <p className="paraWelcome">{texts[lang].welcome}</p>
          </div>
          <img src={userWelcome} alt="User Welcome" />
        </div>  
          <div className="containerQuestionChoose LoginContainer">
            <h3>{texts[lang].enterId}</h3>
            <form onSubmit={handleSubmit}>
              <div className="inputGroup">
                <input
                  dir={lang === "ar" ? "rtl" : "ltr"}
                  type="text"
                  placeholder={texts[lang].placeholder}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="buttonGroup mt-3">
                <button type="submit">{texts[lang].login}</button>
              </div>
            </form>
          </div>
        </div>
          <Footer/>

      </div>
 {/* Pattern Footer */}
      {/* <div className="patterFooter">
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
      </div> */}

      {/* Footer */}

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              {texts[lang].alert}
            </h2>
            <p className="mb-6">{popupMessage}</p>
            <button
              className="btn btn-success px-4 py-2"
              onClick={() => setShowPopup(false)}
            >
              {texts[lang].back}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
