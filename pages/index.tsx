import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

// BEWARE: react-hot-toast depends on react client code to work so it can't be used in server side code (like inside a getStaticProps)

export default function Home() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    // ! Fake Fetch Request
    const fakeFetch = () => {
      // let isFetched = false

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ name: 'my data' })
          // Set Data
          setData({ name: 'my data' })
        }, 1000)
      })
    }

    // * Promise Toast
    // TIP: If really need to prevent the promise toast from showing up twice, you can uncomment `reactStrictMode: true,` in next.config.js (generally it is not advised to uncomment this, in production the toast will only show up once)
    toast.promise(
      fakeFetch(), // promise
      {
        loading: 'Loading', // message to show when promise is pending
        success: (data: any) => `Successfully fetched ${data?.name}`,
        error: (err) => `This just happened: ${err.toString()}`,
      },
      {
        style: {
          minWidth: '250px', // needed for the promise toast

          border: '1px solid var(--color-primary)',
          borderRadius: '16px',
          // padding: '0.6rem 1.8rem',
          padding: '0.6rem 1.8rem',
          backgroundColor: 'var(--color-primary-darker)',
          color: '#c7d2fe',
          userSelect: 'none',
        },
        success: {
          duration: 2000,
          icon: '🔥',
        },
      }
    )
  }, [])

  // * Custom Toast
  const showCustomToast = () => {
    toast(
      (t) => (
        // dismiss toast on click
        <span
          // padding included here so that all the toast is clickable
          style={{ padding: '0.6rem 1.8rem' }}
          onClick={() => toast.dismiss(t.id)}
        >
          {/* any jsx content here */}
          Custom <b>Toast</b> &nbsp;🥳
        </span>
      ),
      {
        // TIP: By giving it an id, yu can dismiss it with toast.dismiss('custom-toast')
        // TIP: When you give it an id, only one toast with that id can be shown at a time
        id: 'custom-toast', // unique id
        duration: 3000,

        style: {
          border: '1px solid var(--color-primary)',
          borderRadius: '16px',
          // padding: '0.6rem 1.8rem',
          padding: '0',
          backgroundColor: 'var(--color-primary-darker)',
          color: '#c7d2fe',
          userSelect: 'none',
          cursor: 'pointer',
        },

        // put toast.sucess(), toast.error(), toast.warning(), toast.loading() to to add icon
        // iconTheme: {
        //   primary: 'var(--color-primary)',
        //   secondary: '#FFFAEE',
        // },
      }
    )
  }

  return (
    <>
      {/* Show Custom Toast */}
      <button onClick={showCustomToast}>Show Custom Toast</button>

      {/* Dismiss Custom Toast */}
      {/* TIP: To dismiss all toasts, call toast.dismiss() without args */}
      <button onClick={() => toast.dismiss('custom-toast')}>
        Dismiss Custom Toast
      </button>

      {/* // * Toasts Container */}
      <Toaster position='bottom-right' reverseOrder={true} />

      {/* CHANGE POSITION: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
       */}

      {/* Fetched Data */}
      <h1>{data?.name}</h1>
    </>
  )
}
