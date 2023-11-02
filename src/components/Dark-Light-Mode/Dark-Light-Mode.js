import './Dark-Light-Mode.css';

function DarkLight() {
    return (
        <main className='darkLight'>
            <header className='darkLight__header'>
                <nav className='header__navtab'>
                    <ul className='navtab__list'>
                        <li className='navtab__link'>
                            <a href='#about-project' className='navtab__link-text'>HOME</a>
                        </li>
                        <li className='navtab__link'>
                            <a href='#techs' className='navtab__link-text'>ABOUT</a>
                        </li>
                        <li className='navtab__link'>
                            <a href='#techs' className='navtab__link-text'>PROJECTS</a>
                        </li>
                        <li className='navtab__link'>
                            <a href='#about-me' className='navtab__link-text'>CONTACT</a>
                        </li>
                    </ul>
                </nav>
                <div className='header__button_container'>
                    <button className='button__switch-mode'>Dark/Light</button>
                </div>
            </header>
            <section className='darkLight__container'>

            </section>
        </main>
    )
};

export default DarkLight;