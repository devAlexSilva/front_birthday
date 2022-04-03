import styles from '../styles/Header.module.css'
import { useContext } from 'react'
import { AuthContext } from '../contexts/authContext'

export default function Header() {
    const { cancelCookie } = useContext(AuthContext)

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div>SVG LOGO ON HERE</div>
                    <div>
                        <button
                            className={styles.btn}
                            onClick={cancelCookie}>
                            Logout
                        </button>
                    </div>
                </nav>
            </header>
        </>
    )
}