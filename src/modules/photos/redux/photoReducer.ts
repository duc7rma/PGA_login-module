import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { IPhoto } from 'models/photos';

export interface PhotoState {
  listPhotos?: IPhoto[]
  listPhotosEditted?: IPhoto[]
  isReset?: boolean
  // paging?: IPaging
  // isTheEnd: boolean
}
  //! ACTIONS
export const getDataAPI = (pageNumber: number) => {
  return async (dispatch = useDispatch()) => {
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/photos?&_limit=10&_page=${pageNumber}`);
      res.data && res.data.length > 0 && dispatch(setListPhotos(res.data))     // res.data la 1 mang chua nhieu object
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  };
};

export const setListPhotos = createCustomAction('SET_LIST_PHOTOS', (data: IPhoto[]) => ({
  data,
}));

export const setPhotoEditted = createCustomAction('SET_PHOTO_EDITTED', (photoEditted: IPhoto) => ({
  photoEditted,
}));

export const removingEdittedPhoto = createCustomAction('REMOVE_PHOTO_EDITTED', (photoRemoved: IPhoto) => ({
  photoRemoved,
}));

export const resetListPhotos = createCustomAction('UPDATE_LIST_PHOTOS', (isReset: boolean) => ({
  isReset
}))

export const upDattingListPhotos = createCustomAction('UPDATE_PHOTOS');


const actions = { setListPhotos, setPhotoEditted, resetListPhotos, upDattingListPhotos, removingEdittedPhoto };
  
type ActionLocal = ActionType<typeof actions>;
  
  //! REDUCER
export default function photoReducer(
  state: PhotoState = {
    listPhotos: [],
    listPhotosEditted: [],
    isReset: false,
  }, action: ActionLocal) {
  switch (action.type) {
    case getType(setListPhotos): {
      const photosAPI = action.data
      console.log(state.listPhotos)
      // let listPhotos: IPhoto[] = []

      // if (state.listPhotos ) {
      //   listPhotos = [...state.listPhotos]
      // } 

      let listPhotosEditted: IPhoto[] = [] 
      if(state.listPhotosEditted) {
        listPhotosEditted = [...state.listPhotosEditted]
      }

      for (let i = 0; i < listPhotosEditted.length; i++) {
        for (let j = 0; j < photosAPI.length; j++) {
          if (photosAPI[j].id === listPhotosEditted[i].id) {
            photosAPI[j].title = listPhotosEditted[i].title
          }
        }
      }
      return { ...state, listPhotos: photosAPI}      
    }
  
      
    case getType(setPhotoEditted): {
      const photoEditted = action.photoEditted // obejct: photo da change title
      let listPhotosEditted: IPhoto[] = []
      if (state.listPhotosEditted) {
        listPhotosEditted = [...state.listPhotosEditted]
      }
      if (listPhotosEditted.length > 0) {
        const index = listPhotosEditted.findIndex((photo) => photo.id === photoEditted.id)
        if (index !== -1) {
          listPhotosEditted[index].title = photoEditted.title
        }  else {
          listPhotosEditted.push(photoEditted)
        }
      }
      else {
        listPhotosEditted.push(photoEditted)
      }
      return { ...state, listPhotosEditted }
    }

    // case getType(removingEdittedPhoto): {
    //   const photoRemoved = action.photoRemoved 
    //   let listPhotosEditted: IPhoto[] = []
    //   if (state.listPhotosEditted) {
    //     listPhotosEditted = [...state.listPhotosEditted]
    //   }
    //   if (listPhotosEditted.length > 0) {
    //     const index = listPhotosEditted.findIndex((photo) => photo.id === photoRemoved.id)
    //     if (index !== -1) {
    //       listPhotosEditted.splice(index, 1)
    //     } 
    //   }
      
    //   return { ...state, listPhotosEditted }
    // }


    case getType(upDattingListPhotos): {
      let listPhotos: IPhoto[] = []
      let listPhotosEditted: IPhoto[] = []
      if (state.listPhotos) {
        listPhotos = [...state.listPhotos]
      }
      if (state.listPhotosEditted) {
        listPhotosEditted = [...state.listPhotosEditted]
      }
      for (let i = 0; i < listPhotosEditted.length; i++) {
        for (let j = 0; j < listPhotos.length; j++) {
          if (listPhotos[j].id === listPhotosEditted[i].id) {
            listPhotos[j].title = listPhotosEditted[i].title
          }
        }
      }
      return { ...state, listPhotos, listPhotosEditted: listPhotosEditted }
    }

    case getType(resetListPhotos): {
      let listPhotos: IPhoto[] = []
      let listPhotosEditted: IPhoto[] = []
      if (state.listPhotos) {
        listPhotos = [...state.listPhotos]
      }
      if (state.listPhotosEditted) {
        listPhotosEditted = [...state.listPhotosEditted]
      }
      for (let i = 0; i < listPhotos.length; i++) {
        for (let j = 0; j < listPhotosEditted.length; j++) {
          if (listPhotosEditted[j].id === listPhotos[i].id) {
            listPhotosEditted[j].title = listPhotos[i].title
          }
        }
      }
      return { ...state,listPhotosEditted, isReset: action.isReset }
    }
      
    default:
      return state;
  }
}

   