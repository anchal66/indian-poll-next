// src/components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../services/authService';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header: React.FC = () => {
  const { user, googleSignIn, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Indian Poll</Link>
        </Typography>
        {user ? (
          <>
            <Button color="inherit" onClick={logout}>Logout</Button>
            <Button color="inherit" component={Link} href="/create">Create Poll</Button>
            <Button color="inherit" component={Link} href="/mypolls">My Polls</Button>
          </>
        ) : (
          <Button color="inherit" onClick={googleSignIn}>Sign In | Sign Up</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
