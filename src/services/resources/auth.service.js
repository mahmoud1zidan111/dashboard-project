import axiosClient from "../api/axiosClient";
export async function login(email, password) {
  const normalizedEmail = (email || "").trim().toLowerCase();
  const normalizedPassword = (password || "").trim();
  if (!normalizedEmail || !normalizedPassword) {
    throw new Error("Email and Password are required");
  }
  const response = await axiosClient.get("/users", {
    params: { email: normalizedEmail, password: normalizedPassword },
  });
  const users = response.data;
  if (!Array.isArray(users) || users.length === 0) {
    throw new Error("Invalid email or password ");
  }
  return users[0];
}
