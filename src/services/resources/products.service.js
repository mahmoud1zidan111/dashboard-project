import axiosClient from "../api/axiosClient";

export async function getProducts() {
  const response = await axiosClient.get("/products");
  return response.data;
}

export async function getProductById(id) {
  const response = await axiosClient.get(`/products/${id}`);
  return response.data;
}

export async function updateProduct(id, payload) {
  const response = await axiosClient.patch(`/products/${id}`, payload);
  return response.data;
}
