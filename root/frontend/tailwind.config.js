module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'slide-down': 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
};
