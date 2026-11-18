import axios from "axios";

export const API = "/api";

export async function joinWaitlist({ email, intent, referrer }) {
  const res = await axios.post(`${API}/waitlist`, { email, intent, referrer });
  return res.data;
}

export async function logMirrorEvent(wallet) {
  try {
    await axios.post(`${API}/mirror`, { wallet });
  } catch (e) {
    /* analytics-only, never block UI */
  }
}
