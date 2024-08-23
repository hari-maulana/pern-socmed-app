import React, { useState, FormEvent } from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import LogoBrand from '../../components/commons/LogoBrand';
import InputField from '../../components/commons/InputField';
import CommonButton from '../../components/commons/CommonButton';
import { useUser } from '../../stores/UserContext';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    navigate('/auth/login');
    //
    try {
      axios
        .post(`${import.meta.env.VITE_API_URL}/auth/register`, {
          name: name,
          username: username,
          email: email,
          password: password,
        })
        .then((response) => {
          setSuccess(response.data.message);
        })
        .catch((error) => {
          setError(error.response.data.error);
        });
        
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container sx={{ backgroundColor: '', height: '100vh' }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Container
          maxWidth="xs"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '',
            margin: 'auto auto',
          }}
        >
          <LogoBrand />
          <Typography variant="h4" sx={{ margin: '15px 0' }}>
            Ascend your Journey to the Next Level!
          </Typography>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <InputField
              placeholder="name*"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputField
              placeholder="Username*"
              type="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              placeholder="Email*"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              placeholder="Password*"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CommonButton text="Create Account" />
          </form>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          <Typography variant="h6" sx={{ margin: '15px 0' }}>
            Already have an account?{' '}
            <Link
              onClick={() => navigate('/auth/login')}
              sx={{
                color: 'FFD31D',
                textDecoration: 'none',
                ':hover': { color: '#F6EEDF', cursor: 'pointer' },
              }}
            >
              Login
            </Link>
          </Typography>
        </Container>
      </Box>
    </Container>
  );
};

export default Register;
