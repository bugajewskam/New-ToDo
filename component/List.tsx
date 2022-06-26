import ClearIcon from '@mui/icons-material/Clear';
import * as React from 'react';
import List from '@mui/material/List';
import { ToDo } from '../interface/interface';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Button, Divider, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {DndProvider, useDrag} from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend';

import ItemList from '../component/ListItem';

export interface ListProps {
  listToDo: ToDo[]
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number) => void;
  onChange: (e: any) => void;
  onEditSubmit: (id: number, e: any) => void;

}

export default function CheckboxList({ listToDo, onRemove, onToggle,
  onEdit, onChange, onEditSubmit }: ListProps) {
  const handleToggle = (value: number) => () => onToggle(value);
  const handleRemove = (id: number) => () => onRemove(id);
  const handleEdit = (id: number) => () => onEdit(id)
  const handleChange = (e: any) => () => onChange(e)
  const handleEditSubmit = (id: number) => (e: any) => onEditSubmit(id, e)
  if (!listToDo?.length) return;
  return (

    <List sx={{
      width: '600px', maxWidth: 600, color: "primary",

      bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, margin: 2
    }}>
      {listToDo.map((item) => 
        <ItemList item={item} onRemove={handleRemove} onEdit={handleEdit}
         onChange={handleChange} onToggle={handleToggle} onEditSubmit={handleEditSubmit}/>
      )}
    </List>

  );
}
