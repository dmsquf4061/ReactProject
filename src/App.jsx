import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/not-found/page';
import LandingPage from './pages/landing/page';
import KatMaconiePage from './components/pages/landing/projects/kat-maconie/page';

function App() {
  return (
    <div className="relative flex flex-col w-screen h-screen overflow-hidden">
      <BrowserRouter>
        <Routes>
          {/* 메인 페이지 */}
          <Route path='/ReactProject' element={<LandingPage />} />

          {/* KAT MACONIE 상세페이지 */}
          <Route
            path='/ReactProject/projects/kat-maconie'
            element={<KatMaconiePage />}
          />

          {/* 에러 페이지 */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App