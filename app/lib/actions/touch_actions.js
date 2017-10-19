export const UPDATE_AUTOPLAY = 'UPDATE_AUTOPLAY';
// export const RESET_MODAL_TIMEOUT = 'RESET_MODAL_TIMEOUT';

export const setAutoplay = (setting) => {
  // let timer = null;
  // clearInterval(timer);
  //
  return ({
    type: UPDATE_AUTOPLAY,
    setting
  });
};

// export const modalTimeout = (bool) => {
//   return ({
//     type: RESET_MODAL_TIMEOUT,
//     setting: bool
//   });
// };
