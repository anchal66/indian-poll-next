import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../services/authService';
import { createPoll, isPollUrlUnique } from '../services/pollService';
import { TextField, Button, Container, Typography, Box, FormControlLabel, Switch } from '@mui/material';

interface PollOption {
  text: string;
  votes: number;
}

interface PollData {
  title: string;
  description: string;
  options: PollOption[];
  sharingMessage: string;
  creatorUid: string;
  url: string;
  requireSignIn: boolean;
  imageUrl?: string;
}

const CreatePoll: React.FC = () => {
  const { user, googleSignIn } = useAuth();
  const router = useRouter();
  const [pollData, setPollData] = useState<PollData>({
    title: '',
    description: '',
    options: [{ text: '', votes: 0 }, { text: '', votes: 0 }],
    sharingMessage: '',
    creatorUid: '',
    url: '',
    requireSignIn: false,
    imageUrl: '' // New field for image URL
  });
  const [urlError, setUrlError] = useState('');

  useEffect(() => {
    if (user) {
      setPollData((prevData) => ({ ...prevData, creatorUid: user.uid }));
    }
  }, [user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPollData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const options = [...pollData.options];
    options[index].text = value;
    setPollData((prevData) => ({ ...prevData, options }));
  };

  const addOption = () => {
    setPollData((prevData) => ({ ...prevData, options: [...prevData.options, { text: '', votes: 0 }] }));
  };

  const removeOption = (index: number) => {
    const options = pollData.options.filter((_, i) => i !== index);
    setPollData((prevData) => ({ ...prevData, options }));
  };

  const generateUrl = () => {
    const title = pollData.title.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 20);
    setPollData((prevData) => ({ ...prevData, url: title.replace(/-+$/, '') }));
  };

  const checkUrl = async () => {
    if (!pollData.url) return;
    const urlUnique = await isPollUrlUnique(pollData.url);
    if (!urlUnique) {
      setUrlError('This URL is already taken. Please choose another one.');
    } else {
      setUrlError('');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      googleSignIn();
    } else {
      const urlUnique = await isPollUrlUnique(pollData.url);
      if (!urlUnique) {
        setUrlError('This URL is already taken. Please choose another one.');
        return;
      }
      createPoll(pollData).then(() => {
        router.push(`/${pollData.url}`);
      }).catch((error) => {
        console.error('Error creating poll: ', error);
      });
    }
  };

  return (
    <Container className="container" style={{ marginTop: '80px' }}>
      <Typography variant="h4" gutterBottom>
        Create Poll
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={pollData.title}
          onChange={handleInputChange}
          onBlur={generateUrl}
          fullWidth
          required
        />
        <TextField
          label="Description"
          name="description"
          value={pollData.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
          required
          style={{ marginTop: 16 }}
        />
        <TextField
          label="Sharing Message"
          name="sharingMessage"
          value={pollData.sharingMessage}
          onChange={handleInputChange}
          fullWidth
          required
          style={{ marginTop: 16 }}
        />
        <TextField
          label="URL"
          name="url"
          value={pollData.url}
          onChange={handleInputChange}
          onBlur={checkUrl}
          fullWidth
          required
          error={!!urlError}
          helperText={urlError}
          style={{ marginTop: 16 }}
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          value={pollData.imageUrl}
          onChange={handleInputChange}
          fullWidth
          style={{ marginTop: 16 }}
        />
        <FormControlLabel
          control={<Switch checked={pollData.requireSignIn} onChange={() => setPollData((prevData) => ({ ...prevData, requireSignIn: !prevData.requireSignIn }))} />}
          label="Require Sign-In to Vote"
          style={{ marginTop: 16 }}
        />
        <Typography variant="h6" gutterBottom style={{ marginTop: 16 }}>
          Options
        </Typography>
        {pollData.options.map((option, index) => (
          <Box key={index} display="flex" alignItems="center" style={{ marginTop: 8 }}>
            <TextField
              label={`Option ${index + 1}`}
              value={option.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              fullWidth
              required
            />
            <Button onClick={() => removeOption(index)} disabled={pollData.options.length <= 2} style={{ marginLeft: 8 }}>
              Remove
            </Button>
          </Box>
        ))}
        <Button onClick={addOption} style={{ marginTop: 16 }}>
          Add Option
        </Button>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>
          Create Poll
        </Button>
      </Box>
    </Container>
  );
};

export default CreatePoll;
