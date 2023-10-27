import QuoteGenerator from '../Quote-generator/Quote-generator';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import InfiniteScroll from '../Infinite-scroll/Infinite-scroll';
import PictureInPicture from '../Pictire-in-Picture/Pictire-in-Picture';

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path='quote-generator' element={<QuoteGenerator />} />
        <Route path='infinite-scroll' element={<InfiniteScroll />} />
        <Route path='picture-in-picture' element={<PictureInPicture />} />
      </Routes>
    </div>
  );
}

export default App;
