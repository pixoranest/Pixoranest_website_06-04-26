import Script from "next/script"

export function GoogleAnalytics({ id }: { id: string }) {
  if (process.env.NODE_ENV !== "production") return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', {
            send_page_view: false,
            transport_type: 'beacon'
          });
        `}
      </Script>
    </>
  )
}