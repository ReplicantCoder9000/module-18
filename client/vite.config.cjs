module.exports = {
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