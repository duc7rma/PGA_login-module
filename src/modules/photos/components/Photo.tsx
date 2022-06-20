import React from 'react';
import { useState, useEffect } from 'react';
import './Photo.css';
import { IPhoto } from 'models/photos';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'redux/reducer';
import { resetListPhotos, setPhotoEditted } from 'modules/photos/redux/photoReducer';

interface Props {
  dataPhoto: IPhoto;
}

function Photo(props: Props) {
  const { dataPhoto } = props;
  const dispatch = useDispatch();

  const [currentTitle, setCurrentTitle] = useState(dataPhoto.title);
  const [isEdit, setIsEdit] = useState(false);
  const [timeUpdated, setTimeUpdated] = useState(Date.now());

  const isReset = useSelector((state: AppState) => state.photo.isReset);

  const handleChangeType = () => {
    setIsEdit(!isEdit);
  };

  const handleChangeTitle = (title: string) => {
    setCurrentTitle(title); // set current = input data
  };

  useEffect(() => {
    if (currentTitle !== dataPhoto.title) {
      dispatch(resetListPhotos(false));
      dispatch(setPhotoEditted({ ...dataPhoto, title: currentTitle }));
      setTimeUpdated(Date.now());
    }
  }, [currentTitle]);

  useEffect(() => {
    if (isReset === true) {
      setCurrentTitle(dataPhoto.title);
    }
  }, [isReset]);

  return (
    <div className="photo">
      <img src={dataPhoto.thumbnailUrl} alt={dataPhoto.title} />

      {isEdit ? (
        <div className="image-desc">
          <input
            className="input-tittle"
            value={currentTitle}
            autoFocus
            onBlur={handleChangeType}
            onChange={(e) => {
              handleChangeTitle(e.target.value);
            }}
          />
          <h2>Updated: {timeUpdated}</h2>
        </div>
      ) : (
        <div className="image-desc">
          <h4 className="input-tittle" onClick={handleChangeType}>
            {currentTitle}
          </h4>
          <h2>Updated: {timeUpdated}</h2>
        </div>
      )}
    </div>
  );
}

export default Photo;
