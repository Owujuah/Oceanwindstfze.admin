(function($) {

	'use strict';

	// bootstrap dropdown hover

  // loader
  var loader = function() {
    setTimeout(function() { 
      if($('#loader').length > 0) {
        $('#loader').removeClass('show');
      }
    }, 1);
  };
  loader();

  // Stellar
  $(window).stellar();

	
	$('nav .dropdown').hover(function(){
		var $this = $(this);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			$this.find('.dropdown-menu').removeClass('show');
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});



	// home slider
	$('.home-slider').owlCarousel({
    loop:true,
    autoplay: true,
    margin:10,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav:true,
    autoplayHoverPause: true,
    items: 1,
    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:1,
        nav:false
      },
      1000:{
        items:1,
        nav:true
      }
    }
	});

	// owl carousel
	var majorCarousel = $('.js-carousel-1');
	majorCarousel.owlCarousel({
    loop:true,
    autoplay: false,
    stagePadding: 0,
    margin: 10,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav: false,
    dots: false,
    autoplayHoverPause: false,
    items: 3,
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:2,
        nav:false
      },
      1000:{
        items:3,
        nav:true,
        loop:false
      }
  	}
	});

  // cusotm owl navigation events
  $('.custom-next').click(function(event){
    event.preventDefault();
    // majorCarousel.trigger('owl.next');
    majorCarousel.trigger('next.owl.carousel');

  })
  $('.custom-prev').click(function(event){
    event.preventDefault();
    // majorCarousel.trigger('owl.prev');
    majorCarousel.trigger('prev.owl.carousel');
  })

	// owl carousel
	var major2Carousel = $('.js-carousel-2');
	major2Carousel.owlCarousel({
    loop:true,
    autoplay: true,
    stagePadding: 7,
    margin: 20,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav: false,
    autoplayHoverPause: true,
    items: 4,
    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:3,
        nav:false
      },
      1000:{
        items:4,
        nav:true,
        loop:false
      }
  	}
	});


 

	var contentWayPoint = function() {
		var i = 0;
		$('.element-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('element-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .element-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn element-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft element-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight element-animated');
							} else {
								el.addClass('fadeInUp element-animated');
							}
							el.removeClass('item-animate');
						},  k * 100);
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();



})(jQuery);


// Firebase configuration (replace with your actual config)
const firebaseConfig = {
apiKey: "AIzaSyCGW_T8O3bOhCFgabacKwfXPHDQHjPOwwE",
authDomain: "oceanwindsroyalapartment.firebaseapp.com",
projectId: "oceanwindsroyalapartment",
storageBucket: "oceanwindsroyalapartment.firebasestorage.app",
messagingSenderId: "402432791417",
appId: "1:402432791417:web:14dcaa0251e07525a455a8",
measurementId: "G-FLVGYSB847"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const logoutBtn = document.getElementById('logoutBtn');
const createArticleBtn = document.getElementById('createArticleBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const articleForm = document.getElementById('articleForm');
const newsContainer = document.getElementById('newsContainer');
const featuredContainer = document.getElementById('featuredContainer');
const articlesList = document.getElementById('articlesList');
const articleDetail = document.getElementById('articleDetail');
const categories = document.querySelectorAll('.category');
const navLinks = document.querySelectorAll('.nav-link');
const pageContainers = document.querySelectorAll('.page-container');
const backToListBtn = document.getElementById('backToListBtn');

// Current page state
let currentPage = 'home';
let currentArticleId = null;

// Modal functionality
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

signupBtn.addEventListener('click', () => {
    signupModal.style.display = 'flex';
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
    });
});

showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'none';
    signupModal.style.display = 'flex';
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.style.display = 'none';
    loginModal.style.display = 'flex';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === signupModal) {
        signupModal.style.display = 'none';
    }
});

// Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        showPage(page);
        
        // Update active nav link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    });
});

// Back to list button
backToListBtn.addEventListener('click', () => {
    showPage('articles');
});

