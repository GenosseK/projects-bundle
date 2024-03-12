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
import VideoPlayer from '../Video-Player/Video-Player';
import FormValidator from '../Form-Validator/Form-Validator';
import SpockRockGame from '../Spock-Rock-Game/Spock-Rock-Game';
import NasaApod from '../NASA-APOD/NASA-APOD';
import MathSprintGame from '../Math-Sprint-Game/Math-Sprint-Game';
import DragAndDrop from '../Drag-and-Drop/Drag-and-Drop';
import Calculator from '../Calculator/Calculator';
import SplashPage from '../Splash-Page/Splash-Page';
import PaintClone from '../Paint-Clone/Paint-Clone';
import Pong from '../Pong/Pong';

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
        <Route path='video-player' element={<VideoPlayer />} />
        <Route path='form-validator' element={<FormValidator />} />
        <Route path='spock-rock-game' element={<SpockRockGame />} />
        <Route path='nasa-apod' element={<NasaApod />} />
        <Route path='math-sprint-game' element={<MathSprintGame />} />
        <Route path='drag-and-drop' element={<DragAndDrop />} />
        <Route path='calculator' element={<Calculator />} />
        <Route path='splash-page' element={<SplashPage />} />
        <Route path='paint-clone' element={<PaintClone />} />
        <Route path='pong' element={<Pong />} />
      </Routes>
    </div>
  );
}

export default App;
