import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
import Main from 'Components/pages/main/Main';
// import ViewWeatherDatas from '';
import UploadWeatherDatas from 'Components/pages/uploadWeatherDatas/UploadWeatherDatas';
import Header from 'Components/Header';
import './App.css';

function App() {
  const ViewWeatherDatas = lazy(
    () => import('Components/pages/viewWeatherDatas/ViewWeatherDatas')
  );

  return (
    <>
      <div className="app">
        <Header className="header" />

        <div className="content">
          <Suspense fallback={<p>Секунду...</p>}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/view" element={<ViewWeatherDatas />} />
              <Route path="/upload" element={<UploadWeatherDatas />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default App;
