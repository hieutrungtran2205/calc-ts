import React, { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { Digit, Operator } from './App';

interface PadProps {
  onDigitButtonClick: (digit: Digit) => void
  onPointButtonClick: () => void
  onOperatorButtonClick: (operator: Operator) => void
  onChangeSignButtonClick: () => void
  onEqualButtonClick: () => void
  onAllClearButtonClick: () => void
  onPercentButtonClick: () => void
}

const StyledPad = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 150px);
  grid-template-rows: repeat(5, 50px);

  @media (max-width: 767px) {
    grid-template-columns: repeat(4, 80px);
    grid-template-rows: repeat(5, 80px);
  };
  
  @media (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: repeat(4, 120px);
    grid-template-rows: repeat(5, 40px);
  }
`

export const Pad: FunctionComponent<PadProps> = ({
  onDigitButtonClick,
  onPointButtonClick,
  onOperatorButtonClick,
  onChangeSignButtonClick,
  onEqualButtonClick,
  onAllClearButtonClick,
  onPercentButtonClick

}) => {
  const handleKeyDown = ({ keyCode, shiftKey }: KeyboardEvent) => {
    console.log(keyCode)
    if (keyCode >= 48 && keyCode <= 57 && !shiftKey) {
      onDigitButtonClick((keyCode - 48) as Digit)
    } else if ((keyCode >= 96 && keyCode <= 105)) {
      onDigitButtonClick((keyCode - 96) as Digit)
    } else if (keyCode === 107 || (keyCode === 187 && shiftKey)) {
      onOperatorButtonClick('+')
    } else if (keyCode === 109 || keyCode === 189) {
      onOperatorButtonClick('-')
    } else if (keyCode === 106 || (keyCode === 56 && shiftKey)) {
      onOperatorButtonClick('×')
    } else if (keyCode === 111 || keyCode === 191) {
      onOperatorButtonClick('÷')
    } else if (keyCode === 13 || (keyCode === 187 && !shiftKey)) {
      onEqualButtonClick()
    }
    else if (keyCode === 27) {
      onAllClearButtonClick()
    } else if (keyCode === 78) {
      onChangeSignButtonClick()
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown)
    return () => document.body.removeEventListener('keydown', handleKeyDown)
  })

  return (
    <StyledPad>
      <Button onClick={onAllClearButtonClick}>
        AC
      </Button>
      <Button onClick={onChangeSignButtonClick}>
        -/+
      </Button>
      <Button onClick={() => onPercentButtonClick()}>
        %
      </Button>
      <Button color="orange" onClick={() => onOperatorButtonClick('÷')}>
        ÷
      </Button>
      <Button onClick={() => onDigitButtonClick(7)}>
        7
      </Button>
      <Button onClick={() => onDigitButtonClick(8)}>
        8
      </Button>
      <Button onClick={() => onDigitButtonClick(9)}>
        9
      </Button>
      <Button color="orange" onClick={() => onOperatorButtonClick('×')}>
        ×
      </Button>
      <Button onClick={() => onDigitButtonClick(4)}>
        4
      </Button>
      <Button onClick={() => onDigitButtonClick(5)}>
        5
      </Button>
      <Button onClick={() => onDigitButtonClick(6)}>
        6
      </Button>
      <Button color="orange" onClick={() => onOperatorButtonClick('-')}>
        -
      </Button>
      <Button onClick={() => onDigitButtonClick(1)}>
        1
      </Button>
      <Button onClick={() => onDigitButtonClick(2)}>
        2
      </Button>
      <Button onClick={() => onDigitButtonClick(3)}>
        3
      </Button>
      <Button color="orange" onClick={() => onOperatorButtonClick('+')}>
        +
      </Button>
      <Button isLarge={true} onClick={() => onDigitButtonClick(0)}>
        0
      </Button>
      <Button onClick={onPointButtonClick}>
        .
      </Button>
      <Button color="orange" onClick={onEqualButtonClick}>
        =
      </Button>
    </StyledPad>
  )
}

export default Pad
