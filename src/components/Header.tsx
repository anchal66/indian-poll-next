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
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/" passHref>
          <div style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
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
