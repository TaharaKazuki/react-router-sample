import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/friends'>Friends</Link></li>
      </ul>
      {/* routering設定 */}
      <hr/>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/friends' component={Friends} />
    </div>
  </BrowserRouter>
)

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome to ようこそ</p>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
    <p>フレンズに投票するページ</p>
  </div>
);

class Friends extends Component {
  constructor(){
    super();
    this.state = {};
    this.handleVote = this.handleVote.bind(this);
  }
  componentWillMount(){
    FRIENDS.forEach(friend=>{
      this.setState({
        ...this.state,
        [friend.id]: 0
      });
    })
  }
  handleVote(id){
    this.setState({
      [id]: this.state[id] + 1
    })
  }

  render() {
    return (
      <div>
        <h2>Friends</h2>
        <Route exact path='/friends' render={props => <FriendList handleVote={this.handleVote}/>}/>
        <Route path='/friends/:id' render={props => <Friend match={props.match} votes={this.state}/>}/>
      </div>
    );
  }
}

const FriendList = props => {
  const { handleVote } = props;

  return (
    <div>
      {FRIENDS.map(friend=>(
        <li key={friend.id}>
          <Link to={`/friends/${friend.id}`}>{friend.name}</Link>
          <button onClick={()=> handleVote(friend.id)}>+</button>
        </li>
      ))}
    </div>
  )
};


const Friend = props => {
  const { id } = props.match.params;
  const friend = friendById(id);
  const vote = props.votes[id];

  if (typeof friend === 'undefind') {
    return (
      <div>
        <p>`${id}の動物はいません`}</p>
      </div>
    )
  }

  return (
    <div>
      <div>
        <p>{friend.family}</p>
        <h1>{friend.name}</h1>
      </div>
      <h2>Vote:{vote}</h2>
    </div>
  )
};

const FRIENDS = [
  {
    id: 'serval',
    name: 'サーバル',
    family: 'ネコ科'
  },
  {
    id: 'taigger',
    name: 'トラ',
    family: 'ネコ科'
  },
  {
    id: 'lion',
    name: 'ライオン',
    family: 'ネコ科'
  }
];

const friendById = id => FRIENDS.find(obj => obj.id === id);

export default App;

