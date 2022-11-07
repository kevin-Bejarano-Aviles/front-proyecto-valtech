import React from 'react';

function Button({
  type,
  name,
  handleFunction,
  disabled = false,
  classN = false,
}) {
  const size = classN
    ? 'text-xl tablet:text-lg tablet:h-10 tablet:w-[184px] h-16 w-[200px]'
    : 'text-sm w-[150px] mobile:text-base  h-10 mobile:w-[184px]';
  const claseButon = ` rounded-lg flex justify-center items-center text-white font-medium  bg-green ${size}`;
  /* eslint-disable react/jsx-no-useless-fragment */
  return (
    <>
      <button
        className={`${claseButon} ${
          disabled === true && 'disabled:bg-disabledbutton'
        }`}
        type={type}
        onClick={handleFunction}
        disabled={disabled}
      >
        {name}
      </button>
    </>
  );
}

export default Button;
