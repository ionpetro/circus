import React, { useEffect, useRef, useState } from 'react';
import UiInput from '../UiInput/UiInput';
import styles from './UiUpload.module.scss';

const UiUpload = ({ setImageCallback }) => {
  const [image, setImage] = useState('');
  const fileInput = useRef(null);

  useEffect(() => {
    setImageCallback(image);
  }, [image]);

  return (
    <div className={styles.compWrap}>
      <UiInput
        className={styles.input}
        forwardRef={fileInput}
        type={'file'}
        name={'file (please click save to upload)'}
        label={true}
        onChange={(e) => setImage(e.target.files[0])}
      />
    </div>
  );
};

export default UiUpload;
