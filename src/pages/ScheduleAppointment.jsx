import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ProgressBar, Form } from 'react-bootstrap';
import './ScheduleAppointment.css';

const ScheduleAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(4);
  const steps = ['Information', 'Choose Service', 'Groomer', 'Schedule', 'Confirmation'];

  // Boarding-style schedule inputs for uniform UX
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const minDate = new Date().toISOString().split('T')[0];

  const formatDateForDisplay = (dateValue) => {
    if (!dateValue) return 'Not selected';
    return new Date(dateValue).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleStepClick = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        navigate('/booking', { state: location.state });
        break;
      case 2:
        navigate('/choose-service', { state: location.state });
        break;
      case 3:
        navigate('/groomer-selection', { state: location.state });
        break;
      case 4:
        setActiveStep(4);
        break;
      case 5:
        if (!selectedDate || !selectedTime) {
          alert('Please select your appointment date and time first.');
          return;
        }
        setActiveStep(5);
        navigate('/confirmation', {
          state: {
            ...location.state,
            schedule: {
              date: formatDateForDisplay(selectedDate),
              time: selectedTime,
              rawDate: selectedDate,
            },
          },
        });
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    navigate('/choose-service', { state: location.state });
  };

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select your appointment date and time');
      return;
    }

    setActiveStep(5);
    navigate('/confirmation', {
      state: {
        ...location.state,
        schedule: {
          date: formatDateForDisplay(selectedDate),
          time: selectedTime,
          rawDate: selectedDate,
        },
      },
    });
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
              <ProgressBar now={80} className="ht-schedule-progress-bar" />
              <div className="ht-schedule-step-indicators">
                {steps.map((step, index) => {
                  const stepNumber = index + 1;
                  const isClickable = stepNumber <= 4 || (stepNumber === 5 && selectedDate && selectedTime);

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
                      {stepNumber === 5 && (!selectedDate || !selectedTime) && stepNumber !== activeStep && (
                        <div className="ht-schedule-step-tooltip">Select date and time first</div>
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
                <div className="ht-schedule-section">
                  <h3 className="ht-schedule-section-title">Select Date and Time</h3>
                  <p className="ht-schedule-instruction">
                    This part now follows the same date and time style used in Boarding for a uniform booking flow.
                  </p>

                  <div className="ht-schedule-calendar-container">
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Appointment Date *</Form.Label>
                          <Form.Control
                            type="date"
                            min={minDate}
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="ht-schedule-form-control"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Appointment Time *</Form.Label>
                          <Form.Control
                            type="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="ht-schedule-form-control"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="ht-schedule-selected-date">
                      <div className="ht-schedule-selected-label">Selected Schedule:</div>
                      <div className="ht-schedule-selected-value">
                        {formatDateForDisplay(selectedDate)} {selectedTime ? `at ${selectedTime}` : ''}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ht-schedule-button-container">
                  <div className="ht-schedule-buttons-fixed">
                    <Button
                      variant="outline-secondary"
                      onClick={handleBack}
                      className="ht-schedule-back-btn-fixed"
                    >
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleContinue}
                      className="ht-schedule-continue-btn-fixed"
                      disabled={!selectedDate || !selectedTime}
                    >
                      Continue to Confirmation
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
