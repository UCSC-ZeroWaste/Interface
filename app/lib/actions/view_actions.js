export const RESET_VIEW = 'RESET_VIEW';
export const UPDATE_VIEW = 'UPDATE_VIEW';
export const UPDATE_SITE = 'UPDATE_SITE';
export const UPDATE_SCOPE = 'UPDATE_SCOPE';
export const UPDATE_DEVICE = 'UPDATE_DEVICE';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export const resetView = () => ({
  type: RESET_VIEW
});

export const handleViewSelect = (navButtonNum) => ({
  type: UPDATE_VIEW,
  view: navButtonNum
});

export const handleSiteSelect = (site) => ({
  type: UPDATE_SITE,
  site
});

export const handleScopeSelect = (scope) => ({
  type: UPDATE_SCOPE,
  scope
});

export const handleDeviceSelect = (device) => {
  let deviceType = (device === 'home' ? 'desktop' : 'touchscreen');
  return (
    {
      type: UPDATE_DEVICE,
      device: deviceType
    }
  );
};

export const toggleModal = (modal) => ({
  type: TOGGLE_MODAL,
  modal
});
