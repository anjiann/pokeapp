import React, { SyntheticEvent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useState } from 'react';
import { User } from '../../models/User';
import { register } from '../../services/userService';
import { useHistory } from 'react-router-dom';

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

interface IRegisterProps{
  registerUser:(u:User)=>void
}
const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const classes = useStyles();
  const history=useHistory();
  const [userFirstName,changeFirstName]=useState("")
  const [userLastName,changeLastName]=useState("") 
  const [userName,changeUsername]=useState("")
  const [userPassword, changePassword]=useState("")

  const handleFirstNameChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    changeFirstName(e.target.value)
  }

  const handleLastNameChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    changeLastName(e.target.value)
  }

  const handleUsernameChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    changeUsername(e.target.value)
  }

  const handlePasswordChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    changePassword(e.target.value)
  }

  const submitRegister=async(e:SyntheticEvent)=>{
    e.preventDefault()
    try{
   var data={
     'userFirstName':userFirstName,
     'userLastName':userLastName,
     'userName':userName,
     'userPassword':userPassword
   }
   console.log(data)
   register(data)
    }catch(e){
      console.log(e);
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={submitRegister} >
          <TextField
            //variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="Name"
            autoFocus
            value={userFirstName} onChange={handleFirstNameChange}
          />
          <TextField
           // variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            id="lastName"
            autoComplete="Surname"
            value={userLastName} onChange={handleLastNameChange}
          />
          <TextField
           // variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={userName} onChange={handleUsernameChange}
          />
          <TextField
           // variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="password"
            autoFocus
            value={userPassword} onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already register? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
export default Register;