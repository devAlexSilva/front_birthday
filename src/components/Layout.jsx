import styles from '../styles/Layout.module.css'
import Link from "next/link";

export default function Layout({ children }) {
    return (
        <section className={styles.body}>
            <aside className={styles.aside}>
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
            <main className={styles.main}>
                {children}
            </main>
        </section>
    )
}