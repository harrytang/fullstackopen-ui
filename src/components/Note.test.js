/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Note from './Note'

test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    };


    const mockHandler = jest.fn();

    const { getByText } = render(
        <Note note={note} toggleImportance={mockHandler} label="mark not important" />
    );

    const button = getByText('mark not important');
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(1)
});