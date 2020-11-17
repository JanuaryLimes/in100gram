import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {getErrorMessage} from '../../lib/form'
import {Logo} from '../../components/Logo'
import {Layout} from '../../components/Layout'
import {useMutation} from "react-query";

function SignIn() {
    const [status, setStatus] = useState('')
    const router = useRouter()

    const [signIn, {isLoading}] = useMutation(async (body: string) => {
        const response = await fetch('http://localhost:1337/auth/local', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        })
        return response.json();
    }, {
        onSuccess: async (data) => {
            if (data.error) {
                setStatus(data.data[0].messages[0].message)
            } else {
                // TODO cookie?
                localStorage.setItem("jwt", data.jwt)
                await router.push('/')
            }
        }
    })


    async function handleSubmit(event) {
        event.preventDefault()

        const emailElement = event.currentTarget.elements.email
        const passwordElement = event.currentTarget.elements.password

        try {
            await signIn(JSON.stringify({
                identifier: emailElement.value,
                password: passwordElement.value,
            }))
        } catch (error) {
            setStatus(getErrorMessage(error))
        }
    }

    const inputClasses = 'border p-2 rounded-sm text-sm w-full mb-2'

    return (
        <Layout>
            <div className="flex flex-col items-center p-4">
                <div className="w-full max-w-sm border bg-white rounded-sm p-10">
                    <div className="text-3xl flex justify-center pb-2">
                        <Logo/>
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
                            type="submit" disabled={isLoading}
                            className="bg-blue-500 font-semibold p-1 rounded text-white w-full"
                        >
                            Log in
                        </button>

                        {status && <p className="py-4">{status}</p>}

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
