import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

// Images
import logo from "../assets/img/logo.svg";
// import userWelcome from "../assets/img/UserWelcome.svg";
import userWelcome from "../assets/img/HSA - Charachter Animation 01 - Neutral.gif";

import firstLogoFooter from "../assets/img/firstLogoFooter.svg";
import secoundLogoFooter from "../assets/img/secoundLogoFooter.svg";
import Popup from "../Popup/Popup";

export default function Q1D3() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
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

  // ✅ userId من localStorage
  const userId = localStorage.getItem("userId");

  // ✅ الكلمات حسب اللغة
  const continue_words_ar = [
    "هويتنا",
    "بتاريخنا",
    "ثقافتنا",
    "بقيادتنا",
    "بانتمائنا",
    "بشبابنا",
    "بعروبتنا",
    "مبادئنا",
  ];

  const continue_words_en = [
    "Identity",
    "History",
    "Culture",
    "Leadership",
    "Belonging",
    "Youth",
    "Arabism",
    "Principles",
  ];

  const continue_words = lang === "ar" ? continue_words_ar : continue_words_en;

  // 🆕 Function to send data to backend
  const submitToServer = async () => {
    try {
      const res = await fetch("http://thekingdomstreasure.com:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          stageNumber: 3, // ✅ Day 3
        }),
      });
      const data = await res.json();
      console.log("✅ Submitted:", data);
    } catch (error) {
      console.error(" Submit error:", error);
    }
  };

  const handleSubmit = async () => {
    if (!answer.trim()) {
      setPopupConfig({
        show: true,
        type: "warning",
        message:
          lang === "ar"
            ? "من فضلك اكتب إجابة أولاً "
            : "Please enter an answer first ",
      });
      return;
    }

    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedWords = continue_words.map((w) => w.toLowerCase());

    if (normalizedWords.includes(normalizedAnswer)) {
      setPopupConfig({
        show: true,
        type: "success",
        message: lang === "ar" ? "إجابتك صحيحة ! " : "Correct Answer! ",
      });

      // ✅ Send to backend
      await submitToServer();
    } else {
      setPopupConfig({
        show: true,
        type: "error",
        message: lang === "ar" ? "إجابتك غير صحيحة " : "Wrong Answer ",
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
    <div className="firstStep three bodyColor_organdi">
      {/* Header */}
      <div className="header relative">
        <img className="logoLanding" src={logo} alt="Logo" />

        {/* ✅ زر تغيير اللغة */}
        <button
          className="absolute top-4 right-4 px-3 py-1 rounded bg-green-600 text-white"
          onClick={toggleLang}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          {lang === "ar" ? "English" : "العربية"}
        </button>

        <p className="numberQuestion" dir={lang === "en" ? "ltr" : "rtl"}>
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

        <div className="questionUser">
          <div className="dateWelcome">
            <p dir={lang === "ar" ? "rtl" : "ltr"}>
              {lang === "ar"
                ? "كلمة منك تترك أثر كبير. صارت جزء من عزّتنا!"
                : "One word from you leaves a big impact. It became part of our pride!"}
            </p>
          </div>
          <img src={userWelcome} alt="User Welcome" />
        </div>
      </div>

      {/* Body */}
      <div className="fullcontainer">
        <div className="max-w-7xl mx-auto">
          <div className="bodycontent">
            <div className="containerQuestionChoose">
              {/* ✅ عرض الكلمات حسب اللغة */}
              <div className="continue_words">
                {continue_words.map((word, idx) => (
                  <p key={idx}>{word}</p>
                ))}
              </div>

              <div className="question" dir={lang === "ar" ? "rtl" : "ltr"}>
                <h3>
                  {lang === "ar"
                    ? "اختر كلمة من الشاشات من حولك"
                    : "Pick a word from the screens around you"}
                </h3>
                <div className="ContaineritemBox">
                  <div className="inputGroup">
                    <input
                      type="text"
                      placeholder={
                        lang === "ar" ? "اكتب اجابتك" : "Enter your answer"
                      }
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      style={{ textTransform: "capitalize" }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="buttonGroup mt-6">
                <button
                  className="btn btn-success px-4 py-2"
                  onClick={handleSubmit}
                  dir={lang === "ar" ? "rtl" : "ltr"}
                >
                  {lang === "ar" ? "ارسال الاجابة" : "Submit Answer"}
                </button>
              </div>
            </div>


          </div>
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
      {/* ✅ Popup */}
      <Popup
        show={popupConfig.show}
        type={popupConfig.type}
        message={popupConfig.message}
        onClose={() => setPopupConfig({ ...popupConfig, show: false })}
        onNext={() => {
          if (popupConfig.type === "success") {
            navigate("/shield/day3");
          }
        }}
      />
    </div>
  );
}
