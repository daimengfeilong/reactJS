/**
 * Created by HEGS on 2019/5/15.
 */
//function Clock (props) {
//  "use strict";
//  return (
//    <div>
//      <h1>Hello, World!</h1>
//      <h2>现在是{ props.date.toLocaleTimeString() }.</h2>
//    </div>
//  )
//}
//class Clock extends React.Component {
//  render () {
//    return (
//      <div>
//        <h1>{ this.props.name }</h1>
//        <h2>现在是{ this.props.date.toLocaleTimeString() }</h2>
//      </div>
//    )
//  }
//}
//
//function tick() {
//  "use strict";
//  ReactDOM.render(
//    <Clock name={'Hello, World!!!'} date={new Date()}/>,
//    document.getElementById('main')
//  )
//}
//
//setInterval(tick, 1000)

//class Apple extends React.Component {
//  render () {
//    let myStyle={color: this.props.color}
//    return (
//      <h3 className="apple">这是<span style={myStyle}>{this.props.name}</span> </h3>
//    )
//  }
//}
//class Banana extends React.Component {
//  render () {
//    let myStyle={color: this.props.color}
//    return (
//      <h3>这是<span style={myStyle}>{this.props.name}</span> </h3>
//    )
//  }
//}
//class Orange extends React.Component {
//  render () {
//    let myStyle={color: this.props.color}
//    return (
//      <h3>这是<span style={myStyle}>{this.props.name}</span> </h3>
//    )
//  }
//}
//Apple.propTypes = {   //props验证
//  name: PropTypes.string
//}
//ReactDOM.render(
//  <div>
//    <Apple color={'red'} name={'苹果色'}/>
//    <Banana color={'yellow'} name={'香蕉色'}/>
//    <Orange color={'orange'} name={'橙子色'}/>
//  </div>,
//  document.getElementById('main2')
//)
//
//let arr = [
//  <h1 key="0">学海无涯苦作舟</h1>,
//  <h2 key="1">学的不仅是技术，更是梦想</h2>
//]
//ReactDOM.render(
//  <div>{ arr }</div>,
//  document.getElementById('main3')
//)

class Clock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }
  componentDidMount () {
    //console.log('这是在第一次渲染后调用')
    this.timeID = setInterval(() => this.tick(), 1000)
  }
  componentWillUnMount () {
    //console.log('这是在渲染前调用')
    clearInterval(this.timeID)
  }
  tick () {
    this.setState({
      date: new Date()
    })
  }
  render () {
    return (
      <div>
        <h1>{this.props.text}</h1>
        <h2>现在是{this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}
Clock.defaultProps = {   //默认props
  text: 'Hello, World!!!'
}
ReactDOM.render(
  <Clock text={"Hello, React"} />,
  document.getElementById('main')
)

class Website extends React.Component {
  constructor () {
    super()
    this.state = {
      name: '菜鸟教程',
      site: 'https://www.runoob.com'
    }
  }
  render () {
    return (
      <div>
        <Name name={this.state.name} />
        <Site site={this.state.site} />
      </div>
    )
  }
}
class Name extends React.Component {
  render () {
    return (
      <h1>{this.props.name}</h1>
    )
  }
}
class Site extends React.Component {
  render () {
    return (
      <a href={this.props.site}>{this.props.site}</a>
    )
  }
}
ReactDOM.render(
  <Website/>,
  document.getElementById('main4')
)

//事件处理
class Toggle extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isToggleOn: true,
      id: '1'
    }
    //this.handleClick = this.handleClick.bind(this)  //这边绑定是必要的，这样 `this` 才能在回调函数中使用
  }
  handleClick (data, event) {
    console.log(data)
    this.setState((prevState) => {
      return ({isToggleOn: !prevState.isToggleOn})
    })
  }
  render () {
    return (
      <button onClick={this.handleClick.bind(this, this.state.id)}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    )
  }
}
ReactDOM.render(
  <Toggle />,
  document.getElementById('main5')
)

//条件渲染
class LoginControl extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }
  handleLoginClick () {
    this.setState({isLoggedIn: true})
  }
  handleLogoutClick () {
    this.setState({isLoggedIn: false})
  }
  render () {
    const isLoggedIn = this.state.isLoggedIn
    let btn
    btn = isLoggedIn ? <LogoutBtn onClick={this.handleLogoutClick.bind(this)} /> : <LoginBtn onClick={this.handleLoginClick.bind(this)} />
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {btn}
      </div>
    )
  }
}
function UserGreeting (props) {
  "use strict";
  return <h1>欢迎回来！</h1>
}
function GuestGreeting (props) {
  "use strict";
  return <h1>请先注册！</h1>
}
function Greeting (props) {
  "use strict";
  const isLoggedIn = props.isLoggedIn
  return isLoggedIn ? <UserGreeting /> : <GuestGreeting />
}
function LoginBtn (props) {
  "use strict";
  return (
    <button onClick={props.onClick}>登录</button>
  )
}
function LogoutBtn (props) {
  "use strict";
  return (
    <button onClick={props.onClick}>退出</button>
  )
}
ReactDOM.render(
  <LoginControl />,
  document.getElementById('main6')
)

function Mailbox (props) {
  "use strict";
  let unreadMsg = props.unreadMsg
  return (
    <div>
      <h1>Hello！</h1>
      { unreadMsg.length > 0 ? <h2>您有{unreadMsg.length}条信息未读。</h2> : '' }
    </div>
  )
}
let message = ['React', 'Re: React', 'Re:Re: React']
ReactDOM.render(
  <Mailbox unreadMsg={message} />,
  document.getElementById('main7')
)

//列表
function ListItem (props) {
  "use strict";
  return <li>{ props.value.title }</li>
}
function NumberList (props) {
  "use strict";
  let content = props.content
  let listItems = content.map((item) => {
    return <ListItem key={item.id} value={item} />
  })
  let textList = content.map((item) => {
    return (
      <div key={item.id}>
        <h3>{item.title}</h3>
        <p>{item.content}</p>
      </div>
    )
  })
  return (
    <div>
      <ul>{listItems}</ul>
      <hr/>
      {textList}
    </div>
  )
}
let textArr = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
]
ReactDOM.render(
  <NumberList content={textArr} />,
  document.getElementById('main8')
)

