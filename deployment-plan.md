# Deployment Plan for Google Books API Search Engine

## Current Issues

We're facing issues with the Vite build process on Render. The error is:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'vite' imported from /opt/render/project/src/client/node_modules/.vite-temp/vite.config.ts.timestamp-1743176759379-49480e731da29.mjs
```

## Proposed Solutions

### Solution 1: Create a Static Build

Instead of trying to use Vite directly on Render, we can create a static build locally and push it to the repository. This approach is simpler but requires rebuilding and pushing changes whenever the frontend code changes.

### Solution 2: Modify the Build Process

We need to update the build process to ensure Vite is properly installed and configured. Here's what we should do:

1. Update the client's package.json:
   - Change the build script to use a more reliable method for running Vite

2. Create a custom build script:
   - Create a build.js file in the client directory that handles the build process
   - Use Node.js child_process to execute the build commands

3. Update the root package.json:
   - Modify the render-build script to use the custom build script

### Solution 3: Use a Different Deployment Strategy

If Render continues to have issues with Vite, we could consider:
- Using a different hosting provider like Netlify or Vercel for the frontend
- Creating a separate repository for the frontend and backend

## Recommended Approach

I recommend Solution 2: Modify the Build Process. Here's the implementation plan:

1. Create a build.js file in the client directory:
```javascript
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
```

2. Update client/package.json:
```json
"scripts": {
  "dev": "vite",
  "build": "node build.js",
  "lint": "eslint src --ext js,jsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview"
}
```

3. Update root package.json:
```json
"render-build": "npm install && cd server && npm run build && cd ../client && npm install && npm run build"
```

## Next Steps

After implementing these changes:
1. Push the changes to GitHub
2. Deploy to Render with the updated build configuration
3. Monitor the build logs to ensure the process completes successfully

If issues persist, we may need to consider Solution 3 and use a different deployment strategy.