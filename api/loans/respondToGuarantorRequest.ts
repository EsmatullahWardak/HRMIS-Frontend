import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const getAuthHeaders = () => {
  const token = localStorage.getItem("auth_token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export async function respondToGuarantorRequest(
  loanId: number,
  action: "ACCEPT" | "REJECT"
) {
  const response = await axios.patch(
    `${API_URL}/loans/${loanId}/guarantor-response`,
    { action },
    { headers: getAuthHeaders() }
  );

  return response.data;
}
