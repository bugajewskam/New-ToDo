import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { listenerCount } from 'process'
import { useMemo, useState } from 'react'
import { ToDo } from '../interface/interface'
import styles from '../styles/Home.module.css'
import darkDesktop from "../public/src/bg-desktop-dark.jpg"
import { Container, TextField } from '@mui/material'
import CheckboxList from '../component/List'


type Filter = "all" | "isDone" | "toDo"
const Home: NextPage = () => {


  const [listToDo, setListToDo] = useState<ToDo[]>([])
  const [toDo, setToDo] = useState<string>("")
  const [filter, setFilter] = useState<Filter>("all")
  const handleChange = (e: any) => setToDo(e.target.value);
  const handleAdd = (e: any) => {
    e.preventDefault();
    console.log("działa")
    const newToDo: ToDo = {
      toDo: toDo,
      id: Math.floor(Math.random() * 1000),
      isDone: false
    }
    setListToDo(listToDo => [...listToDo, newToDo]);
    setToDo("")
  }
  const handleRemove = (id: number) => {
    const newList = listToDo.filter((item) => item.id !== id);
    setListToDo(newList)
  }

  const handleToggle = (id: number) => {
    const item = listToDo.find(item => item.id === id)
    if (!item) return;
    item.isDone = !item.isDone;
    setListToDo([...listToDo])

  }

  const filterList = useMemo(() => {
    if (filter === "all") {
      return [...listToDo]
    }
    if (filter === "isDone") {
      return [...listToDo].filter(i => i.isDone)
    }
    if (filter === "toDo") {
      return [...listToDo].filter(i => !i.isDone)
    }
  }, [filter, listToDo])
  console.log(listToDo)
  console.log(listToDo.length)
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@1,200&display=swap" rel="stylesheet" />
      </Head>
      <div className="banner">
        <p className="h1 display-4">TO DO</p>
      </div>
      <div className='flex'>
        <div>
          <div className="input">
            <form onSubmit={handleAdd}>
              <input value={toDo} onChange={handleChange} />
            </form>
          </div>
        </div>

        <div className='scroll'>
          <CheckboxList listToDo={filterList} onRemove={handleRemove} onToggle={handleToggle} />
        </div>
        <div>
          <div className='footer'>
            <p>{listToDo.length} items</p>
            <div>
              <button className="filter" onClick={(e) => setFilter("all")}>All</button>
            <button className="filter" onClick={(e) => setFilter("isDone")}>Is Done</button>
            <button className="filter" onClick={(e) => setFilter("toDo")}>To Do</button>
            </div>
            <button className="filter" onClick={e => setListToDo([])}>Delete all</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
