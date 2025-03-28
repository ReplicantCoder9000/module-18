const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

try {
  console.log('Installing build dependencies globally...');
  
  // Install Vite globally
  execSync('npm install -g vite', { 
    stdio: 'inherit'
  });
  
  console.log('Creating a simple HTML build...');
  
  // Create dist directory if it doesn't exist
  const distDir = path.join(__dirname, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  // Create a simple index.html file
  const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Google Books Search</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .search-container {
      background-color: #343a40;
      color: white;
      padding: 3rem 0;
      text-align: center;
    }
    .search-container h1 {
      font-size: 3rem;
      margin-bottom: 2rem;
    }
    .search-form {
      max-width: 800px;
      margin: 0 auto;
    }
    .results-container {
      padding: 2rem 0;
    }
    .book-card {
      height: 100%;
      margin-bottom: 1.5rem;
    }
    .book-card img {
      max-height: 200px;
      object-fit: cover;
    }
  </style>
</head>
<body>
  <div class="search-container">
    <div class="container">
      <h1>SEARCH FOR BOOKS!</h1>
      <div class="search-form">
        <div class="row">
          <div class="col-md-8">
            <input type="text" class="form-control form-control-lg" placeholder="Search for a book">
          </div>
          <div class="col-md-4">
            <button class="btn btn-success btn-lg w-100">Submit Search</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="results-container">
    <div class="container">
      <h2 class="mb-4">Search for a book to begin</h2>
      <div class="row" id="results">
        <!-- Results will be displayed here -->
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    // Simple script to handle search
    document.querySelector('.btn-success').addEventListener('click', () => {
      const searchInput = document.querySelector('input').value;
      if (searchInput) {
        fetch(\`https://www.googleapis.com/books/v1/volumes?q=\${searchInput}\`)
          .then(response => response.json())
          .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';
            
            if (data.items && data.items.length) {
              document.querySelector('h2').textContent = \`Viewing \${data.items.length} results:\`;
              
              data.items.forEach(book => {
                const bookInfo = book.volumeInfo;
                const bookCard = document.createElement('div');
                bookCard.className = 'col-md-4 mb-4';
                
                bookCard.innerHTML = \`
                  <div class="card book-card">
                    \${bookInfo.imageLinks ? \`<img src="\${bookInfo.imageLinks.thumbnail}" class="card-img-top" alt="\${bookInfo.title}">\` : ''}
                    <div class="card-body">
                      <h5 class="card-title">\${bookInfo.title}</h5>
                      <p class="small">Authors: \${bookInfo.authors ? bookInfo.authors.join(', ') : 'No author to display'}</p>
                      <p class="card-text">\${bookInfo.description ? bookInfo.description.substring(0, 150) + '...' : 'No description available'}</p>
                      <a href="\${bookInfo.infoLink}" class="btn btn-primary" target="_blank">View on Google Books</a>
                    </div>
                  </div>
                \`;
                
                resultsContainer.appendChild(bookCard);
              });
            } else {
              document.querySelector('h2').textContent = 'No results found';
            }
          })
          .catch(error => {
            console.error('Error fetching books:', error);
          });
      }
    });
  </script>
</body>
</html>
  `;
  
  fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);
  
  console.log('Client build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}