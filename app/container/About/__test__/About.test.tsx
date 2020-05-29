import React from "react"
import { render, cleanup, waitForElement } from "@testing-library/react"
import axiosMock from 'axios'
import { MemoryRouter } from "react-router-dom";

import About from '../About'

afterEach(cleanup);


describe('<About />', () => {
	const tree = (props: object, actions: object) => {
		render(
			<MemoryRouter>
				<About />
			</MemoryRouter>
		).container.firstChild
	}
	it('should call About Page', () => {
		
	})
})