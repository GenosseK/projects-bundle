import './Form-Validator.css';

function FormValidator() {
    return (
        <main className='formValidator'>
            <div className='formValidator__container'>
                <h1 className='formValidator__title'>Sign Up Today!</h1>

                <form className='formValidator__form'>

                    <div className='formValidator__form-item'>
                        <label className='formValidator__form-item_label'>Full Name</label>
                        <input className='formValidator__form-item_input' type='text' placeholder='Full name' required minLength='3' maxLength='100'></input>
                    </div>

                    <div className='formValidator__form-item'>
                        <label className='formValidator__form-item_label'>Phone Number</label>
                        <input className='formValidator__form-item_input' type='tel' placeholder='555-555-5555' required></input>
                    </div>

                    <div className='formValidator__form-item'>
                        <label className='formValidator__form-item_label'>Email Adress</label>
                        <input className='formValidator__form-item_input' type='email' placeholder='akazhanov72@yandex.ru' required></input>
                    </div>

                    <div className='formValidator__form-item'>
                        <label className='formValidator__form-item_label'>Website URL</label>
                        <input className='formValidator__form-item_input' type='url' placeholder='google.com' required></input>
                    </div>

                    <div className='formValidator__form-item'>
                        <label className='formValidator__form-item_label'>Password</label>
                        <input className='formValidator__form-item_input' type='password' placeholder='Create Password (Min. 8 characters)' title='Please include at least 1 uppercase character, 1 lowercase character, and 1 number.' required></input>
                    </div>

                    <div className='formValidator__form-item'>
                        <label className='formValidator__form-item_label'>Confirm Password</label>
                        <input className='formValidator__form-item_input' type='password' placeholder='Confirm Password' required></input>
                    </div>

                    <button className='formValidator__submit-button' type='submit'>Register</button>

                </form>

                <div className='formValidator__success-container'>
                    <h3 className='formValidator__success__message'>Don't Hesitate!</h3>
                </div>

            </div>
        </main>
    )
}

export default FormValidator;