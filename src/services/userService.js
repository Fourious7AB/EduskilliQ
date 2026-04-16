import API from "../api/api"

// ✅ NORMALIZE ONLY ACTIVE
const normalizeUser = (user) => ({
  ...user,
  active: user.enable === true, 
})

// ✅ NO CACHE
const noCache = {
  headers: {
    "Cache-Control": "no-cache",
  },
}


// ✅ GET ENABLED USERS
export const getEnabledUsers = async (page = 0) => {
  const res = await API.get(`/api/v1/user/enabled?page=${page}`, noCache)

  const users = res.data?.content || res.data?.data || []

  return users.map(normalizeUser)
}
// ✅ UPDATE USER (ADD THIS)
export const updateUser = async (id, data) => {
  const res = await API.put(`/api/v1/user/${id}`, data)
  return res.data
}

// ✅ GET DISABLED USERS
export const getDisabledUsers = async (page = 0) => {
  const res = await API.get(`/api/v1/user/disabled?page=${page}`, noCache)

  const users = res.data?.content || res.data?.data || []

  return users.map(normalizeUser)
}

// ✅ GET SINGLE USER
export const getUserById = async (id) => {
  const res = await API.get(`/api/v1/user/${id}`, noCache)

  const user = res.data?.data || res.data

  return normalizeUser(user)
}

// ✅ DELETE
export const deleteUser = async (id) => {
  return await API.delete(`/api/v1/user/${id}`)
}

// ✅ TOGGLE
export const disableUser = async (employeeCode) => {
  return await API.put(`/admin/disable-user/${employeeCode}`)
}

export const enableUser = async (employeeCode) => {
  return await API.put(`/admin/enable-user/${employeeCode}`)
}

export const registerUser = async (data) => {
  const res = await API.post(`/api/v1/auth/register`, data) // ✅ FIXED
  return res.data
}