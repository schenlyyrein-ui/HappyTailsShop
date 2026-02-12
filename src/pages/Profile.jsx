import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Appointment Tomorrow!',
      message: "Bella's grooming appointment is tomorrow at 10:00 AM",
      time: '2 hours ago',
      read: false,
      icon: '📅'
    },
    {
      id: 2,
      title: 'Booking Confirmed',
      message: 'Your Pet Café reservation for Dec 25 has been confirmed',
      time: '1 day ago',
      read: false,
      icon: '✅'
    },
    {
      id: 3,
      title: 'Rate Your Experience',
      message: "How was Max's birthday party? Leave a review!",
      time: '3 days ago',
      read: false,
      icon: '⭐'
    },
    {
      id: 4,
      title: 'Order Completed',
      message: 'We delivered your order on 2024-01-01',
      time: '5 days ago',
      read: true,
      icon: '📦'
    }
  ]);

  // User data
  const user = {
    name: 'Sarah',
    email: 'sarah.chen@email.com',
    phone: '+63 912 345 6789',
    memberSince: '2023',
    avatar: '/src/assets/user-avatar.jpg',
    petCount: 2,
    pets: ['Bella', 'Max']
  };

  // Stats data
  const stats = {
    upcoming: 17,
    completed: 12,
    orders: 8,
    reviews: 5,
    averageRating: 4.7,
    totalReviews: 10,
    fiveStarReviews: 10,
    recommended: 70,
    verifiedReviews: 7
  };

  // Upcoming bookings
  const upcomingBookings = [
    {
      id: 1,
      service: 'Full Grooming Package',
      petName: 'Bella',
      petBreed: 'Golden Retriever',
      date: 'Dec 20, 2024',
      time: '10:00 AM',
      status: 'Confirmed',
      price: '₱850 - ₱1,200',
      note: '*Price may vary depending on pet size/condition',
      image: '/src/assets/bella.jpg'
    },
    {
      id: 2,
      service: 'Pet Boarding',
      petName: 'Max',
      petBreed: 'Shih Tzu',
      date: 'Dec 22, 2024',
      time: '9:00 AM',
      status: 'Confirmed',
      price: '₱500/night',
      note: '* Price may vary depending on pet size/condition',
      image: '/src/assets/max.jpg'
    },
    {
      id: 3,
      service: 'Pet Café Reservation',
      petName: 'Luna',
      petBreed: 'Persian Cat',
      date: 'Dec 25, 2024',
      time: '2:00 PM',
      status: 'Confirmed',
      price: '₱299 entry',
      note: '* Price may vary depending on pet size/condition',
      image: '/src/assets/luna.jpg'
    }
  ];

  // Past bookings
  const pastBookings = [
    {
      id: 4,
      service: 'Full Grooming Package',
      petName: 'Bella',
      petBreed: 'Golden Retriever',
      date: 'Dec 5, 2024',
      time: '11:00 AM',
      status: 'Completed',
      price: '₱950',
      rating: 4,
      reviewed: true
    },
    {
      id: 5,
      service: 'Pet Birthday Package',
      petName: 'Max',
      petBreed: 'Shih Tzu',
      date: 'Nov 28, 2024',
      time: '2:00 PM',
      status: 'Completed',
      price: '₱2,500',
      rating: 3,
      reviewed: true
    },
    {
      id: 6,
      service: 'Pet Café Visit',
      petName: 'Luna',
      petBreed: 'Persian Cat',
      date: 'Nov 20, 2024',
      time: '3:00 PM',
      status: 'Completed',
      price: '₱299',
      rating: 4,
      reviewed: true
    }
  ];

  // Order history
  const orderHistory = [
    {
      id: 'ORD-2024-001',
      date: 'Dec 15, 2024',
      items: [
        { name: 'Premium Dog Food (5kg)', quantity: 1 },
        { name: 'Chew Toys Set', quantity: 1 }
      ],
      total: '₱1,450',
      status: 'Paid',
      deliveryStatus: 'Completed'
    },
    {
      id: 'ORD-2024-002',
      date: 'Dec 10, 2024',
      items: [
        { name: 'Cat Litter (10L)', quantity: 1 },
        { name: 'Scratching Post', quantity: 1 }
      ],
      total: '₱890',
      status: 'Paid',
      deliveryStatus: 'Completed'
    },
    {
      id: 'ORD-2024-003',
      date: 'Dec 18, 2024',
      items: [
        { name: 'Pet Shampoo', quantity: 1 },
        { name: 'Grooming Brush', quantity: 1 },
        { name: 'Nail Clipper', quantity: 1 }
      ],
      total: '₱650',
      status: 'Pending',
      deliveryStatus: 'Processing'
    }
  ];

  // Reviews
  const userReviews = [
    {
      id: 1,
      service: 'Full Grooming Package',
      petName: 'Bella',
      petBreed: 'Golden Retriever',
      date: 'Dec 5, 2024',
      rating: 5,
      comment: 'Amazing service! Bella came out looking like a superstar. The groomers were so gentle and patient with her.',
      editable: true
    },
    {
      id: 2,
      service: 'Pet Café Visit',
      petName: 'Luna',
      petBreed: 'Persian Cat',
      date: 'Nov 20, 2024',
      rating: 5,
      comment: 'Great atmosphere and the staff was very welcoming. Luna loved the cat-friendly treats!',
      editable: true
    }
  ];

  // Community reviews stats
  const communityStats = {
    averageRating: 4.7,
    totalReviews: 10,
    fiveStarCount: 10,
    recommendedPercent: 70,
    verifiedCount: 7,
    reviewsByService: [
      { service: 'All Services', count: 10 },
      { service: 'Full Grooming Package', count: 4 },
      { service: 'Pet Boarding', count: 2 },
      { service: 'Pet Birthday Package', count: 2 },
      { service: 'Pet Café Reservation', count: 2 }
    ]
  };

  // Community reviews
  const communityReviews = [
    {
      id: 1,
      author: 'Maria M.',
      service: 'Full Grooming Package',
      petBreed: 'Golden Retriever',
      date: 'Dec 15, 2024',
      rating: 5.0,
      comment: 'Excellent service! Very professional and caring staff.'
    },
    {
      id: 2,
      author: 'John D.',
      service: 'Pet Boarding',
      petBreed: 'Labrador',
      date: 'Dec 12, 2024',
      rating: 4.5,
      comment: 'Great facility, my dog was well taken care of.'
    }
  ];

  const handleReschedule = (bookingId) => {
    console.log('Reschedule booking:', bookingId);
    alert('Reschedule functionality coming soon!');
  };

  const handleCancel = (bookingId) => {
    console.log('Cancel booking:', bookingId);
    alert('Cancel functionality coming soon!');
  };

  const handleEditReview = (reviewId) => {
    const review = userReviews.find(r => r.id === reviewId);
    setSelectedBooking(review);
    setReviewRating(review.rating);
    setReviewText(review.comment);
    setShowReviewForm(true);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log('Submitting review:', { rating: reviewRating, comment: reviewText });
    alert('Thank you for your review!');
    setShowReviewForm(false);
    setReviewRating(0);
    setReviewText('');
  };

  const handleRateBooking = (booking) => {
    setSelectedBooking(booking);
    setReviewRating(0);
    setReviewText('');
    setShowReviewForm(true);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="profile-page">
      <div className="profile-container">
        

        {/* Main Profile Content */}
        <div className="profile-content-wrapper">
          
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div className="welcome-text">
              <h1>My Orders & Bookings</h1>
              <p>Welcome back, {user.name}! Here's an overview of your pet care journey with us 🐾</p>
            </div>
            <div className="pet-avatars">
              {user.pets.map(pet => (
                <div key={pet} className="pet-avatar">
                  <span>🐕</span>
                  <span className="pet-name">{pet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-number">{stats.upcoming}</div>
              <div className="stat-label">Upcoming</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-number">{stats.completed}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-number">{stats.orders}</div>
              <div className="stat-label">Orders</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-number">{stats.reviews}</div>
              <div className="stat-label">Reviews</div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="profile-tabs">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Bookings
            </button>
            <button 
              className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              Past Bookings
            </button>
            <button 
              className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Order History
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              My Reviews
            </button>
            <button 
              className={`tab-btn ${activeTab === 'community' ? 'active' : ''}`}
              onClick={() => setActiveTab('community')}
            >
              Community
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <div className="overview-grid">
                  <div className="upcoming-preview">
                    <div className="section-header">
                      <h2>📅 Upcoming Bookings</h2>
                      <button className="view-all" onClick={() => setActiveTab('upcoming')}>View All →</button>
                    </div>
                    {upcomingBookings.slice(0, 2).map(booking => (
                      <div key={booking.id} className="booking-card-preview">
                        <div className="booking-service-icon">📋</div>
                        <div className="booking-details">
                          <h3>{booking.service}</h3>
                          <p className="booking-pet">{booking.petName} ● {booking.petBreed}</p>
                          <p className="booking-datetime">{booking.date} ⏰ {booking.time}</p>
                          <span className="status-badge confirmed">{booking.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="recent-orders-preview">
                    <div className="section-header">
                      <h2>📦 Recent Orders</h2>
                      <button className="view-all" onClick={() => setActiveTab('orders')}>View All →</button>
                    </div>
                    {orderHistory.slice(0, 2).map(order => (
                      <div key={order.id} className="order-card-preview">
                        <div className="order-id">{order.id}</div>
                        <div className="order-date">{order.date}</div>
                        <div className="order-items">
                          {order.items.map((item, idx) => (
                            <span key={idx}>{item.name}{idx < order.items.length - 1 ? ', ' : ''}</span>
                          ))}
                        </div>
                        <div className="order-total">{order.total}</div>
                        <span className={`order-status ${order.deliveryStatus.toLowerCase()}`}>
                          {order.deliveryStatus}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="review-stats-preview">
                    <div className="section-header">
                      <h2>⭐ Your Review Stats</h2>
                      <button className="view-all" onClick={() => setActiveTab('reviews')}>View All →</button>
                    </div>
                    <div className="review-stats-content">
                      <div className="review-count-badge">
                        You've helped other pet parents with <strong>{userReviews.length} reviews!</strong>
                      </div>
                      {userReviews.slice(0, 2).map(review => (
                        <div key={review.id} className="review-preview-card">
                          <div className="review-header">
                            <span className="review-service">{review.service}</span>
                            <span className="review-rating">{'⭐'.repeat(review.rating)}</span>
                          </div>
                          <div className="review-pet">{review.petName} • {review.date}</div>
                          <p className="review-comment">"{review.comment.substring(0, 60)}..."</p>
                          <button className="edit-review-btn" onClick={() => handleEditReview(review.id)}>
                            Edit Review
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* UPCOMING BOOKINGS TAB */}
            {activeTab === 'upcoming' && (
              <div className="upcoming-tab">
                <div className="bookings-header">
                  <h2>📅 Upcoming Bookings</h2>
                  <p>You have {upcomingBookings.length} upcoming appointments</p>
                </div>
                
                <div className="bookings-grid-full">
                  {upcomingBookings.map(booking => (
                    <div key={booking.id} className="booking-card-full">
                      <div className="booking-image">
                        <div className="pet-placeholder">
                          {booking.petName.charAt(0)}
                        </div>
                      </div>
                      <div className="booking-content">
                        <div className="booking-service-header">
                          <h3>{booking.service}</h3>
                          <span className="status-badge confirmed">{booking.status}</span>
                        </div>
                        <div className="booking-pet-info">
                          <span className="pet-name">{booking.petName}</span>
                          <span className="pet-breed">● {booking.petBreed}</span>
                        </div>
                        <div className="booking-datetime">
                          <span className="date">{booking.date}</span>
                          <span className="time">⏰ {booking.time}</span>
                        </div>
                        <div className="booking-price">
                          <span className="price-label">Est.</span>
                          <span className="price-value">{booking.price}</span>
                        </div>
                        <p className="booking-note">{booking.note}</p>
                        <div className="booking-actions">
                          <button 
                            className="btn-reschedule"
                            onClick={() => handleReschedule(booking.id)}
                          >
                            Reschedule
                          </button>
                          <button 
                            className="btn-cancel"
                            onClick={() => handleCancel(booking.id)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAST BOOKINGS TAB */}
            {activeTab === 'past' && (
              <div className="past-tab">
                <div className="bookings-header">
                  <h2>✅ Past Bookings</h2>
                  <p>Your completed appointments</p>
                </div>
                
                <div className="past-bookings-list">
                  {pastBookings.map(booking => (
                    <div key={booking.id} className="past-booking-card">
                      <div className="past-booking-header">
                        <div className="past-booking-service">
                          <h3>{booking.service}</h3>
                          <span className="status-badge completed">{booking.status}</span>
                        </div>
                        <span className="booking-date">{booking.date}</span>
                      </div>
                      <div className="past-booking-details">
                        <div className="pet-info">
                          <span className="pet-name">{booking.petName}</span>
                          <span className="pet-breed">● {booking.petBreed}</span>
                        </div>
                        <div className="booking-price-paid">
                          <span className="price-label">Paid:</span>
                          <span className="price-value">{booking.price}</span>
                        </div>
                      </div>
                      <div className="past-booking-footer">
                        <div className="rating-display">
                          {'⭐'.repeat(booking.rating)}
                          <span className="rating-text">{booking.rating}.0 / 5.0</span>
                        </div>
                        <div className="past-booking-actions">
                          <button 
                            className="btn-book-again"
                            onClick={() => alert('Book again functionality coming soon!')}
                          >
                            Book Again
                          </button>
                          <button 
                            className="btn-leave-review"
                            onClick={() => handleRateBooking(booking)}
                          >
                            Leave Review
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="orders-tab">
                <div className="orders-header">
                  <h2>📦 Order History</h2>
                  <p>Your purchases from our shop</p>
                </div>
                
                <div className="orders-list">
                  {orderHistory.map(order => (
                    <div key={order.id} className="order-card-full">
                      <div className="order-header">
                        <div className="order-id-section">
                          <span className="order-id-label">Order #</span>
                          <span className="order-id-value">{order.id}</span>
                        </div>
                        <div className="order-date-full">{order.date}</div>
                        <span className={`order-status-badge ${order.deliveryStatus.toLowerCase()}`}>
                          {order.deliveryStatus}
                        </span>
                      </div>
                      <div className="order-items-list">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="order-item">
                            <span className="item-name">{item.name}</span>
                            <span className="item-quantity">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                      <div className="order-footer">
                        <div className="order-total-section">
                          <span className="total-label">Total:</span>
                          <span className="total-value">{order.total}</span>
                        </div>
                        <div className="order-payment-status">
                          <span className={`payment-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </div>
                        <button className="btn-view-details">
                          View Details →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MY REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="reviews-tab">
                <div className="reviews-header">
                  <h2>⭐ My Reviews</h2>
                  <p>You've written {userReviews.length} reviews</p>
                </div>
                
                {!showReviewForm ? (
                  <div className="my-reviews-list">
                    {userReviews.map(review => (
                      <div key={review.id} className="review-card-full">
                        <div className="review-card-header">
                          <div>
                            <h3>{review.service}</h3>
                            <div className="review-meta">
                              <span className="review-pet">{review.petName} • {review.petBreed}</span>
                              <span className="review-date">{review.date}</span>
                            </div>
                          </div>
                          <div className="review-rating-display">
                            {'⭐'.repeat(review.rating)}
                          </div>
                        </div>
                        <p className="review-comment-full">"{review.comment}"</p>
                        <div className="review-actions">
                          <button 
                            className="btn-edit-review"
                            onClick={() => handleEditReview(review.id)}
                          >
                            Edit Review
                          </button>
                          <button className="btn-delete-review">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="review-form-container">
                    <div className="review-form-header">
                      <h3>Leave a Review</h3>
                      <button 
                        className="btn-close-form"
                        onClick={() => setShowReviewForm(false)}
                      >
                        ✕
                      </button>
                    </div>
                    <p className="review-service-info">
                      How was your {selectedBooking?.service} experience?
                    </p>
                    
                    <form onSubmit={handleSubmitReview} className="review-form">
                      <div className="rating-selector">
                        <div className="stars-container">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`star ${star <= (hoverRating || reviewRating) ? 'active' : ''}`}
                              onClick={() => setReviewRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                            >
                              ⭐
                            </span>
                          ))}
                        </div>
                        <p className="rating-text">Click to rate</p>
                      </div>

                      <div className="form-group">
                        <label htmlFor="review">Your Review <span className="optional">(Optional)</span></label>
                        <textarea
                          id="review"
                          rows="5"
                          placeholder="Share your experience with us..."
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                        ></textarea>
                      </div>

                      <div className="form-actions">
                        <button type="submit" className="btn-submit-review">
                          Submit Review
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* COMMUNITY TAB */}
            {activeTab === 'community' && (
              <div className="community-tab">
                <div className="community-header">
                  <h2>Community Reviews</h2>
                  <p>See what other pet parents are saying</p>
                </div>
                
                <div className="community-stats-grid">
                  <div className="community-stat-card main">
                    <div className="average-rating-large">{communityStats.averageRating}</div>
                    <div className="rating-stars">
                      {'⭐'.repeat(5)}
                    </div>
                    <div className="rating-label">Average Rating</div>
                    <div className="review-count">{communityStats.totalReviews} reviews</div>
                  </div>
                  
                  <div className="community-stat-card">
                    <div className="stat-icon">⭐</div>
                    <div className="stat-number-large">{communityStats.fiveStarCount}</div>
                    <div className="stat-label">5-Star Reviews</div>
                    <div className="stat-sub">{communityStats.recommendedPercent}% recommended us</div>
                  </div>
                  
                  <div className="community-stat-card">
                    <div className="stat-icon">✓</div>
                    <div className="stat-number-large">{communityStats.verifiedCount}</div>
                    <div className="stat-label">Trusted Community</div>
                    <div className="stat-sub">Verified reviews only</div>
                  </div>
                </div>

                <div className="reviews-by-service">
                  <h3>Reviews by Service</h3>
                  <div className="service-filter">
                    {communityStats.reviewsByService.map((service, index) => (
                      <button 
                        key={index} 
                        className={`service-filter-btn ${index === 0 ? 'active' : ''}`}
                      >
                        {service.service} ({service.count})
                      </button>
                    ))}
                  </div>
                </div>

                <div className="all-community-reviews">
                  <h3>All Customer Reviews</h3>
                  {communityReviews.map(review => (
                    <div key={review.id} className="community-review-card">
                      <div className="community-review-header">
                        <div>
                          <span className="review-author">{review.author}</span>
                          <span className="review-service-tag">{review.service}</span>
                          <span className="review-pet-breed">• {review.petBreed}</span>
                        </div>
                        <span className="review-date">{review.date}</span>
                      </div>
                      <div className="community-review-rating">
                        {review.rating} / 5.0
                        <span className="rating-stars-small">{'⭐'.repeat(Math.floor(review.rating))}</span>
                      </div>
                      <p className="community-review-comment">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;