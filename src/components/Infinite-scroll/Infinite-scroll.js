import './Infinite-scroll.css';

function InfiniteScroll() {
    return (
        <main>
            <section className='infinite-scroll'>
                <header className='header'>
                    <h1 className='header__title'>UPLASH API - INFINITE SCROLL</h1>
                </header>
                <div className='images__container'>
                    <img src='https://images.unsplash.com/photo-1696790857863-e41b641311be?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='images__image' alt='' />
                    <img src='https://images.unsplash.com/photo-1696790857863-e41b641311be?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='images__image' alt='' />
                    <img src='https://images.unsplash.com/photo-1696790857863-e41b641311be?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='images__image' alt='' />
                </div>
            </section>
        </main>
    )
};

export default InfiniteScroll;