// Show specific page
function showPage(page) {
    currentPage = page;
    
    // Hide all pages
    pageContainers.forEach(container => {
        container.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(`${page}-page`).classList.add('active');
    
    // Load appropriate content
    if (page === 'home') {
        loadNews();
    } else if (page === 'articles') {
        loadArticlesList();
    } else if (page === 'create') {
        // Nothing special to load
    }
}

// Show article detail
function showArticleDetail(articleId) {
    currentArticleId = articleId;
    
    // Hide all pages
    pageContainers.forEach(container => {
        container.classList.remove('active');
    });
    
    // Show article detail page
    document.getElementById('article-detail-page').classList.add('active');
    
    // Load article detail
    loadArticleDetail(articleId);
}

// Authentication
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            loginModal.style.display = 'none';
            loginForm.reset();
            updateAuthUI();
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            // Add user data to Firestore
            return db.collection('users').doc(user.uid).set({
                name: name,
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            signupModal.style.display = 'none';
            signupForm.reset();
            updateAuthUI();
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
});

// Logout
logoutBtn.addEventListener('click', () => {
    auth.signOut();
    updateAuthUI();
});

// Article Creation
articleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    
    if (!user) {
        alert('You must be logged in to create an article');
        return;
    }
    
    const title = document.getElementById('articleTitle').value;
    const category = document.getElementById('articleCategory').value;
    const imageUrl = document.getElementById('articleImage').value;
    const content = document.getElementById('articleContent').value;
    
    // Add article to Firestore
    db.collection('articles').add({
        title: title,
        category: category,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        content: content,
        author: user.uid,
        authorName: user.displayName || 'Anonymous',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        views: 0
    })
    .then(() => {
        articleForm.reset();
        alert('Article published successfully!');
        showPage('articles'); // Navigate to articles list
    })
    .catch((error) => {
        alert('Error publishing article: ' + error.message);
    });
});

// Update UI based on authentication state
function updateAuthUI() {
    const user = auth.currentUser;
    const authButtons = document.querySelector('.auth-buttons');
    
    if (user) {
        authButtons.innerHTML = `
            <span style="padding: 8px 16px; display: flex; align-items: center;">Welcome, ${user.displayName || user.email}</span>
            <button class="btn btn-outline" id="logoutBtn">Logout</button>
        `;
        document.getElementById('logoutBtn').addEventListener('click', () => {
            auth.signOut();
            updateAuthUI();
        });
        
        // Show create article button in nav if on create page
        if (currentPage === 'create') {
            document.querySelector('.nav-link[data-page="create"]').style.display = 'block';
        }
    } else {
        authButtons.innerHTML = `
            <button class="btn btn-outline" id="loginBtn">Login</button>
            <button class="btn btn-primary" id="signupBtn">Sign Up</button>
        `;
        // Reattach event listeners to the new buttons
        document.getElementById('loginBtn').addEventListener('click', () => {
            loginModal.style.display = 'flex';
        });
        document.getElementById('signupBtn').addEventListener('click', () => {
            signupModal.style.display = 'flex';
        });
        
        // Hide create article button in nav if not logged in
        if (currentPage === 'create') {
            showPage('home');
            document.querySelector('.nav-link[data-page="create"]').classList.remove('active');
            document.querySelector('.nav-link[data-page="home"]').classList.add('active');
        }
    }
}

