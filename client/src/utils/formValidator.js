export default {
  matchPassword: (password1, password2) => {
    return password1 === password2;
  },

  isEmpty: (...params) => {
    if (params.find(p => p === '') === '') return true;
    return false;
  },

  isValidPassword: password => {
    if (password.length <= 6) return false;

    return true;
  }
};
