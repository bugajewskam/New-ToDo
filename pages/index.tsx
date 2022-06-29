import type { NextPage } from "next";
import Head from "next/head";
import { useMemo, useState } from "react";
import { ToDo } from "../interface/interface";
import DialogAlert from "../component/Dialog";
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import CheckboxList from "../component/List";
import { arrayMove } from "@dnd-kit/sortable";

type Filter = "all" | "isDone" | "toDo";
const Home: NextPage = () => {
  const [listToDo, setListToDo] = useState<ToDo[] | []>([]);
  const [toDo, setToDo] = useState<string>("");
  const [filter, setFilter] = useState<Filter>("all");
  const [openDeleteItems, setOpenDeleteItems] = useState(false);
  const [openDeleteItem, setOpenDeleteItem] = useState<number | null>(null);
  // const [editing, setEditing] = useState(false)
  const handleChange = (e: any) => setToDo(e.target.value);
  const handleAdd = (e: any) => {
    e.preventDefault();
    const newToDo: ToDo = {
      toDo: toDo,
      id: Math.floor(Math.random() * 1000),
      isDone: false,
      isEditing: false,
    };
    setListToDo((listToDo) => [...listToDo, newToDo]);
    setToDo("");
  };
  const handleRemove = () => {
    const newList = listToDo.filter((item) => item.id !== openDeleteItem);
    setListToDo(newList);
    setOpenDeleteItem(null);
  };
  const handleEdit = (id: number) => {
    const item = listToDo.find((item) => item.id === id);
    if (!item) return;
    item.isEditing = true;
    setListToDo([...listToDo]);
  };

  const handleMoveItems = (id1: number, id2: number) => {
    setListToDo((items) => {
      const oldIndex = items.findIndex((item) => item.id === id1);
      const newIndex = items.findIndex((item) => item.id === id2);

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleToggle = (id: number) => {
    const item = listToDo.find((item) => item.id === id);
    if (!item) return;
    item.isDone = !item.isDone;
    setListToDo([...listToDo]);
  };

  const handleClickOpen = () => {
    setOpenDeleteItems(true);
  };

  const handleOpenDialog = (id: number) => {
    setOpenDeleteItem(id);
  };

  const handleCloseDeleteItem = (id: number) => {
    setOpenDeleteItem(null);
  };

  const handleClose = () => {
    setOpenDeleteItems(false);
  };

  const handleDelete = () => {
    setListToDo([]);
    setOpenDeleteItems(false);
  };

  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: Filter
  ) => {
    setFilter(newFilter);
  };

  const handleChangeEdit = (e: any) => {
    setToDo(e.target.value);
  };

  const handleEditSubmit = (id: number, e: any) => {
    e.preventDefault();
    const editItem = listToDo.find((item) => item.id === id);
    if (!editItem) return;
    editItem.toDo = e.target[0].value;
    console.log(e.target.elements.toDo.value);
    editItem.isEditing = false;
    setListToDo([...listToDo]);
  };

  const filterList = useMemo(() => {
    if (filter === "isDone") {
      return [...listToDo].filter((i) => i.isDone);
    }
    if (filter === "toDo") {
      return [...listToDo].filter((i) => !i.isDone);
    }
    return [...listToDo];
  }, [filter, listToDo]);

  console.log(listToDo);
  return (
    <Box sx={{ color: "text.primary" }}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@1,200&display=swap"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <meta http-equiv="X-UA-Compatible" content="ie=edge"></meta>
      </Head>
      <div className="banner">
        <p className="h1 display-4">TO DO</p>
      </div>
      <div className="flex">
        <Box
          sx={{
            width: 600,
            maxWidth: "calc(100% - 32px)",
            backgroundColor: "white",
            border: 1,
            borderColor: "gray",
            borderRadius: "10px",
            mx: 2,
          }}
        >
          <form className="input" onSubmit={handleAdd}>
            <TextField
              color="primary"
              fullWidth
              className="input"
              value={toDo}
              onChange={handleChange}
            />
          </form>
        </Box>
        <div className="scroll">
          <CheckboxList
            listToDo={filterList}
            onMoveItems={handleMoveItems}
            onRemove={handleOpenDialog}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onEditSubmit={handleEditSubmit}
            onChange={handleChangeEdit}
          />
        </div>
        <DialogAlert
          handleClose={handleCloseDeleteItem}
          handleDelete={handleRemove}
          open={!!openDeleteItem}
        />
        <div>
          <div className="footer">
            <Typography>{listToDo.length} items</Typography>
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilter}
              // aria-label="text alignment"
            >
              <ToggleButton className="filter" value="all">
                All
              </ToggleButton>
              <ToggleButton className="filter" value="isDone">
                Is Done
              </ToggleButton>
              <ToggleButton className="filter" value="toDo">
                To Do
              </ToggleButton>
            </ToggleButtonGroup>
            <Button onClick={handleClickOpen}>Delete all</Button>
          </div>
        </div>

        <DialogAlert
          handleClose={handleClose}
          handleDelete={handleDelete}
          open={openDeleteItems}
        />
      </div>
    </Box>
  );
};

export default Home;
