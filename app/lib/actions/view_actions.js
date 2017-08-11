export const UPDATE_VIEW = 'UPDATE_VIEW';
export const UPDATE_SITE = 'UPDATE_SITE';
export const UPDATE_SCOPE = 'UPDATE_SCOPE';

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
