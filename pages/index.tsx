import toast, { Toaster } from 'react-hot-toast'

export default function Home() {
  return (
    <>
      <button
        onClick={() =>
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
      >
        Notify
      </button>

      {/* Dismiss Custom Toast */}
      {/* TIP: To dismiss all toasts, call toast.dismiss() without args */}
      <button onClick={() => toast.dismiss('custom-toast')}>
        Dismiss Custom Toast
      </button>

      <Toaster position='bottom-right' reverseOrder={true} />

      {/* CHANGE POSITION: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
       */}
    </>
  )
}
