import React from 'react'
import Parser from 'html-react-parser';
const InstructionContainer = ({marks , instructions}) => {
    return (
        <div className='instruct-container'>
            <h3>{marks} Points</h3>
            <div>
               {Parser(instructions)}
            </div>
            <h3>Attach File</h3>
            <img />
        </div>
    )
}

export default InstructionContainer