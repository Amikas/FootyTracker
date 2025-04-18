declare module 'react-pure-loading' {
  interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
    color?: string;
  }

  export function Dots(props: LoaderProps): JSX.Element;
  export function Ring(props: LoaderProps): JSX.Element;
  export function Wave(props: LoaderProps): JSX.Element;
  export function Pulse(props: LoaderProps): JSX.Element;
  export function Square(props: LoaderProps): JSX.Element;
  export function Spinner(props: LoaderProps): JSX.Element;
  export function Progress(props: LoaderProps): JSX.Element;
  export function Bars(props: LoaderProps): JSX.Element;
  export function Bounce(props: LoaderProps): JSX.Element;
} 