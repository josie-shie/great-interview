import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterviewStore } from "../../store/interviewStore";
import { generateQuestions } from "../../services/aiService";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import "./Home.scss";

const JOB_TITLES = ["UI Developer", "Frontend Engineer"];
const JOB_LEVELS = [
  "Intern",
  "Junior",
  "Mid-level",
  "Senior",
  "Lead / Manager",
];

export default function Home() {
  const navigate = useNavigate();
  const { setQuestions, reset } = useInterviewStore();
  const [jobTitle, setJobTitle] = useState("");
  const [jobLevel, setJobLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStart = async () => {
    setError("");
    setLoading(true);
    try {
      reset();
      const questions = await generateQuestions(jobTitle, jobLevel);
      setQuestions(questions);
      navigate("/interview");
    } catch (e) {
      console.error(e);
      setError(
        "Failed to generate questions. Please check your API key and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const isReady = jobTitle && jobLevel && !loading;

  return (
    <Container maxWidth="sm">
      <Box className="home-wrapper">
        <Typography variant="h3" fontWeight={600}>
          Great Interview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select your position and level, then start the interview. Questions
          will be tailored to your role.
        </Typography>

        <Box className="home-selects">
          <FormControl fullWidth>
            <InputLabel>Job Title</InputLabel>
            <Select
              value={jobTitle}
              label="Job Title"
              onChange={(e) => setJobTitle(e.target.value)}
            >
              {JOB_TITLES.map((title) => (
                <MenuItem key={title} value={title}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Job Level</InputLabel>
            <Select
              value={jobLevel}
              label="Job Level"
              onChange={(e) => setJobLevel(e.target.value)}
            >
              {JOB_LEVELS.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          size="large"
          onClick={handleStart}
          disabled={!isReady}
          startIcon={
            loading ? <CircularProgress size={18} color="inherit" /> : null
          }
        >
          {loading ? "Generating Questions..." : "Start Interview"}
        </Button>
      </Box>
    </Container>
  );
}
