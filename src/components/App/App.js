import QuoteGenerator from '../Quote-generator/Quote-generator';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import InfiniteScroll from '../Infinite-scroll/Infinite-scroll';
import PictureInPicture from '../Picture-in-Picture/Picture-in-Picture';
import JokeTeller from '../Joke-Teller/Joke-Teller';
import DarkLight from '../Dark-Light-Mode/Dark-Light-Mode';
import AnimatedTemplate from '../Animated-Template/Animated-Template';
import NavigationNation from '../Navigation-Nation/Navigation-Nation';
import MusicPlayer from '../Music-Player/Music-Player';
import CustomCountdown from '../Custom-Countdown/Custom-Countdown';
import BookKeeper from '../Book-Keeper/Book-Keeper';

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path='quote-generator' element={<QuoteGenerator />} />
        <Route path='infinite-scroll' element={<InfiniteScroll />} />
        <Route path='picture-in-picture' element={<PictureInPicture />} />
        <Route path='joke-teller' element={<JokeTeller />} />
        <Route path='dark-light' element={<DarkLight />} />
        <Route path='animated-template' element={<AnimatedTemplate />} />
        <Route path='navigation-nation' element={<NavigationNation />} />
        <Route path='music-player' element={<MusicPlayer />} />
        <Route path='custom-countdown' element={<CustomCountdown />} />
        <Route path='book-keeper' element={<BookKeeper />} />
      </Routes>
    </div>
  );
}

export default App;
