import create from "zustand";
import produce from "immer";
import api from "../../services/api";

interface IAuthState {
  auth: {
    loading: boolean;
    signed: boolean;
    token: string;
  };
  login: (email: string, password: string) => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  auth: {
    loading: false,
    signed: false,
    token: "",
  },
  login: async (email, password) => {
    set(
      produce(({ state }) => {
        state.loading = true;
      })
    );
    try {
      const response = await api.post("/login", { email, password });

      const { token } = response.data;

      set(
        produce(({ state }) => {
          state.logged = true;
          state.token = token;
          state.loading = false;
        })
      );
    } catch (error) {
      set(
        produce(({ state }) => {
          state.logged = false;
          state.token = "";
          state.loading = false;
        })
      );
      throw new Error(
        "Erro ao realizar o login, verifique seus dados e tente novamente"
      );
    }
  },
}));
