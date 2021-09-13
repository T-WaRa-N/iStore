import React from 'react'
import Istore from '../Istore'
import renderer from 'react-test-renderer'

test('Checks whether it renders correctly', ()=>{
    const tree = renderer
    .create(<Istore />)
    .toJSON();
    expect(tree).toMatchSnapshot();
})