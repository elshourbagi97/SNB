import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

// صور
import logo from "../assets/img/logo.svg";
import userWelcome from "../assets/img/UserWelcome.svg";
import firstLogoFooter from "../assets/img/firstLogoFooter.svg";
import secoundLogoFooter from "../assets/img/secoundLogoFooter.svg";

// ✅ استدعاء الـ Popup
import Popup from "../PopUp/PopUp";

export default function Q1D1() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState(null);
  const [wrong, setWrong] = useState(null);
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

  // خيارات السؤال (حسب اللغة)
  const options =
    lang === "ar"
      ? [
          "أ - 17 جمادي الأول 1351هـ", // ✅ الصحيح
          "ب - 21 جمادي الآخر 1351هـ",
          "ج - 23 ربيع الأول 1349هـ",
        ]
      : [
          "A - 17 Jumada Al-Awwal 1351 AH", // ✅ الصحيح
          "B - 21 Jumada Al-Akhir 1351 AH",
          "C - 23 Rabi Al-Awwal 1349 AH",
        ];

  const correctAnswer = 0;

  const handleSubmit = () => {
    if (answer === null) {
      setPopupMessage(
        lang === "ar"
          ? "من فضلك اختار الإجابة أولاً ⚠️"
          : "Please select an answer first ⚠️"
      );
      setPopupType("warning");
      setShowPopup(true);
      return;
    }

    if (answer === correctAnswer) {
      setPopupMessage(
        lang === "ar" ? "إجابتك صحيحة ! 🎉" : "Correct Answer! 🎉"
      );
      setPopupType("success");
      setWrong(null);
      setShowPopup(true);
    } else {
      setPopupMessage(
        lang === "ar"
          ? "إجابتك غير صحيحة، حاول مرة أخري ❌"
          : "Wrong answer, try again ❌"
      );
      setPopupType("error");
      setWrong(answer);
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
          {lang === "ar" ? "السؤال الأول" : "Question 1"}
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

        <div className="questionUser questionUserQ1">
          <div
            data-aos="fade-right"
            data-aos-delay="100"
            className="dateWelcome"
          >
            <p>
              {lang === "ar"
                ? "لسه سهلة ؟ .. جاوب على أول سؤال في تحدي اليوم"
                : "Easy one? .. Answer the first question of today’s challenge"}
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
      <div className="max-w-4xl mx-auto">
        <div className="bodycontent">
          <div className="containerQuestionChoose Q1Content">
            <div
              data-aos="zoom-in-up"
              data-aos-delay="300"
              className="question Q1"
            >
              <h3>
                {lang === "ar"
                  ? 'في أي يوم هجري صدر إعلان توحيد المملكة تحت اسم "المملكة العربية السعودية" ؟'
                  : "On which Hijri date was the Kingdom officially unified under the name “Kingdom of Saudi Arabia” ?"}
              </h3>

              <div className="ContaineritemBox">
                {options.map((opt, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setAnswer(index);
                      setWrong(null);
                    }}
                    className={`itemBox cursor-pointer ${
                      answer === index ? "border-2 border-green-600" : ""
                    } ${wrong === index ? " wrong" : ""}`}
                  >
                    <p>{opt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <div
              data-aos="zoom-in-up"
              data-aos-delay="300"
              className="buttonGroup mt-6"
            >
              <button
                className="btn btn-success px-4 py-2 btn-Q1"
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
        type={
          popupType === "warning"
            ? "warning"
            : popupType === "error"
            ? "error"
            : "success"
        }
        onClose={() => setShowPopup(false)}
        onNext={() => navigate("/question2/Day1")}
        message={popupMessage}
      />
    </div>
  );
}
