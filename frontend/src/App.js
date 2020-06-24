import React, { useState, useEffect } from 'react'
import api from './services/api'

import './App.css'

import Header from './components/Header'

function App() {
    const [projects, setProjects]  = useState([])

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data)
        })
    }, [])

    //useState retorna um array com duas posicoes
    //1. posicao, retorna uma variavel com o seu valor inicial
    //2. posicao, funcao para atualizarmos esse valor

    async function handleAddProject() {
        // projects.push(`Novo Projeto ${Date.now()}`)
        // setProjects([...projects, `Novo Projeto ${Date.now()}`])
        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: "Igor  Dutra"
        })
        const project = response.data

        setProject([ ... projects, project])
    }

    return (
        <>
          <Header title="Projects"  />
          <ul>
              {projects.map(project => 
                <li key={project.id}>{project.title}</li>)}
          </ul>

          <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
        </>
    )
}

export default App;