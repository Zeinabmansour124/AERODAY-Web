import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';  // ✅ Import complet

// Import des styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';  // ✅ N'oubliez pas le style pour l'effet fade


// Vos images (à adapter selon votre projet)
import slide1 from '../../../assets/images/slide1.png';
import slide2 from '../../../assets/images/slide2.png';
import slide3 from '../../../assets/images/slide3.png';
function Carousel(){
    const slides = [
    {
      id: 1,
      image: slide1,
     /* title: 'Promotion Exceptionnelle',
      description: 'Jusqu\'à -50% sur toute la collection',
      buttonText: 'Voir l\'offre',*/
      
    },
    {
      id: 2,
      image: slide2,
     /* title: 'Nouveautés Printemps',
      description: 'Découvrez notre nouvelle collection',
      buttonText: 'Découvrir',*/
      
    },
    {
      id: 3,
      image: slide3,
      /* title: 'Soldes d\'Été',
      description: 'Profitez des meilleurs prix',
      buttonText: 'Acheter maintenant',*/
      
    }
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      spaceBetween={0}
      slidesPerView={1}
      navigation={true}
      pagination={{ 
        clickable: true,
        dynamicBullets: true
      }}
      autoplay={{
        delay: 2000,        // Change toutes les 2   secondes
        disableOnInteraction: false, // Continue après interaction
        pauseOnMouseEnter: true // S'arrête au survol
      }}
      effect="fade"          // Transition en fondu (plus élégant)
      loop={true}            // Boucle infinie
      speed={100}            // Vitesse de transition
      className="mySwiper"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="slide-content">
            <img 
              src={slide.image} 
              //alt={slide.title}
              className="slide-image"
            />
            <div className="slide-overlay">
              <div className="slide-text">
                {/* <h2>{slide.title}</h2> 
                <p>{slide.description}</p>*/}
                <a>
                  {/* {slide.buttonText} */}
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel

