import './Splash-Page.css';
import HabitualLogo from '../../images/habitual-branding.png';
import AppStoreLogo from '../../images/app-store-button.png';
import GooglePlayLogo from '../../images/google-play-button.png';
import LandingPageMockup from '../../images/main-image.png';
import ProfileMockup from '../../images/profile.png';
import OrdersMockup from '../../images/orders.png';
import HomeMockup from '../../images/home.png';
import CartMockup from '../../images/cart.png';
import ProductMockup from '../../images/product.png';

function SplashPage() {
    return (
        <main className='splashPage'>
            <div className='splashPage__container'>

                <img src={HabitualLogo} alt='Habituial Logo' className='splashPage__brand-img' />

                <div className='splashPage__background-toggles' title='Change Background'>
                    <div className='splashPage__background-1'></div>
                    <div className='splashPage__background-2'></div>
                    <div className='splashPage__background-3'></div>
                </div>

                <div className='splashPage__text-container'>

                    <h1 className='splashPage__title'>Find the stuff you'll love</h1>
                    <p className='splashPage__text'>Aliquam rhoncus pretium dolor volutpat lectus odio non tellus neque. Aliquet et purus nibh bibendum integer etiam in enim nisi.</p>

                    <div className='splashPage__app-store-btn'>
                        <a href='https://www.apple.com/ca/ios/app-store/' target='_blank'>
                            <img src={AppStoreLogo} alt='App Store' className='splashPage__app-store-btn_image' />
                        </a>
                    </div>

                    <div className='splashPage__google-play-btn'>
                        <a href='https://play.google.com/store?hl=en' target='_blank'>
                            <img src={GooglePlayLogo} alt='Google Play' className='splashPage__google-play-btn_image' />
                        </a>
                    </div>

                </div>

                <div className='splashPage__main-image-container'>
                    <img src={LandingPageMockup} alt='Landing Page Mockup' className='splashPage__main-image' />
                </div>

                <img src={ProfileMockup} alt='Profile Mockup' className='splashPage__profile-img' />
                <img src={OrdersMockup} alt='Orders Mockup' class='splashPage__orders-img' />
                <img src={HomeMockup} alt='Home Mockup' class='splashPage__home-img' />
                <img src={CartMockup} alt='Cart Mockup' class='splashPage__cart-img' />
                <img src={ProductMockup} alt='Product Mockup' class='splashPage__product-img' />

            </div>

        </main>
    )
}

export default SplashPage;