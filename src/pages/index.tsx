import React, { useEffect, useState } from 'react';
import { useAuth } from '../services/authService';
import { firestore } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import Head from 'next/head';
import { Button, Container, Typography, Card, CardContent, Box, Grid } from '@mui/material';
import ShareButton from '../components/ShareButton';

const Home: React.FC = () => {
  const { user, googleSignIn, logout } = useAuth();
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
        <title>Indian Votes | India&#39;s largest Election Poll</title>
        <meta name="description" content="Participate in the latest polls and make your voice heard on Indian Poll." />
        <meta property="og:title" content="Indian Votes | India&#39;s largest Election Poll" />
        <meta property="og:description" content="Participate in the latest polls and make your voice heard on Indian Poll." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://indianvotes.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Indian Poll" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Indian Votes | India&#39;s largest Election Poll" />
        <meta name="twitter:description" content="Participate in the latest polls and make your voice heard on Indian Poll." />
        <meta name="twitter:image" content="/logo.png" />
        <meta name="twitter:url" content="https://indianvotes.com" />
      </Head>
      <Typography variant="h4" gutterBottom>
        Welcome to Indian Poll
      </Typography>
      <Typography variant="body1" gutterBottom>
        Create and share online polls easily with Indian Poll. Engage your community and gather opinions quickly and effectively.
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
