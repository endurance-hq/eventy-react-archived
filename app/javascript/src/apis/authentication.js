import axios from "axios";

export const login = payload => axios.post("login", payload);

export const logout = () => axios.delete("logout");
