import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SidebarProfile from '../components/SidebarProfile';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedServiceFilter, setSelectedServiceFilter] = useState('All Services');
  
  // Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Appointment Tomorrow!',
      message: "Bella's grooming appointment is tomorrow at 10:00 AM",
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Booking Confirmed',
      message: 'Your Pet Café reservation for Dec 25 has been confirmed',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      title: 'Rate Your Experience',
      message: "How was Max's birthday party? Leave a review!",
      time: '3 days ago',
      read: false
    },
    {
      id: 4,
      title: 'Order Completed',
      message: 'We delivered your order on 2024-01-01',
      time: '5 days ago',
      read: true
    }
  ]);

  // User data
  const user = {
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+63 912 345 6789',
    memberSince: '2023',
    avatar: '/src/assets/user-avatar.jpg',
    petCount: 3,
    pets: [
      { name: 'Bella', type: 'Golden Retriever' },
      { name: 'Max', type: 'Shih Tzu' },
      { name: 'Luna', type: 'Persian Cat' }
    ]
  };

  // Stats data
  const stats = {
    upcoming: 3,
    completed: 12,
    orders: 8,
    reviews: 5,
    averageRating: 4.7,
    totalReviews: 10,
    fiveStarCount: 7,
    fourStarCount: 2,
    threeStarCount: 1,
    twoStarCount: 0,
    oneStarCount: 0,
    recommendedPercent: 70,
    verifiedCount: 7
  };

  // Upcoming bookings
  const [upcomingBookings, setUpcomingBookings] = useState([
    {
      id: 1,
      service: 'Full Grooming Package',
      serviceType: 'grooming',
      petName: 'Bella',
      petBreed: 'Golden Retriever',
      date: 'Dec 20, 2024',
      time: '10:00 AM',
      status: 'Confirmed',
      price: '₱850 - ₱1,200',
      note: '*Price may vary depending on pet size/condition'
    },
    {
      id: 2,
      service: 'Pet Boarding',
      serviceType: 'boarding',
      petName: 'Max',
      petBreed: 'Shih Tzu',
      date: 'Dec 22, 2024',
      time: '9:00 AM',
      status: 'Confirmed',
      price: '₱500/night',
      note: '* Price may vary depending on pet size/condition'
    },
    {
      id: 3,
      service: 'Pet Café Reservation',
      serviceType: 'petcafe',
      petName: 'Luna',
      petBreed: 'Persian Cat',
      date: 'Dec 25, 2024',
      time: '2:00 PM',
      status: 'Confirmed',
      price: '₱299 entry',
      note: '* Price may vary depending on pet size/condition'
    }
  ]);

  // Past bookings
  const [pastBookings, setPastBookings] = useState([
    {
      id: 4,
      service: 'Full Grooming Package',
      serviceType: 'grooming',
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
      serviceType: 'bdaypawty',
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
      serviceType: 'petcafe',
      petName: 'Luna',
      petBreed: 'Persian Cat',
      date: 'Nov 20, 2024',
      time: '3:00 PM',
      status: 'Completed',
      price: '₱299',
      rating: 4,
      reviewed: true
    }
  ]);

  // Order history
  const [orderHistory, setOrderHistory] = useState([
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
  ]);

  // User reviews
  const [userReviews, setUserReviews] = useState([
    {
      id: 1,
      service: 'Full Grooming Package',
      petName: 'Bella',
      petBreed: 'Golden Retriever',
      date: 'Dec 5, 2024',
      rating: 5,
      comment: 'Amazing service! Bella came out looking like a superstar. The groomers were so gentle and patient with her.'
    },
    {
      id: 2,
      service: 'Pet Café Visit',
      petName: 'Luna',
      petBreed: 'Persian Cat',
      date: 'Nov 20, 2024',
      rating: 5,
      comment: 'Great atmosphere and the staff was very welcoming. Luna loved the cat-friendly treats!'
    }
  ]);

  // Community reviews stats
  const communityStats = {
    averageRating: 4.7,
    totalReviews: 10,
    fiveStarCount: 7,
    fourStarCount: 2,
    threeStarCount: 1,
    twoStarCount: 0,
    oneStarCount: 0,
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
  const [communityReviews, setCommunityReviews] = useState([
    {
      id: 1,
      author: 'Maria M.',
      service: 'Full Grooming Package',
      petBreed: 'Golden Retriever',
      date: 'Dec 15, 2024',
      rating: 5.0,
      comment: 'Excellent service! Very professional and caring staff.',
      helpful: 12
    },
    {
      id: 2,
      author: 'John D.',
      service: 'Pet Boarding',
      petBreed: 'Labrador',
      date: 'Dec 12, 2024',
      rating: 4.5,
      comment: 'Great facility, my dog was well taken care of.',
      helpful: 8
    }
  ]);

  // Navigation functions
  const handleReschedule = (bookingId) => {
    const booking = upcomingBookings.find(b => b.id === bookingId);
    
    switch(booking.serviceType) {
      case 'grooming':
        navigate('/booking', { state: { service: 'grooming', booking } });
        break;
      case 'boarding':
        navigate('/boarding/book', { state: { booking } });
        break;
      case 'petcafe':
        navigate('/petcafe/reservation', { state: { booking } });
        break;
      default:
        navigate('/booking', { state: { booking } });
    }
  };

  const handleCancel = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setUpcomingBookings(upcomingBookings.filter(b => b.id !== bookingId));
      alert('Booking cancelled successfully!');
    }
  };

  const handleBookAgain = (pastBooking) => {
    switch(pastBooking.serviceType) {
      case 'grooming':
        navigate('/booking', { state: { service: 'grooming', petName: pastBooking.petName } });
        break;
      case 'boarding':
        navigate('/boarding/book', { state: { petName: pastBooking.petName } });
        break;
      case 'bdaypawty':
        navigate('/bookpawty', { state: { petName: pastBooking.petName } });
        break;
      case 'petcafe':
        navigate('/petcafe/reservation', { state: { petName: pastBooking.petName } });
        break;
      default:
        navigate('/booking');
    }
  };

  const handleLeaveReview = (booking) => {
    setSelectedBooking(booking);
    setReviewRating(0);
    setReviewText('');
    setEditingReviewId(null);
    setShowReviewForm(true);
  };

  const handleEditReview = (reviewId) => {
    const review = userReviews.find(r => r.id === reviewId);
    setSelectedBooking(review);
    setReviewRating(review.rating);
    setReviewText(review.comment);
    setEditingReviewId(reviewId);
    setShowReviewForm(true);
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setUserReviews(userReviews.filter(r => r.id !== reviewId));
      alert('Review deleted successfully!');
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (reviewRating === 0) {
      alert('Please select a rating!');
      return;
    }

    if (editingReviewId) {
      setUserReviews(userReviews.map(review => 
        review.id === editingReviewId 
          ? { ...review, rating: reviewRating, comment: reviewText, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
          : review
      ));
      alert('Review updated successfully!');
    } else {
      const newReview = {
        id: userReviews.length + 3,
        service: selectedBooking.service,
        petName: selectedBooking.petName,
        petBreed: selectedBooking.petBreed,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        rating: reviewRating,
        comment: reviewText
      };
      setUserReviews([...userReviews, newReview]);
      
      setPastBookings(pastBookings.map(booking => 
        booking.id === selectedBooking.id 
          ? { ...booking, reviewed: true }
          : booking
      ));
      
      alert('Thank you for your review!');
    }
    
    setShowReviewForm(false);
    setReviewRating(0);
    setReviewText('');
    setEditingReviewId(null);
  };

  const handleViewOrderDetails = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const handleReorder = (order) => {
    navigate('/checkout', { state: { items: order.items } });
  };

  const handleViewServiceDetails = (booking) => {
    switch(booking.serviceType) {
      case 'grooming':
        navigate('/grooming');
        break;
      case 'boarding':
        navigate('/boarding');
        break;
      case 'bdaypawty':
        navigate('/bdaypawty');
        break;
      case 'petcafe':
        navigate('/petcafe');
        break;
      default:
        navigate('/services');
    }
  };

  const handleHelpful = (reviewId) => {
    setCommunityReviews(communityReviews.map(review =>
      review.id === reviewId
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
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

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  return (
    <div className="profile-page">
      {/* Main Content with Sidebar */}
      <div className="profile-main-layout">
        {/* Sidebar */}
        <SidebarProfile 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          user={user}
          unreadCount={unreadCount}
          onLogout={handleLogout}
        />

        {/* Content Area */}
        <div className="profile-content-wrapper">
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div className="welcome-content">
              <div>
                <h1 className="welcome-title">My Pet Care Journey</h1>
                <p className="welcome-subtitle">Welcome back, {user.name}! Here's what's happening with your furry friends</p>
              </div>
              <div className="pet-tags">
                {user.pets.map(pet => (
                  <span key={pet.name} className="pet-tag">
                    {pet.name} · {pet.type}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="profile-content-area">
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{stats.upcoming}</div>
                <div className="stat-label">Upcoming</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.completed}</div>
                <div className="stat-label">Completed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.orders}</div>
                <div className="stat-label">Orders</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.reviews}</div>
                <div className="stat-label">Reviews</div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="tab-navigation">
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
                Upcoming
                {upcomingBookings.length > 0 && (
                  <span className="tab-badge">{upcomingBookings.length}</span>
                )}
              </button>
              <button 
                className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
                onClick={() => setActiveTab('past')}
              >
                Past
              </button>
              <button 
                className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Orders
              </button>
              <button 
                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
                <span className="tab-badge">{userReviews.length}</span>
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
      {/* Next Upcoming Booking */}
      {upcomingBookings.length > 0 && (
        <div className="feature-card upcoming-main-card">
          <h3 className="feature-card-title">Next Upcoming</h3>
          <div className="next-booking">
            <div className="next-booking-service">{upcomingBookings[0].service}</div>
            <div className="next-booking-pet">{upcomingBookings[0].petName} · {upcomingBookings[0].petBreed}</div>
            <div className="next-booking-time">{upcomingBookings[0].date} at {upcomingBookings[0].time}</div>
            <div className="next-booking-actions">
              <button className="btn-secondary" onClick={() => handleViewServiceDetails(upcomingBookings[0])}>
                View Details
              </button>
              <button className="btn-primary" onClick={() => handleReschedule(upcomingBookings[0].id)}>
                Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="feature-card activity-main-card">
        <h3 className="feature-card-title">Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-dot"></div>
            <div className="activity-content">
              <div className="activity-text">Completed grooming for Bella</div>
              <div className="activity-time">2 days ago</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-dot"></div>
            <div className="activity-content">
              <div className="activity-text">Order ORD-2024-003 is processing</div>
              <div className="activity-time">3 days ago</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-dot"></div>
            <div className="activity-content">
              <div className="activity-text">You left a review for Pet Café</div>
              <div className="activity-time">5 days ago</div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Preview */}
      <div className="feature-card upcoming-preview-card">
        <div className="card-header">
          <h3 className="feature-card-title">Upcoming</h3>
          <button className="view-link" onClick={() => setActiveTab('upcoming')}>View all</button>
        </div>
        <div className="preview-items">
          {upcomingBookings.slice(0, 2).map(booking => (
            <div key={booking.id} className="preview-item">
              <div className="preview-info">
                <div className="preview-title">{booking.service}</div>
                <div className="preview-subtitle">{booking.petName} · {booking.date}</div>
              </div>
              <span className="status confirmed">{booking.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="feature-card orders-preview-card">
        <div className="card-header">
          <h3 className="feature-card-title">Recent Orders</h3>
          <button className="view-link" onClick={() => setActiveTab('orders')}>View all</button>
        </div>
        <div className="preview-items">
          {orderHistory.slice(0, 2).map(order => (
            <div key={order.id} className="preview-item">
              <div className="preview-info">
                <div className="preview-title">{order.id}</div>
                <div className="preview-subtitle">{order.items.length} items · {order.date}</div>
              </div>
              <span className={`status ${order.deliveryStatus.toLowerCase()}`}>
                {order.deliveryStatus}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}
    

              {/* UPCOMING TAB */}
              {activeTab === 'upcoming' && (
                <div className="upcoming-tab">
                  <h2 className="section-title">Upcoming Bookings</h2>
                  <p className="section-subtitle">You have {upcomingBookings.length} upcoming appointment{upcomingBookings.length !== 1 ? 's' : ''}</p>
                  
                  {upcomingBookings.length > 0 ? (
                    <div className="bookings-list">
                      {upcomingBookings.map(booking => (
                        <div key={booking.id} className="booking-card">
                          <div className="booking-header">
                            <div>
                              <h3>{booking.service}</h3>
                              <div className="booking-pet-info">
                                <span className="pet-name">{booking.petName}</span>
                                <span className="pet-breed">{booking.petBreed}</span>
                              </div>
                            </div>
                            <span className="status-badge confirmed">{booking.status}</span>
                          </div>
                          
                          <div className="booking-datetime">
                            <div className="datetime-row">
                              <span className="datetime-label">Date</span>
                              <span className="datetime-value">{booking.date}</span>
                            </div>
                            <div className="datetime-row">
                              <span className="datetime-label">Time</span>
                              <span className="datetime-value">{booking.time}</span>
                            </div>
                          </div>
                          
                          <div className="booking-price">
                            <span className="price-label">Estimated Price</span>
                            <span className="price-value">{booking.price}</span>
                          </div>
                          
                          {booking.note && (
                            <p className="booking-note">{booking.note}</p>
                          )}
                          
                          <div className="booking-actions">
                            <button className="btn-secondary" onClick={() => handleReschedule(booking.id)}>
                              Reschedule
                            </button>
                            <button className="btn-outline" onClick={() => handleCancel(booking.id)}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <h3>No Upcoming Bookings</h3>
                      <p>Ready to pamper your pet? Book a service now!</p>
                      <button className="btn-primary" onClick={() => navigate('/services')}>
                        Browse Services
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* PAST TAB */}
              {activeTab === 'past' && (
                <div className="past-tab">
                  <h2 className="section-title">Past Bookings</h2>
                  <p className="section-subtitle">Your completed appointments</p>
                  
                  {pastBookings.length > 0 ? (
                    <div className="bookings-list">
                      {pastBookings.map(booking => (
                        <div key={booking.id} className="booking-card past">
                          <div className="booking-header">
                            <div>
                              <h3>{booking.service}</h3>
                              <div className="booking-pet-info">
                                <span className="pet-name">{booking.petName}</span>
                                <span className="pet-breed">{booking.petBreed}</span>
                              </div>
                            </div>
                            <span className="status-badge completed">Completed</span>
                          </div>
                          
                          <div className="booking-datetime">
                            <div className="datetime-row">
                              <span className="datetime-label">Date</span>
                              <span className="datetime-value">{booking.date}</span>
                            </div>
                          </div>
                          
                          <div className="booking-price">
                            <span className="price-label">Paid</span>
                            <span className="price-value">{booking.price}</span>
                          </div>
                          
                          {booking.rating && (
                            <div className="rating-display">
                              <span className="rating-stars">{'★'.repeat(booking.rating)}</span>
                              <span className="rating-text">{booking.rating}.0/5.0</span>
                            </div>
                          )}
                          
                          <div className="booking-actions">
                            <button className="btn-secondary" onClick={() => handleBookAgain(booking)}>
                              Book Again
                            </button>
                            {!booking.reviewed && (
                              <button className="btn-outline" onClick={() => handleLeaveReview(booking)}>
                                Leave Review
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <h3>No Past Bookings</h3>
                      <p>Your completed appointments will appear here</p>
                    </div>
                  )}
                </div>
              )}

              {/* ORDERS TAB */}
              {activeTab === 'orders' && (
                <div className="orders-tab">
                  <h2 className="section-title">Order History</h2>
                  <p className="section-subtitle">Your purchases from our shop</p>
                  
                  {orderHistory.length > 0 ? (
                    <div className="orders-list">
                      {orderHistory.map(order => (
                        <div key={order.id} className="order-card">
                          <div className="order-header">
                            <div className="order-id">Order #{order.id}</div>
                            <div className="order-date">{order.date}</div>
                            <span className={`order-status ${order.deliveryStatus.toLowerCase()}`}>
                              {order.deliveryStatus}
                            </span>
                          </div>
                          
                          <div className="order-items">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="order-item">
                                <span>{item.name}</span>
                                <span className="item-quantity">x{item.quantity}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="order-total">
                            <span>Total</span>
                            <span className="total-amount">{order.total}</span>
                          </div>
                          
                          <div className="order-actions">
                            <button className="btn-secondary" onClick={() => handleReorder(order)}>
                              Reorder
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <h3>No Orders Yet</h3>
                      <p>Visit our shop to find great products for your pets!</p>
                      <button className="btn-primary" onClick={() => navigate('/shop')}>
                        Shop Now
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* REVIEWS TAB */}
              {activeTab === 'reviews' && (
                <div className="reviews-tab">
                  <h2 className="section-title">My Reviews</h2>
                  <p className="section-subtitle">You've written {userReviews.length} review{userReviews.length !== 1 ? 's' : ''}</p>
                  
                  {!showReviewForm ? (
                    userReviews.length > 0 ? (
                      <div className="reviews-list">
                        {userReviews.map(review => (
                          <div key={review.id} className="review-card">
                            <div className="review-header">
                              <div>
                                <h3>{review.service}</h3>
                                <div className="review-meta">
                                  <span>{review.petName} · {review.petBreed}</span>
                                  <span className="review-date">{review.date}</span>
                                </div>
                              </div>
                              <div className="review-rating">
                                <span className="rating-stars">{'★'.repeat(review.rating)}</span>
                                <span className="rating-number">{review.rating}.0</span>
                              </div>
                            </div>
                            <p className="review-comment">"{review.comment}"</p>
                            <div className="review-actions">
                              <button className="btn-outline" onClick={() => handleEditReview(review.id)}>
                                Edit
                              </button>
                              <button className="btn-outline-danger" onClick={() => handleDeleteReview(review.id)}>
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <h3>No Reviews Yet</h3>
                        <p>Share your experience with the community!</p>
                      </div>
                    )
                  ) : (
                    <div className="review-form">
                      <div className="review-form-header">
                        <h3>{editingReviewId ? 'Edit Review' : 'Write a Review'}</h3>
                        <button className="close-btn" onClick={() => {
                          setShowReviewForm(false);
                          setEditingReviewId(null);
                        }}>×</button>
                      </div>
                      
                      <p className="review-service-info">
                        How was your {selectedBooking?.service} experience?
                      </p>
                      
                      <form onSubmit={handleSubmitReview}>
                        <div className="rating-selector">
                          <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`star ${star <= (hoverRating || reviewRating) ? 'active' : ''}`}
                                onClick={() => setReviewRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <p className="rating-hint">Click to rate</p>
                        </div>

                        <div className="form-group">
                          <label htmlFor="review">Your Review</label>
                          <textarea
                            id="review"
                            rows="4"
                            placeholder="Share your experience..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                          />
                        </div>

                        <div className="form-actions">
                          <button type="submit" className="btn-primary btn-full">
                            {editingReviewId ? 'Update' : 'Submit'} Review
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
                  <h2 className="section-title">Community Reviews</h2>
                  <p className="section-subtitle">See what other pet parents are saying</p>
                  
                  <div className="community-stats">
                    <div className="stat-card highlight">
                      <div className="stat-large">{communityStats.averageRating}</div>
                      <div className="stat-stars">★★★★★</div>
                      <div className="stat-label">Average Rating</div>
                      <div className="stat-count">{communityStats.totalReviews} reviews</div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-value">{communityStats.fiveStarCount}</div>
                      <div className="stat-label">5-Star Reviews</div>
                      <div className="stat-note">{communityStats.recommendedPercent}% recommend</div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-value">{communityStats.verifiedCount}</div>
                      <div className="stat-label">Verified Reviews</div>
                      <div className="stat-note">From real customers</div>
                    </div>
                  </div>

                  <div className="rating-breakdown">
                    <h3>Rating Breakdown</h3>
                    <div className="rating-bars">
                      {[5, 4, 3].map(stars => {
                        const count = stars === 5 ? communityStats.fiveStarCount : 
                                     stars === 4 ? communityStats.fourStarCount : 
                                     communityStats.threeStarCount;
                        const percentage = (count / communityStats.totalReviews) * 100;
                        
                        return (
                          <div key={stars} className="rating-bar-item">
                            <span className="bar-label">{stars} stars</span>
                            <div className="bar-container">
                              <div className="bar-fill" style={{ width: `${percentage}%` }} />
                            </div>
                            <span className="bar-count">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="reviews-by-service">
                    <h3>Reviews by Service</h3>
                    <div className="service-filters">
                      {communityStats.reviewsByService.map((service, index) => (
                        <button 
                          key={index} 
                          className={`service-filter ${selectedServiceFilter === service.service ? 'active' : ''}`}
                          onClick={() => setSelectedServiceFilter(service.service)}
                        >
                          {service.service} ({service.count})
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="all-reviews">
                    <h3>All Reviews</h3>
                    {communityReviews
                      .filter(review => selectedServiceFilter === 'All Services' || review.service === selectedServiceFilter)
                      .map(review => (
                        <div key={review.id} className="community-review">
                          <div className="review-header">
                            <div>
                              <span className="review-author">{review.author}</span>
                              <span className="review-service-badge">{review.service}</span>
                              <span className="review-pet">{review.petBreed}</span>
                            </div>
                            <span className="review-date">{review.date}</span>
                          </div>
                          <div className="review-rating">
                            <span className="rating-stars">{'★'.repeat(Math.floor(review.rating))}</span>
                            <span className="rating-number">{review.rating}</span>
                          </div>
                          <p className="review-comment">"{review.comment}"</p>
                          <div className="review-helpful">
                            <button className="helpful-btn" onClick={() => handleHelpful(review.id)}>
                              Helpful ({review.helpful})
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;