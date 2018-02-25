const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "otsikko", 
        author: "minä", 
        likes: 1, 
        url: "www.jotain.fi"
    },
    {
        title: "otsikko2", 
        author: "minä", 
        likes: 3, 
        url: "www.jotain2.fi"
    }
  ]

beforeAll(async () => {
    await Blog.remove({})
  
    let blog = new Blog(initialBlogs[0])
    await blog.save()
  
    blog = new Blog(initialBlogs[1])
    await blog.save()
})

test('get all works', async () => {
    let response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    console.log(response.body)
    expect(response.body.length).toBe(initialBlogs.length)
})

test('post works', async () => {
    let newBlog = new Blog({title: "otsikko3", 
                            author: "minä", 
                            likes: 4, 
                            url: "www.jotain3.fi"})
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)

    const response = await api
        .get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length + 1)
})

afterAll(() => {
  server.close()
})