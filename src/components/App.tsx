import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import Display from './Display';
import Pad from './Pad';

const StyledApp = styled.div`
  width: 600px;

  @media (max-width: 767px) {
    width: 320px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 480px;
  }
`

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 
export type Operator = '+' | '-' | '×' | '÷' 


export const App: FunctionComponent = () => {

  const [result, setResult] = useState<number>(0)
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true)
  const [pendingOperator, setPendingOperator] = useState<Operator>()
  const [display, setDisplay] = useState<string>('0')

  const calculate = (rightOperand: number, pendingOperator: Operator): boolean => {
    let newResult = result;

    switch (pendingOperator) {
      case '+':
        newResult += rightOperand
        break
      case '-':
        newResult -= rightOperand
        break
      case '×':
        newResult *= rightOperand
        break
      case '÷':
        if (rightOperand === 0) {
          return false
        }
        newResult /= rightOperand
        break
    }

    setResult(newResult)
    setDisplay(newResult.toString().toString().slice(0, 12))

    return true
  }

  const onDigitButtonClick = (digit: Digit) => {
    let newDisplay = display

    if ((display === '0' && digit === 0) || display.length > 12) {
      return
    }

    if (waitingForOperand) {
      newDisplay = ''
      setWaitingForOperand(false)
    }

    if (display !== '0') {
      newDisplay = newDisplay + digit.toString()
    } else {
      newDisplay = digit.toString()
    }

    setDisplay(newDisplay)
  }

  const onPointButtonClick = () => {
    let newDisplay = display

    if (waitingForOperand) {
      newDisplay = '0'
    }

    if (newDisplay.indexOf('.') === -1) {
      newDisplay = newDisplay + '.'
    }

    setDisplay(newDisplay)
    setWaitingForOperand(false)
  }

  const onOperatorButtonClick = (operator: Operator) => {
    const operand = Number(display)

    if (typeof pendingOperator !== 'undefined' && !waitingForOperand) {
      if (!calculate(operand, pendingOperator)) {
        return
      }
    } else {
      setResult(operand)
    }

    setPendingOperator(operator)
    setWaitingForOperand(true)
  }

  const onChangeSignButtonClick = () => {
    const value = Number(display)

    if (value > 0) {
      setDisplay('-' + display)
    } else if (value < 0) {
      setDisplay(display.slice(1))
    }
  }

  const onEqualButtonClick = () => {
    const operand = Number(display)

    if (typeof pendingOperator !== 'undefined' && !waitingForOperand) {
      if (!calculate(operand, pendingOperator)) {
        return
      }

      setPendingOperator(undefined)
    } else {
      setDisplay(operand.toString())
    }

    setResult(operand)
    setWaitingForOperand(true)
  }

  const onAllClearButtonClick = () => {
    setResult(0)
    setPendingOperator(undefined)
    setDisplay('0')
    setWaitingForOperand(true)
  }

  
  const onPercentButtonClick = () => {
    const percent = Number(display)/100
    setDisplay(percent.toString())
    setWaitingForOperand(false)
  }


  return (
    <StyledApp>
      <Display value={display} expression={typeof pendingOperator !== 'undefined' ? `${result}${pendingOperator}${waitingForOperand ? '' : display}` : ''} />
      <Pad
        onDigitButtonClick={onDigitButtonClick}
        onPointButtonClick={onPointButtonClick}
        onOperatorButtonClick={onOperatorButtonClick}
        onChangeSignButtonClick={onChangeSignButtonClick}
        onEqualButtonClick={onEqualButtonClick}
        onAllClearButtonClick={onAllClearButtonClick}
        onPercentButtonClick={onPercentButtonClick}
      />
    </StyledApp>
  )
}

export default App
