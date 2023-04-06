import { useSnapshot } from 'valtio';
import { getContrastingColor } from '../../config/helpers';
import state from '../../store';

interface Props {
  type: string;
  title: string;
  handleClick: () => void;
  customStyles: string;
}

interface styleReturn {
  color: string;
  backgroundColor?: string;
  borderWidth?: string;
  borderColor?: string;
}

const CustomButton = (props: Props) => {
  const { type, title, handleClick, customStyles } = props;
  const snap = useSnapshot(state);

  const generateStyle = (type: string): styleReturn | undefined => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    }

    if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color,
      };
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
