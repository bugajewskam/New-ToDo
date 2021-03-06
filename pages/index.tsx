import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ToDo } from "../interface/interface";
import DialogAlert from "../component/Dialog";
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  TextField,
  Box,
  useTheme,
  IconButton,
} from "@mui/material";
import CheckboxList from "../component/List";
import { arrayMove } from "@dnd-kit/sortable";
import Auth from "../component/Auth";
import { supabase } from "../utils/supabase-client";
import CustomizedSwitches from "../component/Switch";
import React from "react";
import { ColorModeContext } from "./_app";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

type Filter = "all" | "isDone" | "toDo";
const Home: NextPage = () => {
  const [listToDo, setListToDo] = useState<any[]>([]);
  const [toDo, setToDo] = useState<string>("");
  const [filter, setFilter] = useState<Filter>("all");
  const [openDeleteItems, setOpenDeleteItems] = useState(false);
  const [openDeleteItem, setOpenDeleteItem] = useState<number | null>(null);
  const [session, setSession] = useState<any>(null);
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (!session) return;
    supabase
      .from("todo")
      .select("*")
      .order("id", { ascending: true })
      .then(({ data: todos, error }) => setListToDo(todos || []));
  }, [session]);
  // const [editing, setEditing] = useState(false)
  const handleChange = (e: any) => setToDo(e.target.value);
  const handleAdd = (e: any) => {
    e.preventDefault();
    if (!toDo) return;
    supabase
      .from("todo")
      .insert({ toDo, email: supabase?.auth?.session()?.user?.email })
      .then((result: any) => {
        setListToDo((listToDo) => [...listToDo, result.body[0]]);
        setToDo("");
      });
  };
  const handleRemove = () => {
    supabase
      .from("todo")
      .delete()
      .eq("id", openDeleteItem)
      .then(() => {
        const newList = listToDo.filter((item) => item.id !== openDeleteItem);
        setListToDo(newList);
        setOpenDeleteItem(null);
      });
  };
  const handleEdit = async (id: number) => {
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

  const handleToggle = async (id: number) => {
    const item = listToDo.find((item) => item.id === id);
    if (!item) return;
    item.isDone = !item.isDone;
    await supabase
      .from("todo")
      .update({ isDone: item.isDone })
      .eq("id", item.id)
      .then(() => {
        setListToDo([...listToDo]);
      });
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
    supabase
      .from("todo")
      .delete()
      .eq("email", supabase?.auth?.session()?.user?.email)
      .then(() => {
        setListToDo([]);
        setOpenDeleteItems(false);
      });
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

  const handleEditSubmit = async (id: number, e: any) => {
    e.preventDefault();
    const editItem = listToDo.find((item) => item.id === id);
    if (!editItem) return;

    editItem.toDo = e.target[0].value;
    await supabase
      .from("todo")
      .update({ toDo: editItem.toDo })
      .eq("id", editItem.id)
      .then(() => {
        editItem.isEditing = false;
        setListToDo([...listToDo]);
      });
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
  const handleLogOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
  }, []);

  return (
    <>
      {session ? (
        <Box sx={{ color: "text.primary" }}>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin=""
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@1,100&display=swap"
              rel="stylesheet"
            />

            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
            />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"></meta>
          </Head>
          <Box className="banner"></Box>

          <div className="flex">
 
            <div className="switch">
              <CustomizedSwitches />
              <IconButton  onClick={handleLogOut}>
                <LogoutIcon sx={{color: "white"}}/>
              </IconButton>
            </div>
            <p className="toDo">TO DO</p>

            <Box
            className="input"
              sx={{
                width: 600,
                maxWidth: "calc(100% - 32px)",
                border: 1,
                borderRadius: "10px",
                mx: 2,
              }}
            >
              <form onSubmit={handleAdd}>
                <TextField

                  color="primary"
                  sx={{ borderRadius: 8 }}
                  fullWidth
                  value={toDo}
                  onChange={handleChange}
                />
              </form>
            </Box>
            <Box
              className="scroll"
              sx={{
                maxWidth: 600,
                color: "primary",
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
                my: 2,
              }}
            >
              <CheckboxList
                listToDo={filterList}
                onMoveItems={handleMoveItems}
                onRemove={handleOpenDialog}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onEditSubmit={handleEditSubmit}
                onChange={handleChangeEdit}
              />
            </Box>

            <DialogAlert
              handleClose={handleCloseDeleteItem}
              handleDelete={handleRemove}
              open={!!openDeleteItem}
            />
            <div>
              <div className="footer">
                <div>
                  <Typography>{listToDo.length} items</Typography>
                </div>
                <div>
                  <ToggleButtonGroup
                    value={filter}
                    exclusive
                    onChange={handleFilter}
                    aria-label="text alignment"
                    sx={{
                      border: "none",
                      marginLeft: 3,
                      marginRight: 3,
                      "& .Mui-selected": {
                        background: "transparent !important",
                        color: "black",
                      },
                    }}
                  >
                    <ToggleButton value="all" size="small" className="filter">
                      All
                    </ToggleButton>
                    <ToggleButton
                      value="isDone"
                      size="small"
                      className="filter"
                    >
                      Done
                    </ToggleButton>
                    <ToggleButton value="toDo" size="small" className="filter">
                      To Do
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div>
                  <Button
                    size="small"
                    sx={{
                      color: "text.primary",
                    }}
                    className="filter"
                    onClick={handleClickOpen}
                  >
                    Delete all
                  </Button>
                </div>
              </div>
            </div>

            <DialogAlert
              handleClose={handleClose}
              handleDelete={handleDelete}
              open={openDeleteItems}
            />
          </div>
        </Box>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Home;
