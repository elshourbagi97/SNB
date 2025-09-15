import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

// صور
import logo from "../assets/img/logo.svg";
import userWelcome from "../assets/img/UserWelcome.svg";
// import userWelcome from "../assets/img/HSA - Charachter Animation 01 - Neutral.gif";

import firstLogoFooter from "../assets/img/firstLogoFooter.svg";
import secoundLogoFooter from "../assets/img/secoundLogoFooter.svg";
import Popup from "../Popup/Popup";

// ✅ Popup

export default function Q2D1() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // ✅ اللغة من localStorage
  const [lang, setLang] = useState(localStorage.getItem("language") || "ar");

  const toggleLang = () => {
    const newLang = lang === "en" ? "ar" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  // ✅ الإجابة الصحيحة
  const correctAnswer = "95";

  const handleSubmit = () => {
    if (!answer.trim()) {
      setPopupMessage(
        lang === "ar"
          ? "من فضلك اكتب الإجابة أولاً ⚠️"
          : "Please enter your answer first ⚠️"
      );
      setPopupType("warning");
      setShowPopup(true);
      return;
    }

    if (answer.trim() === correctAnswer) {
      setPopupMessage(
        lang === "ar" ? "إجابتك صحيحة ! 🎉" : "Correct Answer! 🎉"
      );
      setPopupType("success");
      setShowPopup(true);
    } else {
      setPopupMessage(
        lang === "ar"
          ? "إجابتك غير صحيحة، حاول مرة أخري ❌"
          : "Wrong answer, try again ❌"
      );
      setPopupType("error");
      setShowPopup(true);
    }
  };

  // Enter key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="firstStep three">
      {/* Header */}
      <div className="header relative">
        <img className="logoLanding" src={logo} alt="Logo" />
        {/* ✅ زر لتغيير اللغة */}
        <button
          className="absolute top-4 right-4 px-3 py-1 rounded bg-green-600 text-white"
          onClick={toggleLang}
        >
          {lang === "ar" ? "English" : "العربية"}
        </button>

        <p className="numberQuestion">
          {lang === "ar" ? "السؤال الثاني" : "Question 2"}
        </p>

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
            <p>
              {lang === "ar"
                ? "سهلة صح ؟ بعطيك سؤال ثاني"
                : "Easy, right? Here comes the next question…"}
            </p>
          </div>
          <img
            data-aos="fade-left"
            data-aos-delay="100"
            src={userWelcome}
            alt="User Welcome"
          />
        </div>
      </div>

      {/* Body */}
      <div className="fullcontainer">
        <div className="max-w-7xl mx-auto">
          <div className="bodycontent">
            <div className="containerQuestionChoose">
              <div
              data-aos="zoom-in-up"
              data-aos-delay="300"
              className="question"
            >
                <h3>
                  {lang === "ar"
                    ? "كم سنة مرت علي توحيد مملكتنا الغالية ؟"
                    : "How many years has it been since our beloved Kingdom was unified?"}
                </h3>

              <div className="ContaineritemBox">
                <div className="inputGroup">
                  <input
                    dir={lang === "ar" ? "rtl" : "ltr"}
                    type="number"
                    placeholder={
                      lang === "ar"
                        ? "ادخل عدد السنوات"
                        : "Enter number of years"
                    }
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                  />
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div
              data-aos="zoom-in-up"
              data-aos-delay="300"
              className="buttonGroup mt-4"
            >
              <button
                className="btn btn-success px-4 py-2"
                onClick={handleSubmit}
              >
                {lang === "ar" ? "إرسال الإجابة" : "Submit Answer"}
              </button>
            </div>
          </div>

          {/* Footer */}
          <footer className="flex justify-center gap-6 mt-6">
            <img
              className="firstLogoFooter"
              src={firstLogoFooter}
              alt="First Footer Logo"
            />
            <img
              className="secoundLogoFooter"
              src={secoundLogoFooter}
              alt="Second Footer Logo"
            />
          </footer>
        </div>
      </div>

      {/* ✅ Popup Component */}
      <Popup
        show={showPopup}
        type={popupType}
        onClose={() => setShowPopup(false)}
        onNext={() => navigate("/question3/Day1")}
        message={popupMessage}
      />
    </div>
  );
}
