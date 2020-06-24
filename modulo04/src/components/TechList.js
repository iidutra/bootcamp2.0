import React, { Component } from 'react'

import TechItem from './TechItem'

class TechList extends Component {

    // static defaultProps = {
    //     tech: 'Oculto'
    // }

    // static propTypes = {

    // }

    state = {
        newTech: '',
        techs: []
    };
    // executado assim que o componente aparece em tela
    componentDidMount() {
        const techs = localStorage.getItem('techs')

        if(techs) {
            this.setState({ techs: JSON.parse(techs) })
        }
    }
    // sempre que houver alteracoes nas props ou estado
    componentDidUpdate(_, prevState) {
        if(prevState.techs !== this.state.techs) {
            localStorage.setItem('techs', JSON.stringify(this.state.techs))
        }
    }

    // executado quando o componente deixa de existir
    componentWillUnmount() {
        
    }

    handleInputChange = e => {
        //this.props.tech para acessar dentro da funcao em TechItem
        this.setState({ newTech: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()

        this.setState({
            techs: [...this.state.techs, this.state.newTech],
            newTech: ''
        })
    }

    handleDelete = (tech) => {
        this.setState({ techs: this.state.techs.filter(t => t !== tech) })
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <ul>
                    {this.state.techs.map(tech => 
                    <TechItem 
                        key={tech}
                        tech={tech} 
                        onDelete={() => this.handleDelete(tech)}/>
                    )}
                </ul>
                <input
                    type="text"
                    onChange={this.handleInputChange}
                    value={this.state.newTech}
                />
                <button type="submit">Enviar</button>
            </form>
        );
    }
}

export default TechList;