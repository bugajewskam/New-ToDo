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
    <Card
    className="card"
      // sx={{
      //   maxWidth: 345,
      //   margin: "auto",
      //   marginTop: 5,
      // }}
    >
      <CardMedia
        component="img"
        height="140"
        image="/src/bg-mobile-light.jpg"
        alt="image"
      ></CardMedia>

      <CardContent>
        <Typography
          sx={{ display: "flex", justifyContent: "center" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          Log in
        </Typography>
        {!emailSent ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
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
         <Typography sx={{ display: "flex", justifyContent: "center" }}>Check your email</Typography>
        )}
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        {!emailSent ? (
          <Button
            onClick={handleLogin}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? <Progress/> : "Send magic link"}</span>
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
  );
}
