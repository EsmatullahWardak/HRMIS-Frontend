import axios from "axios";

export async function getLoans() {
  const response = await axios.get("http://localhost:3001/loans");
  return response.data;
}
