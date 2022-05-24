import React from "react"
import { useState } from 'react'
import CascadeOption from "./cascadeoption"
import { Input, Space, Table, message } from 'antd'
// import styles from './searchbar2.module.css'

function SearchBar2 () {

  // const [count, setCount] = useState(0)
  //seloption: select from different database
  //tableFlag: input not null values.
  const [seloption, setSeloption] = useState(0)
  const [ctableFlag, setCTableFlag] = useState(false)

  const [list, setList] = useState([])
  // const todocolumns =
  //   [
  //     {
  //       title: 'ID',
  //       dataIndex: 'id',
  //       key: 'id',
  //     },
  //     {
  //       title: 'NAME',
  //       dataIndex: 'name',
  //       key: 'name',
  //     },
  //     {
  //       title: 'DESC',
  //       dataIndex: 'descript',
  //       key: 'descript',
  //     },
  //     {
  //       title: 'ACTION',
  //       dataIndex: 'action',
  //       key: 'action',
  //     },
  //   ]

  const chemicalcolumns =
    [
      {
        title: 'ID',
        dataIndex: 'cid',
        key: 'cid',
      },
      {
        title: 'ChemicalName',
        dataIndex: 'cmpdname',
        key: 'name',
      },
      {
        title: 'AlogP',
        dataIndex: 'alogp',
        key: 'alogp',
      },
      {
        title: 'Weight',
        dataIndex: 'molecularweight',
        key: 'molecularweight',
      },
      {
        title: 'CASNO',
        dataIndex: 'casno',
        key: 'casno',
      },
    ]
  const { Search } = Input

  const onSearch = (value) => {
    console.log(value, ctableFlag, seloption)
    //select chemical by name
    if (seloption === 1) {
      if (value) {
        setCTableFlag(true)
        loadChemicalListbyname(value)
      }
      else {
        setList([])
        info('Search by chemical name. For example:asprin')
      }
    }
    //select chemcial by weight 
    else if (seloption === 2) {
      if (value) {
        setCTableFlag(true)
        loadChemicalListbyweight(value)
      }
      else {
        setList([])
        info('Search by chemical weight range. For example:500 550')
      }
    }
    //select chemcial by alogp 
    else if (seloption === 3) {
      if (value) {
        setCTableFlag(true)
        loadChemicalListbyAlogP(value)
      }
      else {
        setList([])
        info('Search by chemical AlogP range. For example:4.5 5')
      }
    }
    //select chemcial by CasNO
    else if (seloption === 4) {
      if (value) {
        setCTableFlag(true)
        loadChemicalListbyCasNO(value)
      }
      else {
        setList([])
        info('Search by chemical CasNO. For example:11-22-33')
      }
    }
    else {
      setCTableFlag(false)
      info('select table and attribute first')
    }
  }

  const getOption = (msg) => {
    console.log("select option is:", msg)
    setSeloption(msg)
  }

  // const loadList = async () => {
  //   const response = await fetch(`http://localhost:5000/demotable`)
  //   const jsonData = await response.json()
  //   setList(jsonData)
  //   console.log(jsonData)
  // }

  const loadChemicalListbyname = async (value) => {
    // const response = await fetch(`http://localhost:5000/demotable`)
    const response = await fetch(`http://localhost:5000/chemicalsname/${value}`)
    const jsonData = await response.json()
    setList(jsonData)
    console.log(jsonData)
    console.log(list)
    console.log(value)
  }

  const loadChemicalListbyweight = async (value) => {
    let minw = value.split(" ")[0]
    let maxw = value.split(" ")[1]
    const response = await fetch(`http://localhost:5000/chemicalsweight?minweight=${minw}&maxweight=${maxw}`)
    const jsonData = await response.json()
    setList(jsonData)
    console.log(jsonData)
    // console.log(`http://localhost:5000/chemicalsweight?minweight=${minweight}&maxweight=${maxweight}`)
  }

  const loadChemicalListbyAlogP = async (value) => {
    let minw = value.split(" ")[0]
    let maxw = value.split(" ")[1]
    const response = await fetch(`http://localhost:5000/chemicalsalogp?minalogp=${minw}&maxalogp=${maxw}`)
    const jsonData = await response.json()
    setList(jsonData)
    console.log(jsonData)
    // console.log(minw, maxw)
    // console.log(`http://localhost:5000/chemicalsalogp?minalogp=${minw}&maxalogp=${maxw}`)
  }

  // load Chemical data by CasNO
  const loadChemicalListbyCasNO = async (value) => {
    // const response = await fetch(`http://localhost:5000/demotable`)
    const response = await fetch(`http://localhost:5000/chemicalscasno/${value}`)
    const jsonData = await response.json()
    setList(jsonData)
    console.log(jsonData)
    console.log(list)
    console.log(value)
  }

  const info = (msg) => {
    message.info(
      {
        content: msg,
        className: 'custom-class',
        style: {
          marginTop: '15vh',
        },
      })
  }

  return (
    <>
      {/* <button onClick={() => { setCount(count + 1) }}>{count}</button> */}
      <CascadeOption getOption={getOption} />
      <div className='container'>
        <Space align="middle">
          {/* {add Searchbar component} */}
          <div className='search-box'>
            {/* <div className={styles.searchbox}> */}

            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </div>
        </Space>
        {/* add Table component */}
        {ctableFlag ?
          <Table dataSource={list} columns={chemicalcolumns} /> : null}

      </div>
    </>
  )
}

export default SearchBar2