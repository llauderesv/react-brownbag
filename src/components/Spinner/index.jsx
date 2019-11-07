import React from 'react';
import spinnerSvg from './spinner.svg';

export default function Spinner(props) {
  return (
    <img
      src={
        'https://raw.githubusercontent.com/SamHerbert/SVG-Loaders/master/svg-loaders/tail-spin.svg'
      }
      {...props}
    />
  );
}
