import React from "react";
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles=makeStyles((theme:Theme)=>
createStyles({
  grow: {
    flexGrow: 1,
  },
  search:{
    position:'relative',
    borderRadius:theme.shape.borderRadius,
    backgroundColor:fade(theme.palette.common.white,0.15),
    '&:hover':{
      backgroudColor:fade(theme.palette.common.white,0.25),
    },
    marginRight:theme.spacing(2),
    marginLeft:0,
    width:'100%',
    [theme.breakpoints.up('sm')]:{
      marginLeft:theme.spacing(53),
      width:'auto',
    },
  },
  searchIcon:{
    padding:theme.spacing(0,0),
    height:'100%',
    position:'absolute',
    pointerEvents:'none',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  inputRoot:{
    color:'inherit',
  },
  inputInput:{
    padding:theme.spacing(1,1,1,4),
    paddingLeft:`calc(1em+${theme.spacing(4)}px)`,
    width:'100%',
    [theme.breakpoints.up('md')]:{
      width:'20ch',
    },
  }
  }))

const SearchBar:React.FunctionComponent<any>=()=>{
  const classes=useStyles();
  return (<div className={classes.search}>
   
    <div className={classes.searchIcon}>
    <SearchIcon/>
      </div>
      <InputBase placeholder="Search..."
      className={classes.inputInput}
      inputProps={{'arial-label':'search'}}/>
      
    </div>
    )
}
export default SearchBar;
