import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    reactRefresh(),
    {
      ...postcss,
      plugins: [tailwindcss(), autoprefixer()],
    },
  ],
});
