import { createContext, useContext, useReducer } from 'react';

const ModalReportContext = createContext();

const modalReducer = (state, action) => {
  switch (action.type) {
    case 'ON_OPEN_MODAL':
      return {
        category: action.payload.category,
        isOpenModal: true,
      };

    case 'ON_CLOSE_MODAL':
      return {
        category: null,
        isOpenModal: false,
      };

    default:
      return state;
  }
};

export const ModalReportProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, {
    category: null,
    isOpenModal: false,
  });

  const onCloseModal = () => {
    dispatch({
      type: 'ON_CLOSE_MODAL',
    });
  }

  return (
    <ModalReportContext.Provider value={{ state, dispatch, onCloseModal }}>
      {children}
    </ModalReportContext.Provider>
  );
};

export const useModalReport = () => {
  return useContext(ModalReportContext);
};
