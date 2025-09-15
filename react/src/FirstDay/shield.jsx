import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

// صور
import logo from "../assets/img/logo.svg";
import firstLogoFooter from "../assets/img/firstLogoFooter.svg";
import secondLogoFooter from "../assets/img/secoundLogoFooter.svg";

export default function Shield() {
  const [lang, setLang] = useState(localStorage.getItem("language") || "ar");

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // نصوص حسب اللغة
  const texts = {
    ar: {
      firstTitle: "وسامك لليوم الأول",
      secondTitle:
        "احتفظ فيه... كل وسام يقربك أكثر من ثروة الوطن بكرة محطة جديدة وتحدي جديد، خلك مستعد تكتشف الثورة الحقيقية",
      badgeText: "أنا مساهم في النمو اقتصاد",
      switchLang: "English",
    },
    en: {
      firstTitle:
        "Keep it, as each badge brings you closer to the Nation’s Treasure.",
      secondTitle:
        "Tomorrow brings a new stop and a fresh challenge. Be ready to discover the real treasure!",
      badgeText: "I am contributing to Economic Growth",
      switchLang: "العربية",
    },
  };

  // حفظ اللغة في localStorage
  useEffect(() => {
    localStorage.setItem("language", lang);
  }, [lang]);

  const t = texts[lang];

  return (
    <div className="firstStep shiledpage">
      <div className="header">
        <img className="logoLanding" src={logo} alt="logo" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="989"
          height="1942"
          viewBox="0 0 989 1612"
          fill="none"
        >
          <g clipPath="url(#clip0_136_33209)">
            <path
              d="M-1370.29 95.5909V1551.32V1552.05V1581.79H-1339.81V1612.27H-1309.34V1581.79H-1278.86V1552.05H-1248.38V1581.79H-1217.9V1612.27H-1187.42V1581.79H-1156.94V1552.05H-1126.47V1581.79H-1095.99V1612.27H-1065.51V1581.79H-1035.03V1552.05H-1004.55V1581.79H-974.084V1612.27H-943.604V1581.79H-913.124V1552.05H-882.644V1581.79H-852.164V1612.27H-821.684V1581.79H-791.214V1552.05H-760.734V1581.79H-730.254V1612.27H-699.774V1581.79H-669.294V1552.05H-638.824V1581.79H-608.344V1612.27H-577.864V1581.79H-547.384V1552.05H-516.914V1581.79H-486.424V1612.27H-455.954V1581.79H-425.474V1552.05H-394.994V1581.79H-364.514V1612.27H-334.044V1581.79H-303.564V1552.05H-273.084V1581.79H-242.604V1612.27H-212.124V1581.79H-181.654V1552.05H-151.174V1581.79H-120.694V1612.27H-90.214V1581.79H-59.7339V1552.05H-29.2539V1581.79H1.21606V1612.27H31.696V1581.79H62.176V1552.05H92.656V1581.79H123.136V1612.27H153.606V1581.79H184.086V1552.05H214.566V1581.79H245.046V1612.27H275.526V1581.79H305.996V1552.05H336.476V1581.79H366.956V1612.27H397.436V1581.79H427.916V1552.05H458.386V1581.79H488.866V1612.27H519.346V1581.79H549.826V1552.05H580.306V1581.79H610.776V1612.27H641.256V1581.79H671.736V1552.05H702.216V1581.79H732.696V1612.27H763.176V1581.79H793.646V1552.05H824.126V1581.79H854.606V1612.27H885.086V1581.79H915.556V1552.05H946.036V1581.79H976.516V1612.27H1007V1581.79H1037.48V1552.05H1067.96V1581.79H1098.43V1612.27H1128.91V1581.79H1159.39V1552.05H1189.87V1581.79H1220.35V1612.27H1250.82V1581.79H1281.3V1552.05H1311.78V1581.79H1342.26V1612.27H1372.73V1581.79H1403.21V1552.05H1433.69V1581.79H1464.17V1612.27H1494.65V1581.79H1525.13V1552.05H1555.6V1581.79H1586.08V1612.27H1616.56V1581.79H1647.04V1552.05H1677.52V1581.79H1707.99V1612.27H1738.47V1581.79H1768.95V1552.05H1799.43V1581.79H1829.91V1612.27H1860.38V1581.79H1890.86V1552.05H1921.34V1581.79H1951.82V1612.27H1982.3V1581.79H2012.78V1552.05V1551.32V95.5909H-1370.29Z"
              fill="#004F54"
            />
            <path
              d="M-760.374 350.741V-0.259033H1159.91L1158.91 350.741L1108.51 300.741L1106.69 299.941L1052.96 351.631L1000.1 299.941L946.366 351.631L893.466 299.941L840.466 351.761L786.836 299.941L733.836 351.761L680.036 299.841L627.036 351.661L573.366 299.841L520.366 351.661L466.696 299.841L412.906 351.761L359.906 299.941L306.246 351.761L253.246 299.941L199.586 351.761L146.586 299.941L92.916 351.761L39.916 299.941L-13.754 351.761L-66.754 299.941L-120.424 351.761L-173.084 299.941L-226.744 351.731L-280.544 299.811L-333.544 351.631L-387.214 299.811L-440.214 351.631L-493.884 299.811L-546.884 351.601L-600.564 299.941L-653.454 351.631L-707.194 299.941L-760.374 350.741Z"
              fill="#008787"
            />
          </g>
          <defs>
            <clipPath id="clip0_136_33209">
              <rect width="989" height="1612" fill="white" />
            </clipPath>
          </defs>
        </svg>
        {/* زر تغيير اللغة */}
        <button
          onClick={() => setLang(lang === "ar" ? "en" : "ar")}
          className="absolute top-4 right-4 px-3 py-1 rounded bg-green-600 text-white"
          style={{ background: "#004F54", border: "3px solid #011b1dff" }}
        >
          {t.switchLang}
        </button>
      </div>

      <div className="containerShiled">
        <p
          dir={lang === "ar" ? "rtl" : "ltr"}
          data-aos="fade-down"
          data-aos-delay="200"
          className="firstP_shiled"
        >
          {t.firstTitle}
        </p>
        <p
          dir={lang === "ar" ? "rtl" : "ltr"}
          data-aos="fade-up"
          data-aos-delay="200"
          className="secoundP_shiled"
        >
          {t.secondTitle}
        </p>
        <div
          className="containerinner rotate-wrap"
          style={{ position: "relative" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="480"
            height="564"
            viewBox="0 0 480 564"
            fill="none"
            className="svg"
          >
            <path
              d="M240.01 563.681C228.33 559.781 114.52 507.39 78.8401 476.97C15.5401 422.97 1.03009 156.41 0.840088 62.8205C28.0901 59.2805 67.9601 53.0505 107.32 43.1605C162.29 29.3605 214.29 10.1105 239.52 0.260498C263.77 10.4605 313.31 30.0305 365.7 43.2005C407.87 53.7905 450.36 59.9805 479.13 63.3405C479.13 63.3405 464.21 422.75 401.13 477.01C365.83 507.39 251.66 559.781 240.01 563.681Z"
              fill="#FFD152"
            />
            <path
              d="M240.02 528.87C208.65 515.02 125.81 474.71 99.74 452.47C92.23 446.07 66.34 414.751 48.09 280.411C38.96 213.251 34.68 141.64 33.46 90.6905C57.66 86.9105 86.53 81.5905 115.22 74.3805C164.01 62.1205 210.29 45.8005 239.11 34.8805C266.85 46.1205 311.16 62.6505 357.86 74.3805C388.69 82.1305 419.58 87.5905 445.4 91.3805C443.4 125.38 439.18 184.78 431.78 246.38C411.1 418.21 385.16 448.381 380.17 452.641C354.54 474.631 271.48 514.99 240.02 528.87Z"
              fill="#F7A125"
            />
            <g style={{ mixBlendMode: "multiply" }} opacity="0.4">
              <path
                d="M365.7 43.1605C363.7 42.6605 361.77 42.1605 359.8 41.6205C335.29 213.26 237.59 374.76 110.29 489.85C106.29 490.23 102.29 490.64 98.29 491.08C144.83 521.31 229.97 560.331 239.99 563.681C251.64 559.781 365.81 507.39 401.16 476.97C464.16 422.71 479.16 63.3005 479.16 63.3005C450.36 59.9405 407.87 53.7505 365.7 43.1605Z"
                fill="#FFD152"
              />
            </g>
          </svg>
          <p dir={lang === "ar" ? "rtl" : "ltr"}>{t.badgeText}</p>
        </div>
      </div>

      <footer>
        <img className="firstLogoFooter" src={firstLogoFooter} alt="" />
        <img className="secoundLogoFooter" src={secondLogoFooter} alt="" />
      </footer>
    </div>
  );
}
