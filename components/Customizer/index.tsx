import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { DecalTypes, EditorTabs, FilterTabs } from '../../config/constants';
import { reader } from '../../config/helpers';
import { fadeAnimation, slideAnimation } from '../../config/motion';
import state, { State } from '../../store';
import AiPicker from '../AiPicker';
import ColorPicker from '../ColorPicker';
import CustomButton from '../CustomButton';
import FilePicker from '../FilePicker';
import Tab from '../Tab';

interface ActiveFilterTab {
  [key: string]: boolean;
}

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setGenerating] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState<ActiveFilterTab>({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />;
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case 'aipicker':
        return (
          <AiPicker
            prompt={prompt}
            setPrompt={setPrompt}
            isGenerating={isGenerating}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (type: string) => {
    console.log('function launched');

    if (!prompt) return alert('Please Enter A Prompt!');

    try {
      setGenerating(true);

      const response = await fetch('/api/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(
        `Can't generate image following input: ${prompt}. \nPlease try different input.`
      );
    } finally {
      setGenerating(false);
    }
  };

  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }

    setActiveFilterTab((prevState) => ({
      ...prevState,
      [tabName]: !prevState[tabName],
    }));
  };

  const handleDecals = (type: string, result: string) => {
    const decalType = DecalTypes[type as keyof typeof DecalTypes];

    state[decalType.stateProperty as keyof State] = result;

    if (!activeFilterTab[decalType.filterTab as keyof typeof activeFilterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const readFile = (type: string) => {
    reader(file).then((res) => {
      handleDecals(type, res);
      setActiveEditorTab('');
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => {
                  handleActiveFilterTab(tab.name);
                }}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
