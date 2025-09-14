import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import Popup from "../Popup/Popup"; // ✅ استخدام البوب أب الموحد

// Images
import logo from "../assets/img/logo.svg";
import userWelcome from "../assets/img/UserWelcome.svg";
import firstLogoFooter from "../assets/img/firstLogoFooter.svg";
import secoundLogoFooter from "../assets/img/secoundLogoFooter.svg";

export default function Q3D2() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [wrong, setWrong] = useState(null);
  const [popupConfig, setPopupConfig] = useState({
    show: false,
    type: "",
    message: "",
  });

  const options = [
    "أ - يعتبر أكبر مجمع صناعي عائم في العالم و يقع شمال غرب السعودية", // ✅ correct
    "ب - هو مدينة سياحية جبلية مخصصة للرياضات الشتوية",
    "ج - جزيرة فاخرة في البحر الأحمر تابعة لمشروع نيوم",
  ];
  const correctAnswer = 0;

  const handleSubmit = () => {
    if (selected === null) {
      setPopupConfig({
        show: true,
        type: "warning",
        message: "من فضلك اختار الإجابة أولاً ⚠️",
      });
      return;
    }

    if (selected === correctAnswer) {
      setWrong(null);
      setPopupConfig({
        show: true,
        type: "success",
        message: "إجابتك صحيحة ! 🎉",
      });
    } else {
      setWrong(selected);
      setPopupConfig({
        show: true,
        type: "error",
        message: "إجابتك غير صحيحة، حاول مرة أخري ❌",
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
        <p className="numberQuestion">السؤال الثالث</p>

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

        <div className="questionUser questionUserQ3D2">
          <div
            data-aos="fade-right"
            data-aos-delay="100"
            className="dateWelcome"
            style={{ zIndex: "2" }}
          >
            <p dir="rtl" className="paraQ1D2">
              رهيب ! أمامك الأن السؤال الثالث
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
        <div className="bodycontent">
          <div className="containerQuestionChoose Q3D2">
            <div
              data-aos="zoom-in-up"
              data-aos-delay="300"
              className="question contentQ3D2"
            >
              <h3 dir="rtl" style={{ lineHeight: "23px" }}>
                أي من العبارات التالية صحيحة عن مشروع أوكساغون ضمن نيوم ؟
                (Oxagon)
              </h3>

              <div className="ContaineritemBox">
                {options.map((opt, index) => (
                  <div
                    key={index}
                    onClick={() => setSelected(index)}
                    className={`itemBox cursor-pointer itemBoxQ3D2 ${
                      selected === index ? "border-2 border-green-600" : ""
                    } ${wrong === index ? "wrong" : ""}`}
                  >
                    <p dir="rtl">{opt}</p>
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
                ارسال الاجابة
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
        onNext={() => navigate("/question4/Day2")}
      />
    </div>
  );
}
