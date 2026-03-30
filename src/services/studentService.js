import API from "../api/api"


export const reactivateStudent = async (studentCode) => {
  const response = await API.put(
    `/admin/reactivate-student/${studentCode}`
  )
  return response.data
}