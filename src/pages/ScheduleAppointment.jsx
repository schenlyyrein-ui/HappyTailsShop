import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ProgressBar, Alert } from 'react-bootstrap';
import './ScheduleAppointment.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ScheduleAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(3);
  const steps = ['Information', 'Choose Service', 'Schedule', 'Confirmation'];
  
  // State for user selections
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  
  // State for data from backend
  const [allTimeSlots, setAllTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Mock function to simulate API call
  const fetchTimeSlots = async (date) => {
    setIsLoading(true);
    setError(null);
    setSelectedTime('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const dateStr = date.toISOString().split('T')[0];
      
      // MOCK DATA - In real app, this would come from backend API
      const mockApiResponse = {
        date: dateStr,
        timeSlots: [
          { time: '09:00 AM', type: 'Morning', isAvailable: true },
          { time: '09:30 AM', type: 'Morning', isAvailable: true },
          { time: '10:00 AM', type: 'Morning', isAvailable: false },
          { time: '10:30 AM', type: 'Morning', isAvailable: true },
          { time: '11:00 AM', type: 'Morning', isAvailable: true },
          { time: '11:30 AM', type: 'Morning', isAvailable: true },
          { time: '01:00 PM', type: 'Afternoon', isAvailable: true },
          { time: '01:30 PM', type: 'Afternoon', isAvailable: true },
          { time: '02:00 PM', type: 'Afternoon', isAvailable: false },
          { time: '02:30 PM', type: 'Afternoon', isAvailable: true },
          { time: '03:00 PM', type: 'Afternoon', isAvailable: true },
          { time: '03:30 PM', type: 'Afternoon', isAvailable: false },
          { time: '04:00 PM', type: 'Afternoon', isAvailable: true },
          { time: '04:30 PM', type: 'Afternoon', isAvailable: true },
        ]
      };
      
      // Group by session type
      const morningSlots = mockApiResponse.timeSlots.filter(slot => slot.type === 'Morning');
      const afternoonSlots = mockApiResponse.timeSlots.filter(slot => slot.type === 'Afternoon');
      
      setAllTimeSlots([
        { type: 'Morning', slots: morningSlots },
        { type: 'Afternoon', slots: afternoonSlots }
      ]);
      
    } catch (err) {
      setError('Failed to load time slots. Please try again.');
      console.error('Error fetching slots:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch time slots when date changes
  useEffect(() => {
    fetchTimeSlots(selectedDate);
  }, [selectedDate]);

  // Disable weekends and past dates
  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const day = date.getDay();
      
      // Disable weekends (0 = Sunday, 6 = Saturday)
      // Disable past dates
      return (day === 0 || day === 6) || date < today;
    }
    return false;
  };

  // Custom tile class for styling
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDateStr = selectedDate.toDateString();
      const dateStr = date.toDateString();
      const day = date.getDay();
      
      // Add special class for today
      if (dateStr === today.toDateString()) {
        return 'ht-calendar-today';
      }
      
      // Add special class for selected date
      if (dateStr === selectedDateStr) {
        return 'ht-calendar-selected';
      }
      
      // Add special class for weekends (Sunday = 0, Saturday = 6)
      if (day === 0 || day === 6) {
        return 'ht-calendar-weekend-disabled';
      }
    }
    return '';
  };

  const handleStepClick = (stepNumber) => {
    console.log('Step clicked:', stepNumber, 'Current step:', activeStep);
    
    switch(stepNumber) {
      case 1:
        navigate('/booking', { state: location.state });
        break;
      case 2:
        navigate('/choose-service', { state: location.state });
        break;
      case 3:
        // Already on Schedule page, just update active state
        setActiveStep(3);
        break;
      case 4:
        // Only navigate if time is selected
        if (selectedTime) {
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          const formattedDate = selectedDate.toLocaleDateString('en-US', options);
          
          // Update active step
          setActiveStep(4);
          
          navigate('/confirmation', { 
            state: { 
              ...location.state, 
              schedule: {
                date: formattedDate,
                time: selectedTime,
                rawDate: selectedDate
              }
            } 
          });
        } else {
          alert('Please select a time slot before proceeding to confirmation.');
        }
        break;
      default:
        break;
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time, isAvailable) => {
    if (!isAvailable) return;
    setSelectedTime(time);
  };

  const handleBack = () => {
    navigate('/choose-service', { state: location.state });
  };

  const handleContinue = () => {
    if (!selectedTime) {
      alert('Please select a time slot');
      return;
    }
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = selectedDate.toLocaleDateString('en-US', options);
    
    console.log('Scheduling appointment:', {
      date: formattedDate,
      time: selectedTime,
      appointmentData: {
        date: selectedDate.toISOString(),
        time: selectedTime,
        ...location.state
      }
    });
    
    // Update active step before navigating
    setActiveStep(4);
    
    navigate('/confirmation', { 
      state: { 
        ...location.state, 
        schedule: {
          date: formattedDate,
          time: selectedTime,
          rawDate: selectedDate
        }
      } 
    });
  };

  const formatDateForDisplay = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const getBookedSlots = () => {
    const booked = [];
    allTimeSlots.forEach(group => {
      group.slots.forEach(slot => {
        if (!slot.isAvailable) {
          booked.push({
            time: slot.time,
            type: slot.type
          });
        }
      });
    });
    return booked;
  };

  // Get the name of the month
  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="ht-schedule-appointment">
      <Container className="ht-schedule-container">
        <Row className="ht-schedule-title-row">
          <Col>
            <h1 className="ht-schedule-main-title">Schedule Appointment</h1>
            <p className="ht-schedule-subtitle">
              Choose your preferred date and time for the grooming session
            </p>
          </Col>
        </Row>

        <Row className="ht-schedule-progress-row">
          <Col>
            <div className="ht-schedule-progress-steps">
              <ProgressBar now={75} className="ht-schedule-progress-bar" />
              <div className="ht-schedule-step-indicators">
                {steps.map((step, index) => {
                  const stepNumber = index + 1;
                  const isClickable = stepNumber <= 3 || (stepNumber === 4 && selectedTime);
                  
                  return (
                    <div 
                      key={index} 
                      className={`ht-schedule-step ${stepNumber === activeStep ? 'ht-schedule-step-active' : ''} ${isClickable ? 'ht-schedule-step-clickable' : ''}`}
                      onClick={() => isClickable && handleStepClick(stepNumber)}
                    >
                      <div className="ht-schedule-step-circle">
                        <span>{stepNumber}</span>
                      </div>
                      <span className="ht-schedule-step-label">{step}</span>
                      {stepNumber === 4 && !selectedTime && stepNumber !== activeStep && (
                        <div className="ht-schedule-step-tooltip">Select time first</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>

        <Row className="ht-schedule-content-row">
          <Col lg={10} xl={8} className="mx-auto">
            <Card className="ht-schedule-card">
              <Card.Body className="ht-schedule-card-body">
                
                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}
                
                <div className="ht-schedule-section">
                  <h3 className="ht-schedule-section-title">
                    Select Date
                  </h3>
                  <p className="ht-schedule-instruction">
                    Choose a date for your appointment. Weekends are not available for booking.
                  </p>
                  
                  <div className="ht-schedule-calendar-container">
                    <div className="ht-schedule-month-display">
                      {getMonthName(selectedDate)}
                    </div>
                    
                    <Calendar
                      onChange={handleDateChange}
                      value={selectedDate}
                      tileDisabled={tileDisabled}
                      tileClassName={tileClassName}
                      className="ht-schedule-calendar"
                      minDate={new Date()}
                      showNeighboringMonth={true}
                      showNavigation={true}
                      
                      // CRITICAL: Set US locale for Sunday-first calendar
                      locale="en-US"
                      
                      // Format the weekday names
                      formatShortWeekday={(locale, date) => {
                        const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
                        return days[date.getDay()];
                      }}
                      
                      // Format month and year in navigation
                      formatMonthYear={(locale, date) => {
                        return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
                      }}
                      
                      // Format the day of month
                      formatDay={(locale, date) => date.getDate()}
                      
                      next2Label={null}
                      prev2Label={null}
                      prevLabel={<span>‹</span>}
                      nextLabel={<span>›</span>}
                    />
                    
                    <div className="ht-schedule-selected-date">
                      <div className="ht-schedule-selected-label">Selected Date:</div>
                      <div className="ht-schedule-selected-value">{formatDateForDisplay(selectedDate)}</div>
                    </div>
                    
                    <div className="ht-schedule-calendar-legend">
                      <div className="ht-schedule-legend-item">
                        <div className="ht-schedule-legend-box today"></div>
                        <span>Today</span>
                      </div>
                      <div className="ht-schedule-legend-item">
                        <div className="ht-schedule-legend-box available"></div>
                        <span>Available</span>
                      </div>
                      <div className="ht-schedule-legend-item">
                        <div className="ht-schedule-legend-box selected"></div>
                        <span>Selected</span>
                      </div>
                      <div className="ht-schedule-legend-item">
                        <div className="ht-schedule-legend-box weekend"></div>
                        <span>Weekend (Unavailable)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ht-schedule-divider"></div>

                <div className="ht-schedule-section">
                  <h3 className="ht-schedule-section-title">
                    Time Slots
                  </h3>
                  <p className="ht-schedule-instruction">
                    {selectedTime 
                      ? `You have selected: ${selectedTime}`
                      : 'Choose an available time slot for your appointment.'}
                  </p>
                  
                  {isLoading ? (
                    <div className="ht-schedule-loading">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p>Loading time slots...</p>
                    </div>
                  ) : allTimeSlots.length > 0 ? (
                    allTimeSlots.map((slotGroup, index) => (
                      <div key={index} className="ht-schedule-time-group">
                        <h4 className="ht-schedule-time-group-title">{slotGroup.type} Session</h4>
                        {slotGroup.slots.length > 0 ? (
                          <div className="ht-schedule-time-slots">
                            {slotGroup.slots.map((slot, slotIndex) => (
                              <div 
                                key={slotIndex}
                                className={`ht-schedule-time-slot ${selectedTime === slot.time ? 'ht-schedule-time-slot-selected' : ''} ${!slot.isAvailable ? 'ht-schedule-time-slot-booked' : ''}`}
                                onClick={() => handleTimeSelect(slot.time, slot.isAvailable)}
                              >
                                <div className="ht-schedule-time-slot-content">
                                  <span className="ht-schedule-time-slot-hour">{slot.time}</span>
                                  <span className={`ht-schedule-time-slot-status ${!slot.isAvailable ? 'ht-schedule-time-slot-status-booked' : ''}`}>
                                    {slot.isAvailable ? 'Available' : 'Booked'}
                                  </span>
                                </div>
                                {selectedTime === slot.time && slot.isAvailable && (
                                  <div className="ht-schedule-time-slot-checkmark">✓</div>
                                )}
                                {!slot.isAvailable && (
                                  <div className="ht-schedule-time-slot-booked-icon">✗</div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="ht-schedule-no-slots">
                            <span className="ht-schedule-no-slots-text">
                              No {slotGroup.type.toLowerCase()} slots for this date
                            </span>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="ht-schedule-no-slots">
                      <span className="ht-schedule-no-slots-text">
                        No time slots available for the selected date. Please choose another date.
                      </span>
                    </div>
                  )}
                  
                  {!isLoading && allTimeSlots.length > 0 && (
                    <div className="ht-schedule-booked-section">
                      <h4 className="ht-schedule-booked-title">
                        Already Booked for {formatDateForDisplay(selectedDate)}
                      </h4>
                      <div className="ht-schedule-booked-slots">
                        {getBookedSlots().map((slot, index) => (
                          <div key={index} className="ht-schedule-booked-slot">
                            <span className="ht-schedule-booked-time">{slot.time}</span>
                            <span className="ht-schedule-booked-type">{slot.type}</span>
                            <span className="ht-schedule-booked-status">Booked</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="ht-schedule-note">
                    <p className="ht-schedule-note-text">
                      <strong>Note:</strong> Grayed-out time slots are already booked and unavailable. 
                      Only available slots (in color) can be selected.
                    </p>
                  </div>
                </div>

                <div className="ht-schedule-button-container">
                  <div className="ht-schedule-buttons">
                    <Button 
                      variant="outline-secondary" 
                      onClick={handleBack}
                      className="ht-schedule-back-btn"
                    >
                      Back
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={handleContinue}
                      className="ht-schedule-continue-btn"
                      disabled={!selectedTime || isLoading}
                    >
                      {isLoading ? 'Loading...' : 'Continue to Confirmation'}
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

export default ScheduleAppointment;