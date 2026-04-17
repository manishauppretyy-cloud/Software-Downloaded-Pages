// Software Data
const softwareList = [
    {
        id: 1,
        name: "Visual Studio Code",
        description: "A powerful source code editor with support for many languages.",
        category: "development",
        os: "windows",
        rating: 4.8,
        reviews: [
            { name: "John", rating: 5, text: "Best code editor!" },
            { name: "Sarah", rating: 5, text: "Love the extensions." }
        ],
        version: "1.85.0",
        size: "95 MB",
        downloadLink: "#"
    },
    {
        id: 2,
        name: "GIMP",
        description: "Free and open-source image editing software.",
        category: "graphics",
        os: "linux",
        rating: 4.5,
        reviews: [
            { name: "Mike", rating: 4, text: "Great Photoshop alternative." }
        ],
        version: "2.10.36",
        size: "250 MB",
        downloadLink: "#"
    },
    {
        id: 3,
        name: "LibreOffice",
        description: "Complete office suite for documents, spreadsheets, and presentations.",
        category: "productivity",
        os: "mac",
        rating: 4.6,
        reviews: [
            { name: "Emma", rating: 5, text: "Perfect for my needs." }
        ],
        version: "7.6.4",
        size: "350 MB",
        downloadLink: "#"
    },
    {
        id: 4,
        name: "7-Zip",
        description: "High compression ratio file archiver.",
        category: "utilities",
        os: "windows",
        rating: 4.7,
        reviews: [
            { name: "Alex", rating: 5, text: "Simple and effective." }
        ],
        version: "23.01",
        size: "1.5 MB",
        downloadLink: "#"
    },
    {
        id: 5,
        name: "Blender",
        description: "Professional 3D creation suite for modeling and animation.",
        category: "graphics",
        os: "windows",
        rating: 4.9,
        reviews: [
            { name: "Tom", rating: 5, text: "Amazing for 3D work!" }
        ],
        version: "4.0",
        size: "400 MB",
        downloadLink: "#"
    },
    {
        id: 6,
        name: "Node.js",
        description: "JavaScript runtime for server-side development.",
        category: "development",
        os: "linux",
        rating: 4.7,
        reviews: [
            { name: "Dev123", rating: 5, text: "Essential for web dev." }
        ],
        version: "20.10.0",
        size: "30 MB",
        downloadLink: "#"
    }
];

// Display software cards
function displaySoftware(software) {
    const container = document.getElementById('software-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    software.forEach(item => {
        const stars = '★'.repeat(Math.floor(item.rating)) + '☆'.repeat(5 - Math.floor(item.rating));
        
        const card = document.createElement('div');
        card.className = 'software-card';
        card.setAttribute('data-category', item.category);
        card.setAttribute('data-os', item.os);
        
        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div>
                <span class="category">${item.category}</span>
                <span class="os">${item.os}</span>
            </div>
            <div class="rating">${stars} (${item.rating})</div>
            <a href="software-detail.html?id=${item.id}" class="btn btn-primary">View Details</a>
        `;
        
        container.appendChild(card);
    });
}

// Filter software by category and OS
function filterSoftware() {
    const categoryFilter = document.getElementById('category').value;
    const osFilter = document.getElementById('os').value;
    
    const filtered = softwareList.filter(item => {
        const categoryMatch = categoryFilter === 'all' || item.category === categoryFilter;
        const osMatch = osFilter === 'all' || item.os === osFilter;
        return categoryMatch && osMatch;
    });
    
    displaySoftware(filtered);
}

// Validate download request
function validateDownload(softwareId) {
    const software = softwareList.find(s => s.id === softwareId);
    
    if (!software) {
        alert('Error: Software not found!');
        return false;
    }
    
    // Confirm download
    const confirm = window.confirm(
        `You are about to download:\n\n` +
        `${software.name}\n` +
        `Version: ${software.version}\n` +
        `Size: ${software.size}\n\n` +
        `Do you want to continue?`
    );
    
    if (confirm) {
        alert(`Starting download of ${software.name}...`);
        // In real app, this would trigger actual download
        return true;
    }
    
    return false;
}

// Load software detail page
function loadSoftwareDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const software = softwareList.find(s => s.id === id);
    
    if (!software) {
        document.getElementById('software-detail').innerHTML = '<h2>Software not found</h2>';
        return;
    }
    
    const stars = '★'.repeat(Math.floor(software.rating)) + '☆'.repeat(5 - Math.floor(software.rating));
    
    document.getElementById('software-detail').innerHTML = `
        <h2>${software.name}</h2>
        <div class="meta">
            <span class="category">${software.category}</span>
            <span class="os">${software.os}</span>
            <span class="rating">${stars} (${software.rating})</span>
        </div>
        <p class="description">${software.description}</p>
        <p><strong>Version:</strong> ${software.version}</p>
        <p><strong>File Size:</strong> ${software.size}</p>
        <button class="btn" onclick="validateDownload(${software.id})">Download Now</button>
    `;
    
    // Load reviews
    displayReviews(software.reviews);
    
    // Store current software ID for review submission
    window.currentSoftwareId = id;
}

// Display reviews
function displayReviews(reviews) {
    const container = document.getElementById('reviews-list');
    if (!container) return;
    
    if (reviews.length === 0) {
        container.innerHTML = '<p>No reviews yet. Be the first to review!</p>';
        return;
    }
    
    container.innerHTML = reviews.map(review => `
        <div class="review-item">
            <span class="reviewer">${review.name}</span>
            <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
            <p>${review.text}</p>
        </div>
    `).join('');
}

// Submit new review
function submitReview(event) {
    event.preventDefault();
    
    const name = document.getElementById('reviewer-name').value;
    const rating = parseInt(document.getElementById('rating').value);
    const text = document.getElementById('review-text').value;
    
    // Validate
    if (!name || !rating || !text) {
        alert('Please fill in all fields');
        return;
    }
    
    // Find software and add review
    const software = softwareList.find(s => s.id === window.currentSoftwareId);
    if (software) {
        software.reviews.push({ name, rating, text });
        displayReviews(software.reviews);
        
        // Clear form
        document.getElementById('review-form').reset();
        alert('Review submitted successfully!');
    }
}

// Initialize homepage
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('software-list')) {
        displaySoftware(softwareList);
    }
});
