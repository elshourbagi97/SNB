import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/css/tailwind.css";
import "../assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Aos from "aos";
import "aos/dist/aos.css";

// Images
import logo from "../assets/img/logo.svg";
import userWelcome from "../assets/img/UserWelcome.svg";
import firstLogoFooter from "../assets/img/firstLogoFooter.svg";
import secoundLogoFooter from "../assets/img/secoundLogoFooter.svg";

export default function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [lang, setLang] = useState("ar"); // ✅ language state

  // ✅ Language dictionary
  const texts = {
    ar: {
      welcome: "مرحباً بالموظفين الكرام",
      enterId: "من فضلك أدخل رقم التعرف الخاص بك",
      placeholder: "رقم التعرف",
      login: "تسجيل الدخول",
      alert: "تنبيه",
      emptyId: "من فضلك أدخل رقم التعرف الخاص بك ⚠️",
      wrongId: "رقم التعرف غير صحيح ❌",
      back: "رجوع",
      switchLang: "English",
    },
    en: {
      welcome: "Welcome dear employees",
      enterId: "Please enter your identification number",
      placeholder: "Identification Number",
      login: "Login",
      alert: "Alert",
      emptyId: "Please enter your ID ⚠️",
      wrongId: "Invalid ID ❌",
      back: "Back",
      switchLang: "العربية",
    },
  };

  // Example users
  const users = [
    { id: "123", name: "Ali", nextRoute: "/map3" },
    { id: "456", name: "Adham", nextRoute: "/map2" },
    { id: "789", name: "Mahmoud", nextRoute: "/Home1" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId.trim()) {
      setPopupMessage(texts[lang].emptyId);
      setShowPopup(true);
      return;
    }

    const foundUser = users.find((user) => user.id === userId.trim());

    if (foundUser) {
      setPopupMessage("");
      setShowPopup(false);

      // ✅ Save language before navigate
      localStorage.setItem("language", lang);

      navigate(foundUser.nextRoute, {
        state: { userName: foundUser.name },
      });
    } else {
      setPopupMessage(texts[lang].wrongId);
      setShowPopup(true);
    }
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="firstStep three">
      {/* Header */}
      <div className="header">
        <img className="logoLanding" src={logo} alt="Logo" />

        {/* Language Switch Button */}
        <button
          className="absolute top-4 right-4 px-3 py-1 rounded bg-green-600 text-white"
          onClick={() => {
            const newLang = lang === "ar" ? "en" : "ar";
            setLang(newLang);
            localStorage.setItem("language", newLang); // ✅ نخزن اللغة
          }}
        >
          {texts[lang].switchLang}
        </button>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="864"
          height="554"
          viewBox="0 0 864 554"
          fill="none"
        >
          <path
            d="M0.174316 0.978027L0.174385 553.1H424.564C586.074 265.67 863.564 184.19 863.564 184.19V0.978027H0.174316Z"
            fill="#004F54"
          />
          <path
            d="M23.2544 496H421.854C575.854 221.9 840.534 144.2 840.534 144.2"
            stroke="#84BD04"
            strokeWidth="2.1"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
        </svg>

        <div className="questionUser">
          <div
            data-aos="fade-right"
            data-aos-delay="100"
            className="dateWelcome"
          >
            <p className="paraWelcome">{texts[lang].welcome}</p>
          </div>
          <img
            data-aos="fade-left"
            data-aos-delay="100"
            src={userWelcome}
            alt="User Welcome"
          />
        </div>
      </div>

      {/* Body Content */}
      <div className="max-w-7xl mx-auto">
        <div className="bodycontent">
          <div className="containerQuestionChoose">
            <div
              data-aos="zoom-in-up"
              data-aos-delay="100"
              className="question"
            >
              <h3>{texts[lang].enterId}</h3>
              <div className="ContaineritemBox">
                <form onSubmit={handleSubmit}>
                  <div className="inputGroup">
                    <input
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      type="text"
                      placeholder={texts[lang].placeholder}
                      name="id"
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
          </div>

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

      {/* ✅ Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-md">
            <h2
              className="text-xl font-bold text-red-600 mb-4"
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {texts[lang].alert}
            </h2>
            <p className="mb-6" dir={lang === "ar" ? "rtl" : "ltr"}>
              {popupMessage}
            </p>
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
