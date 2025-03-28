const react = require('@vitejs/plugin-react');

module.exports = {
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': 'http://localhost:3001'
    }
  }
};