// Load news articles from Firebase for home page
function loadNews(category = 'all') {
    let query = db.collection('articles').orderBy('createdAt', 'desc').limit(6);
    
    // Apply category filter if specified
    if (category && category !== 'all') {
        query = query.where('category', '==', category);
    }
    
    query.get().then((querySnapshot) => {
        const articles = [];
        querySnapshot.forEach((doc) => {
            const article = doc.data();
            article.id = doc.id;
            articles.push(article);
        });
        
        displayNews(articles);
    }).catch((error) => {
        console.error("Error loading articles: ", error);
        // For demo purposes, show a message if no articles found
        if (querySnapshot && querySnapshot.empty) {
            newsContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <h3>No articles found</h3>
                    <p>Be the first to create an article by signing in and clicking "Create Article"</p>
                </div>
            `;
        }
    });
}

// Display news articles in the grid for home page
function displayNews(articles) {
    // Clear existing content
    newsContainer.innerHTML = '';
    featuredContainer.innerHTML = '';
    
    if (articles.length === 0) {
        newsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <h3>No articles found</h3>
                <p>Try a different category or create the first article</p>
            </div>
        `;
        return;
    }
    
    // Set the first article as featured
    const featuredArticle = articles[0];
    if (featuredArticle) {
        featuredContainer.innerHTML = `
            <div class="news-card" onclick="showArticleDetail('${featuredArticle.id}')">
                <img src="${featuredArticle.imageUrl}" alt="${featuredArticle.title}" class="news-image">
                <div class="news-content">
                    <span class="news-category">${featuredArticle.category}</span>
                    <h3 class="news-title">${featuredArticle.title}</h3>
                    <p class="news-excerpt">${featuredArticle.content.substring(0, 100)}...</p>
                    <div class="news-meta">
                        <span><i class="far fa-user"></i> ${featuredArticle.authorName}</span>
                        <span><i class="far fa-clock"></i> ${formatDate(featuredArticle.createdAt)}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Display the rest of the articles
    const remainingArticles = articles.slice(1);
    
    remainingArticles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'news-card';
        articleElement.setAttribute('onclick', `showArticleDetail('${article.id}')`);
        articleElement.innerHTML = `
            <img src="${article.imageUrl}" alt="${article.title}" class="news-image">
            <div class="news-content">
                <span class="news-category">${article.category}</span>
                <h3 class="news-title">${article.title}</h3>
                <p class="news-excerpt">${article.content.substring(0, 100)}...</p>
                <div class="news-meta">
                    <span><i class="far fa-user"></i> ${article.authorName}</span>
                    <span><i class="far fa-clock"></i> ${formatDate(article.createdAt)}</span>
                </div>
            </div>
        `;
        newsContainer.appendChild(articleElement);
    });
}

// Load articles list for articles page
function loadArticlesList() {
    db.collection('articles').orderBy('createdAt', 'desc').get()
        .then((querySnapshot) => {
            const articles = [];
            querySnapshot.forEach((doc) => {
                const article = doc.data();
                article.id = doc.id;
                articles.push(article);
            });
            
            displayArticlesList(articles);
        })
        .catch((error) => {
            console.error("Error loading articles: ", error);
        });
}

// Display articles list
function displayArticlesList(articles) {
    // Clear existing content
    articlesList.innerHTML = '';
    
    if (articles.length === 0) {
        articlesList.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h3>No articles found</h3>
                <p>Be the first to create an article by signing in and clicking "Create Article"</p>
            </div>
        `;
        return;
    }
    
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article-item';
        articleElement.setAttribute('onclick', `showArticleDetail('${article.id}')`);
        articleElement.innerHTML = `
            <img src="${article.imageUrl}" alt="${article.title}" class="article-item-image">
            <div class="article-item-content">
                <h3 class="article-item-title">${article.title}</h3>
                <div class="article-item-meta">
                    <span><i class="far fa-user"></i> ${article.authorName}</span>
                    <span><i class="far fa-clock"></i> ${formatDate(article.createdAt)}</span>
                    <span><i class="far fa-folder"></i> ${article.category}</span>
                </div>
            </div>
        `;
        articlesList.appendChild(articleElement);
    });
}

// Load article detail
function loadArticleDetail(articleId) {
    db.collection('articles').doc(articleId).get()
        .then((doc) => {
            if (doc.exists) {
                const article = doc.data();
                displayArticleDetail(article);
            } else {
                articleDetail.innerHTML = `
                    <div style="text-align: center; padding: 40px;">
                        <h3>Article not found</h3>
                        <p>The article you're looking for doesn't exist.</p>
                    </div>
                `;
            }
        })
        .catch((error) => {
            console.error("Error loading article: ", error);
        });
}

// Display article detail
function displayArticleDetail(article) {
    articleDetail.innerHTML = `
        <img src="${article.imageUrl}" alt="${article.title}" class="article-detail-image">
        <div class="article-detail-content">
            <span class="article-detail-category">${article.category}</span>
            <h1 class="article-detail-title">${article.title}</h1>
            <div class="article-detail-meta">
                <span><i class="far fa-user"></i> ${article.authorName}</span>
                <span><i class="far fa-clock"></i> ${formatDate(article.createdAt)}</span>
                <span><i class="far fa-eye"></i> ${article.views || 0} views</span>
            </div>
            <div class="article-detail-body">
                ${article.content.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
            </div>
        </div>
    `;
}

// Format Firestore timestamp to readable date
function formatDate(timestamp) {
    if (!timestamp) return 'Recently';
    
    const date = timestamp.toDate();
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString();
}

// Category filtering
categories.forEach(category => {
    category.addEventListener('click', () => {
        categories.forEach(c => c.classList.remove('active'));
        category.classList.add('active');
        const selectedCategory = category.getAttribute('data-category');
        loadNews(selectedCategory);
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadNews();
    updateAuthUI();
    
    // Listen for auth state changes
    auth.onAuthStateChanged((user) => {
        updateAuthUI();
    });
    
    // Set up real-time listener for new articles
    db.collection('articles')
        .orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
            // When articles change, reload them based on current page
            if (currentPage === 'home') {
                const activeCategory = document.querySelector('.category.active').getAttribute('data-category');
                loadNews(activeCategory);
            } else if (currentPage === 'articles') {
                loadArticlesList();
            } else if (currentPage === 'article-detail' && currentArticleId) {
                loadArticleDetail(currentArticleId);
            }
        });
});

// Make functions available globally for onclick handlers
window.showArticleDetail = showArticleDetail;
