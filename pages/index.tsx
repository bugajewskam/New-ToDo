import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { listenerCount } from 'process'
import { useState } from 'react'
import { ToDo } from '../interface/interface'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [listToDo, setListToDo] = useState<ToDo[]>([])
  const [toDo, setToDo] = useState<string>("")
  const handleChange = (e: any) => setToDo(e.target.value);
  const handleAdd = (e: any) => {
    e.preventDefault()
    console.log("działa")
    const newToDo: ToDo = {
      toDo: toDo,
      id: Math.floor(Math.random() * 1000)
    }
    setListToDo(listToDo => [...listToDo, newToDo]);
    setToDo("")
  }
  console.log(listToDo)
  return (
    <>
      <div>To do </div>
      <form onSubmit={handleAdd}>
        <input placeholder='To do' onChange={handleChange} />
      </form>
      {listToDo.map( item => 
        <li>{item.toDo}</li>)}
    </>
  )
}

export default Home
