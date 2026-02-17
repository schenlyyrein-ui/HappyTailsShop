import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './bdaypawty.css';

const BdayPawty = () => {
  const navigate = useNavigate();

  const handleBookPawty = () => {
    navigate('/bookpawty');
  };

  const handleBookConsumables = () => {
    navigate('/bookpawty');
  };

  const handleLearnMore = () => {
    console.log('✅ Learn More button clicked!');
    const celebrateSection = document.querySelector('.bdaypawty-celebrate-section');
    if (celebrateSection) {
      celebrateSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bdaypawty-main">
      {/* HERO SECTION */}
      <section className="bdaypawty-hero-section">
        <div className="bdaypawty-hero-background">
          <div 
            className="bdaypawty-background-image"
            style={{ 
              backgroundImage: 'url("src/assets/pawty.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="bdaypawty-photo-placeholder"></div>
          </div>
          <div className="bdaypawty-background-overlay"></div>
        </div>
        
        <Container className="bdaypawty-hero-container">
          <Row className="bdaypawty-hero-row">
            <Col lg={12} className="text-center">
              <div className="bdaypawty-hero-content">
                <h1 className="bdaypawty-hero-title">
                  <span className="bdaypawty-hero-birthday">BIRTHDAY PAWTY</span>
                </h1>
                <div className="bdaypawty-hero-subtitle-wrapper">
                  <p className="bdaypawty-hero-subtitle">
                    Celebrate your pet's special day with themed setups, tasty treats, and paw-some memories to last forever.
                  </p>
                </div>
                <div className="bdaypawty-hero-buttons">
                  <Button 
                    className="bdaypawty-hero-book-btn"
                    onClick={handleBookPawty}
                  >
                    Book Now
                  </Button>
                  <Button 
                    className="bdaypawty-hero-learn-btn"
                    onClick={handleLearnMore}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CELEBRATE SECTION */}
      <section className="bdaypawty-celebrate-section">
        <Container>
          <div className="bdaypawty-section-header">
            <h2 className="bdaypawty-section-title">Barkday or Meowday Party!</h2>
            <p className="bdaypawty-section-intro">
              Whether it's a barkday for your dog or a meowday for your cat, we've got the perfect celebration ready!
            </p>
          </div>

          <Row className="bdaypawty-gallery-row">
            <Col md={3} sm={6} className="bdaypawty-gallery-col">
              <div 
                className="bdaypawty-photo-placeholder-gallery"
                style={{ 
                  backgroundImage: 'url("src/assets/pawty1.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
            </Col>
            <Col md={3} sm={6} className="bdaypawty-gallery-col">
              <div 
                className="bdaypawty-photo-placeholder-gallery"
                style={{ 
                  backgroundImage: 'url("src/assets/pawty2.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
            </Col>
            <Col md={3} sm={6} className="bdaypawty-gallery-col">
              <div 
                className="bdaypawty-photo-placeholder-gallery"
                style={{ 
                  backgroundImage: 'url("src/assets/pawty3.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
            </Col>
            <Col md={3} sm={6} className="bdaypawty-gallery-col">
              <div 
                className="bdaypawty-photo-placeholder-gallery"
                style={{ 
                  backgroundImage: 'url("src/assets/pawty4.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
            </Col>
          </Row>

          <div className="bdaypawty-celebrate-text">
            <h3 className="bdaypawty-celebrate-title">CELEBRATE IT WITH US</h3>
            <p className="bdaypawty-celebrate-desc">
              Create unforgettable memories with your furry friend on their special day
            </p>
          </div>
        </Container>
      </section>

      {/* INCLUSIONS SECTION */}
      <section className="bdaypawty-inclusions-section">
        <Container>
          <div className="bdaypawty-section-header">
            <h2 className="bdaypawty-section-title">Barkday or Meowday Pawty Package</h2>
            <div className="bdaypawty-price-tag">
              <span className="bdaypawty-price-currency">₱</span>
              <span className="bdaypawty-price-amount">2,000</span>
              <span className="bdaypawty-price-duration">/package</span>
            </div>
          </div>

          <Row className="bdaypawty-package-details">
            {/* INCLUSIONS CARD - Full width */}
            <Col lg={12} className="bdaypawty-inclusions-col">
              <div className="bdaypawty-inclusions-card">
                <h3 className="bdaypawty-inclusions-title">Inclusions:</h3>
                <ul className="bdaypawty-inclusions-list">
                  <li className="bdaypawty-inclusion-item">
                    One (1) dog or cat cake with candle (choice between Squash & banana flavor or Carrot with peanut butter flavor or Tuna flavor for cats)
                  </li>
                  <li className="bdaypawty-inclusion-item">
                    ₱800 worth of consumable at the cafe drinks and food menu
                  </li>
                  <li className="bdaypawty-inclusion-item">
                    Party decoration and banner with pet celebrant's name
                  </li>
                  <li className="bdaypawty-inclusion-item">
                    Choice of pasta pan (Baked Mac/Chicken Alfredo) good for 4-5 pax
                  </li>
                  <li className="bdaypawty-inclusion-item">
                    1 birthday party hat for pet (Blue or pink color)
                  </li>
                  <li className="bdaypawty-inclusion-item">
                    Exclusive use of the cafe area for 2 hours
                  </li>
                </ul>
                <Button 
                  className="bdaypawty-book-btn bdaypawty-book-package-btn"
                  onClick={handleBookPawty}
                >
                  Book Now
                </Button>
              </div>
            </Col>

            {/* CONSUMABLES MENU CARD - Full width below inclusions */}
            <Col lg={12} className="bdaypawty-menu-col">
              <div className="bdaypawty-menu-card">
                <h3 className="bdaypawty-menu-title">₱800 Consumables Menu</h3>
                <div className="bdaypawty-menu-content">
                  {/* BEVERAGES SECTION */}
                  <div className="bdaypawty-menu-category">
                    <h4 className="bdaypawty-category-title">BEVERAGES</h4>
                    
                    <div className="bdaypawty-category-subsection">
                      <h5 className="bdaypawty-subcategory-title">ICED COFFEE (16OZ)</h5>
                      <div className="bdaypawty-menu-items">
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Americano</span>
                          <span className="bdaypawty-item-price">P100</span>
                        </div>
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Cafe Latte</span>
                          <span className="bdaypawty-item-price">P120</span>
                        </div>
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Caramel Macchiato</span>
                          <span className="bdaypawty-item-price">P145</span>
                        </div>
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Iced Matcha Latte</span>
                          <span className="bdaypawty-item-price">P135</span>
                        </div>
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Spanish Latte</span>
                          <span className="bdaypawty-item-price">P140</span>
                        </div>
                      </div>
                    </div>

                    <div className="bdaypawty-category-subsection">
                      <h5 className="bdaypawty-subcategory-title">NON-CAFFEINE</h5>
                      <div className="bdaypawty-menu-items">
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Four Seasons</span>
                          <span className="bdaypawty-item-price">P90</span>
                        </div>
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Hot Chocolate</span>
                          <span className="bdaypawty-item-price">P110</span>
                        </div>
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Iced Choco Milk</span>
                          <span className="bdaypawty-item-price">P120</span>
                        </div>
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Strawberry Milk</span>
                          <span className="bdaypawty-item-price">P130</span>
                        </div>
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Blueberry Soda</span>
                          <span className="bdaypawty-item-price">P150</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FOOD SECTION */}
                  <div className="bdaypawty-menu-category">
                    <h4 className="bdaypawty-category-title">FOOD</h4>
                    
                    <div className="bdaypawty-category-subsection">
                      <h5 className="bdaypawty-subcategory-title">RICE MEALS</h5>
                      <div className="bdaypawty-menu-items">
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Breaded Fish Fillet</span>
                          <span className="bdaypawty-item-price">P140</span>
                        </div>
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Burger Steak</span>
                          <span className="bdaypawty-item-price">P150</span>
                        </div>
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Chicken Cordon Bleu</span>
                          <span className="bdaypawty-item-price">P160</span>
                        </div>
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Chicken Fillet</span>
                          <span className="bdaypawty-item-price">P170</span>
                        </div>
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Hungarian Sausage</span>
                          <span className="bdaypawty-item-price">P180</span>
                        </div>
                      </div>
                    </div>

                    <div className="bdaypawty-category-subsection">
                      <h5 className="bdaypawty-subcategory-title">SNACKS AND PASTA</h5>
                      <div className="bdaypawty-menu-items">
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Baked Macaroni</span>
                          <span className="bdaypawty-item-price">P190</span>
                        </div>
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Chicken Alfredo</span>
                          <span className="bdaypawty-item-price">P190</span>
                        </div>
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Cheesy Beef Burger</span>
                          <span className="bdaypawty-item-price">P190</span>
                        </div>
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Chicken Popcorn</span>
                          <span className="bdaypawty-item-price">P150</span>
                        </div>
                        <div className="bdaypawty-menu-item">
                          <span className="bdaypawty-item-name">Fish and Fries</span>
                          <span className="bdaypawty-item-price">P200</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button 
                  className="bdaypawty-book-btn bdaypawty-book-menu-btn"
                  onClick={handleBookConsumables}
                >
                  Book Now
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default BdayPawty;