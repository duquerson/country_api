import { ref, watch, onMounted } from 'vue';
import { THEME_KEY, DARK_CLASS, type Theme } from '../../core/constants/theme';

function loadStoredTheme(): boolean {
  try {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored) {
      return stored === 'dark';
    }
  } catch {
    // localStorage no disponible
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add(DARK_CLASS);
  } else {
    document.documentElement.classList.remove(DARK_CLASS);
  }
}

export function useTheme() {
  const isDark = ref<boolean>(false);
  const initialized = ref(false);

  const initialize = () => {
    if (initialized.value) return;
    initialized.value = true;
    const theme = loadStoredTheme();
    isDark.value = theme;
    applyTheme(theme);
  };

  const toggle = () => {
    isDark.value = !isDark.value;
    try {
      localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light');
    } catch {
      // localStorage no disponible
    }
    applyTheme(isDark.value);
  };

  watch(isDark, (newValue) => {
    if (initialized.value) {
      applyTheme(newValue);
    }
  });

  onMounted(initialize);

  return {
    isDark,
    toggle,
  };
}
