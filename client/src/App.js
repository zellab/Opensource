import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000'
})

class App extends Component {

  constructor() {
    super()
    this.allNotes()

    this.state = {
      notes: [],
      content: '',
      tag: ''
    }
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler = async(e) => {
    e.preventDefault()
    console.log(this.state)

    let res = await api.post(`/create`, this.state)
    console.log(res)
    this.allNotes()
  }

  allNotes = async() => {
    let data = await api.get(`/`).then(({data}) => data )
    this.setState({
      notes: data
    })
  }

  deleteNote = async(id) => {
    let data = await api.delete(`/delete/${id}`)
    this.allNotes()

  }
  
  render() {
    const {content, tag} = this.state
    return (
       <div className="container main">
        <div className="col-xs-8">
        <h5 className="mt-5">HYPERNOTES</h5>
        <div className="divider" />
        
        {/* Form to add new notes */}
        <form onSubmit={this.submitHandler}>
          <div>
            <textarea className="form-control mb-2" type="text" name="content" value={content} onChange={this.changeHandler} required="true"/>
          </div>
          <div>
            <input className="form-control mb-2" type="text" name="tag" value={tag} onChange={this.changeHandler} required="true"/>
          </div>
          <button className="btn btn-primary" type="submit">Add</button>
        </form>
        <div className="divider" />
        
        {/* Display the Notes */}
        {this.state.notes.map((note) => (
          <div className="card mt-4 mb-4">
           <div className="card-body">
              <p className="font-weight-bold">{note.tag}</p>
              <p className="mb-2">{note.content}</p>
              <button className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>X</button>
            </div>
          </div>
        ))}

        </div>
       </div>
    );
  }
}
export default App;