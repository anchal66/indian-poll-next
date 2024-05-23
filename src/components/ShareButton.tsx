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
    const image = imageUrl || defaultImageUrl;
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: sharingMessage,
          url: url,
          files: [new File([image], 'image.png', { type: 'image/png' })]
        });
      } catch (error) {
        console.error('Error sharing', error);
      }
    } else {
      alert('Web Share API is not supported in your browser.');
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
