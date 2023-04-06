import React, { Dispatch, SetStateAction } from 'react';
import CustomButton from '../CustomButton/index';

interface Props {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  readFile: (type: string) => void;
}

const FilePicker = (props: Props) => {
  const { file, setFile, readFile } = props;

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFile(event.target.files?.[0] || null);
  };

  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {!file ? 'No File Selected' : file.name}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => readFile('logo')}
          customStyles="text-xs"
        />
        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => readFile('full')}
          customStyles="text-xs"
        />
      </div>
    </div>
  );
};

export default FilePicker;
