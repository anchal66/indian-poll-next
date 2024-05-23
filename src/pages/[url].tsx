import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../services/authService';
import { getPollByUrl, votePoll } from '../services/pollService';
import { Container, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, RadioGroup, FormControlLabel, Radio, LinearProgress, Box } from '@mui/material';
import ShareButton from '../components/ShareButton';

const PollDetail: React.FC<{ poll: any }> = ({ poll: initialPoll }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [poll, setPoll] = useState(initialPoll);
  const [totalVotes, setTotalVotes] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showCount, setShowCount] = useState<boolean>(false);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (poll) {
      const total = poll.options.reduce((sum: number, option: any) => sum + option.votes, 0);
      setTotalVotes(total);
      const deviceVotes = JSON.parse(localStorage.getItem(poll.id) || '[]');
      setHasVoted(deviceVotes.includes(user ? user.uid : null));

      if (typeof window !== 'undefined') {
        setShareUrl(`${window.location.origin}/${poll.url}`);
      }
    }
  }, [poll, user]);

  const handleVote = async () => {
    if (selectedOption !== null) {
      try {
        await votePoll(poll.id, selectedOption, user ? user.uid : null);
        const updatedPoll = await getPollByUrl(poll.url);
        setPoll({ ...updatedPoll, voters: updatedPoll.voters || [] });
        setHasVoted(true);
      } catch (error) {
        console.error(error);
      }
      setOpen(false);
    }
  };

  const handleOpen = () => {
    if (!hasVoted) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleCount = () => {
    setShowCount(!showCount);
  };

  const getVotePercentage = (votes: number) => {
    return totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
  };

  if (!poll) return <Typography>Loading...</Typography>;

  return (
    <>
      <Head>
        <title>{poll.title} | Indian Votes</title>
        <meta name="description" content={poll.description} />
        <meta property="og:title" content={`${poll.title} | Indian Votes`} />
        <meta property="og:description" content={poll.description} />
        <meta property="og:image" content={poll.imageUrl || '/logo.png'} />
        <meta property="og:url" content={`https://indianvotes.com/${poll.url}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Indian Votes" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${poll.title} | Indian Votes`} />
        <meta name="twitter:description" content={poll.description} />
        <meta name="twitter:image" content={poll.imageUrl || '/logo.png'} />
        <meta name="twitter:url" content={`https://indianvotes.com/${poll.url}`} />
      </Head>
      <Container className="container" style={{ marginTop: '80px' }}>
        <Card>
          <CardContent>
            <Typography variant="h4">{poll.title}</Typography>
            <Typography variant="body1" style={{ margin: '16px 0' }}>{poll.description}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              style={{ marginTop: 16 }}
              disabled={hasVoted}
            >
              Vote
            </Button>
            {hasVoted && <Typography color="error" style={{ marginTop: 8 }}>You have already voted!</Typography>}
            <Typography style={{ marginTop: 16 }}>Total Votes: {totalVotes}</Typography>
            {poll.options.map((option: any, index: number) => (
              <Box key={index} style={{ marginTop: 16 }}>
                <Typography>{option.text}</Typography>
                <LinearProgress variant="determinate" value={getVotePercentage(option.votes)} />
                <Box display="flex" justifyContent="space-between">
                  <Typography>{showCount ? `${option.votes} votes` : `${getVotePercentage(option.votes).toFixed(2)}%`}</Typography>
                  <Button onClick={toggleCount}>{showCount ? 'Show Percentage' : 'Show Count'}</Button>
                </Box>
              </Box>
            ))}
            <ShareButton
              title={poll.title}
              url={shareUrl}
              sharingMessage={poll.sharingMessage}
              imageUrl={poll.imageUrl || '/logo.png'}
            />
          </CardContent>
        </Card>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Vote for an Option</DialogTitle>
          <DialogContent>
            <RadioGroup value={selectedOption} onChange={(e) => setSelectedOption(parseInt(e.target.value, 10))}>
              {poll.options.map((option: any, index: number) => (
                <FormControlLabel key={index} value={index} control={<Radio />} label={option.text} />
              ))}
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleVote} color="secondary">
              Vote
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { url } = context.params as { url: string };
  const poll = await getPollByUrl(url);

  if (!poll) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      poll,
    },
  };
};

export default PollDetail;
