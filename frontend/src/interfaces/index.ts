import { Color, Size } from '../enums';

export interface IButtonProps {
  buttonColor: Color;
  buttonSize: Size;
  buttonType: 'button' | 'submit' | 'reset';
  buttonStyle: 'primary' | 'secondary';
  buttonText: string;
  buttonHref?: string;
  buttonTarget?: string;
  buttonFullWidth: boolean;
  hasShadow: boolean;
}
