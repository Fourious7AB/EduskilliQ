export const getAdminDashboard = async (range = "30d") => {
  const res = await API.get(`/admin/director?range=${range}`)
  return res.data
}