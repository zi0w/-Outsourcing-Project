const validateForm = (name, value, password) => {
  switch (name) {
    case 'email':
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        return '이메일형식이 아닙니다.';
      }
      break;
    case 'password':
      if (value.length < 6 || value.length > 15) {
        return '비밀번호는 6 ~ 15글자여야 합니다.';
      }
      break;
    case 'confirmPassword':
      if (value !== password) {
        return '비밀번호가 일치하지 않습니다';
      }
      break;
    case 'nickname':
      if (value.length < 2 || value.length > 10) {
        return '닉네임은 2 ~ 10글자여야 합니다.';
      }
      break;
    default:
      return '';
  }
  return '';
};

export default validateForm;
