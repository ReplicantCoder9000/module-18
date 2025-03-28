const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure the node_modules/.bin directory exists
const binDir = path.join(__dirname, 'node_modules', '.bin');
if (!fs.existsSync(binDir)) {
  fs.mkdirSync(binDir, { recursive: true });
}

// Install Vite and React plugin if not already installed
try {
  console.log('Installing build dependencies...');
  execSync('npm install --save-dev vite @vitejs/plugin-react', { 
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('Building client application...');
  execSync('npx vite build', { 
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('Client build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}