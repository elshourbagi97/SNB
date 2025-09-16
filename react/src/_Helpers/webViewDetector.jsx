import React, { useEffect, useState } from "react";

function DeviceMessage() {
  
const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (isDesktop) {
    // Block desktop users completely
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "#004F54",
          color: "white",
          textAlign: "center",
          padding: "20px",
          fontSize: "1.3rem",
        }}
      >
        ❌ This app is only available on mobile devices.  
        <br />
        Please open it on your phone 📱
      </div>
    );
  }
  }
  export default DeviceMessage;
