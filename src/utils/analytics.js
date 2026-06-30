/**
 * analytics.js
 * Reusable utility for Plausible Analytics event tracking.
 */

export const trackEvent = (eventName, props = {}) => {
  if (window.plausible) {
    window.plausible(eventName, { props });
  }
};

export const trackPageView = (props = {}) => {
  if (window.plausible) {
    window.plausible('pageview', { props });
  }
};