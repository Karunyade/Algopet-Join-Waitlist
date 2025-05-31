// src/Home.jsx
import React, { useState, useRef } from "react";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
  Paper,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  keyframes,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ListItemButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';



// Animations
const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
    filter: blur(0px);
  }
  50% {
    transform: translateY(-6px);
    filter: blur(1px);
  }
  100% {
    transform: translateY(0);
    filter: blur(0px);
  }
`;


const flicker = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;

// Styled components
const ForgettingWord = styled("span")(({ theme }) => ({
  color: "#a830d2",
  display: "inline-block",
  animation: `${floatAnimation} 2.5s ease-in-out infinite`,
}));

const GrowingWord = styled("span")(({ theme }) => ({
  color: "#a830d2",
  backgroundColor: "#fff",
  padding: "0 6px",
  borderRadius: "6px",
}));

const LosingWord = styled("span")({
  color: "#a830d2",
  fontWeight: "bold",
  animation: `${flicker} 2.5s infinite`,
});


const Home = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const menuItems = ["Your Struggles","Our Solutions","FAQ"];
  const faqRef = useRef(null);
  const struggle=useRef(null);
  const solution=useRef(null);
  const navigate = useNavigate();

  const handleMenuClick = (item) => {
    if (item === "FAQ") {
      // Delay scrolling until drawer is fully closed
      setOpenDrawer(false);
      setTimeout(() => {
        faqRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300); // matches the MUI Drawer close animation duration
    }
    else if(item=="Your Struggles"){
      setOpenDrawer(false);
      setTimeout(() => {
        struggle.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300); 
    }
    else if(item=="Our Solutions"){
       setOpenDrawer(false);
      setTimeout(() => {
        solution.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300); 
    }
    else {
      setOpenDrawer(false);
    }
  };
  

  return (
    <Box
      sx={{
        backgroundColor: "#111",
        minHeight: "100vh",
        fontFamily: "'Bubblegum Sans', sans-serif",
        color: "#a830d2",
        p: 2,
      }}
    >
      {/* Mobile Menu Icon */}
      {isSmall && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton onClick={() => setOpenDrawer(true)} sx={{ color: "#fff" }}>
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {/* Drawer */}
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{ width: 200, backgroundColor: "#fff", height: "100%" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem disablePadding key={item}>
              <ListItemButton onClick={() => handleMenuClick(item)}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </Box>
      </Drawer>

      {/* Top Menu for Larger Screens */}
      {!isSmall && (
        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" sx={{ mb: 4 }}>
          {menuItems.map((item) => (
            <Paper
              key={item}
              elevation={3}
              sx={{
                px: 3,
                py: 1,
                borderRadius: "2rem",
                backgroundColor: "#fff",
                color: "#000",
                fontFamily: "'Bubblegum Sans', sans-serif",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
              onClick={() => handleMenuClick(item)}  // scroll on desktop
            >
              {item}
            </Paper>
          ))}
        </Stack>
      )}

      {/* Hero Section */}
       <Box sx={{ position: "relative", overflow: "hidden" , borderRadius: "2rem"}}>
        {/* Gradient Background Layer */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
            background: `
              radial-gradient(circle at top left, rgba(168, 48, 210, 0.4), transparent 60%),
              radial-gradient(circle at bottom right, rgba(168, 48, 210, 0.4), transparent 60%)
            `,
          }}
        />

        {/* Foreground Content */}
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
          direction="column"
          sx={{
            position: "relative", // so it sits above the background
            zIndex: 1,
            px: { xs: 2, sm: 4, md: 6 },
            py: { xs: 6, sm: 8 },
            textAlign: "center",
            minHeight: "80vh",
          }}
        >
          <Grid item xs={12} md={8}>
            <Box sx={{ maxWidth: 700, mx: "auto" }}>
              <Typography
                variant="h3"
                sx={{
                  color: "#fff",
                  fontFamily: "'Bubblegum Sans', sans-serif",
                  mb: 2,
                  lineHeight: 1.3,
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    whiteSpace: { xs: "normal", md: "nowrap" },
                  }}
                >
                  Stop <ForgettingWord>forgetting</ForgettingWord> patterns,&nbsp;
                  <LosingWord>losing</LosingWord> momentum.
                </Box>
                <br />
                Start <GrowingWord>growing</GrowingWord> daily.
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "#ccc",
                  fontFamily: "'Bubblegum Sans', sans-serif",
                  mb: 3,
                  fontSize: { xs: "1rem", sm: "1.3rem" },
                }}
              >
                Most developers give up not due to a lack of skill, but because they forget patterns and lose momentum.
                AlgoPet keeps you on track and uses spaced repetition and own remainders to help you retain what you learn and progress in DSA.
              </Typography>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#a830d2",
                  borderRadius: "2rem",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.2rem",
                  textTransform: "none",
                  fontFamily: "'Bubblegum Sans', sans-serif",
                  "&:hover": {
                    backgroundColor: "#9229b7",
                  },
                }}
                onClick={() => window.open("https://forms.gle/6irFm9rUE3FWk5E3A", "_blank")}
              >
                Join WaitList  →
              </Button>
            </Box>

               {/* Follow Us Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  mt: { xs: 2, sm: 3 },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#fff",
                    fontFamily: "'Bubblegum Sans', sans-serif",
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                  }}
                >
                  Follow us for more updates
                </Typography>
                
                <IconButton
                  onClick={() => window.open("https://www.linkedin.com/company/algopet-your-coding-buddy/", "_blank")}
                  sx={{
                    backgroundColor: "transparent",
                    border: "2px solid #0077b5",
                    width: { xs: 50, sm: 60 },
                    height: { xs: 50, sm: 60 },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#0077b5",
                      transform: "scale(1.1)",
                      "& .MuiSvgIcon-root": {
                        color: "#fff",
                      },
                    },
                  }}
                >
                  <LinkedInIcon 
                    sx={{ 
                      color: "#0077b5", 
                      fontSize: { xs: 24, sm: 28 } 
                    }} 
                  />
                </IconButton>
              </Box>
          </Grid>
        </Grid>
      </Box>


      {/* Developer’s Consistency */}
      <Box
        ref={struggle}
        sx={{
          mt: 10,
          px: isSmall ? 2 : 6,
          py: 6,
          backgroundColor: "#1c1c1c",
          borderRadius: "2rem",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography
          variant={isSmall ? "h5" : "h4"}
          sx={{
            fontFamily: "'Bubblegum Sans', sans-serif",
            mb: 3,
            color: "#a830d2",
          }}
        >
          It’s Not Laziness — <br />
          <span style={{ color: "#fff" }}>
            You Just Haven’t Had a <strong style={{ color: "#a830d2" }}>System</strong> That Works for You Yet.
          </span>
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Bubblegum Sans', sans-serif",
            color: "#ccc",
            mb: 5,
          }}
        >
           Why is it so easy to <span style={{ color: "#CE0A18", fontWeight: "bold" }}>forget DSA</span> — and so <span style={{ color: "#CE0A18", fontWeight: "bold" }}>hard </span>to stay on track?
          <br />
          The truth is, most devs don’t need another tutorial — they need a <span style={{ color: "#82D523", fontSize: "2rem"}}>system</span>.
        </Typography>

        {/* Forget patterns problem */}

       <Stack
        direction={isSmall ? "column" : "row"}
        spacing={isSmall ? 6 : 10}
        justifyContent="center"
        alignItems="center"
        sx={{
          mt: 6,
          px: isSmall ? 2 : 4,
          flexWrap: "wrap",
        }}
      >
        {/* Brain Icon Section */}
        <Box sx={{ textAlign: "center", maxWidth: 250 }}>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Bubblegum Sans', sans-serif",
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.2rem" },
              mb: 1,
            }}
          >
            Are you finally learning DSA ?
          </Typography>
          <Typography variant="h2" component="div" sx={{ fontSize:  { xs: "3rem", sm: "3rem", md: "4rem" } }}>
            🧠
          </Typography>
        </Box>

        {/* Arrow (only on larger screens) */}
        {!isSmall && (
          <Box>
            <img src="arrow1.png" alt="arrow" style={{ width: 70, height: 60 }} />
          </Box>
        )}

        {/* Thinking Face Icon Section */}
        <Box sx={{ textAlign: "center", maxWidth: 280 }}>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Bubblegum Sans', sans-serif",
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.2rem" },
              mb: 1,
            }}
          >
            Then why does your brain forget it like a Snapchat story after 24 hours? 🤔
          </Typography>
          <Typography variant="h2" component="div" sx={{ fontSize: { xs: "3rem", sm: "3rem", md: "3rem" } }}>
            🤔
          </Typography>
        </Box>
      </Stack>

      {/* Drop in mood */}
      <Typography
        sx={{
          mt: 4,
          fontFamily: "'Bubblegum Sans', sans-serif",
          fontSize: isSmall ? "0.95rem" : "1.15rem",
          color: "#ff6b6b",
          textAlign: "center",
        }}
      >
        You grind LeetCode all week, then <span style={{ color: "#fff" }}>blank out</span> when it matters.
      </Typography>


      {/* Consistency problem */}

       <Stack
        direction={isSmall ? "column" : "row"}
        spacing={isSmall ? 4 : 6}
        justifyContent="center"
        alignItems="center"
        sx={{
          mt: 6,
          px: isSmall ? 2 : 4,
          flexWrap: "wrap",
        }}
      >
        {/* Monday */}
        <Box sx={{ textAlign: "center", maxWidth: 200 }}>
          <Typography variant="body1">Start strong on a Monday...</Typography>
          <Typography variant="h3">😎</Typography>
        </Box>

        {/* Arrow */}
        {!isSmall && (
          <Box>
            <img src="arrow1.png" alt="arrow" style={{ width: 70, height: 60 }} />
          </Box>
        )}

        {/* Wednesday */}
        <Box sx={{ textAlign: "center", maxWidth: 200 }}>
          <Typography variant="body1">Lose track by Wednesday...</Typography>
          <Typography variant="h3">😔</Typography>
        </Box>

        {/* Arrow */}
        {!isSmall && (
          <Box>
            <img src="/arrow2.png" alt="arrow" style={{ width: 70, height: 60 }} />
          </Box>
        )}

        {/* Weekend */}
        <Box sx={{ textAlign: "center", maxWidth: 220 }}>
          <Typography variant="body1">
            Burn out by the weekend and restart again next week.
          </Typography>
          <Typography variant="h3">📉</Typography>
        </Box>
      </Stack>

      {/* Drop in mood */}
      <Typography
        sx={{
          mt: 4,
          fontFamily: "'Bubblegum Sans', sans-serif",
          fontSize: isSmall ? "0.95 rem" : "1.15rem",
          color: "#ff6b6b",
          textAlign: "center",
        }}
      >
        Confidence drops. Progress resets.
      </Typography>


        <Box sx={{ mt: 5 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Bubblegum Sans', sans-serif",
              color: "#a830d2",
              fontWeight: "bold",
            }}
          >
            AlgoPet breaks this cycle — with consistency, spaced repetition, and fun need change.
          </Typography>
        </Box>
      </Box>
    
      
    {/* Tired of feelong stuck */}
        <Box
        ref={solution}
        sx={{
          mt: 12,
          px: isSmall ? 2 : 6,
          py: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#111",
        }}
        >
        {/* Title */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: "#fff",
            fontFamily: "'Bubblegum Sans', sans-serif",
            mb: 6,
            textAlign: "center",
          }}
        >
          Tired of feeling{" "}
          <Box component="span" sx={{ color: "#a830d2", fontSize: "1.2em" }}>
            stuck
          </Box>{" "}
          and{" "}
          <Box component="span" sx={{ color: "#a830d2", fontSize: "1.2em" }}>
            lost
          </Box>
          ?
        </Typography>


        {/* Cards Container */}
        <Stack
          direction={isSmall ? "column" : "row"}
          spacing={6}
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", maxWidth: 1100 }}
        >
          {/* Left Card - Red */}
          <Box
            sx={{
              flex: 1,
              backdropFilter: "blur(8px)",
              backgroundColor: alpha("#ff6b6b", 0.1),
              border: "1px solid",
              borderColor: alpha("#ff6b6b", 0.4),
              borderRadius: "1.5rem",
              p: 4,
              color: "#fff",
              fontFamily: "'Bubblegum Sans', sans-serif",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 10px 30px rgba(255, 107, 107, 0.4)",
              },
            }}
          >
            <Typography variant="h5" sx={{ color: "#ff6b6b", mb: 2 }}textAlign="center">
               You without AlgoPet:
            </Typography>
            <ul style={{ paddingLeft: "1rem", margin: 0, fontSize: "1.1rem", lineHeight: 1.8 }}>
              <li>❌ “Why can’t I stay consistent?”</li>
              <li>😭 “I did 100 problems... why can’t I solve this one?”</li>
              <li>🤔 “I saw this before… but what was the approach?”</li>
              <li>💤 Forgot to solve a problem again... guilt hits at midnight.</li>
              <li>😤 Frustration builds. You doubt yourself. You stop.</li>
              <li>🕳️ Motivation drops. Progress fades.</li>
              <li>🙅 No system = poor recall, slow improvement.</li>
            </ul>
          </Box>

          {/* Right Card - Green */}
          <Box
            sx={{
              flex: 1,
              backdropFilter: "blur(8px)",
              backgroundColor: alpha("#00c853", 0.1),
              border: "1px solid",
              borderColor: alpha("#00c853", 0.4),
              borderRadius: "1.5rem",
              p: 4,
              color: "#fff",
              fontFamily: "'Bubblegum Sans', sans-serif",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 10px 30px rgba(0, 200, 83, 0.4)",
              },
            }}
          >
            <Typography variant="h5" sx={{ color: "#00e676", mb: 2 }} textAlign="center">
               You + AlgoPet:
            </Typography>
            <ul style={{ paddingLeft: "1rem", margin: 0, fontSize: "1.1rem", lineHeight: 1.8 }}>
              <li>📌 Stay consistent with your cheer-up coding buddy</li>
              <li>🧠 Code less, remember more through spaced repetition</li>
              <li>🔥 Solving by it's algorithm and confidence helps you remember.</li>
              <li>📞 Your buddy pings right when it's grind time.</li>
              <li>🧩 Learn patterns with smart flashcards</li>
              <li>📈 Track visible growth by Badges, stay motivated</li>
              <li>💪 Boost your confidence with every solved problem</li>
            </ul>
          </Box>
        </Stack>


        <Typography
        variant="h5"
        sx={{
          mt: 8,
          color: "#fff",
          textAlign: "center",
          fontFamily: "'Bubblegum Sans', sans-serif",
          px: 2,
        }}
      >
        Are you really going to let <Box component="span" sx={{ color: "#C2262F" }}>another year pass</Box>{" "} in the same loop?
        <br />
        Or will you <Box component="span" sx={{ color: "#00e676" }}>break the cycle </Box> today with <Box component="span" sx={{ color: "#00e676" }}>AlgoPet</Box> ?
      </Typography>
      </Box>


      {/* FAQ Section */}
            
      <Box
      ref={faqRef} 
      sx={{
        mt: 12,
        px: isSmall ? 2 : 6,
        py: 8,
        backgroundColor: "#1c1c1c",
        borderRadius: "2rem",
        color: "#fff",
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      <Box 
        sx={{
          mt:10,
          display: "flex",
          flexDirection: isSmall ? "column" : "row",
          gap: 4,
          alignItems: isSmall ? "center" : "flex-start",
        }}
      >
        {/* Left: FAQ Heading */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Bubblegum Sans', sans-serif",
            color: "#a830d2",
            textAlign: isSmall ? "center" : "left",
            minWidth: isSmall ? "100%" : "300px",
          }}
        >
          Frequently Asked Questions
        </Typography>

        {/* Right: Questions + Answers */}
        <Box sx={{ flex: 1 }}>
          {[
            {
              question: "What is the point of this app?",
              answer:
                "AlgoPet is designed to help developers and students be consistent with coding and actually retain what they learn. We mix spaced repetition, gamification, and goal setting — so that you stop binge-watching tutorials and start becoming job-ready.",
            },
            {
              question: "Who is this app for?",
              answer:
                "• 🚫 Anyone stuck in cycles of 'I’ll start tomorrow' \n• 💻 College students & working professionals improving their DSA & LeetCode \n• 🔁 Spaced repetition to retain key concepts \n• 📊 Track your streaks & see progress \n• 🧩 Engage with quizzes and flashcards \n• 💡 Especially helpful for ADHD-prone brains that love structure + creativity",
            },
            {
              question: "How does AlgoPet work?",
              answer:
                "AlgoPet follows this simple but powerful flow: \n• 🧠 Set your coding Time  \n• 🎉 A digital pal that reminds, rewards, and grows with your grind.\n• 🧩 Track your LeetCode activity in real-time \n• 🔁 Revise previous problems with spaced repetition flashcards  \n  \n It’s a fun, smart system to help you become the developer you want to be — without burning out.",
            },
            {
              question: "How does AlgoPet help me stay consistent and avoid forgetting DSA patterns?",
              answer:
                "AlgoPet keeps you consistent by using spaced repetition and Own Remainders, ensuring you revisit key concepts when you need it most. No more starting over — AlgoPet helps you retain patterns, track progress, and reinforce learning with daily challenges. Stay on track, retain more, and keep moving forward!",
            },
            {
              question: "Will this actually help me?",
              answer:
                "If you're someone who: \n• struggles with consistency \n• feels overwhelmed with where to start \n• keeps forgetting what you learned \n• wants a creative, non-boring way to grow \n \n Then AlgoPet is built for you. We’ve helped students land internships, developers crack interviews, and others simply fall in love with coding again.",
            },
            {
              question: "I have another question.",
              answer: (
                <div>
                  We're always happy to help. Reach out:{" "}
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#a830d2",
                      borderRadius: "2rem",
                      px: 2,
                      py: 1,
                      fontSize: "1.2rem",
                      textTransform: "none",
                      fontFamily: "'Bubblegum Sans', sans-serif",
                      "&:hover": {
                        backgroundColor: "#9229b7",
                      },
                    }}
                    onClick={() =>
                      window.location.href = "mailto:algopet.codeandgrow@gmail.com"
                    }
                  >
                    Email Us
                  </Button>
                </div>
              ),
            },
          ].map((faq, index) => (
            <Accordion
              key={index}
              sx={{
                backgroundColor: "#2c2c2c",
                color: "#fff",
                mb: 2,
                borderRadius: "1rem",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#a830d2" }} />}
                aria-controls={`faq-content-${index}`}
                id={`faq-header-${index}`}
                sx={{
                  fontFamily: "'Bubblegum Sans', sans-serif",
                  fontWeight: "normal",
                  fontSize: "1.5rem",
                }}
              >
                {faq.question}
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  fontFamily: "'Bubblegum Sans', sans-serif",
                  color: "#ccc",
                  fontSize: "1.2rem",
                  whiteSpace: "pre-line", // To keep line breaks in answers
                }}
              >
                {faq.answer}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>

     {/* Footer section */}

        <Box
        component="footer"
        sx={{
          mt: 12,
          py: 6,
          px: 4,
          backgroundColor: "#111",
          color: "#ccc",
          fontFamily: "'Bubblegum Sans', sans-serif",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", sm: "flex-start" },
            gap: 4,
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          {/* Left: Logo & tagline */}
          <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", sm: "flex-start" }, gap: 1 }}>
            <img src="/weblogo.png" alt="AlgoPet Logo" width={32} height={32} />
            <Typography variant="h5" sx={{ color: "#a830d2", fontWeight: "bold" }}>
              AlgoPet
            </Typography>
          </Box>
          <Typography variant="h5" >
            Code. Grow. Evolve.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, maxWidth: 300 }}>
            Learn with flashcards, spaced repetition, and a Buddy who cheer up every day.
          </Typography>
        </Box>


          {/* Right: Social + Contact */}
          <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
              Get in Touch
            </Typography>
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  gap: 2,
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <a href="mailto:karunya.algopet@gmail.com" target="_blank" rel="noopener noreferrer">
                  <EmailIcon sx={{ color: "#a830d2", fontSize: 28 }} />
                </a>
                <a href="https://www.linkedin.com/company/algopet-your-coding-buddy/" target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon sx={{ color: "#a830d2", fontSize: 28 }} />
                </a>
              </Box>

          </Box>
        </Box>

        {/* Bottom strip */}
        <Box sx={{ mt: 6, textAlign: "center", fontSize: "0.8rem", color: "#666" }}>
          © {new Date().getFullYear()} AlgoPet. All rights reserved.
        </Box>
      </Box>


          
    </Box>
  );
};

export default Home;
