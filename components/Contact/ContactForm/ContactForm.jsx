import { useState, useEffect } from 'react';

import Notification from '../../Ui/Notification';

import styles from './ContactForm.module.css';

const sendContantData = async (contactDetails) => {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
}

function ContactForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
    const [requestError, setRequestError] = useState();

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    const sendMessageHandler = async (event) => {
        event.preventDefault();

        setRequestStatus('pending');

        try {
            await sendContantData({ email, name, message });
            setRequestStatus('success');
            setEmail('');
            setName('');
            setMessage('');
        } catch (error) {
            setRequestError(error.message);
            setRequestStatus('error');
        }
    };

    let notification;

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending message...',
            message: 'Your message is on its way!'
        };
    }

    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Message sent successfully!'
        }
    }

    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error!',
            message: requestError
        }
    }

    return (
        <section className={styles.contact}>
            <h1>How can I help you?</h1>
            <form className={styles.form} onSubmit={sendMessageHandler}>
                <div className={styles.controls}>
                    <div className={styles.control}>
                        <label htmlFor='email'>Your Email</label>
                        <input
                            type='email'
                            id='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.control}>
                        <label htmlFor='name'>Your Name</label>
                        <input
                            type='text'
                            id='name'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.control}>
                    <label htmlFor='message'>Your Message</label>
                    <textarea
                        id='message'
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <div className={styles.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && <Notification {...notification} />}
        </section>
    )
}

export default ContactForm;