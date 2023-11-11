import { useState } from 'react';
import './Navigation-Nation.css';

function NavigationNation() {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleItemClick = () => {
        toggleMenu();
    }

    return (
        <main className='navigation-nation'>

            <div className={`nav__overlay ${menuOpen ? 'nav__overlay_slide-right' : 'nav__overlay_slide-left'}`}>
                <nav className='nav__section'>
                    <ul className='nav__list'>
                        <li className={`list__item ${menuOpen ? 'slide-in-1' : 'slide-out-1'}`}><a className='item__anchor' href='#home' onClick={handleItemClick}>Home</a></li>
                        <li className={`list__item ${menuOpen ? 'slide-in-2' : 'slide-out-2'}`}><a className='item__anchor' href='#about' onClick={handleItemClick}>About</a></li>
                        <li className={`list__item ${menuOpen ? 'slide-in-3' : 'slide-out-3'}`}><a className='item__anchor' href='#skills' onClick={handleItemClick}>Skills</a></li>
                        <li className={`list__item ${menuOpen ? 'slide-in-4' : 'slide-out-4'}`}><a className='item__anchor' href='#projects' onClick={handleItemClick}>Projects</a></li>
                        <li className={`list__item ${menuOpen ? 'slide-in-5' : 'slide-out-5'}`}><a className='item__anchor' href='#contact' onClick={handleItemClick}>Contact</a></li>
                    </ul>
                </nav>
            </div>

            <div className={`menu-bars ${menuOpen ? 'change' : ''}`} onClick={toggleMenu}>
                <div className='bar1'></div>
                <div className='bar2'></div>
                <div className='bar3'></div>
            </div>
            
            <section className='navigation navigation__home' id="home"><a className='home__url' href="https://github.com/GenosseK" target="_blank" rel='noreferrer'>My GitHub</a></section>
            <section className='navigation navigation__about' id="about"><h1>Learn More About Me</h1></section>
            <section className='navigation navigation__skills' id="skills"><h1>These Are My Strengths</h1></section>
            <section className='navigation navigation__projects' id="projects"><h1>These Are My Results</h1></section>
            <section className='navigation navigation__contact' id="contact"><h1>Available Anytime</h1></section>
        </main>
    )
};

export default NavigationNation;