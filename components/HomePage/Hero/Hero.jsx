import Image from 'next/image';

import styles from './Hero.module.css';

function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.image}>
                <Image
                    src="/images/site/dorijan.png"
                    alt="An image showing Dorijan"
                    width={300}
                    height={400}
                />
            </div>
            <h1>{`Hi I'm Dorijan`}</h1>
            <p>I blog about web development - especially frontend frameworks like Angular or React.</p>
        </section>
    )
}

export default Hero;