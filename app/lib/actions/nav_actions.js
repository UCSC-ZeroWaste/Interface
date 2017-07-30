export const UPDATE_CURRENT_VIEW = 'UPDATE_CURRENT_VIEW';

export const handleNavSelect = (navButtonNum) => ({
  type: UPDATE_CURRENT_VIEW,
  view: navButtonNum
});
