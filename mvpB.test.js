import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Sprint 7 Challenge Learner Tests', () => {
  /*
  👉 TASK 1 - Unit Testing of sum function at the bottom of this module

  Test the following. You can create separate tests or a single test with multiple assertions.

    [1] sum() // throws an error 'pass valid numbers'
    [2] sum(2, 'seven') // throws an error 'pass valid numbers'
    [3] sum(1, 3) // returns 4
    [4] sum('1', 2) // returns 3
    [5] sum('10', '3') // returns 13
  */

  /*
  👉 TASK 2 - Integration Testing of HelloWorld component at the bottom of this module

  Test the <HelloWorld /> component found below...
    - using `screen.queryByText` to capture nodes
    - using `toBeInTheDocument` to assert their existence in the DOM

    [1] renders a link that reads "Home"
    [2] renders a link that reads "About"
    [3] renders a link that reads "Blog"
    [4] renders a text that reads "The Truth"
    [5] renders a text that reads "JavaScript is pretty awesome"
    [6] renders a text that includes "javaScript is pretty" (use exact = false)
  */
  // test('you can comment out this test', () => {
  //   expect(true).toBe(false)
  // })
  describe('TASK 1 - Unit Testing of sum function at the bottom of this module', () => {
    test('[1] Requires two inputs, throws an error if not', () => {
      expect(() => sum()).toThrowError('pass valid numbers')
    })
    test('[2] Ensure numbers are valid', () => {
      expect(() => sum(2, 'seven')).toThrowError('pass valid numbers')
    })
    test('[3] Test case for integers: 1, 3', () => {
      expect(sum(1, 3)).toStrictEqual(4)
    })
    test('[4] Test case for a string and an integer: "1", 2', () => {
      expect(sum('1', 2)).toBe(3)
    })
    test('[5] Test case for two strings: "10", "3"', () => {
      expect(() => sum('10', '3').toBe('13'))
    })
  })

  describe('Helloworld Component', () => {
    it('Renders Home component', () => {
      render(<HelloWorld />)
      expect(screen.getByText('Home')).toBeVisible()
    })
    it('Renders About component', () => {
      render(<HelloWorld />)
      expect(screen.getByText('About')).toBeVisible()
    })
    it('Renders Blog component', () => {
      render(<HelloWorld />)
      expect(screen.getByText('Blog')).toBeVisible()
    })
    it('Renders The Truth component', () => {
      render(<HelloWorld />)
      expect(screen.getByText('The Truth')).toBeVisible()
    })
    it('Renders JavaScript is pretty awesome component', () => {
      render(<HelloWorld />)
      expect(screen.getByText('JavaScript is pretty awesome')).toBeVisible()
    })
    it('Renders javaScript is pretty , {exact: false}component', () => {
      render(<HelloWorld />)
      expect(screen.getByText('javaScript is pretty', {exact: false})).toBeVisible()
    })
  })
})

function sum(a, b) {
  a = Number(a)
  b = Number(b)
  if (isNaN(a) || isNaN(b)) {
    throw new Error('pass valid numbers')
  }
  return a + b
}

function HelloWorld() {
  return (
    <div>
      <h1>Hello World Component</h1>
      <nav>
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Blog</a>
      </nav>
      <main>
        <section>
          <h2>The Truth</h2>
          <p>JavaScript is pretty awesome</p>
        </section>
      </main>
    </div>
  )
}
