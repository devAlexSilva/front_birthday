import styles from '../styles/Home.module.css';
import Router from 'next/router';
import Head from 'next/head'
import Link from 'next/link';
import { api } from '../api/axiosClientSide';
import { useForm } from 'react-hook-form'
import { parseCookies, setCookie } from 'nookies';


export default function Login() {

  const { register, handleSubmit } = useForm();

  const login = async ({ email, password }) => {

    const { data: { token, loggedUser } } = await api.post('/login', { email, password });

    if (token) {
      setCookie(null, 'user', token, {
        maxAge: 1800 // 30 minutos
      })
         
      Router.push('/dashBoard');
    }
    /*
    setCookie(null, 'info', loggedUser, {
      maxAge: 1800,
    })
    */
  }

  return (
    <div className={styles.body}>
      <Head>
        <title>Login-Birthday</title>
      </Head>
      <section className={styles.section}>
        <form className={styles.form} onSubmit={handleSubmit(login)}>

          <div>
            <div className={styles.inputField}>
              <label htmlFor="email-address">
                Email address
              </label>
              <input
                {...register('email')}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
              />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="password">
                Password
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
          <div className={styles.btnContainer}>
            <button>
              Login
            </button>
          </div>
        </form>
        <Link href='/'>
          <button>
            HOME
          </button>
        </Link>
      </section>
    </div>
  )
}
