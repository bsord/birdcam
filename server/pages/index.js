import {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [events, setEvents] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [video, setVideo] = useState(false)

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
          {events.map((event, key)=>(
            <a key={key} href="#" className={styles.card} onClick={(e)=>{setVideo(event.video)}}>
              <h2>{event.message}</h2>
              <img src={event.image} alt={event.message} width='100%'/>
              <p>{event.date}</p>
            </a>
          ))}
          
            {video?
              <div className={styles.overlay}>
                <div className={styles.main} onClick={(e)=>{setVideo(false)}}>
                  <video controls >
                    <source src={video} type="video/mp4"/>
                    Sorry, your browser doesn't support embedded videos.
                  </video>
                </div>
              </div>
            : null}
          
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Made with ❤ </p>
      </footer>
    </div>
  )
}