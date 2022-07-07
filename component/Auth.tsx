import {
  autocompleteClasses,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Image from "next/image";

import { useState } from "react";
import { supabase } from "../utils/supabase-client";
import Progress from "./Progress";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      setEmailSent(true);
    } catch (error: any) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleBack = () => {
    setEmail("");
    setEmailSent(false);
    setError("");
  };

  return (
    <div className="auth">
      <div>
        <Card className="card">
          {/* <CardMedia
      component="img"
      height="140"
      image="/src/bg-mobile-light.jpg"
      alt="image"
    ></CardMedia> */}

          <CardContent>
            <Typography
              sx={{ fontSize: 22, display: "flex", justifyContent: "start" ,color:"hsl(192, 36%, 57%)" }}
            >
              TO DO
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                padding: "10px",
                wrap: "row",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              color="text.secondary"
              gutterBottom
            >
              Welcome back! Log in to your account to view your`s tasks
            </Typography>
            {!emailSent ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  variant="standard"
                  className="inputField"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  helperText={error}
                  error={!!error}
                />
              </Box>
            ) : (
              <Typography sx={{ display: "flex", justifyContent: "center" }}>
                Check your email
              </Typography>
            )}
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            {!emailSent ? (
              <Button
                sx={{ color: "hsl(280, 87%, 65%)", borderColor: "hsl(280, 87%, 65%)" }}
                variant="outlined"
                onClick={handleLogin}
                className="button block"
                disabled={loading}
              >
                <span>{loading ? <Progress /> : "Send magic link"}</span>
              </Button>
            ) : (
              <Button
                onClick={handleBack}
                className="button block"
                disabled={loading}
              >
                <span>Back</span>
              </Button>
            )}
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
