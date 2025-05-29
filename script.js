// Sample Data for Articles (Replace with data from a backend or API)
const API_BASE_URL = "http://localhost:5000/api";
const articles = [
  {
    id: 1,
    title: "Breaking News: Election Results Announced",
    category: "politics",
    description: "The final results of the national elections have been announced with surprising outcomes across several key states.",
    image: "https://ichef.bbci.co.uk/news/1024/cpsprodpb/ed0c/live/17145c10-20e3-11ef-a3ab-e73c00cc3104.jpg.webp",
    author: "Sarah Johnson",
    date: "April 2, 2025",
    content: "Full article content goes here..."
  },
  {
    id: 2,
    title: "India Wins Cricket World Cup, Sealing Its Domination of the Sport",
    category: "sports",
    description: "In India, cricket has become immensely profitable and a destination for the world’s best players. But a tournament victory had eluded it for many years.",
    image: "https://static01.nyt.com/images/2024/06/30/multimedia/30india-cricket-cjtl/30india-cricket-cjtl-superJumbo.jpg?quality=75&auto=webp",
    author: "Michael Chen",
    date: "April 1, 2025",
    content: "Full article content goes here..."
  },
  {
    id: 3,
    title: "Stree 2 box office collection day 28: Rajkummar Rao-Shraddha Kapoor’s horror comedy trails Jawan’s all-time record by just Rs 46 crore",
    category: "entertainment",
    description: "Stree 2 box office collection day 28: Amar Kaushik's blockbuster film, starring Rajkummar Rao and Shraddha Kapoor, took its global gross to over Rs 760 cr.",
    image: "https://images.indianexpress.com/2024/09/MixCollage-12-Sep-2024-08-43-AM-1852.jpg?w=640",
    author: "Nikhil kushwaha",
    date: "March 30, 2025",
    content: "Full article content goes here..."
  },
  {
    id: 4,
    title: "DeepSeek: The Chinese AI app that has the world talking",
    category: "technology",
    description: "DeepSeek, a Chinese artificial intelligence (AI) startup, made headlines worldwide after it topped app download charts and caused US tech stocks to sink.",
    image: "https://ichef.bbci.co.uk/news/1024/cpsprodpb/3cb2/live/61ec64f0-dd4c-11ef-b20c-cf1b3bd7a488.jpg.webp",
    author: "David Rodriguez",
    date: "March 29, 2025",
    content: "Full article content goes here..."
  },
  {
    id: 5,
    title: "Modi claims victory in India’s election but drop in support forces him to rely on coalition partners",
    category: "politics",
    description: "World leaders have signed a landmark agreement to reduce carbon emissions and combat climate change over the next decade.",
    image: "https://th-i.thgim.com/public/incoming/1jqsu1/article69196971.ece/alternates/LANDSCAPE_1200/20250208316L.jpg",
    author: "Olivia Taylor",
    date: "March 28, 2025",
    content: "Full article content goes here..."
  },
  {
    id: 6,
    title: "Shraddha Kapoor celebrates her furry baby Shyloh's 14 birthday",
    category: "entertainment",
    description: "Shraddha Kapoor's furry baby Shyloh has turned 14 today. The 'Stree' actress commemorated the day with a special birthday party.",
    image: "https://images.mid-day.com/images/images/2025/apr/Shraddha-Kapoor-ii_d.jpg",
    author: "Nikhil kushwaha",
    date: "April 4, 2025",
    content: "Full article content goes here..."
  }
];

// Breaking news items
const breakingNewsItems = [
  "Breaking News: Election Results Announced",
  "India Wins Cricket World Cup, Sealing Its Domination of the Sport",
  "Stree 2 box office collection day 28: Rajkummar Rao-Shraddha Kapoor’s horror comedy trails Jawan’s all-time record by just Rs 46 crore",
  "DeepSeek: The Chinese AI app that has the world talking",
  "Modi claims victory in India’s election but drop in support forces him to rely on coalition partners",
  "Shraddha Kapoor celebrates her furry baby Shyloh's 14 birthday"
];

// DOM Elements
const articlesGrid = document.querySelector(".articles-grid");
const categoryButtons = document.querySelectorAll(".category-button");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
const commentsList = document.querySelector(".comments-list");
const breakingNewsContent = document.getElementById("breaking-news-content");
const loadingIndicator = document.getElementById("loading-indicator");
const loginButton = document.getElementById("login-button");
const loginModal = document.getElementById("login-modal");
const closeButton = document.querySelector(".close-button");
const loginForm = document.getElementById("login-form");
const newsletterForm = document.getElementById("newsletter-form");

// Initialize Breaking News Ticker
function initBreakingNews() {
  breakingNewsContent.innerHTML = "";
  breakingNewsItems.forEach(item => {
    const newsItem = document.createElement("span");
    newsItem.classList.add("breaking-news-item");
    newsItem.textContent = item;
    breakingNewsContent.appendChild(newsItem);
  });
}

