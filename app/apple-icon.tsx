import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "180px",
          height: "180px",
          background: "#9FCEEA",
          borderRadius: "50px",
          display: "flex",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "42px",
            top: "66px",
            width: "84px",
            height: "84px",
            borderRadius: "999px",
            background: "#FFFFFF",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "68px",
            top: "50px",
            width: "68px",
            height: "68px",
            borderRadius: "999px",
            background: "#9FCEEA",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "124px",
            top: "32px",
            width: "18px",
            height: "18px",
            borderRadius: "999px",
            background: "#5EB0DC",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
