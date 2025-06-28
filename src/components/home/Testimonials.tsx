import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  useTheme,
  IconButton,
  Stack,
  Rating,
  Chip,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const testimonials = [
    {
      quote: t('home.testimonials.testimonial1.quote'),
      author: t('home.testimonials.testimonial1.author'),
      position: t('home.testimonials.testimonial1.position'),
      avatar: 'S',
      rating: 5,
      companyLogo: '✦',
    },
    {
      quote: t('home.testimonials.testimonial2.quote'),
      author: t('home.testimonials.testimonial2.author'),
      position: t('home.testimonials.testimonial2.position'),
      avatar: 'M',
      rating: 5,
      companyLogo: '◆',
    },
    {
      quote: t('home.testimonials.testimonial3.quote'),
      author: t('home.testimonials.testimonial3.author'),
      position: t('home.testimonials.testimonial3.position'),
      avatar: 'E',
      rating: 5,
      companyLogo: '⬢',
    },
  ];

  // Company logos with translations
  const companyLogos = [
    t('home.testimonials.companies.company'),
    t('home.testimonials.companies.enterprise'),
    t('home.testimonials.companies.business'),
    t('home.testimonials.companies.startup'),
    t('home.testimonials.companies.agency')
  ];

  // For mobile view slider
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Generate colors for avatars
  const getAvatarColor = (index: number) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
    ];
    return colors[index % colors.length];
  };

  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: theme.palette.mode === 'light' ? 'grey.50' : 'background.default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: '20%',
          height: '20%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.light}22, ${theme.palette.primary.light}00)`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '-2%',
          width: '15%',
          height: '15%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.light}22, ${theme.palette.secondary.light}00)`,
        }}
      />

      {/* Subtle grid pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.4,
          backgroundImage: 
            `linear-gradient(${theme.palette.divider} 1px, transparent 1px), 
             linear-gradient(90deg, ${theme.palette.divider} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          backgroundPosition: '-1px -1px',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Clients logos section */}
        <Box sx={{ mb: 10 }}>          
          <Typography
            variant="subtitle1"
            color="text.secondary"
            align="center"
            sx={{ mb: 4, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 500 }}
          >
            {t('home.testimonials.trustedBy')}
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {companyLogos.map((logo, i) => (
              <Grid item key={i}>
                <Box
                  sx={{
                    opacity: 0.7,
                    filter: 'grayscale(1)',
                    transition: 'all 0.2s',
                    '&:hover': {
                      opacity: 1,
                      filter: 'grayscale(0)',
                    },
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '0.9rem', sm: '1.1rem' },
                      fontWeight: 500,
                      letterSpacing: 1,
                    }}
                  >
                    {logo}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 2,
              fontWeight: 700,
              background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('home.testimonials.title')}
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ 
              mb: 3, 
              fontWeight: 'normal', 
              maxWidth: 700, 
              mx: 'auto',
              lineHeight: 1.6 
            }}
          >
            {t('home.testimonials.subtitle')}
          </Typography>
        </Box>

        {/* Desktop view */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    pt: 2,
                    bgcolor: theme.palette.background.paper,
                    transition: 'all 0.3s ease',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.800',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: theme.palette.mode === 'light' 
                        ? '0 22px 45px rgba(0, 0, 0, 0.08)'
                        : '0 22px 45px rgba(0, 0, 0, 0.25)',
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, pt: 6, flexGrow: 1 }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mb: 3 
                      }}
                    >
                      <Rating value={testimonial.rating} readOnly size="small" />
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          color: theme.palette.mode === 'light' ? 'grey.300' : 'grey.700',
                          fontFamily: 'serif',
                          fontSize: 60,
                          lineHeight: 1,
                          mt: -4,
                        }}
                      >
                        "
                      </Typography>
                    </Box>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 4, 
                        fontStyle: 'normal',
                        lineHeight: 1.8,
                        fontWeight: 400,
                        color: theme.palette.mode === 'light' ? 'text.primary' : 'text.secondary',
                      }}
                    >
                      "{testimonial.quote}"
                    </Typography>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: getAvatarColor(index),
                          mr: 2,
                          width: 45,
                          height: 45,
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)'
                        }}
                      >
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {testimonial.author}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.position}
                        </Typography>
                      </Box>
                      <Box sx={{ ml: 'auto' }}>
                        <Chip 
                          label={testimonial.companyLogo}
                          size="small"
                          sx={{ 
                            color: getAvatarColor(index),
                            borderColor: getAvatarColor(index),
                            fontSize: "1rem",
                            fontWeight: "bold"
                          }}
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Mobile view slider */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Card
            elevation={0}
            sx={{
              position: 'relative',
              pt: 2,
              bgcolor: theme.palette.background.paper,
              borderRadius: 3,
              border: '1px solid',
              borderColor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.800',
              boxShadow: theme.palette.mode === 'light' 
                ? '0 10px 30px rgba(0, 0, 0, 0.08)'
                : '0 10px 30px rgba(0, 0, 0, 0.25)',
            }}
          >
            <CardContent sx={{ p: 4, pt: 6 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mb: 3 
                }}
              >
                <Rating value={testimonials[currentSlide].rating} readOnly size="small" />
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: theme.palette.mode === 'light' ? 'grey.300' : 'grey.700',
                    fontFamily: 'serif',
                    fontSize: 60,
                    lineHeight: 1,
                    mt: -4,
                  }}
                >
                  "
                </Typography>
              </Box>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 4, 
                  fontStyle: 'normal',
                  lineHeight: 1.8,
                  fontWeight: 400,
                  color: theme.palette.mode === 'light' ? 'text.primary' : 'text.secondary',
                }}
              >
                "{testimonials[currentSlide].quote}"
              </Typography>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      bgcolor: getAvatarColor(currentSlide),
                      mr: 2,
                      width: 45,
                      height: 45,
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)'
                    }}
                  >
                    {testimonials[currentSlide].avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {testimonials[currentSlide].author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonials[currentSlide].position}
                    </Typography>
                  </Box>
                </Box>
                <Chip 
                  label={testimonials[currentSlide].companyLogo}
                  size="small"
                  sx={{ 
                    color: getAvatarColor(currentSlide),
                    borderColor: getAvatarColor(currentSlide),
                    fontSize: "1rem",
                    fontWeight: "bold"
                  }}
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <IconButton 
              onClick={prevSlide} 
              sx={{
                bgcolor: theme.palette.background.paper,
                border: '1px solid',
                borderColor: theme.palette.divider,
                '&:hover': {
                  bgcolor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.800',
                }
              }}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Stack direction="row" spacing={1} sx={{ mx: 2, alignItems: 'center' }}>
              {testimonials.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: currentSlide === index ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    bgcolor: currentSlide === index ? 'primary.main' : 'divider',
                  }}
                />
              ))}
            </Stack>
            <IconButton 
              onClick={nextSlide} 
              sx={{
                bgcolor: theme.palette.background.paper,
                border: '1px solid',
                borderColor: theme.palette.divider,
                '&:hover': {
                  bgcolor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.800',
                }
              }}
            >
              <ArrowForwardIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;
