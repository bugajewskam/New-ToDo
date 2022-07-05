import {
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

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        marginTop: 10,
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image="/src/bg-mobile-light.jpg"
        alt="image"
        >

      </CardMedia>
      <CardContent>
        <Typography
          sx={{ display: "flex", justifyContent: "center" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          Log in
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleLogin(email);
          }}
          className="button block"
          disabled={loading}
        >
          <span>{loading ? "Loading" : "Send magic link"}</span>
        </Button>
      </CardActions>
    </Card>
  );
}
//     <Container maxWidth="sm">
//     {/* <div className="row flex flex-center">
//       <div className="col-6 form-widget"> */}
//         <h1 className="header">Login</h1>
//         <p className="description">
//           Sign in via magic link with your email below
//         </p>
//         <div>
//           <input
//             className="inputField"
//             type="email"
//             placeholder="Your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               handleLogin(email);
//             }}
//             className="button block"
//             disabled={loading}
//           >
//             <span>{loading ? "Loading" : "Send magic link"}</span>
//           </button>
//         {/* </div>
//       </div> */}
//     </div>
//     </Container>
//   );
// }
