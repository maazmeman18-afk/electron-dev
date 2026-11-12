import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: we turn ideas into digital products`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#0e3a4f",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 800 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              background: "#1b6a8a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            E
          </div>
          ELECTRON DEVELOPERS
        </div>
        <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3 }}>
          WE TURN IDEAS INTO DIGITAL PRODUCTS.
        </div>
        <div style={{ fontSize: 28, color: "#4a6370" }}>
          Websites · E-commerce · Software development
        </div>
      </div>
    ),
    size,
  );
}
