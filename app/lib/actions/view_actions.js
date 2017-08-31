export const UPDATE_VIEW = 'UPDATE_VIEW';
export const UPDATE_SITE = 'UPDATE_SITE';
export const UPDATE_SCOPE = 'UPDATE_SCOPE';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';

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

export const toggleModal = () => ({
  type: TOGGLE_MODAL
});
