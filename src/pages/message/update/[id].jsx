import { useForm } from 'react-hook-form';
import styles from '../../../styles/Home.module.css'
import Router from 'next/router';
import Link from 'next/link';


export default function UpdateMessage() {

    const { register, handleSubmit } = useForm();

function update(data) {
    console.log(data)
    Router.push('/dashBoard');
}

    return (
        <div className={styles.body}>
          <section className={styles.section}>
            <form className={styles.form} onSubmit={handleSubmit(update)}>
    
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
                  Salvar
                </button>
              </div>
            </form>
            <Link href='/dashBoard'>
              <button>
                HOME
              </button>
            </Link>
          </section>
        </div>
      )
}