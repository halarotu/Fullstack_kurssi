import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      author: 'Hannes',
      title: 'otsikko',
      likes: 5
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDivTitleAndAuthor = blogComponent.find('.titleAndAuthor')
    const contentDivLikes = blogComponent.find('.likes')

    expect(contentDivTitleAndAuthor.text()).toContain(blog.author)
    expect(contentDivTitleAndAuthor.text()).toContain(blog.title)
    expect(contentDivLikes.text()).toContain(blog.likes)
  })
})


describe('<SimpleBlog />', () => {
    it('click works', () => {
      const blog = {
        author: 'Hannes',
        title: 'otsikko',
        likes: 5
      }

      const mockHandler = jest.fn()
      const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)

      const button = blogComponent.find('button')
      button.simulate('click')
      button.simulate('click')
      expect(mockHandler.mock.calls.length).toBe(2)
  
    })
  })
