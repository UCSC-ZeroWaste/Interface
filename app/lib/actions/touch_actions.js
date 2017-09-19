export const UPDATE_AUTOPLAY = 'UPDATE_AUTOPLAY';

export const setAutoplay = (setting) => {
  // let timer = null;
  // clearInterval(timer);
  //
  return ({
    type: UPDATE_AUTOPLAY,
    setting
  });
};
