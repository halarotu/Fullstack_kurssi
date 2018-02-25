const dummy = (blogs) => {
    return 1
  }

  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
  }

  const findMaxLikes = (currentMax, blog) => {
    return Math.max(currentMax, blog.likes)
  }

  const favouriteBlog = (blogs) => {
    const maxLikes = blogs.reduce(findMaxLikes, 0)
    return blogs.find(blog => blog.likes === maxLikes)
  }

  const findMaxBlogs = (currentMax, current) => {
    console.log(current)
    console.log(current.blogs)
    return Math.max(currentMax, current.blogs)
  }

  const mostBlogs = (blogs) => {
    const blogCountsMap = new Map()
    blogs.forEach(blog => {
      const count = blogCountsMap.get(blog.author) ? blogCountsMap.get(blog.author) : 0
      blogCountsMap.set(blog.author, count+1)
    })
    const blogCounts = []
    blogCountsMap.forEach((v, k) => blogCounts.push({author: k, blogs: v}))
    const maxBlogs = blogCounts.reduce(findMaxBlogs, 0)
    return blogCounts.find(a => a.blogs === maxBlogs)
  }

  const mostLikes = (blogs) => {
    const likeCountsMap = new Map()
    blogs.forEach(blog => {
      const count = likeCountsMap.get(blog.author) ? likeCountsMap.get(blog.author) : 0
      likeCountsMap.set(blog.author, count+blog.likes)
    })
    const likeCounts = []
    likeCountsMap.forEach((v, k) => likeCounts.push({author: k, likes: v}))
    const maxLikes = likeCounts.reduce(findMaxLikes, 0)
    return likeCounts.find(a => a.likes === maxLikes)
  }
  
  module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
  }