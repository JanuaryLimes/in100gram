import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import {useQuery} from "react-query";

export function useViewer() {
    const router = useRouter()

    const fetchMe = React.useCallback(async () => {
        const token = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:1337/users/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return await response.json();
    }, [])

    const {data, isLoading} = useQuery('users/me', fetchMe)

    let shouldRedirect = false;

    if (!isLoading && data?.error) {
        shouldRedirect = true;
    }

    //const shouldRedirect = !(isLoading || (isError || data.error) || data)

    useEffect(() => {
        if (shouldRedirect) {
            router.push('/accounts/login')
        }
    }, [shouldRedirect])

    console.warn('dat', data)

    return {viewer: data?.error ? null : data}
}
