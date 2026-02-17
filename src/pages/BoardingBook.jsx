import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ProgressBar, Form, Modal } from 'react-bootstrap';
import './BoardingBook.css';

const BoardingBook = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const steps = ['Information', 'Service Details', 'Confirmation'];
  
  const [pets, setPets] = useState([
    { 
      id: 1, 
      name: 'Belona', 
      type: 'Dog', 
      size: 'Medium', 
      breed: 'Shih Tzu', 
      age: '2 years',
      selected: true,
      parentName: 'Thea Coleen Jose',
      parentPhone: '09123456789',
      parentEmail: 'theajose@email.com',
      parentAddress: 'N/A'
    },
    { 
      id: 2, 
      name: 'Baloney', 
      type: 'Cat', 
      size: 'Small', 
      breed: 'Persian', 
      age: '3 years',
      selected: false,
      parentName: 'Thea Coleen Jose',
      parentPhone: '09123456789',
      parentEmail: 'theajose@email.com',
      parentAddress: 'N/A'
    }
  ]);

  const [serviceType, setServiceType] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [petForm, setPetForm] = useState({
    name: '',
    type: 'Dog',
    size: 'Medium',
    breed: '',
    age: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    parentAddress: ''
  });

  const petTypes = ['Dog', 'Cat'];
  const petSizes = [
    { value: 'Small', label: 'Small (Below 5kg)' },
    { value: 'Medium', label: 'Medium (6-10kg)' },
    { value: 'Large', label: 'Large (11-30kg)' },
    { value: 'XL', label: 'XL (31kg & up)' }
  ];

  const serviceTypes = [
    { 
      type: 'DAYCARE', 
      duration: '3 hours', 
      description: 'Includes water, supervised playtime, and photo and video updates during your pet\'s stay.',
      price: '₱409 • Medium',
      additionalInfo: 'P50 per hour for every succeeding hour'
    },
    { 
      type: 'OVERNIGHT', 
      duration: '24 hours', 
      description: 'Includes a dedicated 24/7 pet attendant, water, and regular photo and video updates for fur parents.',
      price: '₱409 • Medium',
      additionalInfo: 'P50 per hour for every succeeding hour'
    }
  ];

  const handleAddPet = () => {
    setIsEditing(false);
    setEditingPet(null);
    setPetForm({
      name: '',
      type: 'Dog',
      size: 'Medium',
      breed: '',
      age: '',
      parentName: '',
      parentPhone: '',
      parentEmail: '',
      parentAddress: ''
    });
    setShowModal(true);
  };

  const handleEditPet = (pet) => {
    setIsEditing(true);
    setEditingPet(pet);
    setPetForm({ ...pet });
    setShowModal(true);
  };

  const handleSelectPet = (id) => {
    const updatedPets = pets.map(pet => ({
      ...pet,
      selected: pet.id === id
    }));
    setPets(updatedPets);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPetForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSavePet = () => {
    if (isEditing && editingPet) {
      const updatedPets = pets.map(pet => 
        pet.id === editingPet.id ? { ...petForm, id: editingPet.id, selected: pet.selected } : pet
      );
      setPets(updatedPets);
    } else {
      const newPet = {
        ...petForm,
        id: pets.length + 1,
        selected: false
      };
      setPets([...pets.map(p => ({ ...p, selected: false })), newPet]);
    }
    setShowModal(false);
  };

  const handleDeletePet = () => {
    if (editingPet && pets.length > 1) {
      const updatedPets = pets.filter(pet => pet.id !== editingPet.id);
      setPets(updatedPets);
      setShowModal(false);
    }
  };

  const handleStepClick = (stepNumber) => {
    console.log('Step clicked:', stepNumber);
    
    switch(stepNumber) {
      case 1:
        setActiveStep(1);
        break;
      case 2:
        const selectedPets = pets.filter(pet => pet.selected);
        if (selectedPets.length === 0) {
          alert('Please select at least one pet for boarding');
          return;
        }
        setActiveStep(2);
        break;
      case 3:
        if (!serviceType || !checkInDate || !checkInTime || !checkOutDate || !checkOutTime) {
          alert('Please complete service details first.');
          return;
        }
        const selectedPetsForBooking = pets.filter(pet => pet.selected);
        navigate('/boarding-confirmed', { 
          state: { 
            selectedPets: selectedPetsForBooking,
            serviceType: serviceType,
            checkInDate: checkInDate,
            checkInTime: checkInTime,
            checkOutDate: checkOutDate,
            checkOutTime: checkOutTime
          } 
        });
        break;
      default:
        break;
    }
  };

  const handleContinue = () => {
    const selectedPets = pets.filter(pet => pet.selected);
    if (selectedPets.length === 0) {
      alert('Please select at least one pet for boarding');
      return;
    }
    setActiveStep(2);
  };

  const handleContinueToConfirmation = () => {
    if (!serviceType || !checkInDate || !checkInTime || !checkOutDate || !checkOutTime) {
      alert('Please complete all service details');
      return;
    }
    
    const selectedPets = pets.filter(pet => pet.selected);
    navigate('/boarding-confirmed', { 
      state: { 
        selectedPets: selectedPets,
        serviceType: serviceType,
        checkInDate: checkInDate,
        checkInTime: checkInTime,
        checkOutDate: checkOutDate,
        checkOutTime: checkOutTime
      } 
    });
  };

  const handleBack = () => {
    setShowModal(false);
  };

  const getProgressPercentage = () => {
    switch(activeStep) {
      case 1: return 33;
      case 2: return 66;
      case 3: return 100;
      default: return 33;
    }
  };

  return (
    <div className="ht-boarding-book">
      <Container className="ht-boarding-container">
        <Row className="ht-boarding-title-row">
          <Col>
            <h1 className="ht-boarding-main-title">Book Your Pet's Boarding Stay</h1>
            <p className="ht-boarding-subtitle">
              Follow the simple steps below to book your pet's home away from home.
            </p>
          </Col>
        </Row>

        <Row className="ht-boarding-progress-row">
          <Col>
            <div className="ht-boarding-progress-steps">
              <ProgressBar now={getProgressPercentage()} className="ht-boarding-progress-bar" />
              <div className="ht-boarding-step-indicators">
                {steps.map((step, index) => {
                  const stepNumber = index + 1;
                  const isClickable = stepNumber <= 3;
                  
                  return (
                    <div 
                      key={index} 
                      className={`ht-boarding-step ${stepNumber === activeStep ? 'ht-boarding-step-active' : ''} ${isClickable ? 'ht-boarding-step-clickable' : ''}`}
                      onClick={() => isClickable && handleStepClick(stepNumber)}
                    >
                      <div className="ht-boarding-step-circle">
                        <span>{stepNumber}</span>
                      </div>
                      <span className="ht-boarding-step-label">{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>

        {/* Step 1: Pet Information */}
        {activeStep === 1 && (
          <Row className="ht-boarding-pet-row">
            <Col md={10} lg={8} xl={6}>
              <Card className="ht-boarding-pet-card">
                <Card.Body>
                  <Card.Title className="ht-boarding-card-title">
                    Who will be staying with us?
                  </Card.Title>
                  
                  <div className="ht-boarding-pets-grid">
                    {pets.map(pet => (
                      <div 
                        key={pet.id} 
                        className={`ht-boarding-pet-item ${pet.selected ? 'ht-boarding-pet-selected' : ''}`}
                        onClick={() => handleSelectPet(pet.id)}
                      >
                        <div className={`ht-boarding-pet-avatar ht-boarding-pet-${pet.type.toLowerCase()}`}>
                          {pet.type.charAt(0)}
                        </div>
                        <div className="ht-boarding-pet-info">
                          <h5 className="ht-boarding-pet-name">{pet.name}</h5>
                          <p className="ht-boarding-pet-details">{pet.breed} • {pet.size} Size • {pet.age}</p>
                          <p className="ht-boarding-pet-parent">Owner: {pet.parentName}</p>
                        </div>
                        {pet.selected && <div className="ht-boarding-pet-checkmark">✓</div>}
                        <button 
                          className="ht-boarding-pet-edit-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditPet(pet);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                    
                    <div 
                      className="ht-boarding-pet-item ht-boarding-add-pet"
                      onClick={handleAddPet}
                    >
                      <div className="ht-boarding-add-pet-icon">+</div>
                      <div className="ht-boarding-add-pet-text">Add another pet</div>
                    </div>
                  </div>
                  
                  <div className="ht-boarding-continue-container">
                    <Button className="ht-boarding-continue-btn" onClick={handleContinue}>
                      Continue to Service Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Step 2: Service Details */}
        {activeStep === 2 && (
          <Row className="ht-boarding-service-row">
            <Col md={10} lg={8} xl={6}>
              <Card className="ht-boarding-service-card">
                <Card.Body>
                  <Card.Title className="ht-boarding-card-title">
                    Service Details
                  </Card.Title>
                  <p className="ht-boarding-service-subtitle">
                    Select the boarding service that fits your schedule.
                  </p>
                  
                  <div className="ht-boarding-service-options">
                    {serviceTypes.map((service, index) => (
                      <div 
                        key={index}
                        className={`ht-boarding-service-option ${serviceType === service.type ? 'ht-boarding-service-selected' : ''}`}
                        onClick={() => setServiceType(service.type)}
                      >
                        <div className="ht-boarding-service-header">
                          <h4 className="ht-boarding-service-type">{service.type}</h4>
                          <span className="ht-boarding-service-duration">{service.duration}</span>
                        </div>
                        <p className="ht-boarding-service-description">{service.description}</p>
                        <div className="ht-boarding-service-pricing">
                          <span className="ht-boarding-service-price">{service.price}</span>
                          <span className="ht-boarding-service-additional">{service.additionalInfo}</span>
                        </div>
                        {serviceType === service.type && (
                          <div className="ht-boarding-service-checkmark">✓</div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="ht-boarding-dates-section">
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Check-in Date *</Form.Label>
                          <Form.Control
                            type="date"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            className="ht-boarding-form-control"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Check-in Time *</Form.Label>
                          <Form.Control
                            type="time"
                            value={checkInTime}
                            onChange={(e) => setCheckInTime(e.target.value)}
                            className="ht-boarding-form-control"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Expected Check-out Date *</Form.Label>
                          <Form.Control
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            className="ht-boarding-form-control"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Check-out Time *</Form.Label>
                          <Form.Control
                            type="time"
                            value={checkOutTime}
                            onChange={(e) => setCheckOutTime(e.target.value)}
                            className="ht-boarding-form-control"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                  
                  <div className="ht-boarding-navigation-container">
                    <div className="ht-boarding-navigation-buttons">
                      <Button 
                        variant="outline-secondary" 
                        onClick={() => setActiveStep(1)}
                        className="ht-boarding-back-btn"
                      >
                        Back
                      </Button>
                      <Button 
                        variant="primary" 
                        onClick={handleContinueToConfirmation}
                        className="ht-boarding-confirm-btn"
                        disabled={!serviceType || !checkInDate || !checkInTime || !checkOutDate || !checkOutTime}
                      >
                        Continue to Confirmation
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

      {/* Add/Edit Pet Modal */}
      <Modal 
        show={showModal} 
        onHide={handleBack}
        className="ht-boarding-pet-modal"
        centered
        size="lg"
      >
        <Modal.Header closeButton className="ht-boarding-modal-header">
          <Modal.Title>
            {isEditing ? 'Edit Pet Information' : 'Add New Pet'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="ht-boarding-modal-body">
          <div className="ht-boarding-form-section">
            <h4 className="ht-boarding-form-title">Pet Information</h4>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Pet Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={petForm.name}
                    onChange={handleFormChange}
                    placeholder="Enter pet name"
                    className="ht-boarding-form-control"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Pet Type *</Form.Label>
                  <Form.Select
                    name="type"
                    value={petForm.type}
                    onChange={handleFormChange}
                    className="ht-boarding-form-control"
                  >
                    {petTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Size *</Form.Label>
                  <Form.Select
                    name="size"
                    value={petForm.size}
                    onChange={handleFormChange}
                    className="ht-boarding-form-control"
                  >
                    {petSizes.map(size => (
                      <option key={size.value} value={size.value}>{size.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Breed *</Form.Label>
                  <Form.Control
                    type="text"
                    name="breed"
                    value={petForm.breed}
                    onChange={handleFormChange}
                    placeholder="Enter breed"
                    className="ht-boarding-form-control"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-4">
              <Form.Label>Age *</Form.Label>
              <Form.Control
                type="text"
                name="age"
                value={petForm.age}
                onChange={handleFormChange}
                placeholder="e.g., 2 years"
                className="ht-boarding-form-control"
              />
            </Form.Group>
          </div>

          <div className="ht-boarding-form-section">
            <h4 className="ht-boarding-form-title">Pet Parent Information</h4>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentName"
                    value={petForm.parentName}
                    onChange={handleFormChange}
                    placeholder="Enter your full name"
                    className="ht-boarding-form-control"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="parentPhone"
                    value={petForm.parentPhone}
                    onChange={handleFormChange}
                    placeholder="09123456789"
                    className="ht-boarding-form-control"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Email Address *</Form.Label>
              <Form.Control
                type="email"
                name="parentEmail"
                value={petForm.parentEmail}
                onChange={handleFormChange}
                placeholder="you@example.com"
                className="ht-boarding-form-control"
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label>Address (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="parentAddress"
                value={petForm.parentAddress}
                onChange={handleFormChange}
                placeholder="Enter your address"
                className="ht-boarding-form-control"
              />
            </Form.Group>
          </div>
          
          <div className="ht-boarding-required-note">
            * Required fields
          </div>
        </Modal.Body>
        <Modal.Footer className="ht-boarding-modal-footer">
          <div className="ht-boarding-modal-actions">
            {isEditing && (
              <Button 
                variant="outline-danger" 
                onClick={handleDeletePet}
                className="ht-boarding-delete-btn"
                disabled={pets.length <= 1}
              >
                Delete Pet
              </Button>
            )}
            <div className="ht-boarding-modal-buttons">
              <Button 
                variant="outline-secondary" 
                onClick={handleBack}
                className="ht-boarding-back-modal-btn"
              >
                Back
              </Button>
              <Button 
                variant="primary" 
                onClick={handleSavePet}
                className="ht-boarding-save-btn"
                disabled={!petForm.name || !petForm.breed || !petForm.age || 
                         !petForm.parentName || !petForm.parentPhone || !petForm.parentEmail}
              >
                {isEditing ? 'Update Pet Info' : 'Save Pet Info'}
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BoardingBook;