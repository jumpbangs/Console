import React from 'react';
import { useField } from 'formik';
import { ErrorSVGIcon, PublishSVGIcon } from '@react-md/material-icons';

import ImageLoader from 'components/common/imageLoader';

const SIZE = 128;

interface UploadLogoProps {
  id?: string;
  name?: string;
}

/**
 * Upload logo component
 *
 * @param {UploadLogoProps} props
 *
 * @returns {React.ReactElement}
 */
const UploadLogo: React.FC<UploadLogoProps> = (props: UploadLogoProps): React.ReactElement => {
  const { name = '', id = '' } = props;

  const [field, meta, helpers] = useField<string>(name);

  const inputFileRef = React.useRef<any>(null);

  const onFilechange = (e: any) => {
    const image = URL.createObjectURL(e.target.files[0]);
    helpers.setValue(image);
    helpers.setTouched(true);
  };

  const fileSelectedHandler = () => {
    inputFileRef.current.click();
  };

  const handleOnImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = event.target as HTMLImageElement;

    const height = target.naturalHeight;
    const width = target.naturalWidth;

    if (height < SIZE || width < SIZE) {
      helpers.setError(`Logo must be at least ${SIZE}px by ${SIZE}px`);
    }
  };

  const overlayContent = (
    <div className="merchant-logo__overlay">
      <div className="icon-wrapper">
        <PublishSVGIcon className="rmd-icon--large" onClick={fileSelectedHandler} />
      </div>
    </div>
  );

  return (
    <div className="upload-logo upload-logo-wrapper d-flex mb-6x">
      <div className="merchant-logo mr-3x">
        <ImageLoader
          src={field.value}
          alt="logo"
          onLoad={handleOnImageLoad}
          defaultComponent={<PublishSVGIcon className="rmd-icon--large" onClick={fileSelectedHandler} />}
        />
        {field.value && overlayContent}
      </div>
      <div className="logo-info mt-6x">
        <input
          id={id}
          name={name}
          type="file"
          ref={inputFileRef}
          onChange={onFilechange}
          accept="image/jpeg,image/png"
        />
        <div className="text-bold">Logo</div>
        <div className={meta.error ? 'form-group__error' : 'small color-gray-75'}>
          {meta.error && <ErrorSVGIcon className="error-icon" />}
          {`Must be at least ${SIZE}px by ${SIZE}px`}
        </div>
      </div>
    </div>
  );
};

export default UploadLogo;
