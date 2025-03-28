const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure the node_modules directory exists
const nodeModulesDir = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesDir)) {
  fs.mkdirSync(nodeModulesDir, { recursive: true });
}

try {
  console.log('Installing build dependencies...');
  
  // Install Vite and React plugin globally to ensure they're available
  execSync('npm install -g vite @vitejs/plugin-react', { 
    stdio: 'inherit',
    cwd: __dirname
  });
  
  // Also install locally
  execSync('npm install --save-dev vite @vitejs/plugin-react', { 
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('Building client application...');
  
  // Use the global vite command
  execSync('vite build --config vite.config.cjs', {
    stdio: 'inherit',
    cwd: __dirname,
    env: {
      ...process.env,
      PATH: `${process.env.PATH}:${path.join(__dirname, 'node_modules', '.bin')}`
    }
  });
  
  console.log('Client build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}