// src/pages/mypolls.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../services/authService';
import { getMyPolls, deletePoll } from '../services/pollService';
import { useRouter } from 'next/router';
import { Container, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ShareButton from '../components/ShareButton';
import Link from 'next/link';

const MyPolls: React.FC = () => {
  const { user, googleSignIn } = useAuth();
  const [myPolls, setMyPolls] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [pollToDelete, setPollToDelete] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getMyPolls(user.uid).then(snapshot => {
        setMyPolls(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    }
  }, [user]);

  const handleDelete = (pollId: string) => {
    setPollToDelete(pollId);
    setOpen(true);
  };

  const confirmDelete = () => {
    if (pollToDelete) {
      deletePoll(pollToDelete).then(() => {
        setMyPolls(myPolls.filter(poll => poll.id !== pollToDelete));
        setOpen(false);
        setPollToDelete(null);
      });
    }
  };

  const cancelDelete = () => {
    setOpen(false);
    setPollToDelete(null);
  };

  const goToPollDetail = (url: string) => {
    router.push(`/${url}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Polls
      </Typography>
      {myPolls.length === 0 ? (
        <Typography variant="body1">
          You have not created any polls yet.
        </Typography>
      ) : (
        myPolls.map(poll => (
          <Card key={poll.id} style={{ marginTop: 16 }}>
            <CardContent>
              <Typography variant="h5" onClick={() => goToPollDetail(poll.url)} style={{ cursor: 'pointer' }}>
                {poll.title}
              </Typography>
              <Typography variant="body2">
                {poll.description}
              </Typography>
              <Button onClick={() => handleDelete(poll.id)} style={{ marginTop: 8 }}>
                Delete
              </Button>
              <ShareButton
                title={poll.title}
                url={`${window.location.origin}/${poll.url}`}
                sharingMessage={poll.sharingMessage}
                imageUrl={poll.imageUrl || '/logo.png'}
              />
            </CardContent>
          </Card>
        ))
      )}
      <Dialog open={open} onClose={cancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this poll?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyPolls;
