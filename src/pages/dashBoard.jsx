import { parseCookies } from "nookies";
import { axiosClient } from "../api/axiosServerSide"
import { api } from "../api/axiosClientSide";
import Link from "next/link"
import Router from "next/router";


export default function DashBoard({ data }) {


    async function deleteMessage(id) {
       console.log(id)
        try {
            await api.delete(`/message/delete/${id}`)
                .then(res => {
                    return console.log(res);
                    //Router.reload();
                });

        } catch (err) {
            throw new Error;
        }
    }

    return (
        <>
            <aside>
                <Link href='/message/create'>
                    <button>
                        Criar novo
                    </button>
                </Link>

                <Link href='/'>
                    <button>
                        HOME
                    </button>
                </Link>
            </aside>

            <main>
                {data.map(message => {
                    return (
                        <div key={message.id}>
                            <ul>
                                <li>{message.title}</li>
                                <li>{message.content}</li>
                                <li>{message.dateBirthday}</li>
                            </ul>

                            <Link href={`/message/update/:${message.id}`}>
                                <button>
                                    Editar
                                </button>
                            </Link>
                            <button onClick={() => deleteMessage(message.id)}>
                                Excluir
                            </button>
                        </div>
                    )
                })}
            </main>

        </>
    )
}

export async function getServerSideProps(ctx) {
    const api = axiosClient(ctx);
    const { user } = parseCookies(ctx);

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