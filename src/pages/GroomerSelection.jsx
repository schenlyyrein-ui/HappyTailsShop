// components/GroomerSelection.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ProgressBar, Badge } from 'react-bootstrap';
import './GroomerSelection.css';

const GroomerSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(3);
  const steps = ['Information', 'Choose Service', 'Groomer', 'Schedule', 'Confirmation'];
  const [selectedGroomer, setSelectedGroomer] = useState(null);
  const [bookingData, setBookingData] = useState({});

  // Sample groomer data with availability - NOW WITH 6 GROOMERS
  const groomers = [
    {
      id: 1,
      name: "Sarah Martinez",
      specialty: "Small Breeds & Cats",
      experience: "5 years",
      rating: 4.9,
      image: "/src/assets/groomer1.jpg",
      availableTimes: ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"],
      unavailableDates: ["03/15/2025", "03/20/2025"],
      unavailableTimes: ["12:00 PM", "4:00 PM"],
      bio: "Specializes in gentle handling of anxious pets. Certified in cat grooming.",
      languages: ["English", "Spanish"]
    },
    {
      id: 2,
      name: "Michael Chen",
      specialty: "Large Breeds & Special Needs",
      experience: "8 years",
      rating: 4.8,
      image: "/src/assets/groomer2.jpg",
      availableTimes: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"],
      unavailableDates: ["03/16/2025", "03/17/2025"],
      unavailableTimes: ["3:00 PM", "4:00 PM"],
      bio: "Experienced with large breed dogs and special needs pets. Certified veterinary technician.",
      languages: ["English", "Mandarin"]
    },
    {
      id: 3,
      name: "Jessica Reyes",
      specialty: "Creative Grooming & Styling",
      experience: "6 years",
      rating: 4.9,
      image: "/src/assets/groomer3.jpg",
      availableTimes: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
      unavailableDates: ["03/18/2025"],
      unavailableTimes: ["9:00 AM"],
      bio: "Award-winning creative groomer specializing in unique styles and color treatments.",
      languages: ["English", "Tagalog"]
    },
    {
      id: 4,
      name: "David Park",
      specialty: "All Breeds & Puppy Training",
      experience: "4 years",
      rating: 4.7,
      image: "/src/assets/groomer4.jpg",
      availableTimes: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"],
      unavailableDates: ["03/19/2025"],
      unavailableTimes: ["4:00 PM"],
      bio: "Passionate about puppy first grooming experiences. Uses positive reinforcement techniques.",
      languages: ["English", "Korean"]
    },
    {
      id: 5,
      name: "Lisa Thompson",
      specialty: "Senior Pets & Medical Grooming",
      experience: "10 years",
      rating: 5.0,
      image: "/src/assets/groomer5.jpg",
      availableTimes: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"],
      unavailableDates: ["03/21/2025", "03/22/2025"],
      unavailableTimes: ["3:00 PM", "4:00 PM"],
      bio: "Specializes in grooming senior pets and those with medical conditions. Gentle, patient approach.",
      languages: ["English"]
    },
    {
      id: 6,
      name: "Maria Garcia",
      specialty: "Exotic Breeds & Styling",
      experience: "7 years",
      rating: 4.9,
      image: "/src/assets/groomer6.jpg",
      availableTimes: ["9:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
      unavailableDates: ["03/23/2025"],
      unavailableTimes: ["10:00 AM", "1:00 PM"],
      bio: "Expert in grooming exotic breeds and creative styling. Certified in therapeutic grooming techniques.",
      languages: ["English", "Spanish", "French"]
    }
  ];

  useEffect(() => {
    if (location.state) {
      setBookingData(location.state);
      if (location.state.selectedGroomer) {
        setSelectedGroomer(location.state.selectedGroomer);
      }
    }
  }, [location.state]);

  const handleStepClick = (stepNumber) => {
    switch(stepNumber) {
      case 1:
        navigate('/booking', { state: location.state });
        break;
      case 2:
        navigate('/choose-service', { state: location.state });
        break;
      case 3:
        setActiveStep(3);
        break;
      case 4:
        if (selectedGroomer) {
          navigate('/schedule', { 
            state: { 
              ...bookingData,
              selectedGroomer: selectedGroomer
            } 
          });
        }
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    navigate('/choose-service', { state: bookingData });
  };

  const handleSkip = () => {
    navigate('/schedule', { 
      state: { 
        ...bookingData,
        selectedGroomer: null
      } 
    });
  };

  const handleContinue = () => {
    navigate('/schedule', { 
      state: { 
        ...bookingData,
        selectedGroomer: selectedGroomer
      } 
    });
  };

  const handleSelectGroomer = (groomer) => {
    setSelectedGroomer(groomer);
  };

  // Render stars for rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };

  return (
    <div className="ht-groomer-selection">
      <Container className="ht-groomer-container">
        <Row className="ht-groomer-title-row">
          <Col>
            <h1 className="ht-groomer-main-title">Choose Your Groomer</h1>
            <p className="ht-groomer-subtitle">
              Select a groomer for your pet's appointment. You can also skip this step and we'll assign one for you.
            </p>
          </Col>
        </Row>

        <Row className="ht-groomer-progress-row">
          <Col>
            <div className="ht-groomer-progress-steps">
              <ProgressBar now={60} className="ht-groomer-progress-bar" />
              <div className="ht-groomer-step-indicators">
                {steps.map((step, index) => {
                  const stepNumber = index + 1;
                  const isClickable = stepNumber <= 3;
                  
                  return (
                    <div 
                      key={index} 
                      className={`ht-groomer-step ${stepNumber === activeStep ? 'ht-groomer-step-active' : ''} ${isClickable ? 'ht-groomer-step-clickable' : ''}`}
                      onClick={() => isClickable && handleStepClick(stepNumber)}
                    >
                      <div className="ht-groomer-step-circle">
                        <span>{stepNumber}</span>
                      </div>
                      <span className="ht-groomer-step-label">{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>

        <Row className="ht-groomer-content-row">
          <Col lg={10} className="mx-auto">
            <Card className="ht-groomer-card">
              <Card.Body>
                {/* Pet Summary */}
                <div className="ht-groomer-pet-summary">
                  <h3>Services for: {bookingData.currentPet?.name || 'Your Pet'}</h3>
                  <p>
                    <strong>{bookingData.currentPet?.type} - {bookingData.currentPet?.size}</strong>
                  </p>
                </div>

                {/* Groomers Grid - 2 columns on large screens */}
                <div className="ht-groomer-grid">
                  {groomers.map((groomer) => {
                    const isSelected = selectedGroomer?.id === groomer.id;
                    
                    return (
                      <div 
                        key={groomer.id} 
                        className={`ht-groomer-card-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSelectGroomer(groomer)}
                      >
                        <div className="ht-groomer-image-container">
                          <img 
                            src={groomer.image} 
                            alt={groomer.name}
                            className="ht-groomer-image"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/150x150/fff2fa/f53799?text=Groomer";
                            }}
                          />
                        </div>
                        
                        <div className="ht-groomer-info">
                          <h3 className="ht-groomer-name">{groomer.name}</h3>
                          
                          <div className="ht-groomer-rating">
                            {renderRating(groomer.rating)}
                            <span className="ht-groomer-rating-value">{groomer.rating}</span>
                          </div>
                          
                          <p className="ht-groomer-specialty">{groomer.specialty}</p>
                          
                          <div className="ht-groomer-details">
                            <span className="ht-groomer-experience">
                              <i className="fas fa-briefcase"></i> {groomer.experience}
                            </span>
                          </div>
                          
                          <p className="ht-groomer-bio">{groomer.bio}</p>
                          
                          <div className="ht-groomer-languages">
                            {groomer.languages.map((lang, idx) => (
                              <Badge key={idx} className="ht-groomer-language-badge">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {isSelected && (
                          <div className="ht-groomer-selected-check">
                            <i className="fas fa-check-circle"></i>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons - FIXED WIDTHS */}
                <div className="ht-groomer-actions">
                  <Button 
                    variant="outline-secondary" 
                    onClick={handleBack}
                    className="ht-groomer-back-btn"
                  >
                    Back
                  </Button>
                  
                  <div className="ht-groomer-right-actions">
                    <Button 
                      variant="outline-primary" 
                      onClick={handleSkip}
                      className="ht-groomer-skip-btn"
                    >
                      Skip (Assign Later)
                    </Button>
                    
                    <Button 
                      variant="primary" 
                      onClick={handleContinue}
                      className="ht-groomer-continue-btn"
                      disabled={!selectedGroomer}
                    >
                      Continue to Schedule
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GroomerSelection;