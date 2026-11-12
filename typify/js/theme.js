// Loaded in <head> so the theme is set before the first paint. A choice made
// with the button is remembered; without one, the system setting decides.
(() => {
  'use strict';

  const STORAGE_KEY = 'theme';
  const root = document.documentElement;

  function storedTheme() {
    try {
      const theme = localStorage.getItem(STORAGE_KEY);
      if (theme === 'light' || theme === 'dark') {
        return theme;
      }
    } catch {
      // Storage can be blocked; fall through to the system setting.
    }

    return null;
  }

  function systemTheme() {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    return 'dark';
  }

  function otherTheme() {
    if (root.dataset.theme === 'dark') {
      return 'light';
    }

    return 'dark';
  }

  root.dataset.theme = storedTheme() ?? systemTheme();

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('theme-toggle');

    const label = () => {
      button.textContent = `${otherTheme()} mode`;
    };

    button.addEventListener('click', () => {
      root.dataset.theme = otherTheme();
      try {
        localStorage.setItem(STORAGE_KEY, root.dataset.theme);
      } catch {
        // The switch still applies for this visit.
      }
      label();
    });
    label();
  });
})();
