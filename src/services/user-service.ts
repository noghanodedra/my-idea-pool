import API from '../api';

const me = async () => {
    return await API.get(`/me`);
}

const signUp = async (email: string, name: string, password: string) => {
  return await API.post(`/users`, {
    email,
    name,
    password,
  });
};

export const userService = {
  me,
  signUp,
};