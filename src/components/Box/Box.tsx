import {FC, useState} from 'react';
import {auth, provider, signInWithPopup, signOut} from "../../../firebaseConfig.ts";
import {useAuthStore} from "../../stores/app.store.ts";
import {UserCredential} from "@firebase/auth";

const Auth: FC = () => {
    const [user, setUser] = useState(null);

    const {setTokens} = useAuthStore();

    const handleLogin = async () => {
        try {
            const result: UserCredential = await signInWithPopup(auth, provider);

            setTokens(result.user.stsTokenManager.accessToken, result.user.stsTokenManager.refreshToken);

            console.log("Успешный вход:", result.user);

            setUser(result.user);
        } catch (error) {
            console.error("Ошибка входа:", error);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center font-bold tracking-tight text-gray-900 text-2xl/9">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block font-medium text-gray-900 text-sm/6">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 text-base placeholder:text-gray-400 text-gray-900 outline-1 outline-gray-300 py-1.5 -outline-offset-1 focus:-outline-offset-2 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block font-medium text-gray-900 text-sm/6">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 text-base placeholder:text-gray-400 text-gray-900 outline-1 outline-gray-300 py-1.5 -outline-offset-1 focus:-outline-offset-2 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 font-semibold text-white py-1.5 text-sm/6 shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <div>
                    <button
                        type="button"
                        className="my-4 flex w-full justify-center rounded-md px-3 font-semibold text-white py-1.5 text-sm/6 shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
