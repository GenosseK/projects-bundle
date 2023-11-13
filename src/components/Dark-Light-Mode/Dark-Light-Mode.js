import './Dark-Light-Mode.css';
import proud_coder from '../../images/undraw_proud_coder_light.svg';
import feeling_pround from '../../images/undraw_feeling_proud_light.svg';
import conceptual_idea from '../../images/undraw_conceptual_idea_light.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faCodepen, faGithub, faLinkedin, faMedium, faTelegram, faYoutube } from '@fortawesome/free-brands-svg-icons';

function DarkLight() {

    // Initialize theme state with 'light'
    const [theme, setTheme] = useState('light');

    // Function to toggle the theme
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Store the theme in local storage
    };

    // Load the theme from local storage when the component mounts
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    // Update the data-theme attribute in the DOM based on the selected theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Define the text for the theme switcher
    const switcherText = theme === 'light' ? 'Light Mode' : 'Dark Mode';

    return (
        <main className='darkLight'>
            <header className='darkLight__header'>
                <nav className='header__navtab'>
                    <ul className='navtab__list'>
                        <li className='navtab__link'>
                            <a href='#home' className='navtab__link-text'>HOME</a>
                        </li>
                        <li className='navtab__link'>
                            <a href='#about' className='navtab__link-text'>ABOUT</a>
                        </li>
                        <li className='navtab__link'>
                            <a href='#projects' className='navtab__link-text'>PROJECTS</a>
                        </li>
                        <li className='navtab__link'>
                            <a href='#contacts' className='navtab__link-text'>CONTACT</a>
                        </li>
                    </ul>
                </nav>

                <div className="theme-switch-wrapper">
                    <span id="toggle-icon">
                        <span className="toggle-text">{switcherText}</span>
                        <FontAwesomeIcon icon={faSun} className="sun-icon" />
                    </span>
                    <label className="theme-switch">
                        <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
                        <div className="slider round"></div>
                    </label>
                </div>

            </header>
            <div className='darkLight__container'>
                <section className='darkLight__section' id='home'>
                    <div className='title__container'>
                        <h1 className='darkLight__title'>Welcome to the website</h1>
                        <h2 className='darkLight__subtitle'>Scroll down to see more</h2>
                    </div>
                </section>
                <section className='darkLight__section' id='about'>
                    <h1 className='darkLight__title'>Undraw Illustrations</h1>
                    <div className='about__container'>
                        <div className='about__image__container'>
                            <h2 className='darkLight__subtitle'>Web Innovation</h2>
                            <img src={proud_coder} alt='Proud Coder' className='about__image' id='image1' />
                        </div>
                        <div className='about__image__container'>
                            <h2 className='darkLight__subtitle'>Problem Solving</h2>
                            <img src={feeling_pround} alt='Feeling Proud' className='about__image' id='image2' />
                        </div>
                        <div className='about__image__container'>
                            <h2 className='darkLight__subtitle'>High Comcept</h2>
                            <img src={conceptual_idea} alt='Conceptual Idea' className='about__image' id='image3' />
                        </div>
                    </div>
                </section>
                <section className='darkLight__section' id='projects'>
                    <h1 className='darkLight__title'>Buttons</h1>
                    <div className='projects__buttons'>
                        <button className='project__button primary'>Primary</button>
                        <button className='project__button secondary'>Secondary</button>
                        <button className='project__button primary' disabled >Disabled</button>
                        <button className='project__button outline'>Outline</button>
                        <button className='project__button secondary outline'>Alt Outline</button>
                        <button className='project__button outline' disabled>Disabled</button>
                    </div>
                    <div className='projects__text-container' id='text-box'>
                        <p className='text-container__text'>Lorem ipsum dolor amet consectetur adipisicing elit. Voluptatibus magnam sit alias eos ducimus expedita quam, corporis, blanditiis vel facilis, animi adipisci? Nemo enim quisquam maiores minima, qui omnis. Accusamus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem magnam accusamus qui, ab voluptates reprehenderit rerum quo mollitia libero asperiores doloremque dolores, nihil repellat doloribus perspiciatis magni dolore dolorum ipsam!</p>
                    </div>
                </section>
                <section className='darkLight__section' id='contacts'>
                    <div className='contants__icons'>
                        <FontAwesomeIcon icon={faGithub} className='social-icon' />
                        <FontAwesomeIcon icon={faCodepen} className='social-icon' />
                        <FontAwesomeIcon icon={faLinkedin} className='social-icon' />
                        <FontAwesomeIcon icon={faMedium} className='social-icon' />
                        <FontAwesomeIcon icon={faTelegram} className='social-icon' />
                        <FontAwesomeIcon icon={faYoutube} className='social-icon' />
                    </div>
                </section>
            </div>
        </main>
    )
};

export default DarkLight;