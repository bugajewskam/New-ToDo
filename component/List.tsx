import ClearIcon from '@mui/icons-material/Clear';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { ToDo } from '../interface/interface';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Divider } from '@mui/material';

export interface ListProps{
    listToDo: ToDo[]
    onRemove: (id:number)=> void
    onToggle: (id:number) => void
}

export default function CheckboxList({listToDo, onRemove, onToggle}:ListProps) {
  const [checked, setChecked] = React.useState<number[]>([]);

  const handleToggle = (value: number) => () => onToggle(value);
  const handleRemove = (id:number)=>()=>onRemove(id);
  if(!listToDo?.length)return;
  return (
    <List sx={{ width: '600px', maxWidth: 600, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, margin: 2 }}>
      {listToDo.map((item) => {
      
        return (
          <ListItem
            key={item.id}
            secondaryAction={
              <IconButton onClick={handleRemove(item.id)} edge="end">
                <ClearIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(item.id)} dense>
              <ListItemIcon>

                <Checkbox
                icon={<Box sx={{borderRadius: '24px', width: 24, height: 24, border: "1px solid gray"}}/>}
                checkedIcon={<CheckIcon sx={{borderRadius: '24px', background: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))", padding: "4px", color: "#fff"}}/>}
                
                  edge="start"
                  checked={item.isDone}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={item.toDo} sx={item.isDone ? {textDecoration: 'line-through'}: {}} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
