import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:title" content="Indian Votes | India's largest Election Poll" />
        <meta property="og:description" content="Participate in the latest polls and make your voice heard on Indian Votes. Create Poll by simple google sigin and share the Poll among your friends or community." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://indianvotes.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Indian Votes" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Indian Votes | India's largest Election Poll" />
        <meta name="twitter:description" content="Participate in the latest polls and make your voice heard on Indian Votes. Create Poll by simple google sigin and share the Poll among your friends or community." />
        <meta name="twitter:image" content="/logo.png" />
        <meta name="twitter:url" content="https://indianvotes.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