// Function to Display Articles
function displayArticles(articlesToDisplay) {
  // Show loading indicator
  loadingIndicator.style.display = "block";
  
  // Simulate API call delay
  setTimeout(() => {
    articlesGrid.innerHTML = ""; // Clear existing articles except loading indicator
    loadingIndicator.style.display = "none";
    
    if (articlesToDisplay.length === 0) {
      const noResults = document.createElement("div");
      noResults.classList.add("no-results");
      noResults.innerHTML = "<p>No articles found matching your search.</p>";
      articlesGrid.appendChild(noResults);
      return;
    }
    
    articlesToDisplay.forEach((article) => {
      const articleCard = document.createElement("div");
      articleCard.classList.add("article-card");
      articleCard.innerHTML = `
        <img src="${article.image}" alt="${article.title}">
        <div class="article-card-content">
          <span class="article-category">${article.category}</span>
          <h3>${article.title}</h3>
          <div class="article-meta">
            <span class="article-author"><i class="fas fa-user"></i> ${article.author}</span>
            <span class="article-date"><i class="fas fa-calendar"></i> ${article.date}</span>
          </div>
          <p>${article.description}</p>
          <a href="#" class="read-more" data-id="${article.id}">Read More <i class="fas fa-arrow-right"></i></a>
        </div>
      `;
      articlesGrid.appendChild(articleCard);
    });
  
    // Add Event Listeners to "Read More" Links
    const readMoreLinks = document.querySelectorAll(".read-more");
    readMoreLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const articleId = e.target.getAttribute("data-id") || e.target.parentElement.getAttribute("data-id");
        const article = articles.find((a) => a.id == articleId);
        if (article) {
          displayFullArticle(article);
        }
      });
    });
  }, 800); // Simulated delay
}

// Function to Display Full Article (Modal or New Page)
function displayFullArticle(article) {
  // In a real application, this would navigate to a dedicated article page
  // For now, we'll use an alert or you could implement a modal
  const articleContent = `
    ${article.title}
    
    By ${article.author} | ${article.date}
    
    ${article.content}
  `;
  
  alert(articleContent); // Replace with a modal in a real application
}

// Filter Articles by Category
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    if (category === "all") {
      displayArticles(articles);
    } else {
      const filteredArticles = articles.filter(
        (article) => article.category === category
      );
      displayArticles(filteredArticles);
    }
  });
});

// Search Functionality
searchButton.addEventListener("click", performSearch);
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    performSearch();
  }
});

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  if (searchTerm === "") {
    displayArticles(articles);
    return;
  }
  
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm) ||
      article.description.toLowerCase().includes(searchTerm) ||
      article.category.toLowerCase().includes(searchTerm) ||
      article.author.toLowerCase().includes(searchTerm)
  );
  
  displayArticles(filteredArticles);
}

// Add Comment Functionality
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const commentText = commentInput.value.trim();
  if (commentText) {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const comment = document.createElement("div");
    comment.classList.add("comment");
    comment.innerHTML = `
      <div class="comment-header">
        <p class="comment-author"><i class="fas fa-user-circle"></i> Anonymous User</p>
        <span class="comment-date">${formattedDate}</span>
      </div>
      <p class="comment-text">${commentText}</p>
    `;
    commentsList.appendChild(comment);
    commentInput.value = ""; // Clear input
  }
});

// Login Modal Functionality
loginButton.addEventListener("click", () => {
  loginModal.style.display = "block";
});

closeButton.addEventListener("click", () => {
  loginModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = "none";
  }
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  // In a real application, this would be handled by backend authentication
  // For now, just show an alert and close the modal
  alert(`Welcome, ${username}! You are now logged in.`);
  loginModal.style.display = "none";
  
  // Change login button to show logged in state
  loginButton.innerHTML = `<i class="fas fa-user"></i> ${username}`;
});

// Newsletter Subscription
newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email-input").value;
  
  // In a real application, this would send the email to a backend service
  alert(`Thank you for subscribing with ${email}! You will receive our latest news.`);
  document.getElementById("email-input").value = "";
});

// Mobile Navigation Toggle
document.querySelector('.nav-toggle-label').addEventListener('click', function() {
  const navToggle = document.getElementById('nav-toggle');
  navToggle.checked = !navToggle.checked;
});

// Placeholder API fetch function (for future backend integration)
async function fetchArticlesFromAPI() {
  try {
    // This would be replaced with a real API call
    // const response = await fetch("https://your-api-endpoint/articles");
    // const data = await response.json();
    // return data;
    
    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(articles);
      }, 1000);
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

// Initialize the Application
async function initApp() {
  initBreakingNews();
  
  try {
    // In a real app, this would fetch from your API
    const articleData = await fetchArticlesFromAPI();
    displayArticles(articleData);
  } catch (error) {
    console.error("Failed to initialize app:", error);
    // Fallback to sample data
    displayArticles(articles);
  }
}

// Start the application when DOM is fully loaded
document.addEventListener("DOMContentLoaded", initApp);