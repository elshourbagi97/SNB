import React, { useState } from "react";

export default function Popup({ show, type, message, onClose, onNext }) {
  if (!show) return null;

  // ✅ نقرأ اللغة من localStorage
  const [lang] = useState(localStorage.getItem("language") || "ar");

  // ✅ النصوص حسب اللغة
  const texts = {
    ar: {
      successNext: "التالي",
      errorTitle: "تنبيه",
      errorBack: "رجوع",
      warningTitle: "تنبيه",
      warningBack: "رجوع",
    },
    en: {
      successNext: "Next",
      errorTitle: "Alert",
      errorBack: "Back",
      warningTitle: "Alert",
      warningBack: "Back",
    },
  };

  // ✅ الفيديوهات حسب النوع
  const videos = {
    success: "/Happy.webm",
    error: "/Upset.webm",
    warning: "/Upset.webm",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-lg p-3 text-center max-w-md"
        style={{ maxWidth: "21rem" }}
      >
        {type === "success" && (
          <>
            <h2
              dir={lang === "ar" ? "rtl" : "ltr"}
              className="text-2xl font-bold text-green-700 mb-4"
            >
              {message}
            </h2>

            {/* 🎉 فيديو النجاح */}
            <video
              src={videos.success}
              autoPlay
              muted
              loop
              className="w-full rounded mb-4"
            />

            <button
              dir={lang === "ar" ? "rtl" : "ltr"}
              className="btn btn-success px-4 py-2"
              onClick={onNext}
              style={{ fontSize: "20px" }}
            >
              {texts[lang].successNext}
            </button>
          </>
        )}

        {type === "error" && (
          <>
            <h2
              dir={lang === "ar" ? "rtl" : "ltr"}
              className="text-2xl font-bold text-red-600 mb-4"
            >
              {texts[lang].errorTitle}
            </h2>
            <p dir={lang === "ar" ? "rtl" : "ltr"} className="mb-4">
              {message}
            </p>

            {/* ❌ فيديو الخطأ */}
            <video
              src={videos.error}
              autoPlay
              muted
              loop
              className="w-full rounded mb-4"
            />

            <button className="btn btn-danger px-4 py-2" onClick={onClose}>
              {texts[lang].errorBack}
            </button>
          </>
        )}

        {type === "warning" && (
          <>
            <h2
              dir={lang === "ar" ? "rtl" : "ltr"}
              className="text-2xl font-bold text-yellow-600 mb-4"
            >
              {texts[lang].warningTitle}
            </h2>
            <p dir={lang === "ar" ? "rtl" : "ltr"} className="mb-4">
              {message}
            </p>

            {/* ⚠️ فيديو التحذير */}
            <video
              src={videos.warning}
              autoPlay
              muted
              loop
              className="w-full rounded mb-4"
            />

            <button className="btn btn-warning px-4 py-2" onClick={onClose}>
              {texts[lang].warningBack}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
