import validateForm from '../../utils/validateForm';
import useForm from '../../hooks/useForm';
import SignupFormField from '../ui/signup/SignupFormField';

const AuthForm = ({ mode, onSubmit }) => {
  const { formState, formErrors, resetForm, onChangeHandler } = useForm(
    {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: ''
    },
    validateForm
  );

  const { email, password, confirmPassword, nickname } = formState;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
    resetForm();
  };

  //사용자가 다 입력해야 활성화
  const isDisabled = () => {
    if (!email || !password) {
      return true;
    }
    if (mode === 'signup' && (!confirmPassword || !nickname)) {
      return true;
    }
    if (formErrors.email || formErrors.password || formErrors.confirmPassword || formErrors.nickname) {
      return true;
    }
    return false;
  };

  //로그인,회원가입 공통 field
  const commonFields = [
    {
      id: 'email',
      label: '이메일',
      type: 'email',
      placeholder: '이메일을 입력해주세요.',
      error: formErrors.email
    },
    {
      id: 'password',
      label: '비밀번호',
      type: 'password',
      placeholder: mode === 'signin' ? '비밀번호를 입력해주세요.' : '6 ~ 15글자의 비밀번호를 입력해주세요.',
      error: formErrors.password
    }
  ];

  //회원가입시 추가 field
  const signupFields = [
    {
      id: 'confirmPassword',
      label: '비밀번호 확인',
      type: 'password',
      placeholder: '비밀번호를 다시 입력해주세요.',
      error: formErrors.confirmPassword
    },
    {
      id: 'nickname',
      label: '닉네임',
      type: 'text',
      placeholder: '2~10글자의 닉네임을 입력해주세요.',
      error: formErrors.nickname
    }
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 rounded-3xl text-left bg-[#f3f3f3] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
    >
      {commonFields.map(({ id, label, type, placeholder, error }) => (
        <SignupFormField
          key={id}
          id={id}
          label={label}
          type={type}
          value={id === 'email' ? email : password}
          onChange={onChangeHandler}
          placeholder={placeholder}
          error={error}
        />
      ))}

      {mode === 'signup' &&
        signupFields.map(({ id, label, type, placeholder, error }) => (
          <SignupFormField
            key={id}
            id={id}
            label={label}
            type={type}
            value={id === 'confirmPassword' ? confirmPassword : nickname}
            onChange={onChangeHandler}
            placeholder={placeholder}
            error={error}
          />
        ))}
      <button
        type="submit"
        className={`block w-full mt-[18px] py-[10px] text-white rounded-[10px] shadow-[0_2px_2px_rgba(0,0,0,0.25)] ${isDisabled() === true ? 'bg-[#B73838]' : 'bg-[#EC4C4C] hover:bg-[#B73838] transition'}`} //회색
        disabled={isDisabled()}
      >
        {mode === 'signin' ? '로그인' : '회원가입'}
      </button>
    </form>
  );
};

export default AuthForm;
