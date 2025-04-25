import {Form, Link, useFetcher} from "@remix-run/react";
import logo from "../assets/logo.jpg"
import {ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber, UserCredential} from "firebase/auth";
import {useState} from "react";
import {auth} from "~/utils/firebase";
import {ActionFunctionArgs} from "@remix-run/node";
import {createUserSession} from "~/utils/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
    const json = await request.json();
    const token = await json.token;
    return createUserSession(token);
};

export default function Login() {

    const fetcher = useFetcher();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePhoneNumberSubmit = async () => {
        // Create reCAPTCHA verifier
        setLoading(true);
        const recaptchaVerifier = new RecaptchaVerifier(auth , 'recaptcha', {
            size: 'invisible',
            callback: (response: never) => {
                console.log(response);
            },
        });

        try {
            // Send OTP
            const phone = `+91${phoneNumber}`;
            const result = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
            setConfirmationResult(result);
        } catch (error) {
            setError("Invalid phone number");
            console.error('Error during phone sign-in', error);
        }
        setLoading(false);
    };

    const handleVerificationCodeSubmit = async () => {
        setLoading(true);
        if (confirmationResult) {
            try {
                // Login the code
                const result: UserCredential = await confirmationResult.confirm(verificationCode);
                const token = await result.user.getIdToken();
                fetcher.submit({token : token}, {
                    method: "POST",
                    encType: "application/json",
                });
            } catch (error) {
                setError("OTP invalid");
                console.error('Error verifying code', error);
            }
        }
        setLoading(false);
    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link
                    to="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
                >
                    <img
                        className="h-16 mr-2"
                        src={logo}
                        alt="logo"
                    />
                </Link>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    {!confirmationResult ? (
                    <div className="space-y-4 md:space-y-6">
                        <Form onSubmit={handlePhoneNumberSubmit} className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <input type="hidden" name="_input" value="phone" />
                            <div>
                                <label
                                    htmlFor="phoneNumber"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Your Phone Number
                                </label>
                                <div className="flex">
                                    <span
                                        className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-50 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                                        +91
                                    </span>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Phone Number"
                                        required={true}
                                        onChange={event => setPhoneNumber(event.target.value)}
                                    />
                                </div>
                                {error ? (
                                    <p
                                        className="text-red-700 form-validation-error"
                                        role="alert"
                                        id="parlour-error"
                                    >
                                        {error}
                                    </p>
                                ) : null}
                            </div>
                            <div id="recaptcha"></div>
                            <button
                                type="submit"
                                className="w-full text-primary bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                {loading ?
                                    <span>Sending OTP...</span>
                                    :
                                    <span>Sign In</span>

                                }
                            </button>
                        </Form>
                    </div>
                        ) : (
                        <div className="space-y-4 md:space-y-6">
                            <Form onSubmit={handleVerificationCodeSubmit} className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <input type="hidden" name="_input" value="otp"/>
                                <div>
                                    <label
                                        htmlFor="verificationCode"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Your OTP
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="tel"
                                            name="verificationCode"
                                            id="verificationCode"
                                            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            placeholder="OTP"
                                            required={true}
                                            onChange={event => setVerificationCode(event.target.value)}
                                        />
                                    </div>
                                    {error ? (
                                        <p
                                            className="text-red-700 form-validation-error"
                                            role="alert"
                                            id="parlour-error"
                                        >
                                            {error}
                                        </p>
                                    ) : null}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-primary bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    {loading ?
                                        <span>Verifying...</span>
                                        :
                                        <span>Verify OTP</span>
                                    }
                                </button>
                            </Form>
                        </div>
                    )
                    }
                </div>
            </div>
        </section>
    )
}
