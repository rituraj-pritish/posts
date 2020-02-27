import React, { useState } from 'react';

import Background from 'src/components/ui/Background';
import Input from 'src/components/ui/Input';
import Text from 'src/components/ui/Text';
import Div from 'src/components/ui/Div';
import setAlert from 'src/utils/setAlert';

const ImageUploader = ({ imageUrl, setImageUrl, setImage }) => {
  const [imgPrevUrl, setImgPrevUrl] = useState('');

  const handleChange = e => {
    if (e.target.name === 'image') {
      let reader = new FileReader();
      let file = e.target.files[0];

      const BYTES_IN_ONE_MB = 1000000;
      if (file.size > 2 * BYTES_IN_ONE_MB) {
        setAlert('Image must be smaller than 2 MB', 'danger');
        resetImage();
        return;
      }
      reader.onloadend = () => {
        if (
          file.type !== 'image/jpeg' &&
          file.type !== 'img/jpg' &&
          file.type !== 'image/png'
        ) {
          setAlert(
            'Please select a valid image format (jpeg, jpg or png)',
            'danger'
          );
          return;
        }

        setImage(file);
        setImgPrevUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setImageUrl('');
    } else if (e.target.name === 'imageUrl') {
      const value = e.target.value;
      setImageUrl(value);
      resetImage();
    }
  };

  const handleReset = () => {
    resetImage();
    setImageUrl('');
  };

  const resetImage = () => {
    const input = document.getElementById('image-input');
    input.type = '';
    input.type = 'file';
    setImgPrevUrl('');
    setImage(null);
  };

  const url = imgPrevUrl || imageUrl;
  return (
    <div>
      <Input
        placeholder='Paste image url'
        type='text'
        onChange={handleChange}
        name='imageUrl'
        value={imageUrl}
        bg='grey'
        m='0.5rem 0'
      />

      <Div
        display='grid'
        gridTemplateColumns='1fr 1fr'
        justifyItems='start'
        m='0.5rem 0'
      >
        <Div>
          <Div
            fontSize='1.2rem'
            bg='#b4b4b4'
            color='white'
            p='0.6rem'
            borderRadius='5px'
            onClick={handleReset}
            style={{ cursor: 'pointer' }}
          >
            Reset Image
          </Div>
        </Div>
        <Text textAlign='center'>or</Text>
      </Div>

      <Input
        type='file'
        name='image'
        id='image-input'
        onChange={handleChange}
        m='0.5rem 0'
        p='0'
        width='fit-content'
      />
      <Background
        url={url}
        height={(imgPrevUrl || imageUrl) && '400px'}
        width='100%'
      />
    </div>
  );
};

export default ImageUploader;
