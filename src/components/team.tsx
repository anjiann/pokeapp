import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { createTeam, deleteTeam, getTeamById } from "../services/pokemonServices";
import {TeamList, Teams} from "../models/User"
import { Card, CardContent, Grid, IconButton, Typography } from "@material-ui/core";
import TeamCard from "./teamCard";
import { getUserById } from "../services/userService";
import classes from "*.module.css";
import { Add } from "@material-ui/icons";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const Team: React.FunctionComponent<any>=(props)=>{
    const [currentTeam,changeCurrentTeam]=useState<Teams[]>([]);
    const [open, setOpen] = React.useState(false);
    const[teamName,setTeamName]=useState("")
    const[refresh, setRefresh]=useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleTeamNameChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setTeamName(e.target.value)
    }
  
    const handleClose = () => {
      setOpen(false);
    };
    let user=JSON.parse(localStorage.getItem('userKey')!);

    const teamNames: Teams[]=[];
    const submitTeam=async(e:SyntheticEvent)=>{
      e.preventDefault()
      try{
     var data={
       'userId':user.userId,
       'teamName':teamName
     }
     console.log("New team",data)
     createTeam(data)
     setRefresh(true)
      }catch(e){
        console.log("I am hrere")
        console.log(e);
      }
    }
   
    useEffect(()=>{
    const getTeam=async()=>{
    let userR= await getUserById(user.userId)
    const myArr=userR.userTeams;
    for(let i=0;i<myArr.length;i++){
      teamNames.push(myArr[i])
    //  let teamList=await getTeamById(myArr[i].teamid)
    }
    changeCurrentTeam([
      ...teamNames,
    ])
    }
    getTeam()
    setRefresh(false)
    },[refresh])
  

    let changeState=()=>{
      setRefresh(true)
    }
    let displayTeam = currentTeam.map((fteam)=>{
      return (
          <Grid xs={4}  item>
          <div key={fteam.teamid}></div>
         
          <TeamCard triger={changeState} id={fteam.teamid} name={fteam.teamName} />
          </Grid>
      )
    })
  return(
    <>
      <Grid container spacing={3}>
        {displayTeam}
        </Grid>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       Create New Team
      </Button>
     
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Team</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Team Name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Team Name"
            type="text"
            value={teamName} onChange={handleTeamNameChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={submitTeam} color="primary">
            Create
          </Button>
         
        </DialogActions>
      </Dialog>
      
 
        </>
)
    }
export default Team;
