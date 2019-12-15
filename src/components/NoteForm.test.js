/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

import React from 'react'
import { render, fireEvent } from '@testing-library/react'

const NoteForm = ({ onSubmit, handleChange, value }) => {
    return (
        <div>
            <h2>Luo uusi muistiinpano</h2>

            <form onSubmit={onSubmit}>
                <input
                    value={value}
                    onChange={handleChange}
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
};

const Wrapper = (props) => {

    const onChange = (event) => {
        props.state.value = event.target.value
    }

    return (
        <NoteForm
            value={props.state.value}
            onSubmit={props.onSubmit}
            handleChange={onChange}
        />
    )
}

test('<NoteForm /> updates parent state and calls onSubmit', () => {
    const onSubmit = jest.fn()
    const state = {
        value: ''
    }

    const component = render(
        <Wrapper onSubmit={onSubmit} state={state} />
    )

    const input = component.container.querySelector('input')
    const form = component.container.querySelector('form')

    fireEvent.change(input, { target: { value: 'testing of forms could be easier' } })
    fireEvent.submit(form)

    expect(onSubmit.mock.calls.length).toBe(1)
    expect(state.value).toBe('testing of forms could be easier')
})