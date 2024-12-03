import React from 'react';

const SignupFormField = ({ id, label, type, value, onChange, placeholder, error }) => {
  return (
    <div className="mb-2.5">
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="block w-full mt-1.5 p-3.5 text-xs rounded-lg"
        placeholder={placeholder}
        required
        autoComplete={`${type === 'password' ? false : true}`} // 자동완성 방지를 위함, 안하면 경고문구뜸
      />
      {error && <small className="text-[#FF5555]">{error}</small>}
    </div>
  );
};

export default SignupFormField;
