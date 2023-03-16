import Head from "next/head"

interface TabHeaderProps {
    title : string,
    meta: string,
}

const TabHeader = ({title, meta} : TabHeaderProps) => {
  return (
    <Head>
        <title>{title}</title>
        <meta name="description" content={meta} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/netflix_fav.webp" />
      </Head>
  )
}

export default TabHeader