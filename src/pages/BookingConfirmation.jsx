import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(4);
  const steps = ['Information', 'Choose Service', 'Schedule', 'Confirmation'];
  
  const [bookingData, setBookingData] = useState({
    pet: null,
    services: [],
    schedule: null,
    contact: null,
    totalPrice: 0
  });

  useEffect(() => {
    if (location.state) {
      const { selectedPets, selectedServices, schedule, petCount } = location.state;
      
      // Get the first selected pet
      const selectedPet = selectedPets?.[0] || null;
      
      // Format services based on selections
      const { formattedServices, totalPrice } = formatServicesWithPrices(selectedServices, selectedPet);
      
      // Get contact info from pet data
      const contact = selectedPet ? selectedPet.parentPhone : '';

      setBookingData({
        pet: selectedPet,
        services: formattedServices,
        schedule: schedule,
        contact: contact,
        totalPrice: totalPrice
      });
    }
  }, [location.state]);

  const getPriceData = (type, size) => {
    const priceData = {
      Cat: {
        Small: {
          fullGrooming: 499,
          alaCarte: {
            bath: 200,
            nail: 80,
            facePaw: 150,
            dematting: 250,
            doggySpa: 250,
            hairColor: 100
          }
        },
        Medium: {
          fullGrooming: 599,
          alaCarte: {
            bath: 250,
            nail: 100,
            facePaw: 150,
            dematting: 250,
            doggySpa: 250,
            hairColor: 120
          }
        },
        Large: {
          fullGrooming: 849,
          alaCarte: {
            bath: 300,
            nail: 120,
            facePaw: 200,
            dematting: 350,
            doggySpa: 350,
            hairColor: 150
          }
        },
        ExtraLarge: {
          fullGrooming: 1049,
          alaCarte: {
            bath: 350,
            nail: 150,
            facePaw: 200,
            dematting: 450,
            doggySpa: 380,
            hairColor: 180
          }
        }
      },
      Dog: {
        Small: {
          premium: 499,
          deluxe: 359,
          alaCarte: {
            bath: 200,
            nail: 80,
            facePaw: 150,
            dematting: 250,
            doggySpa: 250,
            hairColor: 100
          }
        },
        Medium: {
          premium: 599,
          deluxe: 409,
          alaCarte: {
            bath: 250,
            nail: 100,
            facePaw: 150,
            dematting: 250,
            doggySpa: 250,
            hairColor: 120
          }
        },
        Large: {
          premium: 849,
          deluxe: 709,
          alaCarte: {
            bath: 300,
            nail: 120,
            facePaw: 200,
            dematting: 350,
            doggySpa: 350,
            hairColor: 150
          }
        },
        ExtraLarge: {
          premium: 1049,
          deluxe: 949,
          alaCarte: {
            bath: 350,
            nail: 150,
            facePaw: 200,
            dematting: 450,
            doggySpa: 380,
            hairColor: 180
          }
        }
      }
    };
    
    return priceData[type]?.[size] || null;
  };

  const formatServicesWithPrices = (selectedServices, pet) => {
    const services = [];
    let totalPrice = 0;
    const priceData = getPriceData(pet?.type, pet?.size);
    
    if (!selectedServices || !pet || !priceData) return { formattedServices: services, totalPrice };

    // Check if grooming is selected
    const hasGroomingSelected = 
      (pet.type === 'Cat' && selectedServices.fullGrooming === true) ||
      (pet.type === 'Dog' && selectedServices.groomingType);

    // Add main grooming service ONLY if selected
    if (hasGroomingSelected) {
      if (pet.type === 'Cat') {
        const price = priceData.fullGrooming || 0;
        services.push({
          name: 'Full Grooming',
          variant: 'Premium',
          price: price,
          displayPrice: `₱ ${price}`
        });
        totalPrice += price;
      } else if (pet.type === 'Dog') {
        const groomingType = selectedServices.groomingType === 'premium' ? 'Premium' : 'Deluxe';
        const price = priceData[selectedServices.groomingType] || 0;
        services.push({
          name: 'Full Grooming',
          variant: groomingType,
          price: price,
          displayPrice: `₱ ${price}`
        });
        totalPrice += price;
        
        // Add haircut style if selected
        if (selectedServices.haircut) {
          services.push({
            name: 'Haircut Style',
            variant: selectedServices.haircut,
            price: 0,
            displayPrice: 'Included'
          });
        }
      }
    }

    // Add ala carte services
    if (selectedServices.alaCarte) {
      selectedServices.alaCarte.forEach(service => {
        switch(service) {
          case 'bath':
            const bathPrice = priceData.alaCarte?.bath || 0;
            services.push({
              name: 'Bath & blowdry',
              price: bathPrice,
              displayPrice: `₱ ${bathPrice}`
            });
            totalPrice += bathPrice;
            break;
          case 'nail':
            const nailPrice = priceData.alaCarte?.nail || 0;
            services.push({
              name: 'Nail clip with nail file',
              price: nailPrice,
              displayPrice: `₱ ${nailPrice}`
            });
            totalPrice += nailPrice;
            break;
          case 'facePaw':
            const facePawPrice = priceData.alaCarte?.facePaw || 0;
            const facePawText = selectedServices.facePawChoice || 'Face/Paw trim';
            services.push({
              name: `Face/Paw trim - ${facePawText}`,
              price: facePawPrice,
              displayPrice: `₱ ${facePawPrice}`
            });
            totalPrice += facePawPrice;
            break;
          case 'dematting':
            const demattingPrice = priceData.alaCarte?.dematting || 0;
            services.push({
              name: 'Dematting',
              price: demattingPrice,
              displayPrice: `₱ ${demattingPrice}`
            });
            totalPrice += demattingPrice;
            break;
          case 'doggySpa':
            const doggySpaPrice = priceData.alaCarte?.doggySpa || 0;
            const scent = selectedServices.doggySpaScent ? `(${selectedServices.doggySpaScent})` : '';
            services.push({
              name: `Doggy spa ${scent}`,
              price: doggySpaPrice,
              displayPrice: `₱ ${doggySpaPrice}`
            });
            totalPrice += doggySpaPrice;
            break;
          case 'hairColor':
            const hairColorPrice = priceData.alaCarte?.hairColor || 0;
            const colorOption = selectedServices.petHairColor || 'Color';
            services.push({
              name: `Pet hair color - ${colorOption}`,
              price: hairColorPrice,
              displayPrice: `₱ ${hairColorPrice}`
            });
            totalPrice += hairColorPrice;
            break;
        }
      });
    }

    return { formattedServices: services, totalPrice };
  };

  const handleStepClick = (stepNumber) => {
    console.log('Step clicked:', stepNumber);
    
    switch(stepNumber) {
      case 1:
        navigate('/booking', { state: location.state });
        break;
      case 2:
        navigate('/choose-service', { state: location.state });
        break;
      case 3:
        navigate('/schedule', { state: location.state });
        break;
      case 4:
        setActiveStep(4);
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    navigate('/schedule', { state: location.state });
  };

  const handleConfirmBooking = (e) => {
    if (e) {
      e.preventDefault();
    }
    
    console.log('Confirming booking:', bookingData);
    
    // Navigate to appointment confirmed page
    navigate('/appointment-confirmed', { 
      state: { bookingData: bookingData } 
    });
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    
    try {
      // Check if it's already formatted
      if (dateString.includes('-')) {
        // Already in MM/DD/YYYY - HH:MM AM/PM format
        return dateString;
      }
      
      // Try to parse if it's a Date object or ISO string
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      
      // Format as MM/DD/YYYY
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      
      // Get time from schedule if available
      const time = location.state?.schedule?.time || '';
      
      return `${formattedDate} - ${time}`;
    } catch (error) {
      return dateString;
    }
  };

  const formatDateShort = (dateString) => {
    if (!dateString) return '';
    
    try {
      if (dateString.includes('-')) {
        // Extract date part (before the dash)
        return dateString.split(' - ')[0];
      }
      
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="ht-booking-confirmation">
      <Container className="ht-confirmation-container">
        <Row className="ht-confirmation-title-row">
          <Col>
            <h1 className="ht-confirmation-main-title">Review Your Booking</h1>
            <p className="ht-confirmation-subtitle">
              Please confirm the details below.
            </p>
          </Col>
        </Row>

        <Row className="ht-confirmation-progress-row">
          <Col>
            <div className="ht-confirmation-progress-steps">
              <ProgressBar now={100} className="ht-confirmation-progress-bar" />
              <div className="ht-confirmation-step-indicators">
                {steps.map((step, index) => {
                  const stepNumber = index + 1;
                  const isClickable = stepNumber <= 4;
                  
                  return (
                    <div 
                      key={index} 
                      className={`ht-confirmation-step ${stepNumber === activeStep ? 'ht-confirmation-step-active' : ''} ${isClickable ? 'ht-confirmation-step-clickable' : ''}`}
                      onClick={() => isClickable && handleStepClick(stepNumber)}
                    >
                      <div className="ht-confirmation-step-circle">
                        <span>{stepNumber}</span>
                      </div>
                      <span className="ht-confirmation-step-label">{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>

        <Row className="ht-confirmation-content-row">
          <Col lg={10} xl={8} className="mx-auto">
            <Card className="ht-confirmation-card">
              <Card.Body className="ht-confirmation-card-body">
                
                <div className="ht-confirmation-header">
                  <h2 className="ht-confirmation-header-title">Booking Summary</h2>
                  <p className="ht-confirmation-header-subtitle">All your appointment details in one place</p>
                </div>

                <div className="ht-confirmation-summary-grid">
                  {/* Left Column - Booking Details */}
                  <div className="ht-confirmation-details-column">
                    <div className="ht-confirmation-detail-section">
                      <h3 className="ht-confirmation-detail-title">
                        <span className="ht-confirmation-detail-badge">Pet Info</span>
                      </h3>
                      <div className="ht-confirmation-detail-content">
                        <div className="ht-confirmation-detail-item">
                          <span className="ht-confirmation-detail-label">Name:</span>
                          <span className="ht-confirmation-detail-value">{bookingData.pet?.name || 'Not specified'}</span>
                        </div>
                        <div className="ht-confirmation-detail-item">
                          <span className="ht-confirmation-detail-label">Type:</span>
                          <span className="ht-confirmation-detail-value">{bookingData.pet?.type || 'Not specified'}</span>
                        </div>
                        <div className="ht-confirmation-detail-item">
                          <span className="ht-confirmation-detail-label">Size:</span>
                          <span className="ht-confirmation-detail-value">{bookingData.pet?.size || 'Not specified'}</span>
                        </div>
                        <div className="ht-confirmation-detail-item">
                          <span className="ht-confirmation-detail-label">Breed:</span>
                          <span className="ht-confirmation-detail-value">{bookingData.pet?.breed || 'Not specified'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ht-confirmation-detail-section">
                      <h3 className="ht-confirmation-detail-title">
                        <span className="ht-confirmation-detail-badge">Appointment</span>
                      </h3>
                      <div className="ht-confirmation-detail-content">
                        <div className="ht-confirmation-detail-item">
                          <span className="ht-confirmation-detail-label">Date:</span>
                          <span className="ht-confirmation-detail-value">
                            {bookingData.schedule ? formatDateShort(bookingData.schedule.date) : 'Not selected'}
                          </span>
                        </div>
                        <div className="ht-confirmation-detail-item">
                          <span className="ht-confirmation-detail-label">Time:</span>
                          <span className="ht-confirmation-detail-value">
                            {bookingData.schedule?.time || 'Not selected'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="ht-confirmation-detail-section">
                      <h3 className="ht-confirmation-detail-title">
                        <span className="ht-confirmation-detail-badge">Contact Info</span>
                      </h3>
                      <div className="ht-confirmation-detail-content">
                        <div className="ht-confirmation-detail-item">
                          <span className="ht-confirmation-detail-label">Phone:</span>
                          <span className="ht-confirmation-detail-value">{bookingData.contact || 'Not provided'}</span>
                        </div>
                        <div className="ht-confirmation-detail-item">
                          <span className="ht-confirmation-detail-label">Owner:</span>
                          <span className="ht-confirmation-detail-value">{bookingData.pet?.parentName || 'Not provided'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Services & Total */}
                  <div className="ht-confirmation-services-column">
                    <div className="ht-confirmation-services-section">
                      <h3 className="ht-confirmation-detail-title">
                        <span className="ht-confirmation-detail-badge">Services</span>
                      </h3>
                      <div className="ht-confirmation-services-list-compact">
                        {bookingData.services.map((service, index) => (
                          <div key={index} className="ht-confirmation-service-item-compact">
                            <div className="ht-confirmation-service-info">
                              <span className="ht-confirmation-service-name-compact">
                                {service.name}
                                {service.variant && service.variant !== 'Included' && (
                                  <span className="ht-confirmation-service-variant-compact">
                                    {' '}({service.variant})
                                  </span>
                                )}
                              </span>
                            </div>
                            <div className="ht-confirmation-service-price-compact">
                              {service.displayPrice}
                            </div>
                          </div>
                        ))}
                        
                        {bookingData.services.length === 0 && (
                          <p className="ht-confirmation-no-services">No services selected</p>
                        )}
                    </div>
                    </div>

                    <div className="ht-confirmation-total-section">
                      <div className="ht-confirmation-total-row ht-confirmation-final-total">
                        <span className="ht-confirmation-total-label">Total Price:</span>
                        <span className="ht-confirmation-total-price">₱ {bookingData.totalPrice}</span>
                      </div>
                      <div className="ht-confirmation-price-note">
                        *Final price may vary after grooming assessment
                      </div>
                    </div>
                  </div>
                </div>

            <div className="ht-confirmation-divider-main"></div>

<div className="ht-confirmation-reminders-section">
  <div className="ht-confirmation-reminders-header">
    <h3 className="ht-confirmation-reminders-title">Important Reminders</h3>
    <p className="ht-confirmation-reminders-description">
      Please review these important details about your booking:
    </p>
  </div>
  
  <div className="ht-confirmation-reminders-list">
    <div className="ht-confirmation-reminder-group">
      <h4 className="ht-confirmation-reminder-group-title">Confirmation & Communication</h4>
      <ul className="ht-confirmation-reminder-items">
        <li className="ht-confirmation-reminder-item">
          You will receive a confirmation call or message within 2 hours after booking.
        </li>
        <li className="ht-confirmation-reminder-item">
          Please ensure your phone is accessible for the confirmation call.
        </li>
      </ul>
    </div>

    <div className="ht-confirmation-reminder-group">
      <h4 className="ht-confirmation-reminder-group-title">Appointment Timing</h4>
      <ul className="ht-confirmation-reminder-items">
        <li className="ht-confirmation-reminder-item">
          Please arrive 10 minutes early for your appointment.
        </li>
        <li className="ht-confirmation-reminder-item">
          Arrivals 15 minutes late may be cancelled and treated as a walk-in appointment.
        </li>
        <li className="ht-confirmation-reminder-item">
          Free rescheduling is allowed up to 4 hours before the appointment time.
        </li>
      </ul>
    </div>

    <div className="ht-confirmation-reminder-group">
      <h4 className="ht-confirmation-reminder-group-title">Payment & Pricing</h4>
      <ul className="ht-confirmation-reminder-items">
        <li className="ht-confirmation-reminder-item">
          Payment is made after the grooming service is completed.
        </li>
        <li className="ht-confirmation-reminder-item">
          Prices shown are estimates and may change after grooming assessment.
        </li>
        <li className="ht-confirmation-reminder-item">
          Additional charges may apply for special conditions or extra services.
        </li>
      </ul>
    </div>
  </div>
</div>

                <div className="ht-confirmation-button-container">
                  <div className="ht-confirmation-buttons">
                    <Button 
                      variant="outline-secondary" 
                      onClick={handleBack}
                      className="ht-confirmation-back-btn"
                      type="button"
                    >
                      Back
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={handleConfirmBooking}
                      className="ht-confirmation-confirm-btn"
                      type="button"
                    >
                      Confirm Booking
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

export default BookingConfirmation;