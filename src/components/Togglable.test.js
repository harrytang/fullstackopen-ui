/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'
import '@testing-library/jest-dom/extend-expect'

describe('<Togglable />', () => {
    let component

    beforeEach(() => {
        component = render(
            <Togglable buttonLabel="show...">
                <div className="testDiv" />
            </Togglable>
        )
    })

    test('renders its children', () => {
        component.container.querySelector('.testDiv')
    })

    test('at start the children are not displayed', () => {
        const div = component.container.querySelector('.togglableContent')
        if(div){
            expect(div).toHaveStyle('display: none')
        }

    })

    test('after clicking the button, children are displayed', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        if(div) {
            expect(div).not.toHaveStyle('display: none')
        }
    })

    test('toggled content can be closed', () => {
        const button = component.container.querySelector('button')
        fireEvent.click(button)

        const closeButton = component.container.querySelector(
            'button:nth-child(2)'
        )
        fireEvent.click(closeButton)

        const div = component.container.querySelector('.togglableContent')
        if(div) {
            expect(div).toHaveStyle('display: none')
        }
    })

})