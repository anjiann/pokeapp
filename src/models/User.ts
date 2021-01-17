export class User {
  userId: number;
  userName: string;
  userPassword: string;
  userFirstName: string;
  userLastName: string;
  userFavorites:[Favorites];
  userTeams:[Teams]
}

export class Favorites{
  favId:number;
  favPokeId:number;
}

export class Teams{
  teamid:number;
  teamName:string;
  teamList:[TeamList];
}

export class TeamList{
  id:number;
  teamPokeId:number;
}
