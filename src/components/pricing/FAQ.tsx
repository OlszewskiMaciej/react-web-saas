import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Paper,
  Grid,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange = (panel: string) => (
    _: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  // FAQ items
  const faqItems = [
    {
      question: t('pricing.faq.questions.q1'),
      answer: t('pricing.faq.questions.a1'),
      panel: 'panel1',
    },
    {
      question: t('pricing.faq.questions.q2'),
      answer: t('pricing.faq.questions.a2'),
      panel: 'panel2',
    },
    {
      question: t('pricing.faq.questions.q3'),
      answer: t('pricing.faq.questions.a3'),
      panel: 'panel3',
    },
    {
      question: t('pricing.faq.questions.q4'),
      answer: t('pricing.faq.questions.a4'),
      panel: 'panel4',
    },
    {
      question: t('pricing.faq.questions.q5'),
      answer: t('pricing.faq.questions.a5'),
      panel: 'panel5',
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '-2%',
          width: '15%',
          height: '15%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.light}22, ${theme.palette.primary.light}00)`,
          zIndex: 0,
        }}
      />

      {/* Subtle dots pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: theme.palette.mode === 'light' ? 0.3 : 0.15,
          backgroundImage: `radial-gradient(${theme.palette.divider} 2px, transparent 2px)`,
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={8}>
          <Grid xs={12} md={5} item>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <Typography
                variant="h2"
                component="h2"
                gutterBottom
                sx={{ 
                  mb: 3, 
                  fontWeight: 700,
                  background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('pricing.faq.title')}
              </Typography>

              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ 
                  mb: 4,
                  fontWeight: 'normal',
                  lineHeight: 1.6
                }}
              >
                {t('pricing.faq.subtitle', 'Find answers to the most commonly asked questions about our platform and services.')}
              </Typography>

              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Box sx={{ mb: 6 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 3,
                      bgcolor: theme.palette.mode === 'light' ? 'grey.50' : 'background.paper',
                      border: '1px solid',
                      borderColor: theme.palette.divider,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: theme.palette.primary.main + '10',
                          color: theme.palette.primary.main,
                          mr: 2,
                          flexShrink: 0,
                        }}
                      >
                        <HelpOutlineIcon />
                      </Box>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {t('pricing.faq.cantFind', "Can't find the answer?")}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                          {t('pricing.faq.contactUs', "Contact our customer support team and we'll get back to you as soon as possible.")}
                        </Typography>
                        <Button 
                          variant="contained" 
                          disableElevation
                          endIcon={<ArrowForwardIcon />}
                          sx={{
                            borderRadius: 2,
                            px: 3,
                            py: 1,
                            fontWeight: 600,
                          }}
                        >
                          {t('pricing.faq.contactSupport', 'Contact Support')}
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid xs={12} md={7} item>
            <Box>
              {faqItems.map((item, index) => (
                <React.Fragment key={item.panel}>
                  <Accordion
                    expanded={expanded === item.panel}
                    onChange={handleChange(item.panel)}
                    elevation={0}
                    disableGutters
                    sx={{
                      mb: 2,
                      bgcolor: 'transparent',
                      '&:before': {
                        display: 'none',
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            bgcolor: expanded === item.panel ? 'primary.main' : 'transparent',
                            border: '1px solid',
                            borderColor: expanded === item.panel ? 'primary.main' : theme.palette.divider,
                            color: expanded === item.panel ? 'white' : 'text.secondary',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <ExpandMoreIcon fontSize="small" />
                        </Box>
                      }
                      aria-controls={`${item.panel}-content`}
                      id={`${item.panel}-header`}
                      sx={{
                        px: 3,
                        py: 1.5,
                        borderRadius: 2,
                        bgcolor: expanded === item.panel 
                          ? theme.palette.primary.main + '10'
                          : theme.palette.mode === 'light' ? 'white' : 'background.paper',
                        border: '1px solid',
                        borderColor: expanded === item.panel 
                          ? theme.palette.primary.main 
                          : theme.palette.divider,
                        boxShadow: expanded === item.panel 
                          ? `0 4px 20px ${theme.palette.primary.main}20`
                          : 'none',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: expanded === item.panel 
                            ? theme.palette.primary.main + '15'
                            : theme.palette.mode === 'light' ? 'grey.50' : 'grey.900',
                        },
                        '& .MuiAccordionSummary-content': {
                          margin: '12px 0',
                        },
                      }}
                    >
                      <Typography 
                        variant="subtitle1" 
                        fontWeight={600}
                        color={expanded === item.panel ? 'primary.main' : 'text.primary'}
                      >
                        {item.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        px: 3,
                        py: 2,
                        borderBottomLeftRadius: 2,
                        borderBottomRightRadius: 2,
                      }}
                    >
                      <Typography 
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.7,
                        }}
                      >
                        {item.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  
                  {index < faqItems.length - 1 && (
                    <Box sx={{ height: 16 }} />
                  )}
                </React.Fragment>
              ))}
            </Box>

            {/* Mobile support box */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: theme.palette.mode === 'light' ? 'grey.50' : 'background.paper',
                  border: '1px solid',
                  borderColor: theme.palette.divider,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: theme.palette.primary.main + '10',
                      color: theme.palette.primary.main,
                      mr: 2,
                      flexShrink: 0,
                    }}
                  >
                    <HelpOutlineIcon />
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {t('pricing.faq.cantFind', "Can't find the answer?")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {t('pricing.faq.contactUs', "Contact our customer support team and we'll get back to you as soon as possible.")}
                    </Typography>
                    <Button 
                      variant="contained" 
                      disableElevation
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                      }}
                    >
                      {t('pricing.faq.contactSupport', 'Contact Support')}
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FAQ;
