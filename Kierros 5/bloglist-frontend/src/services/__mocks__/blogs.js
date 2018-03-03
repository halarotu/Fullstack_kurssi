let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    author: "aaaa",
    title: "bbbb",
    url: "www",
    likes: 2
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }