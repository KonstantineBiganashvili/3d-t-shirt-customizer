import { StaticImageData } from 'next/image';
import { useSnapshot } from 'valtio';
import state from '../../store/index';

interface Props {
  tab: {
    name: string;
    icon: StaticImageData;
  };
  isFilterTab?: boolean;
  isActiveTab?: boolean;
  handleClick: () => void;
}

const Tab = (props: Props) => {
  const { tab, isFilterTab, isActiveTab, handleClick } = props;
  const snap = useSnapshot(state);

  const activeStyles =
    isFilterTab && isActiveTab
      ? `bg-[${snap.color}] opacity-50`
      : `bg-transparent opacity-100`;

  return (
    <div
      key={tab.name}
      className={`tab-btn ${
        isFilterTab ? 'rounded-full glassmorhism' : 'rounded-4'
      } ${activeStyles}`}
      onClick={handleClick}
    >
      <img
        src={tab.icon.src}
        alt={tab.name}
        className={`${
          isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'
        }`}
      />
    </div>
  );
};

export default Tab;
