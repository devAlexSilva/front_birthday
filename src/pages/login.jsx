import styles from '../styles/Login.module.css';
import Router from 'next/router';
import Head from 'next/head'
import Link from 'next/link';
import { api } from '../api/axiosClientSide';
import { useForm } from 'react-hook-form'
import { setCookie } from 'nookies';


export default function Login() {

  const { register, handleSubmit } = useForm();

  const login = async ({ email, password }) => {

    const { data: { token } } = await api.post('/login', { email, password });

    (token) ? (
      setCookie(null, 'user', token, {
        maxAge: 1800 // 30 minutes
      }),

      Router.push('/dashBoard')

    ) : alert('usuário ou senha incorreto');

  }

  return (
    <div className={styles.body}>
      <Head>
        <title>Login-Birthday</title>
      </Head>
      <section className={styles.section}>
        <Link href='/'>
          <button>
            HOME
          </button>
        </Link>
        <form className={styles.form} onSubmit={handleSubmit(login)}>

          <div className={styles.form_box}>
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
            Login
          </button>
        </form>
      </section>
    </div>
  )
}
