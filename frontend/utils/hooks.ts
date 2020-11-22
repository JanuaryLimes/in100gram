import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {me, selectMe} from "../src/features/auth/authSlice";
import {User} from "../src/api/types";
import {useRouter} from "next/router";


export function useViewer() {
    const dispatch = useDispatch();
    const router = useRouter();
    const meUser = useSelector(selectMe);

    useEffect(() => {
        dispatch(me())
    }, [])

    let viewer: User = null;
    let shouldRedirect = false;

    if (meUser.pending || meUser?.user === undefined) {
        viewer = null;
    } else {
        if (meUser.user) {
            viewer = meUser.user
        } else {
            shouldRedirect = true;
        }
    }

    useEffect(() => {
        if (shouldRedirect) {
            router.push('/accounts/login').then();
        }
    }, [shouldRedirect])

    return {viewer}
}
