export const UPDATE_CURRENT_VIEW = 'UPDATE_CURRENT_VIEW';
export const UPDATE_CURRENT_SITE = 'UPDATE_CURRENT_SITE';

export const handleNavSelect = (navButtonNum) => ({
  type: UPDATE_CURRENT_VIEW,
  view: navButtonNum
});

export const handleSiteSelect = (site) => ({
  type: UPDATE_CURRENT_SITE,
  site
});
