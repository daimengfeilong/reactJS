/**
 * Created by HEGS on 2019/6/3.
 */

//各种生命周期钩子函数
class Button extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: 0
    }
  }
  setNewNumber () {
    this.setState({
      data: this.state.data + 1
    })
  }
  render () {
    return (
      <div>
        <button onClick={this.setNewNumber.bind(this)}>INCREMENT</button>
        <Content myNumber={this.state.data} />
      </div>
    )
  }
}
class Content extends React.Component {
  componentWillMount () {
    console.log('在渲染前调用')
  }
  componentDidMount () {
    console.log('在第一次渲染后调用')
  }
  componentWillReceiveProps (newProps) {
    console.log(newProps, '在组件接收到一个新的props(更新)时被调用')
  }
  shouldComponentUpdate (newProps, newState) {
    console.log(newProps, newState, '在组件接收到一个新的props或state时被调用,在初始化时不会调用,返回布尔值')
    return true
  }
  componentWillUpdate (newProps, newState) {
    console.log(newProps, newState, '在组件接收到一个新的props或state但还没有render时被调用，在初始化时不会被调用')
  }
  componentDidUpdate (prevProps, prevState) {
    console.log(prevProps, prevState, '在组件完成更新后立即调用，在初始化时不会调用')
  }
  componentWillUnmount () {
    console.log('在组件从DOM中移除之前立刻被调用')
  }
  render () {
    return (
      <div>
        <h3>{this.props.myNumber}</h3>
      </div>
    )
  }
}
ReactDOM.render(
  <Button />,
  document.getElementById('main9')
)

//异步请求
class UserGist extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: "",
      lastGistUrl: ""
    }
  }
  componentDidMount () {
    this.serverReq = $.get(this.props.source, function (data) {
      let lastGist = data[0]
      this.setState({
        username: lastGist.owner.login,
        lastGistUrl: lastGist.html_url
      })
    }.bind(this))
  }
  componentWillUnmount () {
    this.serverReq.abort()
  }
  render () {
    return (
      <div>
        <span>{this.state.username}用户最新的Gist共享地址</span>
        <a href={ this.state.lastGistUrl }>{ this.state.lastGistUrl }</a>
      </div>
    )
  }
}
ReactDOM.render(
  <UserGist source={'https://api.github.com/users/octocat/gists'} />,
  document.getElementById('main10')
)

//表单输入框数据双向绑定
class ChildComponent extends React.Component {
  render () {
    return (
      <div>
        <input type="text" value={this.props.value} onChange={ this.props.updateStateProp } />
        <h4>{ this.props.value }</h4>
      </div>
    )
  }
}
class HelloMsg extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: "Hello, World!"
    }
  }
  handleChange (event) {
    this.setState({
      value: event.target.value
    })
  }
  render () {
    return (
      <div>
        <ChildComponent value={ this.state.value } updateStateProp={this.handleChange.bind(this)} />
      </div>
    )
  }
}
ReactDOM.render(
  <HelloMsg />,
  document.getElementById('main11')
)

//表单下拉选择框数据双向绑定
class FlavorForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'fb'
    }
  }
  handleSelect (event) {
    this.setState({
      value: event.target.value
    })
  }
  handleSubmit (event) {
    console.log('你最喜欢的网站是：' + this.state.value)
    event.preventDefault()
  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <span>选择你最喜欢的网站</span>
            <select value={this.state.value} onChange={this.handleSelect.bind(this)} >
              <option value="">请选择</option>
              <option value="gg">Google</option>
              <option value="rn">Runoob</option>
              <option value="tb">Taobao</option>
              <option value="fb">Facebook</option>
            </select>
          </div>
          <div>
            <input type="submit" value="提交"/>
          </div>
        </form>
      </div>
    )
  }
}
ReactDOM.render(
  <FlavorForm />,
  document.getElementById('main12')
)

//表单内多个input元素
class Reservation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    }
  }
  handleCheck (event) {
    event.persist()
    let target = event.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    let name = target.name
    this.setState({
      [name]: value
    })
  }
  render () {
    return (
      <form>
        <div>
          <label>是否离开</label>
          <input type="checkbox" name="isGoing" checked={this.state.isGoing} onChange={this.handleCheck.bind(this)} />
        </div>
        <div>
          <label>访客数</label>
          <input type="number" name="numberOfGuests" value={this.state.numberOfGuests} onChange={this.handleCheck.bind(this)} />
        </div>
      </form>
    )
  }
}
ReactDOM.render(
  <Reservation />,
  document.getElementById('main13')
)

