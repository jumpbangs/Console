/* eslint-disable react-hooks/exhaustive-deps */
/* tslint:disable no-empty */
import React from 'react';
import useToggle from 'hooks/useToggle';

interface ImageLoaderProps {
  src: string;
  alt: string;
  defaultSrc?: string;
  defaultComponent?: any;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

/**
 * Image Loader component.
 *
 * @param {ImageLoaderProps} props
 *
 * @returns {React.ReactElement}
 */
const ImageLoader: React.FC<ImageLoaderProps> = (props: ImageLoaderProps): React.ReactElement => {
  const { src, defaultSrc, alt, defaultComponent, onLoad = () => {}, onError = () => {} } = props;

  const [isError, toggleError] = useToggle();

  const handleOnError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    toggleError();
    onError(event);
  };

  const handleOnLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    onLoad(event);
  };

  React.useEffect(() => {
    if (isError) toggleError();
  }, [src]);

  const path = isError ? defaultSrc : src;

  const element =
    defaultComponent && isError ? (
      defaultComponent
    ) : (
      <img src={path} onLoad={handleOnLoad} onError={handleOnError} alt={alt} />
    );

  return element;
};

export default ImageLoader;
