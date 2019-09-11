import React from 'react';

const FormInput = (params) => {
  const {
    input,
    onChange,
    inputRef,
    ...rest
  } = params;

  return (
    <input
      value={input.value}
      onChange={input.onChange}
      ref={inputRef}
      {...rest}
    />
  );
};

export default FormInput;
