import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

// Images
import logo from "../assets/img/logo.svg";
import userWelcome from "../assets/img/UserWelcome.svg";
import firstLogoFooter from "../assets/img/firstLogoFooter.svg";
import secoundLogoFooter from "../assets/img/secoundLogoFooter.svg";
import Popup from "../PopUp/PopUp";

export default function Q4D2() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState(null);
  const [wrong, setWrong] = useState(null);
  const [popupConfig, setPopupConfig] = useState({
    show: false,
    type: "",
    message: "",
  });

  // ✅ اللغة من localStorage
  const [lang, setLang] = useState(localStorage.getItem("language") || "ar");

  const toggleLang = () => {
    const newLang = lang === "en" ? "ar" : "en";
    setLang(newLang);
    localStorage.setItem("language", newLang);
  };

  // خيارات السؤال (حسب اللغة)
  const options =
    lang === "ar"
      ? ["أ - 1,100 متر", "ب - 2,600 متر ", "ج - 3,600 متر "]
      : ["A - 1,100 meters", "B - 2,600 meters", "C - 3,600 meters"];

  const correctAnswer = 0;

  const handleSubmit = () => {
    if (answer === null) {
      setPopupConfig({
        show: true,
        type: "warning",
        message: lang === "ar" ? "من فضلك اختار الإجابة أولاً ⚠️" : "Please select an answer first ⚠️",
      });
      return;
    }

    if (answer === correctAnswer) {
      setWrong(null);
      setPopupConfig({
        show: true,
        type: "success",
        message: lang === "ar" ? "إجابتك صحيحة ! 🎉" : "Correct Answer! 🎉",
      });
    } else {
      setWrong(answer);
      setPopupConfig({
        show: true,
        type: "error",
        message: lang === "ar" ? "إجابتك غير صحيحة، حاول مرة أخرى ❌" : "Wrong answer, try again ❌",
      });
    }
  };

  // 🆕 Enter key listener
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
    <div className="firstStep three bodyColor_move">
      {/* Header */}
      <div className="header relative">
        <img className="logoLanding" src={logo} alt="Logo" />

        {/* ✅ زر لتغيير اللغة */}
        <button
          className="absolute top-4 right-4 px-3 py-1 rounded bg-green-600 text-white"
          onClick={toggleLang}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          {lang === "ar" ? "English" : "العربية"}
        </button>

        <p className="numberQuestion" dir={lang === "en" ? "ltr" : "rtl"}>
          {lang === "ar" ? "السؤال الرابع" : "Question 4"}
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

        <div className="questionUser questionUserQ3">
          <div
            data-aos="fade-right"
            data-aos-delay="100"
            className="dateWelcome"
            style={{ zIndex: "2" }}
          >
            <p dir={lang === "ar" ? "rtl" : "ltr"}>
              {lang === "ar"
                ? "رائع ! اليوم أثبت أنك قد التحدي مهما كانت الأسئلة صعبة و فزت بالوسام الثاني ."
                : "Well said ! Today you proved you’re up for any challenge, no matter how tough. You’ve earned your second badge ! ."}
            </p>
          </div>
          <img
            data-aos="fade-left"
            data-aos-delay="100"
            src={userWelcome}
            alt="User Welcome"
            style={{ zIndex: "2" }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto">
        <div className="bodycontent ">
          <div
            className="containerQuestionChoose Q3D2 "
            style={{ background: "#46417e" }}
          >
            <div
              data-aos="zoom-in-up"
              data-aos-delay="300"
              className="question contentQ4D2"
              style={{ translate: "0px -20px" }}
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              <h3 style={{ lineHeight: "23px" }}>
                {lang === "ar"
                  ? "يمتد الممشي البحري الرئيسي في كورنيش جازان الجنوبي بطول كم متر تقريباً ؟"
                  : "Roughly how many meters long is the main seafront walkway at South Jazan Corniche?"}
              </h3>

              <div className="ContaineritemBox">
                {options.map((opt, index) => (
                  <div
                    key={index}
                    onClick={() => setAnswer(index)}
                    className={`itemBox cursor-pointer ${
                      answer === index ? "border-2 border-green-600" : ""
                    } ${wrong === index ? "wrong" : ""}`}
                  >
                    <p dir={lang === "ar" ? "rtl" : "ltr"}>{opt}</p>
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
                className="btn btn-success px-4 py-2"
                onClick={handleSubmit}
                style={{ translate: "0px -30px" }}
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                {lang === "ar" ? "ارسال الاجابة" : "Submit Answer"}
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

      {/* ✅ Popup */}
      <Popup
        show={popupConfig.show}
        type={popupConfig.type}
        message={popupConfig.message}
        onClose={() => setPopupConfig({ ...popupConfig, show: false })}
        onNext={() => navigate("/shield/Day2")}
      />
    </div>
  );
}
