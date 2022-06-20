import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAPI } from 'modules/photos/redux/photoReducer';
import Photo from 'modules/photos/components/Photo';
import { upDattingListPhotos, resetListPhotos } from 'modules/photos/redux/photoReducer';
import { AppState } from 'redux/reducer';
import './PhotosPage.css';

function PhotosPage() {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);

  const { listPhotos, listPhotosEditted } = useSelector((state: AppState) => ({
    listPhotos: state.photo.listPhotos,
    listPhotosEditted: state.photo.listPhotosEditted,
  }));

  console.log(listPhotos);

  const handleUpdatePhotos = () => {
    dispatch(upDattingListPhotos());
  };

  const handleReset = () => {
    dispatch(resetListPhotos(true));
  };

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePrevPage = () => {
    setPageNumber(pageNumber - 1);
  };

  useEffect(() => {
    dispatch(getDataAPI(pageNumber));
  }, [pageNumber]);

  return (
    <>
      {listPhotos && listPhotos.length > 0 && (
        <div className="container">
          <div className="button">
            <button
              className="btn-confirm"
              type="button"
              disabled={listPhotosEditted && listPhotosEditted.length > 0 ? false : true}
              onClick={() => handleUpdatePhotos()}
            >
              Confirm
            </button>
            <button
              className="btn-reset"
              type="button"
              disabled={listPhotosEditted && listPhotosEditted.length > 0 ? false : true}
              onClick={() => handleReset()}
            >
              Reset
            </button>
          </div>

          {listPhotos.map((item) => {
            const photo = { ...item, updatedAt: '' + Date.now() };
            return <Photo key={photo.id} dataPhoto={photo} />;
          })}

          <div className="btn-switch-page">
            <button
              className="btn-prev-page"
              disabled={pageNumber <= 1 ? true : false}
              onClick={() => handlePrevPage()}
            >
              Prev
            </button>
            <button
              className="btn-next-page"
              disabled={pageNumber >= 10 ? true : false}
              onClick={() => handleNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PhotosPage;
