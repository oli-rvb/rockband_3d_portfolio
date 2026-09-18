import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';

import Home from './pages/Home';
import Navbar from './components/Navbar';

const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

const App = () => {
  return (
    <main className="bg-slate-300/20 h-FULL">
      <Router basename="/bluesuburbhour">
        <Navbar />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </Router>
    </main>
  )
}

export default App