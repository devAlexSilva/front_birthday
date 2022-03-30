import { parseCookies } from "nookies";
import { axiosClient } from "../api/axiosServerSide"

export default function DashBoard({ data }) {
console.log(data)
    return (
        <>
            DASHBOARD ON HERE

        </>
    )
}

export async function getServerSideProps(ctx) {
    const api = axiosClient(ctx);

    const { user } = parseCookies(ctx);
    api.defaults.headers.common['Authorization'] = `Bearer ${user}`

    if (!user) return {
        redirect: {
            destination: '/'
        }
    }
    const { data } = await api.get('/message');

    return {
        props: { data }
    }
}