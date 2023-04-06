import React from 'react';
import CustomButton from '../CustomButton/index';

interface Props {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  isGenerating: boolean;
  handleSubmit: (type: string) => Promise<void>;
}

const AiPicker = (props: Props) => {
  const { handleSubmit, prompt, setPrompt, isGenerating } = props;

  return (
    <div className="aipicker-container">
      <textarea
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="p-2"
      />
      <div className="flex flex-wrap gap-3">
        {isGenerating ? (
          <CustomButton
            type="outline"
            title="Asking AI..."
            customStyles="text-xs"
            handleClick={() => {}}
          />
        ) : (
          <>
            <CustomButton
              type="outline"
              title="AI Logo"
              customStyles="text-xs"
              handleClick={() => handleSubmit('logo')}
            />

            <CustomButton
              type="filled"
              title="AI Full"
              customStyles="text-xs"
              handleClick={() => handleSubmit('logo')}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AiPicker;
