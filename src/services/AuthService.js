import API from "../api/api"

export const loginUser = async (data) => {

  const response = await API.post("/api/v1/auth/login", data)

  return response.data
}

export const logoutUser = async () => {

  await API.post("/api/v1/auth/logout")

}