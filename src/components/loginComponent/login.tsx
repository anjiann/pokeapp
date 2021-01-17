import React, {SyntheticEvent, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { User } from '../../models/User';
import { login } from '../../services/authService';
import { toast } from 'react-toastify';
import { Redirect, useHistory } from "react-router-dom";


const useStyles=makeStyles((theme)=>({
  paper:{
    marginTop:theme.spacing(8),
    display:'flex',
    flexDirection:'column',
    alignItem:'center,',
  },
  avatar:{
    margin:theme.spacing(1),
    backgroundColor:theme.palette.secondary.main,
  },
  form:{
    width:'100%',
    marginTop:theme.spacing(1),
  },
  submit:{
    margin:theme.spacing(3,0,2),
  },
}));
/*
interface ILoginProps{
  uCurrentUser: (u:User) => void
  currentUser: {}
}*/

const Login: React.FunctionComponent<any> = (props) => {
 // const [currentUser,updateCurrentUser] = useState({userId:1, userName:'name', userPassword:'password', userFirstName:'name', userLastName:'name',userFavorites:[],userTeams:[]})
  const [userName,changeUsername]=useState("")
  const [userPassword, changePassword]=useState("")
  const classes = useStyles();
  const history=useHistory();

  const handleUsernameChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    changeUsername(e.target.value)
  }

  const handlePasswordChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    changePassword(e.target.value)
  }

  const submitLogin=async (e:SyntheticEvent)=>{
    e.preventDefault()
    try{
     let user=await login(userName,userPassword)
  //   updateCurrentUser(user);
    console.log(user);
     //props.uCurrentUser(user)
     //console.log(props)
    history.push("/");
    
    }
    catch(error){
      changePassword("")
     console.log(error)
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={submitLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="off"
            autoFocus
            value={userName} onChange={handleUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={userPassword} onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;