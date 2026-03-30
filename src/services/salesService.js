import API from "../api/api"

export const getSalesHistory = async (referralCode, page = 0) => {
  const res = await API.get(
    `/admin/salesman/${referralCode}/history?page=${page}`
  )

  return res.data
}