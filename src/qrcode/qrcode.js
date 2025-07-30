import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QrWithIcon = ({ value, iconUrl }) => {
  const size = 80; // QR size
  const iconSize = 20; // Icon size

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        marginTop: 70,
      }}
    >
      <QRCodeSVG
        value={value}
        size={size}
        level="H" // Use high error correction to allow image overlay
        includeMargin={true}
        style={{ width: "100%", height: "100%" }}
      />
      <img
        src={iconUrl}
        alt="icon"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: iconSize,
          height: iconSize,
          transform: "translate(-50%, -50%)",
          borderRadius: "8px", // optional, for rounded icon
          background: "#fff", // white background to ensure visibility
          padding: "1px", // space around icon
        }}
      />
    </div>
  );
};

export default QrWithIcon;
