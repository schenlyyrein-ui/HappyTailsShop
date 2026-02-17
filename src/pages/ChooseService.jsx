import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, ProgressBar, Alert } from 'react-bootstrap';
import './ChooseService.css';

const ChooseService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(2);
  const steps = ['Information', 'Choose Service', 'Schedule', 'Confirmation'];
  
  const [selectedPets, setSelectedPets] = useState([]);
  const [petCount, setPetCount] = useState(0);
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [currentPet, setCurrentPet] = useState(null);
  
  useEffect(() => {
    if (location.state) {
      setSelectedPets(location.state.selectedPets || []);
      setPetCount(location.state.petCount || 0);
      if (location.state.selectedPets && location.state.selectedPets.length > 0) {
        setCurrentPet(location.state.selectedPets[0]);
      }
    }
  }, [location.state]);

  const [showOptions, setShowOptions] = useState({
    facePaw: false,
    doggySpa: false,
    hairColor: false
  });

  const priceData = {
    Cat: {
      Small: {
        fullGrooming: '₱ 499',
        alaCarte: {
          bath: '₱ 200',
          nail: '₱ 80',
          facePaw: '₱ 150',
          dematting: '₱ 250',
          doggySpa: '₱ 250',
          hairColor: '₱ 100'
        }
      },
      Medium: {
        fullGrooming: '₱ 599',
        alaCarte: {
          bath: '₱ 250',
          nail: '₱ 100',
          facePaw: '₱ 150',
          dematting: '₱ 250',
          doggySpa: '₱ 250',
          hairColor: '₱ 120'
        }
      },
      Large: {
        fullGrooming: '₱ 849',
        alaCarte: {
          bath: '₱ 300',
          nail: '₱ 120',
          facePaw: '₱ 200',
          dematting: '₱ 350',
          doggySpa: '₱ 350',
          hairColor: '₱ 150'
        }
      },
      ExtraLarge: {
        fullGrooming: '₱ 1,049',
        alaCarte: {
          bath: '₱ 350',
          nail: '₱ 150',
          facePaw: '₱ 200',
          dematting: '₱ 450',
          doggySpa: '₱ 380',
          hairColor: '₱ 180'
        }
      }
    },
    Dog: {
      Small: {
        deluxe: {
          price: '₱ 359',
          sizes: { Small: '₱ 359', Medium: '₱ 409', Large: '₱ 709', ExtraLarge: '₱ 949' }
        },
        premium: {
          price: '₱ 499',
          sizes: { Small: '₱ 499', Medium: '₱ 599', Large: '₱ 849', ExtraLarge: '₱ 1,049' }
        },
        alaCarte: {
          bath: '₱ 200',
          nail: '₱ 80',
          facePaw: '₱ 150',
          dematting: '₱ 250',
          doggySpa: '₱ 250',
          hairColor: '₱ 100'
        }
      },
      Medium: {
        deluxe: {
          price: '₱ 409',
          sizes: { Small: '₱ 359', Medium: '₱ 409', Large: '₱ 709', ExtraLarge: '₱ 949' }
        },
        premium: {
          price: '₱ 599',
          sizes: { Small: '₱ 499', Medium: '₱ 599', Large: '₱ 849', ExtraLarge: '₱ 1,049' }
        },
        alaCarte: {
          bath: '₱ 250',
          nail: '₱ 100',
          facePaw: '₱ 150',
          dematting: '₱ 250',
          doggySpa: '₱ 250',
          hairColor: '₱ 120'
        }
      },
      Large: {
        deluxe: {
          price: '₱ 709',
          sizes: { Small: '₱ 359', Medium: '₱ 409', Large: '₱ 709', ExtraLarge: '₱ 949' }
        },
        premium: {
          price: '₱ 849',
          sizes: { Small: '₱ 499', Medium: '₱ 599', Large: '₱ 849', ExtraLarge: '₱ 1,049' }
        },
        alaCarte: {
          bath: '₱ 300',
          nail: '₱ 120',
          facePaw: '₱ 200',
          dematting: '₱ 350',
          doggySpa: '₱ 350',
          hairColor: '₱ 150'
        }
      },
      ExtraLarge: {
        deluxe: {
          price: '₱ 949',
          sizes: { Small: '₱ 359', Medium: '₱ 409', Large: '₱ 709', ExtraLarge: '₱ 949' }
        },
        premium: {
          price: '₱ 1,049',
          sizes: { Small: '₱ 499', Medium: '₱ 599', Large: '₱ 849', ExtraLarge: '₱ 1,049' }
        },
        alaCarte: {
          bath: '₱ 350',
          nail: '₱ 150',
          facePaw: '₱ 200',
          dematting: '₱ 450',
          doggySpa: '₱ 380',
          hairColor: '₱ 180'
        }
      }
    }
  };

  const serviceDescriptions = {
    Cat: {
      fullGrooming: 'Includes: Haircut, Bath & dry, Ear cleaning with hair pull, Nail trim with nail file, Teeth brushing, Cologne spray + FREE cat stick tuna snack'
    },
    Dog: {
      premium: 'Includes: Haircut, Bath & dry, Anal sac drain, Ear cleaning with hair pull, Nail trim with nail file, Teeth brushing, Dematting, Cologne spray + FREE puppuccino',
      deluxe: 'Includes: Haircut, Bath & dry, Anal sac drain, Ear cleaning with hair pull, Nail trim with nail file, Teeth brushing, Cologne spray + FREE doggie biscuit'
    }
  };

  const dogHaircutOptions = {
    premium: [
      { id: 'asian', label: 'Asian Fusion' },
      { id: 'puppy', label: 'Puppy Cut' },
      { id: 'bear', label: 'Bear cut' },
      { id: 'poodle', label: 'Poodle cut' }
    ],
    deluxe: [
      { id: 'summer', label: 'Summer cut' },
      { id: 'shave', label: 'Shave down' },
      { id: 'sanitary', label: 'Sanitary' }
    ]
  };

  const [selectedServices, setSelectedServices] = useState({
    groomingType: '', // Empty by default for both cats and dogs
    haircut: '', // Empty by default
    alaCarte: [],
    doggySpaScent: '',
    facePawChoice: '',
    petHairColor: ''
  });

  useEffect(() => {
    if (currentPet) {
      setSelectedServices({
        groomingType: '', // Reset to empty for each pet
        haircut: '', // Reset to empty
        alaCarte: [],
        doggySpaScent: '',
        facePawChoice: '',
        petHairColor: ''
      });
    }
  }, [currentPet]);

  const getCurrentPetPrices = () => {
    if (!currentPet) return null;
    const type = currentPet.type;
    const size = currentPet.size;
    return priceData[type]?.[size] || null;
  };

  const getCurrentHaircutOptions = () => {
    if (!currentPet || currentPet.type === 'Cat') return [];
    return dogHaircutOptions[selectedServices.groomingType] || [];
  };

  const handleGroomingSelect = (id) => {
    if (currentPet.type === 'Cat') {
      // For cats, use boolean flag for fullGrooming
      setSelectedServices(prev => ({
        ...prev,
        fullGrooming: prev.groomingType === 'fullGrooming' ? false : true,
        groomingType: prev.groomingType === 'fullGrooming' ? '' : 'fullGrooming',
        haircut: '' // Clear haircut when grooming type changes
      }));
    } else if (currentPet.type === 'Dog') {
      setSelectedServices(prev => ({
        ...prev,
        groomingType: prev.groomingType === id ? '' : id,
        haircut: '' // Clear haircut when grooming type changes
      }));
    }
  };

  const handleHaircutSelect = (id) => {
    const haircutLabel = getCurrentHaircutOptions().find(opt => opt.id === id)?.label || '';
    setSelectedServices(prev => ({
      ...prev,
      haircut: prev.haircut === haircutLabel ? '' : haircutLabel
    }));
  };

  // Show options for conditional services
  const showOptionsHandler = (serviceId) => {
    setShowOptions(prev => ({
      ...prev,
      [serviceId]: true
    }));
  };

  const handleAlaCarteToggle = (id) => {
    // Regular services can be toggled directly
    if (id === 'bath' || id === 'nail' || id === 'dematting') {
      setSelectedServices(prev => ({
        ...prev,
        alaCarte: prev.alaCarte.includes(id) 
          ? prev.alaCarte.filter(item => item !== id)
          : [...prev.alaCarte, id]
      }));
    } 
    // Conditional services: show options when clicked if not already selected
    else if (id === 'facePaw' || id === 'doggySpa' || id === 'hairColor') {
      // If already selected, deselect it
      if (selectedServices.alaCarte.includes(id)) {
        setSelectedServices(prev => {
          const newAlaCarte = prev.alaCarte.filter(item => item !== id);
          let newState = { ...prev, alaCarte: newAlaCarte };
          
          if (id === 'facePaw') {
            newState.facePawChoice = '';
          }
          if (id === 'doggySpa') {
            newState.doggySpaScent = '';
          }
          if (id === 'hairColor') {
            newState.petHairColor = '';
          }
          
          return newState;
        });
      } 
      // If not selected, show options
      else {
        showOptionsHandler(id);
      }
    }
  };

  const handleFacePawSelect = (choice) => {
    setSelectedServices(prev => {
      const newChoice = prev.facePawChoice === choice ? '' : choice;
      
      const shouldAddToAlaCarte = newChoice && !prev.alaCarte.includes('facePaw');
      const newAlaCarte = shouldAddToAlaCarte 
        ? [...prev.alaCarte, 'facePaw']
        : prev.alaCarte;
      
      const shouldRemoveFromAlaCarte = !newChoice && prev.alaCarte.includes('facePaw');
      const finalAlaCarte = shouldRemoveFromAlaCarte
        ? prev.alaCarte.filter(item => item !== 'facePaw')
        : newAlaCarte;
      
      return {
        ...prev,
        facePawChoice: newChoice,
        alaCarte: finalAlaCarte
      };
    });
  };

  const handleHairColorSelect = (choice) => {
    setSelectedServices(prev => {
      const newChoice = prev.petHairColor === choice ? '' : choice;
      
      const shouldAddToAlaCarte = newChoice && !prev.alaCarte.includes('hairColor');
      const newAlaCarte = shouldAddToAlaCarte 
        ? [...prev.alaCarte, 'hairColor']
        : prev.alaCarte;
      
      const shouldRemoveFromAlaCarte = !newChoice && prev.alaCarte.includes('hairColor');
      const finalAlaCarte = shouldRemoveFromAlaCarte
        ? prev.alaCarte.filter(item => item !== 'hairColor')
        : newAlaCarte;
      
      return {
        ...prev,
        petHairColor: newChoice,
        alaCarte: finalAlaCarte
      };
    });
  };

  const handleDoggySpaScentSelect = (scent) => {
    setSelectedServices(prev => {
      const newScent = prev.doggySpaScent === scent ? '' : scent;
      
      const shouldAddToAlaCarte = newScent && !prev.alaCarte.includes('doggySpa');
      const newAlaCarte = shouldAddToAlaCarte 
        ? [...prev.alaCarte, 'doggySpa']
        : prev.alaCarte;
      
      const shouldRemoveFromAlaCarte = !newScent && prev.alaCarte.includes('doggySpa');
      const finalAlaCarte = shouldRemoveFromAlaCarte
        ? prev.alaCarte.filter(item => item !== 'doggySpa')
        : newAlaCarte;
      
      return {
        ...prev,
        doggySpaScent: newScent,
        alaCarte: finalAlaCarte
      };
    });
  };

  const handleStepClick = (stepNumber) => {
    console.log('Step clicked:', stepNumber);
    
    switch(stepNumber) {
      case 1:
        navigate('/booking', { state: location.state });
        break;
      case 2:
        setActiveStep(2);
        break;
      case 3:
        navigate('/schedule', { 
          state: { 
            selectedPets: selectedPets || [],
            petCount: petCount || 0,
            selectedServices: selectedServices,
            currentPet: currentPet || selectedPets?.[0]
          } 
        });
        break;
      case 4:
        alert('Please schedule an appointment first.');
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    navigate('/booking');
  };

  const handleNextPet = () => {
    if (currentPetIndex < selectedPets.length - 1) {
      const nextIndex = currentPetIndex + 1;
      setCurrentPetIndex(nextIndex);
      setCurrentPet(selectedPets[nextIndex]);
    }
  };

  const handlePrevPet = () => {
    if (currentPetIndex > 0) {
      const prevIndex = currentPetIndex - 1;
      setCurrentPetIndex(prevIndex);
      setCurrentPet(selectedPets[prevIndex]);
    }
  };

  const handleContinue = () => {
    console.log('Selected Services for all pets:', selectedServices);
    
    navigate('/schedule', { 
      state: { 
        selectedPets: selectedPets || [],
        petCount: petCount || 0,
        selectedServices: selectedServices,
        currentPet: currentPet || selectedPets?.[0]
      } 
    });
  };

  const currentPrices = getCurrentPetPrices();
  const haircutOptionsList = getCurrentHaircutOptions();

  if (!currentPet || !currentPrices) {
    return (
      <div className="ht-choose-service">
        <Container className="ht-service-container">
          <Alert variant="warning">
            No pet selected. Please go back and select a pet.
          </Alert>
          <Button onClick={handleBack} className="mt-3">
            Back to Pet Selection
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="ht-choose-service">
      <Container className="ht-service-container">
        <Row className="ht-service-title-row">
          <Col>
            <h1 className="ht-service-main-title">Choose Service</h1>
            <p className="ht-service-subtitle">
              Select the grooming service for {currentPet.name} ({currentPet.type} - {currentPet.size})
            </p>
          </Col>
        </Row>

        {petCount > 1 && (
          <Row className="ht-service-pet-navigation">
            <Col>
              <div className="ht-service-pet-nav">
                <Button 
                  variant="outline-secondary" 
                  onClick={handlePrevPet}
                  disabled={currentPetIndex === 0}
                  className="ht-service-pet-nav-btn"
                >
                  ← Previous Pet
                </Button>
                <div className="ht-service-pet-counter">
                  Pet {currentPetIndex + 1} of {petCount}: {currentPet.name}
                </div>
                <Button 
                  variant="outline-secondary" 
                  onClick={handleNextPet}
                  disabled={currentPetIndex === petCount - 1}
                  className="ht-service-pet-nav-btn"
                >
                  Next Pet →
                </Button>
              </div>
            </Col>
          </Row>
        )}

        <Row className="ht-service-progress-row">
          <Col>
            <div className="ht-service-progress-steps">
              <ProgressBar now={50} className="ht-service-progress-bar" />
              <div className="ht-service-step-indicators">
                {steps.map((step, index) => {
                  const stepNumber = index + 1;
                  const isClickable = stepNumber <= 3;
                  
                  return (
                    <div 
                      key={index} 
                      className={`ht-service-step ${stepNumber === activeStep ? 'ht-service-step-active' : ''} ${isClickable ? 'ht-service-step-clickable' : ''}`}
                      onClick={() => isClickable && handleStepClick(stepNumber)}
                    >
                      <div className="ht-service-step-circle">
                        <span>{stepNumber}</span>
                      </div>
                      <span className="ht-service-step-label">{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>

        <Row className="ht-service-content-row">
          <Col lg={10} xl={8} className="mx-auto">
            <Card className="ht-service-card">
              <Card.Body className="ht-service-card-body">
                
                <div className="ht-service-section">
                  <h3 className="ht-service-section-title">
                    {currentPet.type === 'Cat' ? 'Cat Grooming' : 'Dog Full Grooming Packages'}
                  </h3>
                  
                  {currentPet.type === 'Cat' ? (
                    <div className="ht-service-options-grid">
                      <div 
                        className={`ht-service-option-card ${selectedServices.groomingType === 'fullGrooming' ? 'ht-service-option-selected' : ''}`}
                        onClick={() => handleGroomingSelect('fullGrooming')}
                      >
                        <div className="ht-service-option-header">
                          <h4 className="ht-service-option-title">Cat Grooming</h4>
                          {selectedServices.groomingType === 'fullGrooming' && (
                            <div className="ht-service-option-checkmark">✓</div>
                          )}
                        </div>
                        <p className="ht-service-option-description">
                          {serviceDescriptions.Cat.fullGrooming}
                        </p>
                        <div className="ht-service-option-price">
                          <span className="ht-service-price">{currentPrices.fullGrooming}</span>
                          <span className="ht-service-size">• {currentPet.size}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="ht-service-options-grid">
                      <div 
                        className={`ht-service-option-card ${selectedServices.groomingType === 'premium' ? 'ht-service-option-selected' : ''}`}
                        onClick={() => handleGroomingSelect('premium')}
                      >
                        <div className="ht-service-option-header">
                          <h4 className="ht-service-option-title">Dog Full Grooming – Premium</h4>
                          {selectedServices.groomingType === 'premium' && (
                            <div className="ht-service-option-checkmark">✓</div>
                          )}
                        </div>
                        <p className="ht-service-option-description">
                          {serviceDescriptions.Dog.premium}
                        </p>
                        <div className="ht-service-option-price">
                          <span className="ht-service-price">{currentPrices.premium.price}</span>
                          <span className="ht-service-size">• {currentPet.size}</span>
                        </div>
                      </div>
                      
                      <div 
                        className={`ht-service-option-card ${selectedServices.groomingType === 'deluxe' ? 'ht-service-option-selected' : ''}`}
                        onClick={() => handleGroomingSelect('deluxe')}
                      >
                        <div className="ht-service-option-header">
                          <h4 className="ht-service-option-title">Dog Full Grooming – Deluxe</h4>
                          {selectedServices.groomingType === 'deluxe' && (
                            <div className="ht-service-option-checkmark">✓</div>
                          )}
                        </div>
                        <p className="ht-service-option-description">
                          {serviceDescriptions.Dog.deluxe}
                        </p>
                        <div className="ht-service-option-price">
                          <span className="ht-service-price">{currentPrices.deluxe.price}</span>
                          <span className="ht-service-size">• {currentPet.size}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {currentPet.type === 'Dog' && selectedServices.groomingType && (
                  <>
                    <div className="ht-service-divider"></div>

                    <div className="ht-service-section">
                      <h3 className="ht-service-section-title">Haircut Style</h3>
                      <div className="ht-service-checkbox-grid">
                        {haircutOptionsList.map(option => (
                          <div 
                            key={option.id}
                            className="ht-service-checkbox-item"
                            onClick={() => handleHaircutSelect(option.id)}
                          >
                            <div className={`ht-service-checkbox ${selectedServices.haircut === option.label ? 'ht-service-checkbox-checked' : ''}`}>
                              {selectedServices.haircut === option.label && '✓'}
                            </div>
                            <span className="ht-service-checkbox-label">{option.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="ht-service-divider"></div>

                <div className="ht-service-section">
                  <h3 className="ht-service-section-title">Ala Carte Services</h3>
                  <div className="ht-service-ala-carte-grid">
                    <div 
                      className="ht-service-ala-carte-item"
                      onClick={() => handleAlaCarteToggle('bath')}
                    >
                      <div className="ht-service-ala-carte-left">
                        <div className={`ht-service-checkbox ${selectedServices.alaCarte.includes('bath') ? 'ht-service-checkbox-checked' : ''}`}>
                          {selectedServices.alaCarte.includes('bath') && '✓'}
                        </div>
                        <span className="ht-service-ala-carte-label">Bath & blowdry</span>
                      </div>
                      <div className="ht-service-ala-carte-price">
                        <span className="ht-service-price">{currentPrices.alaCarte.bath}</span>
                        <span className="ht-service-size"> - {currentPet.size}</span>
                      </div>
                    </div>

                    <div 
                      className="ht-service-ala-carte-item"
                      onClick={() => handleAlaCarteToggle('nail')}
                    >
                      <div className="ht-service-ala-carte-left">
                        <div className={`ht-service-checkbox ${selectedServices.alaCarte.includes('nail') ? 'ht-service-checkbox-checked' : ''}`}>
                          {selectedServices.alaCarte.includes('nail') && '✓'}
                        </div>
                        <span className="ht-service-ala-carte-label">Nail clip with nail file</span>
                      </div>
                      <div className="ht-service-ala-carte-price">
                        <span className="ht-service-price">{currentPrices.alaCarte.nail}</span>
                        <span className="ht-service-size"> - {currentPet.size}</span>
                      </div>
                    </div>

                    <div className="ht-service-ala-carte-group">
                      <div 
                        className={`ht-service-ala-carte-item ht-service-ala-carte-group-header ${selectedServices.alaCarte.includes('facePaw') ? 'ht-service-option-selected' : ''}`}
                        onClick={() => handleAlaCarteToggle('facePaw')}
                      >
                        <div className="ht-service-ala-carte-left">
                          <div className={`ht-service-checkbox ${selectedServices.alaCarte.includes('facePaw') ? 'ht-service-checkbox-checked' : ''}`}>
                            {selectedServices.alaCarte.includes('facePaw') && '✓'}
                          </div>
                          <span className="ht-service-ala-carte-label">Face trim / Paw trim (Choose one)</span>
                        </div>
                        <div className="ht-service-ala-carte-price">
                          <span className="ht-service-price">{currentPrices.alaCarte.facePaw}</span>
                          <span className="ht-service-size"> - {currentPet.size}</span>
                        </div>
                      </div>
                      
                      {/* Options stay open after clicking */}
                      {(showOptions.facePaw || selectedServices.alaCarte.includes('facePaw')) && (
                        <div className="ht-service-ala-carte-suboptions">
                          <div className="ht-service-suboption-group">
                            <div className="ht-service-suboption-title">Choose one:</div>
                            <div className="ht-service-checkbox-grid-small">
                              <div 
                                className="ht-service-checkbox-item"
                                onClick={() => handleFacePawSelect('Face trim')}
                              >
                                <div className={`ht-service-checkbox ${selectedServices.facePawChoice === 'Face trim' ? 'ht-service-checkbox-checked' : ''}`}>
                                  {selectedServices.facePawChoice === 'Face trim' && '✓'}
                                </div>
                                <span className="ht-service-checkbox-label">Face trim</span>
                              </div>
                              <div 
                                className="ht-service-checkbox-item"
                                onClick={() => handleFacePawSelect('Paw trim')}
                              >
                                <div className={`ht-service-checkbox ${selectedServices.facePawChoice === 'Paw trim' ? 'ht-service-checkbox-checked' : ''}`}>
                                  {selectedServices.facePawChoice === 'Paw trim' && '✓'}
                                </div>
                                <span className="ht-service-checkbox-label">Paw trim</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div 
                      className="ht-service-ala-carte-item"
                      onClick={() => handleAlaCarteToggle('dematting')}
                    >
                      <div className="ht-service-ala-carte-left">
                        <div className={`ht-service-checkbox ${selectedServices.alaCarte.includes('dematting') ? 'ht-service-checkbox-checked' : ''}`}>
                          {selectedServices.alaCarte.includes('dematting') && '✓'}
                        </div>
                        <span className="ht-service-ala-carte-label">Dematting</span>
                      </div>
                      <div className="ht-service-ala-carte-price">
                        <span className="ht-service-price">{currentPrices.alaCarte.dematting}</span>
                        <span className="ht-service-size"> - {currentPet.size}</span>
                      </div>
                    </div>

                    <div className="ht-service-ala-carte-group">
                      <div 
                        className={`ht-service-ala-carte-item ht-service-ala-carte-group-header ${selectedServices.alaCarte.includes('doggySpa') ? 'ht-service-option-selected' : ''}`}
                        onClick={() => handleAlaCarteToggle('doggySpa')}
                      >
                        <div className="ht-service-ala-carte-left">
                          <div className={`ht-service-checkbox ${selectedServices.alaCarte.includes('doggySpa') ? 'ht-service-checkbox-checked' : ''}`}>
                            {selectedServices.alaCarte.includes('doggySpa') && '✓'}
                          </div>
                          <span className="ht-service-ala-carte-label">Doggy spa</span>
                        </div>
                        <div className="ht-service-ala-carte-price">
                          <span className="ht-service-price">{currentPrices.alaCarte.doggySpa}</span>
                          <span className="ht-service-size"> - {currentPet.size}</span>
                        </div>
                      </div>
                      
                      {/* Options stay open after clicking */}
                      {(showOptions.doggySpa || selectedServices.alaCarte.includes('doggySpa')) && (
                        <div className="ht-service-ala-carte-suboptions">
                          <div className="ht-service-suboption-group">
                            <div className="ht-service-suboption-title">Choose scent:</div>
                            <div className="ht-service-checkbox-grid-small">
                              <div 
                                className="ht-service-checkbox-item"
                                onClick={() => handleDoggySpaScentSelect('Sakura')}
                              >
                                <div className={`ht-service-checkbox ${selectedServices.doggySpaScent === 'Sakura' ? 'ht-service-checkbox-checked' : ''}`}>
                                  {selectedServices.doggySpaScent === 'Sakura' && '✓'}
                                </div>
                                <span className="ht-service-checkbox-label">Sakura</span>
                              </div>
                              <div 
                                className="ht-service-checkbox-item"
                                onClick={() => handleDoggySpaScentSelect('Green Tea')}
                              >
                                <div className={`ht-service-checkbox ${selectedServices.doggySpaScent === 'Green Tea' ? 'ht-service-checkbox-checked' : ''}`}>
                                  {selectedServices.doggySpaScent === 'Green Tea' && '✓'}
                                </div>
                                <span className="ht-service-checkbox-label">Green Tea</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="ht-service-ala-carte-group">
                      <div 
                        className={`ht-service-ala-carte-item ht-service-ala-carte-group-header ${selectedServices.alaCarte.includes('hairColor') ? 'ht-service-option-selected' : ''}`}
                        onClick={() => handleAlaCarteToggle('hairColor')}
                      >
                        <div className="ht-service-ala-carte-left">
                          <div className={`ht-service-checkbox ${selectedServices.alaCarte.includes('hairColor') ? 'ht-service-checkbox-checked' : ''}`}>
                            {selectedServices.alaCarte.includes('hairColor') && '✓'}
                          </div>
                          <span className="ht-service-ala-carte-label">Pet hair color</span>
                        </div>
                        <div className="ht-service-ala-carte-price">
                          <span className="ht-service-price">{currentPrices.alaCarte.hairColor}</span>
                          <span className="ht-service-size"> - {currentPet.size}</span>
                        </div>
                      </div>
                      
                      {/* Options stay open after clicking */}
                      {(showOptions.hairColor || selectedServices.alaCarte.includes('hairColor')) && (
                        <div className="ht-service-ala-carte-suboptions">
                          <div className="ht-service-suboption-group">
                            <div className="ht-service-suboption-title">Choose one:</div>
                            <div className="ht-service-checkbox-grid-small">
                              <div 
                                className="ht-service-checkbox-item"
                                onClick={() => handleHairColorSelect('Ears & Tails only')}
                              >
                                <div className={`ht-service-checkbox ${selectedServices.petHairColor === 'Ears & Tails only' ? 'ht-service-checkbox-checked' : ''}`}>
                                  {selectedServices.petHairColor === 'Ears & Tails only' && '✓'}
                                </div>
                                <span className="ht-service-checkbox-label">Ears & Tails only</span>
                              </div>
                              <div 
                                className="ht-service-checkbox-item"
                                onClick={() => handleHairColorSelect('Paws only')}
                              >
                                <div className={`ht-service-checkbox ${selectedServices.petHairColor === 'Paws only' ? 'ht-service-checkbox-checked' : ''}`}>
                                  {selectedServices.petHairColor === 'Paws only' && '✓'}
                                </div>
                                <span className="ht-service-checkbox-label">Paws only</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="ht-service-button-container">
                  <div className="ht-service-buttons">
                    <Button 
                      variant="outline-secondary" 
                      onClick={handleBack}
                      className="ht-service-back-btn"
                    >
                      Back
                    </Button>
                    {petCount > 1 && currentPetIndex < petCount - 1 ? (
                      <Button 
                        variant="primary" 
                        onClick={handleNextPet}
                        className="ht-service-continue-btn"
                      >
                        Next Pet
                      </Button>
                    ) : (
                      <Button 
                        variant="primary" 
                        onClick={handleContinue}
                        className="ht-service-continue-btn"
                      >
                        Continue
                      </Button>
                    )}
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

export default ChooseService;