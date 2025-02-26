import {FC, useState} from 'react';
import {auth, provider, signInWithPopup, signOut} from "../../../firebaseConfig.ts";
import {useAuthStore} from "../../stores/auth.store.ts";
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
        <div className="flex items-center justify-center w-[100vw] h-[100vh] p-0">
            <div className="flex min-h-full flex-1 flex-col justify-center pb-[15vh]">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                      alt="Absoluito"
                      src="/assets/images/logos/LOGO_WITHOUT_BG_WITHOUT_TEXT.svg"
                      className="mx-auto h-[200px] w-auto"
                    />
                    <h2 className="mt-10 font-pjs text-center font-bold tracking-tight text-gray-900 text-[2rem]">
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
                                  className="block w-full rounded-md bg-white px-3 text-base placeholder:text-gray-400 text-gray-900 outline-1 outline-gray-300 py-1.5 -outline-offset-1 focus:-outline-offset-2 focus:outline-2 focus:outline-accent-100 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block font-medium text-gray-900 text-sm/6">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                  id="password"
                                  name="password"
                                  type="password"
                                  required
                                  autoComplete="current-password"
                                  className="block w-full rounded-md bg-white px-3 text-base placeholder:text-gray-400 text-gray-900 outline-1 outline-gray-300 py-1.5 -outline-offset-1 focus:-outline-offset-2 focus:outline-2 focus:outline-accent-100 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                              type="submit"
                              className="flex w-full justify-center rounded-md bg-testname-500 px-3 cursor-pointer font-semibold bg-secondary-90 hover:bg-secondary-60 py-1.5 text-sm/6 shadow-xs hover:bg-primary-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-60"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Auth;
