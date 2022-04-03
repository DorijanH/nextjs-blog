import styles from './Logo.module.css';

function Logo() {
    return (
        <div className={styles.logo}>
            {`Dorijan's Next Blog`}
        </div>
    )
}

export default Logo;