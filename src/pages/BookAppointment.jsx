import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ProgressBar, Form, Modal } from 'react-bootstrap';
import './BookAppointment.css';

const BookAppointment = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const steps = ['Information', 'Choose Service', 'Schedule', 'Confirmation'];
  const [pets, setPets] = useState([
    { 
      id: 1, 
      name: 'Max', 
      type: 'Dog', 
      size: 'Medium', 
      breed: 'Golden Retriever', 
      age: '3 years',
      selected: true,
      parentName: 'John Smith',
      parentPhone: '09123456789',
      parentEmail: 'john@example.com',
      parentAddress: '123 Main St'
    },
    { 
      id: 2, 
      name: 'Luna', 
      type: 'Cat', 
      size: 'Small', 
      breed: 'Siamese', 
      age: '2 years',
      selected: false,
      parentName: 'John Smith',
      parentPhone: '09123456789',
      parentEmail: 'john@example.com',
      parentAddress: '123 Main St'
    }
  ]);

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
    { value: 'Small', label: 'Small (below 5 kg)' },
    { value: 'Medium', label: 'Medium (6-10 kg)' },
    { value: 'Large', label: 'Large (11-30 kg)' },
    { value: 'ExtraLarge', label: 'Extra Large (31kg & up)' }
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

  const handleContinue = () => {
    const selectedPets = pets.filter(pet => pet.selected);
    if (selectedPets.length === 0) {
      alert('Please select at least one pet for grooming');
      return;
    }
    navigate('/choose-service', { 
      state: { 
        selectedPets: selectedPets,
        petCount: selectedPets.length
      } 
    });
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
          alert('Please select at least one pet for grooming');
          return;
        }
        navigate('/choose-service', { 
          state: { 
            selectedPets: selectedPets,
            petCount: selectedPets.length
          } 
        });
        break;
      case 3:
        alert('Please complete pet selection and choose services first.');
        break;
      case 4:
        alert('Please complete all previous steps first.');
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    setShowModal(false);
  };

  return (
    <div className="ht-book-appointment">
      <Container className="ht-booking-container">
        <Row className="ht-booking-title-row">
          <Col>
            <h1 className="ht-booking-main-title">Book Your Appointment</h1>
            <p className="ht-booking-subtitle">
              Follow the simple steps below to schedule your pet's grooming session.
            </p>
          </Col>
        </Row>

        <Row className="ht-booking-progress-row">
          <Col>
            <div className="ht-booking-progress-steps">
              <ProgressBar now={25} className="ht-booking-progress-bar" />
              <div className="ht-booking-step-indicators">
                {steps.map((step, index) => {
                  const stepNumber = index + 1;
                  const isClickable = stepNumber <= 2;
                  
                  return (
                    <div 
                      key={index} 
                      className={`ht-booking-step ${stepNumber === activeStep ? 'ht-booking-step-active' : ''} ${isClickable ? 'ht-booking-step-clickable' : ''}`}
                      onClick={() => isClickable && handleStepClick(stepNumber)}
                    >
                      <div className="ht-booking-step-circle">
                        <span>{stepNumber}</span>
                      </div>
                      <span className="ht-booking-step-label">{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>

        <Row className="ht-booking-pet-row">
          <Col md={10} lg={8} xl={6}>
            <Card className="ht-booking-pet-card">
              <Card.Body>
                <Card.Title className="ht-booking-card-title">
                  Who needs grooming today?
                </Card.Title>
                
                <div className="ht-booking-pets-grid">
                  {pets.map(pet => (
                    <div 
                      key={pet.id} 
                      className={`ht-booking-pet-item ${pet.selected ? 'ht-booking-pet-selected' : ''}`}
                      onClick={() => handleSelectPet(pet.id)}
                    >
                      <div className={`ht-booking-pet-avatar ht-booking-pet-${pet.type.toLowerCase()}`}>
                        {pet.type.charAt(0)}
                      </div>
                      <div className="ht-booking-pet-info">
                        <h5 className="ht-booking-pet-name">{pet.name}</h5>
                        <p className="ht-booking-pet-details">{pet.type} • {pet.breed} • {pet.age}</p>
                        <p className="ht-booking-pet-parent">Owner: {pet.parentName}</p>
                      </div>
                      {pet.selected && <div className="ht-booking-pet-checkmark">✓</div>}
                      <button 
                        className="ht-booking-pet-edit-btn"
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
                    className="ht-booking-pet-item ht-booking-add-pet"
                    onClick={handleAddPet}
                  >
                    <div className="ht-booking-add-pet-icon">+</div>
                    <div className="ht-booking-add-pet-text">Add another pet</div>
                  </div>
                </div>
                
                <div className="ht-booking-continue-container">
                  <Button className="ht-booking-continue-btn" onClick={handleContinue}>
                    Continue
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal 
        show={showModal} 
        onHide={handleBack}
        className="ht-booking-pet-modal"
        centered
        size="lg"
      >
        <Modal.Header closeButton className="ht-booking-modal-header">
          <Modal.Title>
            {isEditing ? 'Edit Pet Information' : 'Add New Pet'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="ht-booking-modal-body">
          <div className="ht-booking-form-section">
            <h4 className="ht-booking-form-title">Pet Information</h4>
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
                    className="ht-booking-form-control"
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
                    className="ht-booking-form-control"
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
                    className="ht-booking-form-control"
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
                    className="ht-booking-form-control"
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
                placeholder="e.g., 3 years, 6 months"
                className="ht-booking-form-control"
              />
            </Form.Group>
          </div>

          <div className="ht-booking-form-section">
            <h4 className="ht-booking-form-title">Pet Parent Information</h4>
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
                    className="ht-booking-form-control"
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
                    className="ht-booking-form-control"
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
                className="ht-booking-form-control"
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
                className="ht-booking-form-control"
              />
            </Form.Group>
          </div>
          
          <div className="ht-booking-required-note">
            * Required fields
          </div>
        </Modal.Body>
        <Modal.Footer className="ht-booking-modal-footer">
          <div className="ht-booking-modal-actions">
            {isEditing && (
              <Button 
                variant="outline-danger" 
                onClick={handleDeletePet}
                className="ht-booking-delete-btn"
                disabled={pets.length <= 1}
              >
                Delete Pet
              </Button>
            )}
            <div className="ht-booking-modal-buttons">
              <Button 
                variant="outline-secondary" 
                onClick={handleBack}
                className="ht-booking-back-btn"
              >
                Back
              </Button>
              <Button 
                variant="primary" 
                onClick={handleSavePet}
                className="ht-booking-save-btn"
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

export default BookAppointment;