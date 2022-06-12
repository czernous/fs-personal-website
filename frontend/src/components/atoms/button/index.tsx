import React from 'react';
import { IButtonProps } from '../../../interfaces';
import style from './button.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Button({ ...props }: IButtonProps) {
  const { buttonColor, buttonSize, hasShadow } = props;
  const buttonClasses = `${style.button} ${buttonColor} ${buttonSize} ${
    hasShadow ? 'shadow' : ''
  } ${props.buttonStyle} ${props.buttonFullWidth ? 'full-width' : ''}`;

  return props.buttonHref ? (
    <a
      href={props.buttonHref}
      target={props.buttonTarget}
      className={buttonClasses}
    >
      {props.buttonText}
    </a>
  ) : (
    <button className={buttonClasses} type={props.buttonType}>
      {props.buttonText}
    </button>
  );
}

export default Button;
