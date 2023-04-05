import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../../store';
import { getContrastingColor } from '../../config/helpers';

interface Props {
  type: string;
  title: string;
  handleClick: () => void;
  customStyles: string;
}

const CustomButton = (props: Props) => {
  const { type, title, handleClick, customStyles } = props;
  const snap = useSnapshot(state);

  const generateStyle = (type: string): string => {
    if (type === 'filled') {
      return `bg-[${snap.color}] text-[${getContrastingColor(snap.color)}]`;
    }

    if (type === 'outline') {
      return `border-[1px ${snap.color}] text-[${snap.color}]`;
    }

    return '';
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles} ${generateStyle(
        type
      )}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
