import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./Form-Validator.css";

function FormValidator() {
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        emailAddress: "",
        websiteUrl: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const [formMessage, setFormMessage] = useState({
        text: "Don't Hesitate!",
        success: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        // Validation for full name
        if (formData.fullName.length < 3 || formData.fullName.length > 100) {
            setFormMessage({
                text: "Full Name must be between 3 and 100 characters.",
                success: false,
            });
            return;
        }


        // Validation for phone number
        const phoneNumberRegex = /^[\d+\-]+$/;
        if (!phoneNumberRegex.test(formData.phoneNumber) || formData.phoneNumber.replace(/[\+\-]/g, '').length !== 11) {
            setFormMessage({
                text: "Phone Number must contain exactly 11 digits.",
                success: false,
            });
            return;
        }

        // Validation for email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.emailAddress)) {
            setFormMessage({
                text: "Email Address must be in email format.",
                success: false,
            });
            return;
        }

        // Validation for website URL
        const urlRegex = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,.\/?%&=]*)?$/;
        if (!urlRegex.test(formData.websiteUrl)) {
            setFormMessage({
                text: "Website URL must be in URL format",
                success: false,
            });
            return;
        }

        // Validation for password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setFormMessage({
                text:
                    "Password must include at least 1 uppercase, 1 lowercase character, and 1 number.",
                success: false,
            });
            return;
        }

        // Validation for confirm password
        if (formData.confirmPassword !== formData.password) {
            setFormMessage({
                text: "Confirm Password must match the entered password.",
                success: false,
            });
            return;
        }

        // If all validations pass, set success message
        setFormMessage({
            text: "You have signed up successfully",
            success: true,
        });
    };

    return (
        <main className="formValidator">
            <div className="formValidator__container">
                <h1 className="formValidator__title">Sign Up Today!</h1>

                <form className="formValidator__form">
                    <div className="formValidator__form-item">
                        <label className="formValidator__form-item_label">Full Name</label>
                        <input
                            className="formValidator__form-item_input"
                            type="text"
                            placeholder="Full name"
                            minLength="3"
                            maxLength="100"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        ></input>
                    </div>

                    <div className="formValidator__form-item">
                        <label className="formValidator__form-item_label">
                            Phone Number
                        </label>
                        <input
                            className="formValidator__form-item_input"
                            type="tel"
                            placeholder="555-555-5555"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        ></input>
                    </div>

                    <div className="formValidator__form-item">
                        <label className="formValidator__form-item_label">
                            Email Address
                        </label>
                        <input
                            className="formValidator__form-item_input"
                            type="email"
                            placeholder="akazhanov72@yandex.ru"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleChange}
                            required
                        ></input>
                    </div>

                    <div className="formValidator__form-item">
                        <label className="formValidator__form-item_label">
                            Website URL
                        </label>
                        <input
                            className="formValidator__form-item_input"

                            placeholder="google.com"
                            name="websiteUrl"
                            value={formData.websiteUrl}
                            onChange={handleChange}
                            required
                        ></input>
                    </div>

                    <div className="formValidator__form-item">
                        <label className="formValidator__form-item_label">Password</label>
                        <div className="password-input-container">
                            <input
                                className="formValidator__form-item_input"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Create Password (Min. 8 characters)"
                                title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <FontAwesomeIcon
                                icon={faEye}
                                className="password-icon"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                    </div>
                    <div className="formValidator__form-item">
                        <label className="formValidator__form-item_label">
                            Confirm Password
                        </label>
                        <div className="password-input-container">
                        <input
                            className="formValidator__form-item_input"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        ></input>
                        <FontAwesomeIcon
                            icon={faEye}
                            className="password-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                    </div>

                    <button
                        className="formValidator__submit-button"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Register
                    </button>
                </form>

                <div
                    className={`formValidator__message-container ${formMessage.success
                        ? "formValidator__message-container--success"
                        : "formValidator__message-container--error"
                        }`}
                >
                    <h3 className="formValidator__message">{formMessage.text}</h3>
                </div>
            </div>
        </main>
    );
}

export default FormValidator;
