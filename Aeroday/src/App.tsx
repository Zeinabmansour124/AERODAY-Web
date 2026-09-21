import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import IntroVD from './components/introVD';

function App() {
  return (
    // Conteneur principal : Flexbox vertical + hauteur min de l'écran
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <IntroVD />
      <Header />
      
      {/* Zone de contenu : prend tout l'espace vide restant */}
      <main style={{ flex: 1 }}>
        <AppRoutes />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;