//refs
class MyComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 1
    }
  }
  handleBtnClick (event) {
    event.persist()
    console.log(event)
    this.setState({
      value: this.state.value + 1
    })
    console.log(this.refs.myInput)
    this.refs.myInput.value = this.state.value + 1
  }
  handleBtnReset () {
    this.setState({
      value: 0
    })
    this.refs.myInput.value = ""
    this.refs.myInput.focus()
  }
  render () {
    return (
      <div>
        <input type="text" defaultValue={this.state.value} ref="myInput" />
        <input type="button" value="点我" onClick={this.handleBtnClick.bind(this)} />
        <input type="button" value="重置" onClick={this.handleBtnReset.bind(this)} />
      </div>
    )
  }
}
ReactDOM.render(
  <MyComponent />,
  document.getElementById('main14')
)

//状态提升
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}
function BoilingVerdict (props) {
  "use strict";
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
class TemperatureInput extends React.Component {
  handleInput = (e) => {
    e.persist()
    this.props.onTemperatureChange(e.target.value)
  }
  render () {
    let temperature = this.props.temperature, scale = this.props.scale, unitType = this.props.unitType
    return (
      <div style={{marginTop: '10px'}}>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input type="text" value={temperature} onChange={this.handleInput} />
        <label>{unitType}</label>
      </div>
    )
  }
}
class Calculator extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      temperature: "",
      scale: 'c'
    }
  }
  handleCelsiusValue = (val) => {
    this.setState({
      scale: 'c',
      temperature: val
    })
  }
  handleFahrenheitValue = (val) => {
    this.setState({
      scale: 'f',
      temperature: val
    })
  }
  render () {
    const scale = this.state.scale, temperature = this.state.temperature
    const celsius = scale == 'f' ? tryConvert(temperature, toCelsius) : temperature
    const fahrenheit = scale == 'c' ? tryConvert(temperature, toFahrenheit) : temperature
    return (
      <div>
        <fieldset>
          <legend>Please Input</legend>
          <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusValue} unitType="℃"/>
          <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitValue} unitType="℉" />
          <BoilingVerdict celsius={parseFloat(celsius)} />
        </fieldset>
      </div>
    )
  }
}
ReactDOM.render(
  <Calculator />,
  document.getElementById('main15')
)

//组合&继承
function Contacts () {
  "use strict";
  return (
    <div className="contacts">这里是Contacts组件</div>
  )
}
function Chat () {
  "use strict";
  return (
    <div className="chat">这里是Chat组件</div>
  )
}
function SplitPane (props) {
  "use strict";
  return (
    <div className="splitPane">
      <div className="splitPane-left">
        {props.left}
      </div>
      <div className="splitPane-right">
        {props.right}
      </div>
    </div>
  )
}
ReactDOM.render(
  <SplitPane left={ <Contacts /> } right={ <Chat/> } />,
  document.getElementById('main16')
)

function FancyBorder (props) {
  "use strict";
  return (
    <div className={'fancyBorder fancyBorder-' + props.color}>
      {props.children}
    </div>
  )
}
function Dialog (props) {
  "use strict";
  return (
    <FancyBorder color="blue">
      <h1>{props.title}</h1>
      <p>{props.message}</p>
      {props.children}
    </FancyBorder>
  )
}
class SignUpDialog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      login: ""
    }
  }
  handleLogin = (e) => {
    e.persist()
    this.setState({
      login: e.target.value
    })
  }
  handleSignUp = () => {
    alert(`Welcome aboard, ${this.state.login}`)
  }
  render () {
    return (
      <Dialog title="Mars Exploration Program" message="How should we refer to you?">
        <input type="text" value={this.state.login} onChange={this.handleLogin} />
        <button onClick={this.handleSignUp}>Sign Me Up</button>
      </Dialog>
    )
  }
}
ReactDOM.render(
  <SignUpDialog />,
  document.getElementById('main17')
)