const listHelper = require('../utils/list_helper')

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('empty list is zero', () => {
    const blogs = []
    expect(listHelper.totalLikes(blogs)).toBe(0)
  })

  test('calculation is right', () => {
    const blogs = []
    blogs.push({title: "otsikko", author: "minä", likes: 1, url: "www.jotain.fi"})
    blogs.push({title: "otsikko2", author: "minä", likes: 2, url: "www.jotain2.fi"})
    expect(listHelper.totalLikes(blogs)).toBe(3)
  })

})

describe('favourite blog', () => {
  test('find favourite blog', () => {
    const blogs = []
    blogs.push({title: "otsikko", author: "minä", likes: 1, url: "www.jotain.fi"})
    blogs.push({title: "otsikko2", author: "minä", likes: 4, url: "www.jotain2.fi"})
    blogs.push({title: "otsikko3", author: "minä", likes: 0, url: "www.jotain3.fi"})
    expect(listHelper.favouriteBlog(blogs)).toEqual({title: "otsikko2", author: "minä", likes: 4, url: "www.jotain2.fi"})
  })
})

describe('most blogs', () => {
  test('find most blog', () => {
    const blogs = []
    blogs.push({title: "otsikko", author: "minä", likes: 1, url: "www.jotain.fi"})
    blogs.push({title: "otsikko2", author: "minä", likes: 4, url: "www.jotain2.fi"})
    blogs.push({title: "otsikko3", author: "minä", likes: 0, url: "www.jotain3.fi"})
    blogs.push({title: "otsikko4", author: "joku muu", likes: 2, url: "www.jotain4.fi"})
    expect(listHelper.mostBlogs(blogs)).toEqual({author: "minä", blogs: 3})
  })
})

describe('most likes', () => {
  test('find most author with most likes', () => {
    const blogs = []
    blogs.push({title: "otsikko", author: "minä", likes: 1, url: "www.jotain.fi"})
    blogs.push({title: "otsikko2", author: "minä", likes: 4, url: "www.jotain2.fi"})
    blogs.push({title: "otsikko3", author: "minä", likes: 0, url: "www.jotain3.fi"})
    blogs.push({title: "otsikko4", author: "joku muu", likes: 2, url: "www.jotain4.fi"})
    expect(listHelper.mostLikes(blogs)).toEqual({author: "minä", likes: 5})
  })
})