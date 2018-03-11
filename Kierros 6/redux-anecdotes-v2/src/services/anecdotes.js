import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (data) => {
  const response = await axios.post(url, { content: data, votes: 0})
  console.log(response.data)
  return response.data
}

const vote = async (anecdote) => {
  const response = await axios.put(url + '/' + anecdote.id, {...anecdote, votes: anecdote.votes + 1})
  return response.data
}

export default { getAll, createNew, vote }