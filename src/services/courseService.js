import API from "../api/api";
import courses from "../data/coursesData";

const BASE = "/api/v1/courses";

// ✅ CREATE
export const createCourse = async (data) => {
  const res = await API.post(BASE, data);
  return res.data;
};

// ✅ GET ALL
export const getCourses = async () => {
  const res = await API.get(BASE);
  return res.data;
};

// ✅ GET BY ID (🔥 FIXED - use backend API instead of filtering)
export const getCourseById = async (id) => {
  const res = await API.get(`${BASE}/${id}`);
  return res.data;
};

// ✅ UPDATE
export const updateCourse = async (id, data) => {
  const res = await API.put(`${BASE}/${id}`, data);
  return res.data;
};

// ✅ DELETE
export const deleteCourse = async (id) => {
  const res = await API.delete(`${BASE}/${id}`);
  return res.data;
};

// ✅ STATUS UPDATE
export const updateCourseStatus = async (id, enabled, completed) => {
  const res = await API.put(
    `${BASE}/${id}/status`,
    null,
    {
      params: { enabled, completed } // ✅ cleaner than query string
    }
  );
  return res.data;
};