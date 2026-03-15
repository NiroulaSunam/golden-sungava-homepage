import { Box, Typography, Container } from '@mui/material';

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2,
        }}
      >
        <Typography variant="h2" component="h1" fontFamily="var(--font-cormorant)" fontWeight={600}>
          Golden Sungava
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Homepage coming soon
        </Typography>
      </Box>
    </Container>
  );
}
