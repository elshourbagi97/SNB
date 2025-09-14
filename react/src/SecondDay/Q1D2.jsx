import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
// Images
import logo from "../assets/img/logo.svg";
import userWelcome from "../assets/img/UserWelcome.svg";
import firstLogoFooter from "../assets/img/firstLogoFooter.svg";
import secoundLogoFooter from "../assets/img/secoundLogoFooter.svg";

// ✅ Popup Component
import Popup from "../PopUp/PopUp";

export default function Q1D2() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [wrong, setWrong] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // success | error | warning
  const [showPopup, setShowPopup] = useState(false);

  // ✅ اللغة من localStorage
  const [lang, setLang] = useState(localStorage.getItem("language") || "ar");

  const toggleLang = () => {
    const newLang = lang === "en" ? "ar" : "en";
    setLang(newLang);
    localStorage.setItem("language", newLang);
  };

  const options =
    lang === "ar"
      ? ["أ - الرياض", "ب - المدينة", "ج - أبها"] // correct: الرياض
      : ["A - Riyadh", "B - Madinah", "C - Abha"];
  const correctAnswer = 0;

  const handleSubmit = () => {
    if (selected === null) {
      setPopupMessage(
        lang === "ar" ? "من فضلك اختار الإجابة أولاً ⚠️" : "Please select an answer first ⚠️"
      );
      setPopupType("warning");
      setShowPopup(true);
      return;
    }

    if (selected === correctAnswer) {
      setWrong(null);
      setPopupMessage(lang === "ar" ? "إجابتك صحيحة ! 🎉" : "Correct Answer! 🎉");
      setPopupType("success");
      setShowPopup(true);
    } else {
      setWrong(selected);
      setPopupMessage(lang === "ar" ? "إجابتك غير صحيحة، حاول مرة أخري ❌" : "Wrong answer, try again ❌");
      setPopupType("error");
      setShowPopup(true);
    }
  };

  // Enter key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") handleSubmit();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="firstStep three bodyColor_move">
      {/* Header */}
      <div className="header relative">
        <img className="logoLanding" src={logo} alt="Logo" />
        <button
          className="absolute top-4 right-4 px-3 py-1 rounded bg-green-600 text-white"
          onClick={toggleLang}
        >
          {lang === "ar" ? "English" : "العربية"}
        </button>
        <p className="numberQuestion" dir={lang === "ar" ? "rtl" : "ltr"}>{lang === "ar" ? "السؤال الأول" : "Question 1"}</p>

        <svg xmlns="http://www.w3.org/2000/svg" width="864" height="554" viewBox="0 0 864 554" fill="none">
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

        <div className="questionUser questionUserQ1">
          <div data-aos="fade-right" data-aos-delay="100" className="dateWelcome">
            <p dir={lang === "ar" ? "rtl" : "ltr"} className="paraQ1D2">
              {lang === "ar" ? "جاوب على السؤال التالي!" : "That’s right ! Raise the bar and move on to the next question."}
            </p>
          </div>
          <img data-aos="fade-left" data-aos-delay="100" src={userWelcome} alt="User Welcome" />
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto">
        <div className="bodycontent">
          <div className="containerQuestionChoose Q1D2" style={{ background: "#46417e" }}>
            <div data-aos="zoom-in-up" data-aos-delay="300" className="question Q1">
              <h3 dir={lang === "ar" ? "rtl" : "ltr"}>
                {lang === "ar" ? "أنا مركز الثقل المالي في المملكة من أكون ؟" : "I’m the financial center of gravity in the Kingdom … Who am I ?"}
              </h3>

              <div className="ContaineritemBox">
                {options.map((opt, index) => (
                  <div
                    key={index}
                    onClick={() => setSelected(index)}
                    className={`itemBox cursor-pointer ${
                      selected === index ? "border-2 border-green-600" : ""
                    } ${wrong === index ? "wrong" : ""}`}
                  >
                    <p dir={lang === "ar" ? "rtl" : "ltr"} style={{ paddingBottom: "1px", fontSize: "16px" }}>
                      {opt}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <div data-aos="zoom-in-up" data-aos-delay="300" className="buttonGroup mt-6">
              <button className="btn btn-success px-4 py-2 btn-Q1" onClick={handleSubmit} dir={lang === "ar" ? "rtl" : "ltr"}>
                {lang === "ar" ? "إرسال الإجابة" : "Submit Answer"}
              </button>
            </div>
          </div>

          {/* Footer */}
          <footer className="flex justify-center gap-6 mt-6">
            <img className="firstLogoFooter" src={firstLogoFooter} alt="First Footer Logo" />
            <img className="secoundLogoFooter" src={secoundLogoFooter} alt="Second Footer Logo" />
          </footer>
        </div>
      </div>

      {/* ✅ Popup Component */}
      <Popup
        show={showPopup}
        type={popupType}
        message={popupMessage}
        onClose={() => setShowPopup(false)}
        onNext={() => navigate("/question2/Day2")}
      />
    </div>
  );
}
