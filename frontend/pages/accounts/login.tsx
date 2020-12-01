import Link from 'next/link'
import {Logo} from '../../components/Logo'
import {Layout} from '../../components/Layout'
import {useDispatch, useSelector} from "react-redux";
import {selectInfoMessage, selectIsLoginPending, signIn} from "../../src/features/auth/authSlice";

function SignIn() {
    const dispatch = useDispatch()
    const isLoginPending = useSelector(selectIsLoginPending)
    const infoMessage = useSelector(selectInfoMessage)

    async function handleSubmit(event) {
        event.preventDefault()

        const emailElement = event.currentTarget.elements.email
        const passwordElement = event.currentTarget.elements.password
        const payload = {
            identifier: emailElement.value,
            password: passwordElement.value
        };

        dispatch(signIn(payload))
    }

    const inputClasses = 'border p-2 rounded-sm text-sm w-full mb-2'

    return (
        <Layout>
            <div className="flex flex-col items-center p-4">
                <div className="w-full max-w-sm border bg-white rounded-sm p-10">
                    <div className="text-3xl flex justify-center pb-2">
                        <Link href="/">
                            <button>
                                <Logo/>
                            </button>
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="pt-10">
                        <div>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="Email"
                                className={inputClasses}
                            />
                            <input
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                                className={inputClasses}
                            />
                        </div>
                        <button
                            type="submit" disabled={isLoginPending}
                            className="bg-blue-500 font-semibold p-1 rounded text-white w-full"
                        >
                            Log in
                        </button>

                        {infoMessage && <p className="py-4">{infoMessage}</p>}

                        {/* TODO reset password? */}
                    </form>
                </div>
                <div className="w-full max-w-sm border bg-white rounded-sm p-6 mt-2 text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link href="/accounts/emailsignup">
                        <button>
                            <span className="text-blue-500 font-semibold">Sign up</span>
                        </button>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default SignIn
