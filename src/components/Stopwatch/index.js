import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  updateTime = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  onStartTimer = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.timeInterval = setInterval(this.updateTime, 1000)
      this.setState({isTimerRunning: true})
    }
  }

  onStopTimer = () => {
    clearInterval(this.timeInterval)
    this.setState({isTimerRunning: false})
  }

  onResetTimer = () => {
    clearInterval(this.timeInterval)
    this.setState({isTimerRunning: false, timeElapsedInSeconds: 0})
  }

  renderSeconds = () => {
    const {timeElapsedInSeconds} = this.state
    const seconds = Math.floor(timeElapsedInSeconds % 60)
    return seconds < 10 ? `0${seconds}` : seconds
  }

  renderMinutes = () => {
    const {timeElapsedInSeconds} = this.state
    const minutes = Math.floor(timeElapsedInSeconds / 60)
    return minutes < 10 ? `0${minutes}` : minutes
  }

  render() {
    const {isTimerRunning} = this.state
    const time = `${this.renderMinutes()}:${this.renderSeconds()}`

    return (
      <div className="app-container">
        <div className="stopwatch-container">
          <h1 className="header">Stopwatch</h1>
          <div className="timer-container">
            <div className="timer-logo">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
                className="stopwatch-icon"
              />
              <p className="stopwatch-label">Timer</p>
            </div>
            <h1 className="heading" aria-label={time}>
              {time}
            </h1>
            <div className="buttons-container">
              <button
                className="start-button button"
                onClick={this.onStartTimer}
                type="button"
                disabled={isTimerRunning}
              >
                Start
              </button>
              <button
                className="stop-button button"
                onClick={this.onStopTimer}
                type="button"
              >
                Stop
              </button>
              <button
                className="reset-button button"
                onClick={this.onResetTimer}
                type="button"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
