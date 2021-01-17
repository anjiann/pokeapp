import React, { SyntheticEvent, useEffect, useState } from "react";
import { getTeamById } from "../services/pokemonServices";
import { TeamList, Teams } from "../models/User";
import { Grid, IconButton } from "@material-ui/core";
import TeamCard from "./teamCard";

const Team: React.FunctionComponent<any> = (props) => {
  const [currentTeam, changeCurrentTeam] = useState<Teams[]>([]);

  let user = JSON.parse(localStorage.getItem("userKey")!);
  const myArr = user.teams;
  const teamNames: Teams[] = [];

  useEffect(() => {
    const getTeam = async () => {
      for (let i = 0; i < myArr.length; i++) {
        teamNames.push(myArr[i]);
        //  let teamList=await getTeamById(myArr[i].teamid)
      }
      changeCurrentTeam([...teamNames]);
    };
    getTeam();
  }, []);

  let displayTeam = currentTeam.map((fteam) => {
    return (
      <Grid xs={4} item>
        <div key={fteam.teamid}></div>

        <TeamCard id={fteam.teamid} name={fteam.teamName} />
      </Grid>
    );
  });
  return (
    <>
      <Grid container spacing={3}>
        {displayTeam}
      </Grid>
    </>
  );
};
export default Team;
