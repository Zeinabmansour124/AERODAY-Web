import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import IntroVD from './components/introVD';

function App() {
  return (
    <div>
      <IntroVD />
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;