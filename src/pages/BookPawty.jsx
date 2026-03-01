// BookPawty.jsx - WITH OWN CONFIRMATION PAGE INSIDE THE COMPONENT
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ProgressBar, Form, Modal, Alert } from 'react-bootstrap';
import './BookPawty.css';

const BookPawty = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const steps = ['Select Pet', 'Party Details', 'Payment'];
  
  const [pets, setPets] = useState([
    { 
      id: 1, 
      name: 'Max', 
      type: 'Dog', 
      size: 'Medium (6-10 kg)', 
      breed: 'Golden Retriever', 
      age: '3 years',
      selected: true,
      parentName: 'John Doe',
      parentPhone: '09123456789',
      parentEmail: 'john@email.com',
      parentAddress: 'N/A'
    },
    { 
      id: 2, 
      name: 'Luna', 
      type: 'Cat', 
      size: 'Small (1-5 kg)', 
      breed: 'Siamese', 
      age: '2 years',
      selected: false,
      parentName: 'Jane Smith',
      parentPhone: '09123456789',
      parentEmail: 'jane@email.com',
      parentAddress: 'N/A'
    }
  ]);

  const [serviceType, setServiceType] = useState('');
  const [partyDate, setPartyDate] = useState('');
  const [partyTime, setPartyTime] = useState('');
  const [guests, setGuests] = useState('1-5');
  const [cakeFlavor, setCakeFlavor] = useState('squash-banana');
  const [pastaChoice, setPastaChoice] = useState('baked-mac');
  const [bannerName, setBannerName] = useState('');
  const [hatColor, setHatColor] = useState('blue');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentProof, setPaymentProof] = useState(null);
  const [selectedConsumables, setSelectedConsumables] = useState([]);
  const [consumablesTotal, setConsumablesTotal] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // NEW: State for showing confirmation page
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const [showModal, setShowModal] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [petForm, setPetForm] = useState({
    name: '',
    type: 'Dog',
    size: 'Medium (6-10 kg)',
    breed: '',
    age: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    parentAddress: ''
  });

  const menuItems = {
    beverages: [
      { id: 1, category: 'ICED COFFEE (16OZ)', name: 'Americano', price: 100 },
      { id: 2, category: 'ICED COFFEE (16OZ)', name: 'Cafe Latte', price: 120 },
      { id: 3, category: 'ICED COFFEE (16OZ)', name: 'Caramel Macchiato', price: 145 },
      { id: 4, category: 'ICED COFFEE (16OZ)', name: 'Iced Matcha Latte', price: 135 },
      { id: 5, category: 'ICED COFFEE (16OZ)', name: 'Spanish Latte', price: 140 },
      { id: 6, category: 'NON-CAFFEINE', name: 'Four Seasons', price: 90 },
      { id: 7, category: 'NON-CAFFEINE', name: 'Hot Chocolate', price: 110 },
      { id: 8, category: 'NON-CAFFEINE', name: 'Iced Choco Milk', price: 120 },
      { id: 9, category: 'NON-CAFFEINE', name: 'Strawberry Milk', price: 130 },
      { id: 10, category: 'NON-CAFFEINE', name: 'Blueberry Soda', price: 150 }
    ],
    food: [
      { id: 11, category: 'RICE MEALS', name: 'Breaded Fish Fillet', price: 140 },
      { id: 12, category: 'RICE MEALS', name: 'Burger Steak', price: 150 },
      { id: 13, category: 'RICE MEALS', name: 'Chicken Cordon Bleu', price: 160 },
      { id: 14, category: 'RICE MEALS', name: 'Chicken Fillet', price: 170 },
      { id: 15, category: 'RICE MEALS', name: 'Hungarian Sausage', price: 180 },
      { id: 16, category: 'SNACKS AND PASTA', name: 'Baked Macaroni', price: 190 },
      { id: 17, category: 'SNACKS AND PASTA', name: 'Chicken Alfredo', price: 190 },
      { id: 18, category: 'SNACKS AND PASTA', name: 'Cheesy Beef Burger', price: 190 },
      { id: 19, category: 'SNACKS AND PASTA', name: 'Chicken Popcorn', price: 150 },
      { id: 20, category: 'SNACKS AND PASTA', name: 'Fish and Fries', price: 200 }
    ]
  };

  const petTypes = ['Dog', 'Cat'];
  const petSizes = [
    { value: 'Small (1-5 kg)', label: 'Small (1-5 kg)' },
    { value: 'Medium (6-10 kg)', label: 'Medium (6-10 kg)' },
    { value: 'Large (11-20 kg)', label: 'Large (11-20 kg)' },
    { value: 'Extra Large (21+ kg)', label: 'Extra Large (21+ kg)' }
  ];

  const cakeFlavors = [
    { value: 'squash-banana', label: 'Squash & Banana' },
    { value: 'carrot-pb', label: 'Carrot with Peanut Butter' }
  ];

  const handleAddPet = () => {
    setIsEditing(false);
    setEditingPet(null);
    setPetForm({
      name: '',
      type: 'Dog',
      size: 'Medium (6-10 kg)',
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        alert('Only JPG, JPEG, and PNG files are allowed');
        return;
      }
      setPaymentProof(file);
    }
  };

  const handleConsumableSelect = (item) => {
    const existingIndex = selectedConsumables.findIndex(i => i.id === item.id);
    
    if (existingIndex >= 0) {
      const updatedSelection = selectedConsumables.filter(i => i.id !== item.id);
      setSelectedConsumables(updatedSelection);
      setConsumablesTotal(consumablesTotal - (item.price * selectedConsumables[existingIndex].quantity));
    } else {
      const newTotal = consumablesTotal + item.price;
      
      if (newTotal > 800) {
        alert(`Cannot add ${item.name}. Would exceed ₱800 limit. Current total: ₱${consumablesTotal}`);
        return;
      }
      
      setSelectedConsumables([...selectedConsumables, { ...item, quantity: 1 }]);
      setConsumablesTotal(newTotal);
    }
  };

  const updateConsumableQuantity = (e, id, newQuantity) => {
    e.preventDefault();
    e.stopPropagation();
    
    const itemIndex = selectedConsumables.findIndex(i => i.id === id);
    if (itemIndex === -1) return;

    const updatedConsumables = [...selectedConsumables];
    const oldItem = updatedConsumables[itemIndex];
    const oldTotal = oldItem.price * oldItem.quantity;
    
    if (newQuantity < 1) {
      const filteredConsumables = selectedConsumables.filter(i => i.id !== id);
      setSelectedConsumables(filteredConsumables);
      setConsumablesTotal(consumablesTotal - oldTotal);
      return;
    }

    const newItemTotal = oldItem.price * newQuantity;
    const newOverallTotal = consumablesTotal - oldTotal + newItemTotal;

    if (newOverallTotal > 800) {
      alert(`Cannot increase quantity. Would exceed ₱800 limit. Current total: ₱${consumablesTotal}`);
      return;
    }

    updatedConsumables[itemIndex] = { ...oldItem, quantity: newQuantity };
    setSelectedConsumables(updatedConsumables);
    setConsumablesTotal(newOverallTotal);
  };

  const removeConsumable = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    
    const item = selectedConsumables.find(i => i.id === id);
    if (item) {
      const updatedSelection = selectedConsumables.filter(i => i.id !== id);
      setSelectedConsumables(updatedSelection);
      setConsumablesTotal(consumablesTotal - (item.price * item.quantity));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (activeStep === 1) {
      const selectedPets = pets.filter(pet => pet.selected);
      if (selectedPets.length === 0) newErrors.pet = 'Please select a pet';
    }

    if (activeStep === 2) {
      if (!bannerName.trim()) newErrors.bannerName = 'Banner name is required';
      if (!partyDate) newErrors.partyDate = 'Party date is required';
      if (!partyTime) newErrors.partyTime = 'Party time is required';
      if (consumablesTotal < 100) newErrors.consumables = 'Please select at least ₱100 worth of consumables';
      if (consumablesTotal > 800) newErrors.consumables = 'Consumables selection exceeds ₱800 limit';

      const selectedDate = new Date(partyDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (partyDate && selectedDate < today) {
        newErrors.partyDate = 'Date cannot be in the past';
      }
    }

    if (activeStep === 3) {
      if (!paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
      if (paymentMethod === 'gcash' && !paymentProof) {
        newErrors.paymentProof = 'Please upload proof of payment for GCash';
      }
    }

    return newErrors;
  };

  const handleStepClick = (stepNumber) => {
    if (stepNumber < activeStep) {
      setActiveStep(stepNumber);
    }
  };

  const handleContinue = () => {
    const selectedPets = pets.filter(pet => pet.selected);
    if (selectedPets.length === 0) {
      alert('Please select a pet for the pawty');
      return;
    }
    setActiveStep(2);
  };

  const handleContinueToPayment = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setActiveStep(3);
    } else {
      setErrors(formErrors);
    }
  };

  // MODIFIED: Submit shows confirmation page inside BookPawty
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true); // Show confirmation page inside BookPawty
      setActiveStep(4); // Set to a step beyond 3 to hide the form steps
    }, 1500);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleBack = () => {
    setShowModal(false);
  };

  const getProgressPercentage = () => {
    if (showConfirmation) return 100;
    switch(activeStep) {
      case 1: return 33;
      case 2: return 66;
      case 3: return 100;
      default: return 33;
    }
  };

  const getPetTypeClass = (type) => {
    return type === 'Dog' ? 'ht-pawty-pet-dog' : 'ht-pawty-pet-cat';
  };

  const selectedPet = pets.find(pet => pet.selected);

  return (
    <div className="ht-pawty-book">
      <Container className="ht-pawty-container">
        <Row className="ht-pawty-title-row">
          <Col>
            <h1 className="ht-pawty-main-title">Book Your Pet's Pawty</h1>
            <p className="ht-pawty-subtitle">
              Let's make your pet's birthday unforgettable! Follow the steps below to book your pawty.
            </p>
          </Col>
        </Row>

        <Row className="ht-pawty-progress-row">
          <Col>
            <div className="ht-pawty-progress-steps">
              <ProgressBar now={getProgressPercentage()} className="ht-pawty-progress-bar" />
              <div className="ht-pawty-step-indicators">
                {steps.map((step, index) => {
                  const stepNumber = index + 1;
                  const isClickable = stepNumber < activeStep && !showConfirmation;
                  
                  return (
                    <div 
                      key={index} 
                      className={`ht-pawty-step ${stepNumber === activeStep ? 'ht-pawty-step-active' : ''} ${isClickable ? 'ht-pawty-step-clickable' : ''}`}
                      onClick={() => isClickable && handleStepClick(stepNumber)}
                    >
                      <div className="ht-pawty-step-circle">
                        <span>{stepNumber}</span>
                      </div>
                      <span className="ht-pawty-step-label">{step}</span>
                    </div>
                  );
                })}
                <div 
  className={`ht-pawty-step ${showConfirmation ? 'ht-pawty-step-active' : ''}`}
>
  <div className="ht-pawty-step-circle">
    <span>4</span>
  </div>
  <span className="ht-pawty-step-label">Confirmed</span>
</div>
              </div>
            </div>
          </Col>
        </Row>

        {/* CONFIRMATION PAGE - Inside BookPawty */}
        {showConfirmation && (
          <Row className="ht-pawty-confirmation-row">
            <Col md={10} lg={8} xl={6}>
              <Card className="ht-pawty-confirmation-card">
                <Card.Body>
                  <div className="ht-pawty-checkmark-large ht-pawty-checkmark-green">✓</div> {/* Added green class */}
                  <h2 className="ht-pawty-confirmation-title">Appointment Confirmed!</h2>
                  <p className="ht-pawty-confirmation-message">
                    Thank you for booking a birthday pawty for {selectedPet?.name || 'your pet'}!
                  </p>
                  <Button 
                    className="ht-pawty-back-home-btn"
                    onClick={handleBackToHome}
                  >
                    Back to Home Page
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Step 1: Select Pet */}
        {!showConfirmation && activeStep === 1 && (
          <Row className="ht-pawty-pet-row">
            <Col md={10} lg={8} xl={6}>
              <Card className="ht-pawty-pet-card">
                <Card.Body>
                  <Card.Title className="ht-pawty-card-title">
                    Who are we celebrating?
                  </Card.Title>
                  
                  <div className="ht-pawty-pets-grid">
                    {pets.map(pet => (
                      <div 
                        key={pet.id} 
                        className={`ht-pawty-pet-item ${pet.selected ? 'ht-pawty-pet-selected' : ''}`}
                        onClick={() => handleSelectPet(pet.id)}
                      >
                        <div className={`ht-pawty-pet-avatar ${getPetTypeClass(pet.type)}`}>
                          {pet.type.charAt(0)}
                        </div>
                        <div className="ht-pawty-pet-info">
                          <h5 className="ht-pawty-pet-name">{pet.name}</h5>
                          <p className="ht-pawty-pet-details">{pet.breed} • {pet.size} • {pet.age}</p>
                          <p className="ht-pawty-pet-parent">Owner: {pet.parentName}</p>
                        </div>
                        {pet.selected && <div className="ht-pawty-pet-checkmark">✓</div>}
                        <button 
                          className="ht-pawty-pet-edit-btn"
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
                      className="ht-pawty-pet-item ht-pawty-add-pet"
                      onClick={handleAddPet}
                    >
                      <div className="ht-pawty-add-pet-icon">+</div>
                      <div className="ht-pawty-add-pet-text">Add another pet</div>
                    </div>
                  </div>
                  
                  <div className="ht-pawty-continue-container">
                    <Button className="ht-pawty-continue-btn" onClick={handleContinue}>
                      Continue to Party Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Step 2: Party Details */}
        {!showConfirmation && activeStep === 2 && (
          <Row className="ht-pawty-service-row">
            <Col md={10} lg={8} xl={6}>
              <Card className="ht-pawty-service-card">
                <Card.Body>
                  <Card.Title className="ht-pawty-card-title">
                    Party Details
                  </Card.Title>
                  <p className="ht-pawty-service-subtitle">
                    Customize your pet's birthday celebration
                  </p>
                  
                  <Form>
                    <div className="ht-pawty-form-section">
                      <h4 className="ht-pawty-form-title">Owner Information</h4>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Your Name *</Form.Label>
                            <Form.Control
                              type="text"
                              value={selectedPet?.parentName || ''}
                              readOnly
                              className="ht-pawty-form-control"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email *</Form.Label>
                            <Form.Control
                              type="email"
                              value={selectedPet?.parentEmail || ''}
                              readOnly
                              className="ht-pawty-form-control"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Phone Number *</Form.Label>
                            <Form.Control
                              type="tel"
                              value={selectedPet?.parentPhone || ''}
                              readOnly
                              className="ht-pawty-form-control"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Number of Guests *</Form.Label>
                            <Form.Select
                              value={guests}
                              onChange={(e) => setGuests(e.target.value)}
                              className="ht-pawty-form-control"
                            >
                              <option value="1-5">1-5 guests</option>
                              <option value="6-10">6-10 guests</option>
                              <option value="11-15">11-15 guests</option>
                              <option value="16+">16+ guests</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>

                    <div className="ht-pawty-form-section">
                      <h4 className="ht-pawty-form-title">Party Type</h4>
                      <Form.Group className="mb-3">
                        <div className="ht-pawty-radio-group">
                          <Form.Check
                            type="radio"
                            id="barkday"
                            name="partyType"
                            value="barkday"
                            checked={selectedPet?.type === 'Dog'}
                            onChange={() => {}}
                            label="Barkday (Dog)"
                            className="ht-pawty-radio"
                            disabled
                          />
                          <Form.Check
                            type="radio"
                            id="meowday"
                            name="partyType"
                            value="meowday"
                            checked={selectedPet?.type === 'Cat'}
                            onChange={() => {}}
                            label="Meowday (Cat)"
                            className="ht-pawty-radio"
                            disabled
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="ht-pawty-form-section">
                      <h4 className="ht-pawty-form-title">Party Date & Time</h4>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Party Date *</Form.Label>
                            <Form.Control
                              type="date"
                              value={partyDate}
                              onChange={(e) => setPartyDate(e.target.value)}
                              isInvalid={!!errors.partyDate}
                              min={new Date().toISOString().split('T')[0]}
                              className="ht-pawty-form-control"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.partyDate}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Party Time *</Form.Label>
                            <Form.Select
                              value={partyTime}
                              onChange={(e) => setPartyTime(e.target.value)}
                              isInvalid={!!errors.partyTime}
                              className="ht-pawty-form-control"
                            >
                              <option value="">Select a time</option>
                              <option value="10:00">10:00 AM</option>
                              <option value="12:00">12:00 PM</option>
                              <option value="14:00">2:00 PM</option>
                              <option value="16:00">4:00 PM</option>
                              <option value="18:00">6:00 PM</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.partyTime}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>

                    <div className="ht-pawty-form-section">
                      <h4 className="ht-pawty-form-title">Package Customization</h4>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Banner Name *</Form.Label>
                            <Form.Control
                              type="text"
                              value={bannerName}
                              onChange={(e) => setBannerName(e.target.value)}
                              isInvalid={!!errors.bannerName}
                              placeholder="Name to display on birthday banner"
                              className="ht-pawty-form-control"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.bannerName}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Cake Flavor *</Form.Label>
                            <Form.Select
                              value={cakeFlavor}
                              onChange={(e) => setCakeFlavor(e.target.value)}
                              className="ht-pawty-form-control"
                            >
                              {cakeFlavors.map(flavor => (
                                <option key={flavor.value} value={flavor.value}>
                                  {flavor.label}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Pasta Pan *</Form.Label>
                            <Form.Select
                              value={pastaChoice}
                              onChange={(e) => setPastaChoice(e.target.value)}
                              className="ht-pawty-form-control"
                            >
                              <option value="baked-mac">Baked Macaroni</option>
                              <option value="chicken-alfredo">Chicken Alfredo</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Party Hat Color *</Form.Label>
                            <div className="ht-pawty-radio-group">
                              <Form.Check
                                type="radio"
                                id="blue"
                                name="hatColor"
                                value="blue"
                                checked={hatColor === 'blue'}
                                onChange={(e) => setHatColor(e.target.value)}
                                label="Blue"
                                className="ht-pawty-radio"
                              />
                              <Form.Check
                                type="radio"
                                id="pink"
                                name="hatColor"
                                value="pink"
                                checked={hatColor === 'pink'}
                                onChange={(e) => setHatColor(e.target.value)}
                                label="Pink"
                                className="ht-pawty-radio"
                              />
                            </div>
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>

                    <div className="ht-pawty-form-section">
                      <h4 className="ht-pawty-form-title">
                        ₱800 Consumables Selection
                        <span className="ht-pawty-consumables-total">Current Total: ₱{consumablesTotal}/800</span>
                      </h4>
                      
                      {errors.consumables && (
                        <Alert variant="danger" className="ht-pawty-alert-error">
                          {errors.consumables}
                        </Alert>
                      )}

                      {selectedConsumables.length > 0 && (
                        <div className="ht-pawty-selected-consumables">
                          <h5>Selected Items:</h5>
                          <div className="ht-pawty-selected-items">
                            {selectedConsumables.map(item => (
                              <div key={item.id} className="ht-pawty-selected-item">
                                <div className="ht-pawty-item-info">
                                  <span className="ht-pawty-item-name">{item.name}</span>
                                  <span className="ht-pawty-item-price">₱{item.price} × {item.quantity}</span>
                                </div>
                                <div className="ht-pawty-item-actions">
                                  <div className="ht-pawty-quantity-controls">
                                    <button 
                                      className="ht-pawty-quantity-btn"
                                      onClick={(e) => updateConsumableQuantity(e, item.id, item.quantity - 1)}
                                      type="button"
                                    >
                                      -
                                    </button>
                                    <span className="ht-pawty-quantity">{item.quantity}</span>
                                    <button 
                                      className="ht-pawty-quantity-btn"
                                      onClick={(e) => updateConsumableQuantity(e, item.id, item.quantity + 1)}
                                      type="button"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <button 
                                    className="ht-pawty-remove-item"
                                    onClick={(e) => removeConsumable(e, item.id)}
                                    type="button"
                                  >
                                    ×
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="ht-pawty-consumables-category">
                        <h5>BEVERAGES</h5>
                        <div className="ht-pawty-subcategory">
                          <h6>ICED COFFEE (16OZ)</h6>
                          <div className="ht-pawty-menu-items">
                            {menuItems.beverages
                              .filter(item => item.category === 'ICED COFFEE (16OZ)')
                              .map(item => (
                                <div 
                                  key={item.id}
                                  className={`ht-pawty-menu-item ${selectedConsumables.find(i => i.id === item.id) ? 'ht-pawty-item-selected' : ''}`}
                                  onClick={() => handleConsumableSelect(item)}
                                >
                                  <span className="ht-pawty-item-name">{item.name}</span>
                                  <span className="ht-pawty-item-price">₱{item.price}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                        <div className="ht-pawty-subcategory">
                          <h6>NON-CAFFEINE</h6>
                          <div className="ht-pawty-menu-items">
                            {menuItems.beverages
                              .filter(item => item.category === 'NON-CAFFEINE')
                              .map(item => (
                                <div 
                                  key={item.id}
                                  className={`ht-pawty-menu-item ${selectedConsumables.find(i => i.id === item.id) ? 'ht-pawty-item-selected' : ''}`}
                                  onClick={() => handleConsumableSelect(item)}
                                >
                                  <span className="ht-pawty-item-name">{item.name}</span>
                                  <span className="ht-pawty-item-price">₱{item.price}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>

                      <div className="ht-pawty-consumables-category">
                        <h5>FOOD</h5>
                        <div className="ht-pawty-subcategory">
                          <h6>RICE MEALS</h6>
                          <div className="ht-pawty-menu-items">
                            {menuItems.food
                              .filter(item => item.category === 'RICE MEALS')
                              .map(item => (
                                <div 
                                  key={item.id}
                                  className={`ht-pawty-menu-item ${selectedConsumables.find(i => i.id === item.id) ? 'ht-pawty-item-selected' : ''}`}
                                  onClick={() => handleConsumableSelect(item)}
                                >
                                  <span className="ht-pawty-item-name">{item.name}</span>
                                  <span className="ht-pawty-item-price">₱{item.price}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                        <div className="ht-pawty-subcategory">
                          <h6>SNACKS AND PASTA</h6>
                          <div className="ht-pawty-menu-items">
                            {menuItems.food
                              .filter(item => item.category === 'SNACKS AND PASTA')
                              .map(item => (
                                <div 
                                  key={item.id}
                                  className={`ht-pawty-menu-item ${selectedConsumables.find(i => i.id === item.id) ? 'ht-pawty-item-selected' : ''}`}
                                  onClick={() => handleConsumableSelect(item)}
                                >
                                  <span className="ht-pawty-item-name">{item.name}</span>
                                  <span className="ht-pawty-item-price">₱{item.price}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ht-pawty-form-section">
                      <h4 className="ht-pawty-form-title">Special Requests</h4>
                      <Form.Group className="mb-3">
                        <Form.Label>Additional Notes</Form.Label>
                        <Form.Control
                          as="textarea"
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          rows={4}
                          placeholder="Any allergies, dietary restrictions, special decoration requests, or other notes..."
                          className="ht-pawty-form-control"
                        />
                      </Form.Group>
                    </div>
                  </Form>
                  
                  <div className="ht-pawty-navigation-container">
                    <div className="ht-pawty-navigation-buttons">
                      <Button 
                        variant="outline-secondary" 
                        onClick={() => setActiveStep(1)}
                        className="ht-pawty-back-btn"
                      >
                        Back
                      </Button>
                      <Button 
                        variant="primary" 
                        onClick={handleContinueToPayment}
                        className="ht-pawty-confirm-btn"
                        disabled={!bannerName || !partyDate || !partyTime || consumablesTotal < 100}
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Step 3: Payment */}
        {!showConfirmation && activeStep === 3 && (
          <Row className="ht-pawty-service-row">
            <Col md={10} lg={8} xl={6}>
              <Card className="ht-pawty-service-card">
                <Card.Body>
                  <Card.Title className="ht-pawty-card-title">
                    Payment
                  </Card.Title>
                  <p className="ht-pawty-service-subtitle">
                    Complete your booking with payment details
                  </p>

                  <div className="ht-pawty-form-section">
                    <h4 className="ht-pawty-form-title">Booking Summary</h4>
                    
                    <div className="ht-pawty-summary-grid">
                      <div className="ht-pawty-summary-item">
                        <h5>Pet Information</h5>
                        {selectedPet && (
                          <div className="ht-pawty-summary-pet">
                            <div className={`ht-pawty-pet-avatar ${getPetTypeClass(selectedPet.type)}`}>
                              {selectedPet.type.charAt(0)}
                            </div>
                            <div className="ht-pawty-summary-pet-info">
                              <h6>{selectedPet.name}</h6>
                              <p>{selectedPet.type} • {selectedPet.breed} • {selectedPet.size}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="ht-pawty-summary-item">
                        <h5>Party Details</h5>
                        <p><strong>Date:</strong> {partyDate}</p>
                        <p><strong>Time:</strong> {partyTime}</p>
                        <p><strong>Guests:</strong> {guests}</p>
                      </div>

                      <div className="ht-pawty-summary-item">
                        <h5>Package Details</h5>
                        <p><strong>Banner:</strong> {bannerName}</p>
                        <p><strong>Cake:</strong> {cakeFlavors.find(f => f.value === cakeFlavor)?.label}</p>
                        <p><strong>Pasta:</strong> {pastaChoice === 'baked-mac' ? 'Baked Macaroni' : 'Chicken Alfredo'}</p>
                        <p><strong>Hat:</strong> {hatColor}</p>
                      </div>

                      <div className="ht-pawty-summary-item">
                        <h5>Consumables</h5>
                        {selectedConsumables.length === 0 ? (
                          <p>No items selected</p>
                        ) : (
                          <>
                            <div className="ht-pawty-consumables-summary">
                              {selectedConsumables.slice(0, 3).map(item => (
                                <div key={item.id} className="ht-pawty-consumable-summary-item">
                                  <span>{item.name} × {item.quantity}</span>
                                  <span>₱{item.price * item.quantity}</span>
                                </div>
                              ))}
                              {selectedConsumables.length > 3 && (
                                <p className="ht-pawty-consumables-more">+{selectedConsumables.length - 3} more items</p>
                              )}
                            </div>
                            <div className="ht-pawty-consumables-total-summary">
                              <strong>Total: ₱{consumablesTotal}/800</strong>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="ht-pawty-price-summary">
                      <div className="ht-pawty-package-price">
                        <h5>Package Price</h5>
                        <div className="ht-pawty-price-display ht-pawty-price-display-sm">
                          <span className="ht-pawty-price">₱2,000</span>
                          <span className="ht-pawty-price-note">/package</span>
                        </div>
                      </div>
                      
                      <div className="ht-pawty-downpayment-section">
                        <h5>Down Payment Required</h5>
                        <p className="ht-pawty-downpayment-note">
                          A down payment is required to secure your reservation. Booking is confirmed after payment verification.
                        </p>
                        
                      <div className="ht-pawty-downpayment-amount">
  <h6>Down Payment Amount *</h6>
  <div className="ht-pawty-price-display ht-pawty-price-display-xs"> {/* Changed from sm to xs */}
    <span className="ht-pawty-price">₱1,000</span>
  </div>
</div>

                        <div className="ht-pawty-payment-method">
                          <h6>Mode of Payment *</h6>
                          <Form.Select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            isInvalid={!!errors.paymentMethod}
                            className="ht-pawty-form-control"
                          >
                            <option value="">Select payment method</option>
                            <option value="cash">Cash</option>
                            <option value="gcash">GCash</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.paymentMethod}
                          </Form.Control.Feedback>
                        </div>

                        {paymentMethod === 'gcash' && (
                          <div className="ht-pawty-proof-upload">
                            <h6>Upload Proof of Payment *</h6>
                            <div className="ht-pawty-upload-area">
                              <Form.Control
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={handleFileChange}
                                className="ht-pawty-upload-input"
                                isInvalid={!!errors.paymentProof}
                              />
                              <div className="ht-pawty-upload-text">
                                {paymentProof ? (
                                  <div className="ht-pawty-file-selected">
                                    <span className="ht-pawty-file-name">{paymentProof.name}</span>
                                    <span className="ht-pawty-file-size">
                                      ({(paymentProof.size / 1024 / 1024).toFixed(2)} MB)
                                    </span>
                                  </div>
                                ) : (
                                  <>
                                    <span>Click to upload or drag and drop</span>
                                    <span className="ht-pawty-upload-format">PNG, JPG up to 5MB</span>
                                  </>
                                )}
                              </div>
                              <Form.Control.Feedback type="invalid">
                                {errors.paymentProof}
                              </Form.Control.Feedback>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="ht-pawty-processing-note">
                      After confirmation, our team will contact you within 24 hours to verify your payment.
                    </div>
                  </div>

                  <div className="ht-pawty-navigation-container">
                    <div className="ht-pawty-navigation-buttons">
                      <Button 
                        variant="outline-secondary" 
                        onClick={() => setActiveStep(2)}
                        className="ht-pawty-back-btn"
                      >
                        Back
                      </Button>
                      <Button 
                        variant="primary" 
                        onClick={handleSubmit}
                        className="ht-pawty-confirm-btn"
                        disabled={isSubmitting || (paymentMethod === 'gcash' && !paymentProof) || !paymentMethod}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="ht-pawty-spinner"></span>
                            Processing...
                          </>
                        ) : (
                          'Confirm Booking & Pay'
                        )}
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
        className="ht-pawty-pet-modal"
        centered
        size="lg"
      >
        <Modal.Header closeButton className="ht-pawty-modal-header">
          <Modal.Title>
            {isEditing ? 'Edit Pet Information' : 'Add New Pet'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="ht-pawty-modal-body">
          <div className="ht-pawty-form-section">
            <h4 className="ht-pawty-form-title">Pet Information</h4>
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
                    className="ht-pawty-form-control"
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
                    className="ht-pawty-form-control"
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
                    className="ht-pawty-form-control"
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
                    className="ht-pawty-form-control"
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
                className="ht-pawty-form-control"
              />
            </Form.Group>
          </div>

          <div className="ht-pawty-form-section">
            <h4 className="ht-pawty-form-title">Pet Parent Information</h4>
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
                    className="ht-pawty-form-control"
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
                    className="ht-pawty-form-control"
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
                className="ht-pawty-form-control"
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
                className="ht-pawty-form-control"
              />
            </Form.Group>
          </div>
          
          <div className="ht-pawty-required-note">
            * Required fields
          </div>
        </Modal.Body>
        <Modal.Footer className="ht-pawty-modal-footer">
          <div className="ht-pawty-modal-actions">
            {isEditing && (
              <Button 
                variant="outline-danger" 
                onClick={handleDeletePet}
                className="ht-pawty-delete-btn"
                disabled={pets.length <= 1}
              >
                Delete Pet
              </Button>
            )}
            <div className="ht-pawty-modal-buttons">
              <Button 
                variant="outline-secondary" 
                onClick={handleBack}
                className="ht-pawty-back-modal-btn"
              >
                Back
              </Button>
              <Button 
                variant="primary" 
                onClick={handleSavePet}
                className="ht-pawty-save-btn"
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

export default BookPawty;