import {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [events, setEvents] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('api/events')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!events) return <p>No Events</p>
  console.log(events)
  return (
    
    <div className={styles.container}>
      <Head>
        <title>Event list</title>
        <meta name="description" content="List of events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          There are <a href="#">{events.length} events</a>
        </h1>

        <div className={styles.grid}>
          {events.map((event)=>(
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>{event.message}</h2>
              <img src={event.image} alt={event.date} width='100%'/>
            </a>
          ))}
          

          
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}