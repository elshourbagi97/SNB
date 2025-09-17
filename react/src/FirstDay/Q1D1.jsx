import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

// صور
import logo from "../assets/img/logo.svg";
//  import userWelcome from "../assets/img/UserWelcome.svg";
import userWelcome from "../assets/img/HSA - Charachter Animation 01 - Neutral.gif";

import firstLogoFooter from "../assets/img/firstLogoFooter.svg";
import secoundLogoFooter from "../assets/img/secoundLogoFooter.svg";
import Popup from "../Popup/Popup";

// ✅ استدعاء الـ Popup

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
          ? "من فضلك اختار الإجابة أولاً "
          : "Please select an answer first "
      );
      setPopupType("warning");
      setShowPopup(true);
      return;
    }

    if (answer === correctAnswer) {
      setPopupMessage(
        lang === "ar"
          ? "لسه سهلة ؟ ... بعطيك سؤال ثاني"
          : "Easy one ? .. Answer the second question of today’s challenge "
      );
      setPopupType("success");
      setWrong(null);
      setShowPopup(true);
    } else {
      setPopupMessage(
        lang === "ar"
          ? "إجابتك غير صحيحة، حاول مرة أخري "
          : "Wrong answer, try again "
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
      <div className="header relative ">
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
          viewBox="0 0 864 928"
          fill="none"
          className="w-full h-auto"
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
        <div className="bodycontent bodyQ1D1 ">
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
                      // handleSubmit();
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
              className="buttonGroup mt-1 btnQ1D1"
            >
              <button
                className="btn btn-success px-4 py-2 btn-Q1"
                onClick={handleSubmit}
              >
                {lang === "ar" ? "إرسال الإجابة" : "Submit Answer"}
              </button>
            </div>
          </div>
        </div>
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
          {/* محتوى الـ SVG زي ما هو */}
          <g clipPath="url(#clip0_789_92342)">
            <path
              d="M243.719 200.49H323.879L283.799 240.63L243.719 200.49Z"
              fill="#249B98"
            />
            {/* باقي ال paths زي الكود الأصلي */}
          </g>
          <defs>
            <clipPath id="clip0_789_92342">
              <rect width="858" height="441" fill="white" />
            </clipPath>
          </defs>
        </svg>
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
