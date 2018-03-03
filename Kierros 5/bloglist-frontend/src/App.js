import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '', 
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    } 
  }
  
  login = async (event) => {
    event.preventDefault()
    try {
      const user = await login.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      /* this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000) */
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleCreateFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    try {
      const b = await blogService.create(newBlog)
      this.setState({title: '', author: '', url: '', blogs: this.state.blogs.concat(b)})

    } catch (exception) {

    }

  }

  handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    this.setState({user: null})
  }

  render() {
    
    const loginForm = () => {
      return (
      <div>
        <h2>Kirjaudu</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button>kirjaudu</button>
        </form>
      </div>)
    }

    const blogs = () => {
      return(
      <div>
        <h2>blogs</h2>
        <p>{this.state.user.username} logged in <button onClick={this.handleLogout}>logout</button></p> 

        <Togglable buttonLabel='Add new blog' >
          <div> 
            <h3>Create new</h3>
            <form onSubmit={this.handleCreate} >
              <div>
                title
                <input 
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleCreateFieldChange}/>
              </div>
              <div>
                author
                <input 
                  type="text"
                  name="author"
                  value={this.state.author}
                  onChange={this.handleCreateFieldChange}/>
              </div>
              <div>
                url
                <input 
                  type="text"
                  name="url"
                  value={this.state.url}
                  onChange={this.handleCreateFieldChange}/>
              </div>
              <button>create</button>
            </form>
          </div>
        </Togglable>
        <br/>
        <div>
          {this.state.blogs.map(blog => 
            <Blog key={blog.id} blog={blog}/>
          )}
        </div>
      </div>)
    }
    
    return (
      <div>
        {this.state.user === null ?
          loginForm() : 
          blogs()
        }
      </div>
    )
  }
}

export default App;
