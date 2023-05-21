// Connecting to Api
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://react-around-api-full-five.vercel.app"
    : "http://localhost:3000";

export const baseUrl = BASE_URL;
export const headers = {
  authorization: `Bearer ${localStorage.getItem("jwt")}`,
  "Content-Type": "application/json",
};
// ────────────────────────────────────────────────────────────────────────────
