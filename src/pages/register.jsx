import styles from '../styles/Register.module.css'
import Link from "next/link"
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { api } from '../api/axiosClientSide';
import Router from 'next/router';


export default function Register() {

    const { register, handleSubmit } = useForm();

    const registerUser = async ({ email, password, name }) => {

        const { data: { status } } = await api.post('/create', {
            email,
            password,
            name
        });

        (status) ? (
            status === 304 ? (
                alert('esse email já está em uso')
            ) : (
                alert(`usuário ${name} criado com sucesso`),
                Router.push('/login')
                )
        ) : alert('falha ao cadastrar');
    }


    return (
        <div className={styles.body}>
            <Head>
                <title>Register-Birthday</title>
            </Head>
            <section className={styles.section}>
                <Link href='/'>
                    <button>
                        HOME
                    </button>
                </Link>
                <form className={styles.form} onSubmit={handleSubmit(registerUser)}>

                    <div className={styles.form_box}>

                        <div className={styles.inputField}>
                            <label htmlFor="name">
                                Nome
                            </label>
                            <input
                                {...register('name')}
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Jhon doe"
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor="email-address">
                                Email
                            </label>
                            <input
                                {...register('email')}
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder="Email address"
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor="password">
                                Senha
                            </label>
                            <input
                                {...register('password')}
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <button>
                        Registrar
                    </button>
                </form>
            </section>
        </div>
    )
}