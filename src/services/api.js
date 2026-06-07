import axios from "axios";

export const api = axios.create({
  baseURL: "https://classico-automobilismo.onrender.com",
});

export const getImageUrl = (imageName) => {
  if (!imageName) return "/img/placeholder.png";

  const fileName = imageName.split("/").pop().replace(/\s+/g, "_");

  return `https://cdn.jsdelivr.net/gh/Nobre-Devl/Cl-ssico-Automobilismo@main/public/img/${fileName}`;
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.get(
      `/users?email=${email}&password=${password}`,
    );

    if (response.data.length > 0) {
      const user = response.data[0];
      localStorage.setItem("userId", user.id);
      return { success: true, user: user };
    }
    return { success: false, message: "E-mail ou senha incorretos." };
  } catch (error) {
    console.error("Erro no login:", error);
    return { success: false, message: "Erro de conexão com o servidor." };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return { success: true, user: response.data };
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    return { success: false, message: "Erro ao realizar cadastro." };
  }
};

export const updatePasswordByEmail = async (email, newPassword) => {
  try {
    const response = await api.get(`/users?email=${email}`);

    if (response.data.length === 0) {
      return { success: false, message: "E-mail não encontrado." };
    }

    const user = response.data[0];
    const updatedUser = { ...user, password: newPassword };
    await api.put(`/users/${user.id}`, updatedUser);

    return { success: true, message: "Senha alterada com sucesso!" };
  } catch (error) {
    console.error("Erro ao resetar senha:", error);
    return { success: false, message: "Erro no servidor." };
  }
};
