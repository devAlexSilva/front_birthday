import styles from '../styles/DashBoard.module.css'
import { parseCookies } from "nookies";
import { axiosClient } from "../api/axiosServerSide"
import { api } from "../api/axiosClientSide";
import Link from "next/link"
import Router from "next/router";
import Layout from '../components/Layout';


export default function DashBoard({ data }) {

    async function deleteMessage(id) {
        try {
            await api.delete(`/message/delete/${id}`)
                .then(() => {
                    alert('deletado com sucesso')
                    Router.reload();
                });

        } catch (err) {
            alert('falha ao deletar')
        }
    }

    return (
        <Layout>
            <section className={styles.section}>
                <div>
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
                </div>
            </section>
        </Layout>
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