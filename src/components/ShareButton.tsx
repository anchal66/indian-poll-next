// src/components/ShareButton.tsx
import React from 'react';
import { Button } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

interface ShareButtonProps {
  title: string;
  url: string;
  sharingMessage: string;
  imageUrl?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, url, sharingMessage, imageUrl }) => {
  const defaultImageUrl = '/logo.png'; // Path to the default image in the public directory

  const handleShare = async () => {
    const fullMessage = `${sharingMessage}\n${url}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: fullMessage,
        });
      } catch (error) {
        console.error('Error sharing', error);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(fullMessage);
        alert('Sharing message copied to clipboard');
      } catch (error) {
        console.error('Could not copy text: ', error);
      }
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<ShareIcon />}
      onClick={handleShare}
    >
      Share
    </Button>
  );
};

export default ShareButton;
