const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const get = async (url) => {
  const res = await fetch(`${BASE_URL}${url}`);
  if (!res.ok) throw new Error(`GET ${url} failed`);
  return res.json();
};

const send = async (url, method, data = {}) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`${method} ${url} failed`);
  return res.json();
};

export const fetchProductsapi = () => get("/products");


export const addProduct = (data) => send("/products", "POST", data);

export const updateProduct = (id, data) => send(`/products/${id}`, "PUT", data);

export const deleteProduct = (id) =>
  fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) throw new Error(`DELETE /products/${id} failed`);
    return res.json();
  });
