import API from "../api/api";

// ✅ MATCH BACKEND

const createOrder = async (data) => {
  const res = await API.post("/api/student/register", data);
  return res.data;
};

const verifyPayment = async (data) => {
  const res = await API.post("/api/payment/verify", data);
  return res.data;
};

export default {
  createOrder,
  verifyPayment
};