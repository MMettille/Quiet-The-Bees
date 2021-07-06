import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'

// ⬇ What we need from material-ui
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Category({handleClose}) {

  const dispatch = useDispatch();
  const category = useSelector (store => store.category)
  
  useEffect(() => {
    dispatch({type: 'FETCH_CATEGORY'})
  }, []);

  
  
  return (
    <>
      <DialogTitle id="form-dialog-title">Custom Categories</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Customize your categories below. Check the colors to hide and show those colors. Change the title of the category by typing the name in the text box.
          </DialogContentText>
          <List>
            <ListItem alignItems="center">
              <Checkbox className="red" checked={true} disabled={true}/>
              <RadioButtonUncheckedIcon className='red'/>
              <TextField
              label="NOW"
              variant="outlined"
              disabled={true}
              />
            </ListItem>
            <ListItem alignItems="center"  >
              <Checkbox checked={true} disabled={true}/>
              <RadioButtonUncheckedIcon className='orange'/>
              <TextField
              label="Soon-ish"
              variant="outlined"
              disabled={true}
              />
            </ListItem>
            <ListItem alignItems="center" >
              <Checkbox checked={true} disabled={true}/>
              <RadioButtonUncheckedIcon className='yellow'/>
              <TextField
              label="Later"
              variant="outlined"
              disabled={true}
              />
            </ListItem>
            <ListItem alignItems="center" >
              <Checkbox checked ={category[0]?.isChecked}/>
              <RadioButtonUncheckedIcon className='light-green'/>
              <TextField
              label={category[0]?.category}
              variant="outlined"
              disabled={!category[0]?.isChecked}
              />
            </ListItem>
            <ListItem alignItems="center" >
              <Checkbox checked ={category[1]?.isChecked}/>
              <RadioButtonUncheckedIcon className='green'/>
              <TextField
              label={category[1]?.category}
              variant="outlined"
              disabled={!category[1]?.isChecked}
              />
            </ListItem>
            <ListItem alignItems="center" >
              <Checkbox checked ={category[2]?.isChecked}/>
              <RadioButtonUncheckedIcon className='blue'/>
              <TextField
              label={category[2]?.category}
              variant="outlined"
              disabled={!category[2]?.isChecked}
              />
            </ListItem>
            <ListItem alignItems="center" >
              <Checkbox checked ={category[3]?.isChecked}/>
              <RadioButtonUncheckedIcon className='purple'/>
              <TextField
              label={category[3]?.category}
              variant="outlined"
              disabled={!category[3]?.isChecked}
              />
            </ListItem>
            <ListItem alignItems="center" >
              <Checkbox checked ={category[4]?.isChecked}/>
              <RadioButtonUncheckedIcon className='dark-purple'/>
              <TextField
              label={category[4]?.category}
              variant="outlined"
              disabled={!category[4]?.isChecked}
              />
            </ListItem>
            <ListItem alignItems="center" >
              <Checkbox checked ={category[5]?.isChecked}/>
              <RadioButtonUncheckedIcon className='brown'/>
              <TextField
              label={category[5]?.category}
              variant="outlined"
              disabled={!category[5]?.isChecked}
              />
            </ListItem>
            <ListItem alignItems="center" >
              <Checkbox checked ={category[6]?.isChecked}/>
                <RadioButtonUncheckedIcon className='grey'/>
                <TextField
                label={category[6]?.category}
                variant="outlined"
                disabled={!category[6]?.isChecked}
                />
            </ListItem>
          </List>
   
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
    </>
  );
}

export default Category;
