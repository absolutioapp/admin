import { FC } from "react";
import { auth } from "../../../firebaseConfig.ts";
import { useAuthStore } from "../../stores/auth.store.ts";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useAppStore } from "../../stores/app.store.ts";

const Auth: FC = () => {
  const { setTokens, setUser } = useAuthStore();

  const { setPage } = useAppStore();

  const handleEmailPasswordLogin = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      setTokens(
        (result.user as any).accessToken,
        (result.user as any).refreshToken,
      );

      console.log("Successful login with email:", result.user);

      if (window.localStorage) {
        window.localStorage.setItem("user", JSON.stringify(result.user));
      }

      setUser(result.user);

      setPage(1); // Assuming 0 is the page index for the dashboard

      return result.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center p-0">
      <div className="flex min-h-full flex-1 flex-col justify-center pb-[15vh]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Absoluito"
            src="/assets/images/logos/LOGO_WITHOUT_BG_WITHOUT_TEXT.svg"
            className="mx-auto h-[200px] w-auto"
          />
          <h2 className="font-pjs mt-10 text-center text-[2rem] font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await handleEmailPasswordLogin(
                (e.target as HTMLFormElement).email.value,
                (e.target as HTMLFormElement).password.value,
              );
            }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="focus:outline-accent-100 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
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
                  className="focus:outline-accent-100 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-testname-500 bg-secondary-90 hover:bg-secondary-60 hover:bg-primary-400 focus-visible:outline-accent-60 flex w-full cursor-pointer justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
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
