/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { firestore } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import Head from 'next/head';
import { Button, Container, Typography, Card, CardContent, Box, Grid } from '@mui/material';
import ShareButton from '../components/ShareButton';

const Home: React.FC = () => {
  const [polls, setPolls] = useState<any[]>([]);

  useEffect(() => {
    const pollsCollection = collection(firestore, 'polls');
    const unsubscribe = onSnapshot(pollsCollection, (snapshot) => {
      setPolls(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  return (
    <Container className="container" style={{ marginTop: '80px' }}>
      <Head>
        <title>Indian Votes | India's largest Election Poll</title>
        <meta name="description" content="Indian Votes is an open-source polling website where you can sign in and create your own polls. Share your polls publicly and engage your community. Participate in the latest polls and make your voice heard on Indian Votes. Our platform ensures that all polls are SEO optimized and can be easily accessed across the global internet." />
        <meta property="og:title" content="Indian Votes | India's largest Election Poll" />
        <meta property="og:description" content="Indian Votes is an open-source polling website where you can sign in and create your own polls. Share your polls publicly and engage your community. Participate in the latest polls and make your voice heard on Indian Votes. Our platform ensures that all polls are SEO optimized and can be easily accessed across the global internet." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://indianvotes.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Indian Votes" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Indian Votes | India's largest Election Poll" />
        <meta name="twitter:description" content="Indian Votes is an open-source polling website where you can sign in and create your own polls. Share your polls publicly and engage your community. Participate in the latest polls and make your voice heard on Indian Votes. Our platform ensures that all polls are SEO optimized and can be easily accessed across the global internet." />
        <meta name="twitter:image" content="/logo.png" />
        <meta name="twitter:url" content="https://indianvotes.com" />
        <meta name="keywords" content="Indian Votes, India Vote, election poll, create polls, share polls, online polls, open-source polling website, IndianVotes.com, Indian Election, India, Vote, Politics, Modi, BJP, Share Market, Share market prediction, Prediction" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Typography variant="h4" gutterBottom>
        Welcome to Indian Votes
      </Typography>
      <Typography variant="body1" gutterBottom>
        Indian Votes is an open-source polling website where you can sign in and create your own polls. Share your polls publicly and engage your community. Participate in the latest polls and make your voice heard on Indian Votes. Create and share online polls easily with Indian Votes. Engage your community and gather opinions quickly and effectively.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Our platform ensures that all polls are SEO optimized and can be easily accessed across the global internet. Whether you want to create a poll about the latest political issues, the best time to invest in the stock market, or any other topic, Indian Votes makes it simple and effective. Join our community today and start creating your own polls, or participate in existing ones to share your opinions. With Indian Votes, every voice matters.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Key Features:
        <ul>
          <li>Create and share your own polls easily.</li>
          <li>SEO optimized polls for better visibility on search engines.</li>
          <li>Accessible globally on the internet.</li>
          <li>Engage with a wide community and gather diverse opinions.</li>
          <li>Real-time voting results and analytics.</li>
          <li>Secure and user-friendly interface.</li>
          <li>Free and open-source platform.</li>
        </ul>
      </Typography>
      <Box mt={3}>
        {polls.map((poll) => (
          <Card key={poll.id} style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h5">
                <Link href={`/${poll.url}`} passHref legacyBehavior>
                  <a style={{ textDecoration: 'none', color: 'inherit' }}>{poll.title}</a>
                </Link>
              </Typography>
              <Typography variant="body2" style={{ margin: '8px 0' }}>{poll.description}</Typography>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Link href={`/${poll.url}`} passHref legacyBehavior>
                    <Button variant="contained" color="primary">
                      View Poll
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <ShareButton
                    title={poll.title}
                    url={typeof window !== 'undefined' ? `${window.location.origin}/${poll.url}` : ''}
                    sharingMessage={poll.sharingMessage}
                    imageUrl={poll.imageUrl || '/logo.png'}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Home;
