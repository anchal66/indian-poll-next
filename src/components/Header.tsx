// src/components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../services/authService';
import { AppBar, Toolbar, Button } from '@mui/material';
import Image from 'next/image';

const Header: React.FC = () => {
  const { user, googleSignIn, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', height: '64px' }}>
        <Link href="/" passHref>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Image src="/logo.png" alt="Logo" layout="fixed" width={60} height={60} style={{ objectFit: 'contain' }} />
          </div>
        </Link>
        <div>
          {user ? (
            <>
              <Button color="inherit" onClick={logout}>Logout</Button>
              <Button color="inherit" component={Link} href="/create">Create Poll</Button>
              <Button color="inherit" component={Link} href="/mypolls">My Polls</Button>
            </>
          ) : (
            <Button color="inherit" onClick={googleSignIn}>Sign In | Sign Up</Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
