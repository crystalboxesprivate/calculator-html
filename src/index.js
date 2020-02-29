import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import './style.css'

const onButtonClicked = []
const calculatorState = {
  firstNum: '',
  secondNum: '',
  op: '',
  state: 0,
  update: function (msg) {
    const reset = () => {
      this.state = 0
      this.firstNum = this.secondNum = this.op = ''
    }

    if (msg === 'c') {
      reset()
      return 0
    }

    if (msg === '=') {
      if (this.op === '') {
        return this.firstNum
      } else {
        let result = ''
        const a = parseFloat(this.firstNum)
        const b = parseFloat(this.secondNum)
        switch (this.op) {
          case '+':
            result = a + b
            break;
          case '-':
            result = a - b
            break;
          case '/':
            result = a / b
            break;
          case '*':
            result = a * b
            break;
        }
        reset()
        this.firstNum = result
        return result
      }
    }

    if (!isNaN(msg) || msg === '.') {
      // it's a number
      let result
      if (this.state == 0) {
        this.firstNum += msg
        result = this.firstNum
      } else {
        this.secondNum += msg
        result = this.secondNum
      }
      return result
    } else {
      this.state = 1
      this.op = msg
      return this.firstNum
    }
  }
}

const Screen = _ => {
  const [screenState, setScreenState] = useState({ value: '0' })
  onButtonClicked.push(val => {
    setScreenState({ value: val })
  })
  return <div className='screen'><span>{screenState.value}</span></div>
}

const dispatchMessage = msg => {
  const result = calculatorState.update(msg)
  onButtonClicked.forEach(fn => fn(result))
}

const Button = props => {
  const handleClick = e => {
    dispatchMessage(props.displayValue)
  }
  return (
    <div className='button'>
      <button onClick={handleClick}>
        {props.displayValue}
      </button>
    </div>
  )
}

const Calculator = props => {
  return (
    <div className='calculator'>
      <Screen />
      <div className='layout'>
        <div className='buttons-row'>
          <Button displayValue='7' />
          <Button displayValue='8' />
          <Button displayValue='9' />
          <Button displayValue='/' />
          <Button displayValue='*' />
        </div>
        <div className='buttons-row'>
          <Button displayValue='4' />
          <Button displayValue='5' />
          <Button displayValue='6' />
          <Button displayValue='+' />
          <Button displayValue='-' />
        </div>
        <div className='buttons-row'>
          <Button displayValue='1' />
          <Button displayValue='2' />
          <Button displayValue='3' />
          <Button displayValue='c' />
        </div>
        <div className='buttons-row'>
          <Button displayValue='0' />
          <Button displayValue='.' />
          <Button displayValue='=' />
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<Calculator />, document.getElementById('main'))
