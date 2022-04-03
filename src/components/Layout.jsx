import styles from '../styles/Layout.module.css'
import Link from "next/link";


export default function Layout({ children }) {
    return (
        <section className={styles.body}>

            <aside className={styles.aside}>
                <div className={styles.aside_box}>
                    <Link href='/dashBoard'>
                        <button>
                            dashBoard
                        </button>
                    </Link>
                    <Link href='/message/create'>
                        <button>
                            Criar novo
                        </button>
                    </Link>
                </div>
            </aside>

            <main className={styles.main}>
                {children}
            </main>

        </section>
    )
}