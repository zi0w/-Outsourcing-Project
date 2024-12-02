import validateForm from '../../utils/validateForm';
import useForm from '../../hooks/useForm';

const AuthForm = ({ mode, onSubmit }) => {
  const { formState, formErrors, onChangeHandler, resetForm } = useForm(
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

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 rounded-3xl text-left bg-[#f3f3f3] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
    >
      <div className="mb-2.5">
        <label htmlFor="email" className="font-bold">
          이메일
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={onChangeHandler}
          className="block w-full mt-1.5 p-3.5 text-xs rounded-lg"
          placeholder="이메일을 입력해주세요."
          required
        />
        {formErrors.email && <small className="text-[#FF5555]">{formErrors.email}</small>}
      </div>
      <div className="mb-2.5">
        <label htmlFor="password" className="font-bold">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onChangeHandler}
          className="block w-full mt-1.5 p-3.5 text-xs rounded-lg"
          placeholder={`${mode === 'signin' ? '비밀번호를 입력해주세요.' : '6 ~ 15글자의 비밀번호를 입력해주세요.'} `}
          required
        />
        {formErrors.password && <small className="text-[#FF5555]">{formErrors.password}</small>}
      </div>
      {mode === 'signup' && (
        <>
          <div className="mb-2.5">
            <label htmlFor="confirmPassword" className="font-bold">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChangeHandler}
              className="block w-full mt-1.5 p-3.5 text-xs rounded-lg"
              placeholder="비밀번호를 다시 입력해주세요."
              required
            />
            {formErrors.confirmPassword && <small className="text-[#FF5555]">{formErrors.confirmPassword}</small>}
          </div>
          <div className="mb-2.5">
            <label htmlFor="nickname" className="font-bold">
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={onChangeHandler}
              className="block w-full mt-1.5 p-3.5 text-xs rounded-lg"
              placeholder="2~10글자의 닉네임을 입력해주세요."
              required
            />
            {formErrors.nickname && <small className="text-[#FF5555]">{formErrors.nickname}</small>}
          </div>
        </>
      )}
      <button
        type="submit"
        className={`block w-full mt-[18px] py-[10px] text-white rounded-[10px] shadow-[0_2px_2px_rgba(0,0,0,0.25)] ${isDisabled() === true ? 'bg-[#B73838]' : 'bg-[#EC4C4C] hover:bg-[#B73838] transition'}`}
        disabled={isDisabled()}
      >
        {mode === 'signin' ? '로그인' : '회원가입'}
      </button>
    </form>
  );
};

export default AuthForm;
