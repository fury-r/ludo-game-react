import { Col, Row, Button, Modal } from "react-bootstrap";
import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import Particles from "react-tsparticles";
import Dice from "react-dice-roll";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
const Game = () => {
  const [show, setshow] = useState(false);
  const [showTimer, setShowtimer] = useState(false);
  const [showDialog, setshowDialog] = useState(false);
  const [show1, setshow1] = useState(false);
  const [count,setCount]=useState(4)
  const [game, setGame] = useState({
    dice: 0,
    prevroll: 0,
    safe: [1, 14, 40, 27, 9, 22, 48, 35],
    players: {
      green: {
        house: [1, 2, 3, 4],
        1: false,
        2: false,
        3: false,
        4: false,
        safe: 22,
        zone: 51,
        start: 1,
        out: [],
        path: [[], [], [], [], []],
        points: 0,
      },
      yellow: {
        house: [1, 2, 3, 4],
        safe: 48,
        1: false,
        2: false,
        3: false,
        4: false,

        zone: 12,
        start: 14,
        out: [],
        path: [[], [], [], [], []],
        points: 0,
      },
      red: {
        house: [1, 2, 3, 4],
        safe: 35,
        1: false,
        2: false,
        3: false,
        4: false,

        zone: 38,
        start: 40,
        out: [],
        path: [[], [], [], [], []],
        points: 0,
      },
      blue: {
        house: [1, 2, 3, 4],
        safe: 9,
        1: false,
        2: false,
        3: false,
        4: false,

        zone: 25,
        start: 27,
        out: [],
        points: 0,

        path: [[], [], [], [], []],
      },
    },
    board: [
      0,
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
    queue: ["green", "yellow", "blue", "red"],
  });
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [gamedata, setGameData] = useState([]);
  const [showWinner, setshowWinner] = useState(false);
  const [showWinnerMessage, setshowWinnerMessage] = useState({
    color: "",
    message: "",
  }); 

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("game"));
    console.log(data);

    if (data) {
      console.log(data);
      setGameData(data);
      setshowDialog(true);
      return 0
    }
    else{
      setshow1(true)
    }
  }, []);
  const removeWinner=(value)=>{
    let queue=game.queue
    queue.splice(0,1)
    game.queue=queue
    setGame(game)
    console.log(game)
  }
  const Save = () => {
    let data = JSON.parse(localStorage.getItem("game"));
    let id = 1;
    if (!data) {
      let data = [{ game: game, id: 1 }];
      localStorage.setItem("game", JSON.stringify(data));
    } else {
      let id = data[data.length - 1].id + 1;
      console.log("ee", id);
      data.push({ game: game, id: id });
      localStorage.setItem("game", JSON.stringify(data));
    }
    alert("Game Saved " + id);
  };

  const colorStyle = {
    green: "border-white	 rounded-full p-1 mr-1  text-white bg-green-700",
    red: " border-white	 rounded-full p-1 mr-1   text-white bg-red-700",
    yellow: "border-white	rounded-full p-1 mr-1  bg-yellow-500 text-white ",
    blue: "border-white	 rounded-full p-1 mr-1   bg-blue-500 text-white ",
  };
  const reset=()=>{
    setGame({
      dice: 0,
      prevroll: 0,
      safe: [1, 14, 40, 27, 9, 22, 48, 35],
      players: {
        green: {
          house: [1, 2, 3, 4],
          1: false,
          2: false,
          3: false,
          4: false,
          safe: 22,
          zone: 51,
          start: 1,
          out: [],
          path: [[], [], [], [], []],
          points: 0,
        },
        yellow: {
          house: [1, 2, 3, 4],
          safe: 48,
          1: false,
          2: false,
          3: false,
          4: false,
  
          zone: 12,
          start: 14,
          out: [],
          path: [[], [], [], [], []],
          points: 0,
        },
        red: {
          house: [1, 2, 3, 4],
          safe: 35,
          1: false,
          2: false,
          3: false,
          4: false,
  
          zone: 38,
          start: 40,
          out: [],
          path: [[], [], [], [], []],
          points: 0,
        },
        blue: {
          house: [1, 2, 3, 4],
          safe: 9,
          1: false,
          2: false,
          3: false,
          4: false,
  
          zone: 25,
          start: 27,
          out: [],
          points: 0,
  
          path: [[], [], [], [], []],
        },
      },
      board: [
        0,
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ],
      queue: ["green", "yellow", "blue", "red"],
    })
    PlayerCount(count)
  }
   const checkWinner =async () => {

    if (game.players.green.points == 4 && game.queue.includes('green')) {



      setshowWinner(true);
      removeWinner()
    } else if (game.players.yellow.points == 4  && game.queue.includes('yellow')) {
      setshowWinnerMessage({
        color: "yellow",
        message: "Player 2 has won.",
      });
      setshowWinner(true);
    } else if (game.players.red.points == 4  && game.queue.includes('red')) {

      setshowWinner(true);
      removeWinner()

    } else if (game.players.blue.points == 4  && game.queue.includes('blue')) {

      setshowWinner(true);
      removeWinner()

    }
  };
 
  const MoveFromHouse = (e) => {
    let pawn = e.target.id;
    pawn = pawn.split("-");
    if (pawn[0] == game.queue[0] && game.dice == 6) {
      let main = game.queue;
      let data = game.players;

      let board = game.board;
      let players = game.players;
      console.log(players[pawn[0]].house.indexOf(parseInt(pawn[1])));
      players[pawn[0]].house.splice(
        players[pawn[0]].house.indexOf(parseInt(pawn[1])),
        1
      );
      board[data[pawn[0]].start].push({ color: pawn[0], number: pawn[1] });
      setGame((prev) => ({
        ...prev,
        players: players,
        board: board,
        dice: 6,
      }));
      console.log(game, game.board[1], "eeee", parseInt(pawn[1]));

    }
    else if(pawn[0]==game.queue[0])
    {
      ChangeQueue();

    }
  };
  const winningPath = (e) => {
    let pawn = e.target.id;
    let flag=false
    pawn = pawn.split("-");
    console.log("in", game, pawn, e.target.id);
    if (game.queue[0] == pawn[0]) {
      if (game.dice > 0) {
        if (pawn[2] == "null") {
          let players = game.players;
          let board = game.board;
          let index=0
          let x=0
          let f=false
          let search=players[pawn[0]].zone
          board[search].map((e)=>{
            if (e.color==pawn[0] &&e.number==pawn[1])
            {
              f=true
              index=x
              console.log('in')
  
            }
            x+=1
          })
          if (f){
            board[players[pawn[0]].zone].splice(
              index,1
             );
          }
        
          players[pawn[0]].path[0].push({ color: pawn[0], number: pawn[1] });
          let d = game.dice - 1;
          game.dice = d;
          game.board = board;
          game.players = players;
          setGame(game);
          console.log(game);
          pawn = [pawn[0], pawn[1], "0", "w"];
        }
        if (game.dice > 0) {
          let players = game.players;
          let data = game.players[pawn[0]];
          let current_pos = parseInt(pawn[2]);
          let left = data.path.length - current_pos;
          console.log(
            pawn,
            "----------pawn----",
            left,
            data.path.length,
            current_pos,
            game
          );

          if (game.dice <= left) {
            let j = 1;
            for (let i = 1; i <= game.dice; i++) {
              let way = game.players;
              let index=0
              let x=0
              let f=false
              let search=current_pos
              way[pawn[0]].path[current_pos].map((e)=>{
                if (e.color==pawn[0] &&e.number==pawn[1])
                {
                  f=true
                  index=x
                  console.log('in')
      
                }
                x+=1
              })
              if (f){
                way[pawn[0]].path[current_pos].splice(
                  index,
                  1
                );
                }

              if (current_pos + j == 5) {
                flag=true
                console.log("points");
                way[pawn[0]].points += 1;
                setGame((prev) => ({
                  ...prev,
                  players: way,
                }));
                checkWinner();
              } else {
      
                way[pawn[0]].path[current_pos + j].push({
                  color: pawn[0],
                  number: pawn[1],
                });
              }
              game.players = way;
              setGame(game);
              current_pos += j;
              console.log(game, "chnage");
            }
          } else {
            alert("Move Not Possible");
          }
          console.log(flag,'------flag')

        }

      }
      if(!flag){
        ChangeQueue();
        
      }
      else{
        setDisabled(false)
      }

    }

    console.log("exit");
  };
  const PlayerCount=(e)=>{
    setCount(e)
    let queue=game.queue
    let n=game.queue.length-e
    if(n>0){
      for(let i=0;i<n;i++){
        queue.splice(0,1)
      }
      game.queue=queue
      setGame(game)
    }
 

    

  }
  const ChangeQueue = () => {
    let main = game.queue;
    if (game.prevroll == 6) {
      setshow(true);
    } else {
      console.log("QueueChange");
      let q = main[0];

      main.shift();

      main.push(q);

      setGame((prev) => ({
        ...prev,
        queue: main,
      }));
      setShowtimer(false);
    }
    setGame((prevstate) => ({
      ...prevstate,
      dice: 0,
      prevroll: 0,
    }));
    setDisabled(false);
    return true;
  };
  const MovePiece = (e) => {
    console.log("Move");
    let pawn = e.target.id;
    pawn = pawn.split("-");
    let board = game.board[parseInt(pawn[2])];
    let flag = 0;
    console.log(game.queue, pawn);
    if (pawn[0] == game.queue[0]) {
      let current_pos = parseInt(pawn[2]);
      let j = 1;
      for (let i = 1; i <= game.dice; i++) {
        let board = game.board;
        if (current_pos == game.players[pawn[0]].zone) {
          console.log("in");
          board = game.board;
          let players = game.players;
          players[pawn[0]][parseInt(pawn[1])] = true;

          game.players = players;
          setGame(game);
        }
        if (game.players[pawn[0]][parseInt(pawn[1])]) {
          let prev = current_pos == 1 ? 52 : current_pos - 1;
          console.log(prev, "prev", current_pos, game);
          current_pos != 0
            ? board[current_pos].splice(
                board[current_pos].indexOf({ color: pawn[0], number: pawn[1] }),
                1
              )
            : board[prev].splice(
                board[prev].indexOf({ color: pawn[0], number: pawn[1] }),
                1
              );
          let d = game.dice - i + 1;
          console.log(d, i, game.dice);
          game.board = board;
          game.dice = d;
          setGame(game);
          console.log(game, "before call");
          e.target.id = pawn[0] + "-" + pawn[1] + "-" + "null" + "-" + "w";
          return winningPath(e);
        }

        console.log(board, current_pos, pawn[2], "-----------------------");
        let data = game.players;
        console.log(current_pos, "fff", j, board.length);
        if (current_pos == 52) {
          current_pos = 0;
        }
        if (i == game.dice) {
          if (game.board[current_pos + j].length > 0) {
            // eslint-disable-next-line no-loop-func
            game.board[current_pos + j].map((e) => {
              console.log(current_pos + j, game.safe);
              if (
                e.color != pawn[0] &&
                game.safe.includes(current_pos + j) == false
              ) {
                let player = game.players;
                let safe = game.players[e.color].safe;
                let board = game.board;
                let pos = current_pos + j;
                console.log(safe, pos, e);
                if (pos != safe) {
                  player[e.color][parseInt(e.number)] = false;
                  flag=1
                  console.log("remove");
                  player[e.color].house.push(parseInt(e.number));
                  board[current_pos + j].splice(
                    board[current_pos + j].indexOf(e),
                    1
                  );
                  setGame((prev) => ({
                    ...prev,
                    board: board,
                    players: player,
                  }));
                }
              }
            });
          }
        }
        let index=0
        let f=false
        let x=0
        let search=current_pos!=0?current_pos:52
        board[search].map((e)=>{
          if (e.color==pawn[0] &&e.number==pawn[1])
          {
            index=x
            f=true
            console.log('in')

          }
          x+=1
        })
        console.log(current_pos,'pos',index,search,game.board[search])
          if (f)
{        board = game.board;
        current_pos != 0
          ? board[current_pos].splice(
              index,
              1
            )
          : board[52].splice(
              index,
              1
            );}
        board[current_pos + j].push({ color: pawn[0], number: pawn[1] });
        if (current_pos == game.players[pawn[0]].zone) {
          console.log("in");
          board = game.board;
          let players = game.players;
          players[pawn[0]][parseInt(pawn[1])] = true;

          game.players = players;
          setGame(game);
        }
        current_pos += j;

        setGame((prev) => ({
          ...prev,
          board: board,
        }));
      }
      console.log("queueChange");
      if (flag==0)
      {
        ChangeQueue();

      }
      else{
        setDisabled(false)
      }
    }
  };
  const Roll = (e) => {
    console.log(e);
    setDisabled(true);
    setGame((prev) => ({
      ...prev,
      dice: e,
      prevroll: e,
    }));
    setShowtimer(true);

  };
  return (
    <div className="content" styles={{overflowY:'scroll'}}>
<div class="bg1"></div>
<div class="bg1 bg2"></div>
<div class="bg1 bg3"></div>
      <div
        className="  mt-6 back  "
        style={{ flex: 1, flexDirection: "column" }}
      >
      
        <Row className="flex flex-row justify-center animate-color">
          <label className="font-sans italic font-bold text-8xl p-4 rounded-md  text-white bg-gradient-to-r   from-green-400 to-blue-500 hover:from-red-500 hover:to-yellow-500 ">
            Ludo
          </label>
        </Row>
        <Row>
          <Col className="game border-2 border-black-500">
            <div className="house green">
              <div className="box">
                {game.players.green.house.includes(1) == true ? (
                  <Button
                    onClick={MoveFromHouse}
                    id="green-1"
                    className="square square-one green text-white "
                  >
                    1
                  </Button>
                ) : (
                  <Button
                    id="green-1"
                    className="square square-one disabled text-white "
                    disabled={true}
                  ></Button>
                )}
                {game.players.green.house.includes(2) == true ? (
                  <Button
                    onClick={MoveFromHouse}
                    id="green-2"
                    className="square square-two green text-white "
                  >
                    2
                  </Button>
                ) : (
                  <Button
                    id="green-2"
                    className="square square-two disabled text-white "
                    disabled={true}
                  ></Button>
                )}
                {game.players.green.house.includes(3) == true ? (
                  <Button
                    onClick={MoveFromHouse}
                    id="green-3"
                    className="square square-three green text-white "
                  >
                    3
                  </Button>
                ) : (
                  <Button
                    id="green-3"
                    className="square square-three disabled text-white "
                    disabled={true}
                  ></Button>
                )}
                {game.players.green.house.includes(4) == true ? (
                  <Button
                    onClick={MoveFromHouse}
                    id="green-4"
                    className="square square-four green text-white "
                  >
                    4
                  </Button>
                ) : (
                  <Button
                    id="green-4"
                    className="square square-four disabled text-white "
                    disabled={true}
                  ></Button>
                )}
              </div>
            </div>

            <div className="house yellow" style={{ right: 0 }}>
              <div className="box">
                {game.players.yellow.house.includes(1) == true ? (
                  <Button
                    onClick={MoveFromHouse}
                    id="yellow-1"
                    className="square square-one yellow  text-white "
                  >
                    1
                  </Button>
                ) : (
                  <Button
                    id="yellow-1"
                    className="square square-one disabled text-white "
                    disabled={true}
                  ></Button>
                )}
                {game.players.yellow.house.includes(2) == true ? (
                  <Button
                    onClick={MoveFromHouse}
                    id="yellow-2"
                    className="square square-two yellow text-white "
                  >
                    2
                  </Button>
                ) : (
                  <Button
                    id="yellow-2"
                    className="square square-two disabled text-white "
                    disabled={true}
                  ></Button>
                )}
                {game.players.yellow.house.includes(3) == true ? (
                  <Button
                    onClick={MoveFromHouse}
                    id="yellow-3"
                    className="square square-three yellow text-white "
                  >
                    3
                  </Button>
                ) : (
                  <Button
                    id="yellow-3"
                    className="square square-three disabled text-white "
                    disabled={true}
                  ></Button>
                )}
                {game.players.yellow.house.includes(4) == true ? (
                  <Button
                    onClick={MoveFromHouse}
                    id="yellow-4"
                    className="square square-four yellow text-white "
                  >
                    4
                  </Button>
                ) : (
                  <Button
                    id="yellow-4"
                    className="square square-four disabled text-white "
                    disabled={true}
                  ></Button>
                )}
              </div>
            </div>

            <div className="house red" style={{ bottom: 0 }}>
              <div className="box">
                {game.players.red.house.includes(1) == true ? (
                  <Button
                    onClick={MoveFromHouse}
                    id="red-1"
                    className="square square-one  red text-white "
                  >
                    1
                  </Button>
                ) : (
                  <Button
                    id="red-1"
                    className="square square-one disabled text-white "
                    disabled={true}
                  ></Button>
                )}
                {game.players.red.house.includes(2) == true ? (
                  <Button
                    onClick={MoveFromHouse}
                    id="red-2"
                    className="square square-two  red text-white "
                  >
                    2
                  </Button>
                ) : (
                  <Button
                    id="red-2"
                    className="square square-two disabled text-white "
                    disabled={true}
                  ></Button>
                )}
                {game.players.red.house.includes(3) == true ? (
                  <Button
                    onClick={MoveFromHouse}
                    id="red-3"
                    className="square square-three red  text-white "
                  >
                    3
                  </Button>
                ) : (
                  <Button
                    id="red-3"
                    className="square square-three disabled text-white "
                    disabled={true}
                  ></Button>
                )}
                {game.players.red.house.includes(4) == true ? (
                  <Button
                    onClick={MoveFromHouse}
                    id="red-4"
                    className="square square-four  red  text-white "
                  >
                    4
                  </Button>
                ) : (
                  <Button
                    id="red-4"
                    className="square square-four disabled text-white "
                    disabled={true}
                  ></Button>
                )}
                '
              </div>
            </div>

            <div className="house blue" style={{ bottom: 0, right: 0 }}>
              <div className="box">
                {game.players.blue.house.includes(1) == true ? (
                  <Button
                    onClick={MoveFromHouse}
                    id="blue-1"
                    className="square square-one  blue text-white "
                  >
                    1
                  </Button>
                ) : (
                  <Button
                    id="blue-1"
                    className="square square-one disabled text-white "
                    disabled={true}
                  ></Button>
                )}
                {game.players.blue.house.includes(2) == true ? (
                  <Button
                    onClick={MoveFromHouse}
                    id="blue-2"
                    className="square square-two  blue text-white "
                  >
                    2
                  </Button>
                ) : (
                  <Button
                    id="blue-2"
                    className="square square-two disabled text-white "
                    disabled={true}
                  ></Button>
                )}
                {game.players.blue.house.includes(3) == true ? (
                  <Button
                    onClick={MoveFromHouse}
                    id="blue-3"
                    className="square square-three blue  text-white "
                  >
                    3
                  </Button>
                ) : (
                  <Button
                    id="blue-3"
                    className="square square-three disabled text-white "
                    disabled={true}
                  ></Button>
                )}
                {game.players.blue.house.includes(4) == true ? (
                  <Button
                    onClick={MoveFromHouse}
                    id="blue-4"
                    className="square square-four  blue  text-white "
                  >
                    4
                  </Button>
                ) : (
                  <Button
                    id="blue-4"
                    className="square square-four disabled text-white "
                    disabled={true}
                  ></Button>
                )}
              </div>
            </div>

            <Button className="home"></Button>
            <div className="cells bg-white" style={{ top: "40%" }}>
              {game.board[52].length > 0
                ? game.board[52].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "52"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              id="green-start"
              className="cells g-start"
              style={{ top: "40%", left: "6.66%" }}
              value={game.board[1]}
            >
              {game.board[1].length > 0
                ? game.board[1].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "1"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells bg-white"
              value={game.board[2]}
              style={{ top: "40%", left: "13.32%" }}
            >
              {game.board[2].length > 0
                ? game.board[2].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "2"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[3]}
              className="cells bg-white "
              style={{ top: "40%", left: "19.98%" }}
            >
              {game.board[3].length > 0
                ? game.board[3].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "3"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[4]}
              className="cells bg-white "
              style={{ top: "40%", left: "26.64%" }}
            >
              {game.board[4].length > 0
                ? game.board[4].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "4"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[5]}
              className="cells bg-white  "
              style={{ top: "40%", left: "33.64%" }}
            >
              {game.board[5].length > 0
                ? game.board[5].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "5"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>

            <div
              value={game.board[11]}
              className="cells  bg-white "
              style={{ top: 0, left: "40%" }}
            >
              {game.board[11].length > 0
                ? game.board[11].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "11"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[10]}
              className="cells bg-white "
              style={{ top: "6.66%", left: "40%" }}
            >
              {game.board[10].length > 0
                ? game.board[10].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "10"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[9]}
              className="cells  bg-gray-400  "
              style={{ top: "13.32%", left: "40%" }}
            >
              {game.board[9].length > 0
                ? game.board[9].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "9"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[8]}
              className="cells bg-white"
              style={{ top: "19.98%", left: "40%" }}
            >
              {game.board[8].length > 0
                ? game.board[8].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "8"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[7]}
              className="cells bg-white "
              style={{ top: "26.64%", left: "40%" }}
            >
              {game.board[7].length > 0
                ? game.board[7].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "7"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells bg-white  "
              value={game.board[6]}
              style={{ top: "33.3%", left: "40%" }}
            >
              {game.board[6].length > 0
                ? game.board[6].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "6"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells bg-white "
              value={game.board[12]}
              style={{ top: 0, left: "46.66%" }}
            >
              {game.board[12].length > 0
                ? game.board[12].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "12"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells yellow "
              style={{ top: "6.66%", left: "46.66%" }}
            >
              {game.players["yellow"].path[0].length > 0
                ? game.players["yellow"].path[0].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "0" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells yellow"
              style={{ top: "13.32%", left: "46.66%" }}
            >
              {game.players["yellow"].path[1].length > 0
                ? game.players["yellow"].path[1].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "1" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells yellow"
              style={{ top: "19.98%", left: "46.66%" }}
            >
              {game.players["yellow"].path[2].length > 0
                ? game.players["yellow"].path[2].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "2" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells yellow "
              style={{ top: "26.64%", left: "46.66%" }}
            >
              {game.players["yellow"].path[3].length > 0
                ? game.players["yellow"].path[3].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "3" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells yellow "
              style={{ top: "33.3%", left: "46.66%" }}
            >
              {game.players["yellow"].path[4].length > 0
                ? game.players["yellow"].path[4].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "4" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>

            <div
              className="cells bg-white "
              value={game.board[13]}
              style={{ top: 0, left: "53.32%" }}
            >
              {game.board[13].length > 0
                ? game.board[13].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "13"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              id="yellow-start"
              value={game.board[14]}
              className="cells y-start"
              style={{ top: "6.66%", left: "53.32%" }}
            >
              {game.board[14].length > 0
                ? game.board[14].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "14"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[15]}
              className="cells bg-white  "
              style={{ top: "13.32%", left: "53.32%" }}
            >
              {game.board[15].length > 0
                ? game.board[15].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "15"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells bg-white "
              value={game.board[16]}
              style={{ top: "19.98%", left: "53.32%" }}
            >
              {game.board[16].length > 0
                ? game.board[16].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "16"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells bg-white"
              value={game.board[17]}
              style={{ top: "26.64%", left: "53.32%" }}
            >
              {game.board[17].length > 0
                ? game.board[17].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "17"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells bg-white "
              value={game.board[18]}
              style={{ top: "33.3%", left: "53.32%" }}
            >
              {game.board[18].length > 0
                ? game.board[18].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "18"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[19]}
              className="cells bg-white "
              style={{ top: "40%", right: "33.3%" }}
            >
              {game.board[19].length > 0
                ? game.board[19].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "19"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[20]}
              className="cells bg-white"
              style={{ top: "40%", right: "26.64%" }}
            >
              {game.board[20].length > 0
                ? game.board[20].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "20"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[21]}
              className="cells bg-white "
              style={{ top: "40%", right: "19.98%" }}
            >
              {game.board[21].length > 0
                ? game.board[21].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "21"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[22]}
              className="cells  bg-gray-400 "
              style={{ top: "40%", right: "13.32%" }}
            >
              {game.board[22].length > 0
                ? game.board[22].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "22"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[23]}
              className="cells bg-white"
              style={{ top: "40%", right: "6.66%" }}
            >
              {game.board[23].length > 0
                ? game.board[23].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "23"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[24]}
              className="cells bg-white"
              style={{ top: "40%", right: "0" }}
            >
              {game.board[24].length > 0
                ? game.board[24].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "24"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>

            <div
              className="cells blue"
              style={{ top: "46.66%", right: "33.3%" }}
            >
              {game.players["blue"].path[4].length > 0
                ? game.players["blue"].path[4].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "4" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells blue"
              style={{ top: "46.66%", right: "26.64%" }}
            >
              {game.players["blue"].path[3].length > 0
                ? game.players["blue"].path[3].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "3" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells blue"
              style={{ top: "46.66%", right: "19.98%" }}
            >
              {game.players["blue"].path[2].length > 0
                ? game.players["blue"].path[2].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "2" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells blue"
              style={{ top: "46.66%", right: "13.32%" }}
            >
              {game.players["blue"].path[1].length > 0
                ? game.players["blue"].path[1].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "1" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells blue"
              style={{ top: "46.66%", right: "6.66%" }}
            >
              {game.players["blue"].path[0].length > 0
                ? game.players["blue"].path[0].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "0" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells bg-white "
              value={game.board[25]}
              style={{ top: "46.66%", right: 0 }}
            >
              {game.board[25].length > 0
                ? game.board[25].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "25"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>

            <div
              className="cells bg-white  "
              style={{ top: "53.32%", right: "33.3%" }}
              value={game.board[31]}
            >
              {game.board[31].length > 0
                ? game.board[31].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "31"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells bg-white "
              value={game.board[30]}
              style={{ top: "53.32%", right: "26.64%" }}
            >
              {game.board[30].length > 0
                ? game.board[30].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "30"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells bg-white"
              value={game.board[29]}
              style={{ top: "53.32%", right: "19.98%" }}
            >
              {game.board[29].length > 0
                ? game.board[29].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "29"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells bg-white "
              value={game.board[28]}
              style={{ top: "53.32%", right: "13.32%" }}
            >
              {game.board[28].length > 0
                ? game.board[28].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "28"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>

            <div
              id="blue-start"
              className="cells b-start"
              value={game.board[27]}
              style={{ top: "53.32%", right: "6.66%" }}
            >
              {game.board[27].length > 0
                ? game.board[27].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "27"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells bg-white "
              style={{ top: "53.32%", right: "0" }}
              value={game.board[26]}
            >
              {game.board[26].length > 0
                ? game.board[26].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "26"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>

            <div
              className="cells bg-white "
              value={game.board[37]}
              style={{ bottom: 0, left: "53.32%" }}
            >
              {game.board[37].length > 0
                ? game.board[37].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "37"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells bg-white"
              value={game.board[36]}
              style={{ bottom: "6.66%", left: "53.32%" }}
            >
              {game.board[36].length > 0
                ? game.board[36].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "36"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells  bg-gray-400 "
              value={game.board[35]}
              style={{ bottom: "13.32%", left: "53.32%" }}
            >
              {game.board[35].length > 0
                ? game.board[35].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "35"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells bg-white "
              value={game.board[34]}
              style={{ bottom: "19.98%", left: "53.32%" }}
            >
              {game.board[34].length > 0
                ? game.board[34].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "34"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells bg-white"
              value={game.board[33]}
              style={{ bottom: "26.64%", left: "53.32%" }}
            >
              {game.board[33].length > 0
                ? game.board[33].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "33"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells bg-white "
              value={game.board[32]}
              style={{ bottom: "33.3%", left: "53.32%" }}
            >
              {game.board[32].length > 0
                ? game.board[32].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "32"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>

            <div
              value={game.board[38]}
              className="cells bg-white "
              style={{ bottom: 0, left: "46.66%" }}
            >
              {game.board[38].length > 0
                ? game.board[38].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "38"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>

            <div
              className="cells red "
              style={{ bottom: "6.66%", left: "46.66%" }}
            >
              {game.players["red"].path[0].length > 0
                ? game.players["red"].path[0].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "0" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells red"
              style={{ bottom: "13.32%", left: "46.66%" }}
            >
              {game.players["red"].path[1].length > 0
                ? game.players["red"].path[1].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "1" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells red"
              style={{ bottom: "19.98%", left: "46.66%" }}
            >
              {game.players["red"].path[2].length > 0
                ? game.players["red"].path[2].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "2" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells red"
              style={{ bottom: "26.64%", left: "46.66%" }}
            >
              {game.players["red"].path[3].length > 0
                ? game.players["red"].path[3].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "3" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells red"
              style={{ bottom: "33.3%", left: "46.66%" }}
            >
              {game.players["red"].path[4].length > 0
                ? game.players["red"].path[4].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "4" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>

            <div
              value={game.board[39]}
              className="cells bg-white  "
              style={{ bottom: 0, left: "40%" }}
            >
              {game.board[39].length > 0
                ? game.board[39].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "39"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[40]}
              id="red-start"
              className="cells r-start"
              style={{ bottom: "6.66%", left: "40%" }}
            >
              {game.board[40].length > 0
                ? game.board[40].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "40"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[41]}
              className="cells bg-white "
              style={{ bottom: "13.32%", left: "40%" }}
            >
              {game.board[41].length > 0
                ? game.board[41].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "41"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells bg-white"
              value={game.board[42]}
              style={{ bottom: "19.98%", left: "40%" }}
            >
              {game.board[42].length > 0
                ? game.board[42].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "42"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[43]}
              className="cells bg-white"
              style={{ bottom: "26.64%", left: "40%" }}
            >
              {game.board[43].length > 0
                ? game.board[43].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "43"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>

            <div
              value={game.board[44]}
              className="cells bg-white  "
              style={{ bottom: "33.3%", left: "40%" }}
            >
              {game.board[44].length > 0
                ? game.board[44].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "44"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>

            <div
              className="cells bg-white"
              value={game.board[45]}
              style={{ top: "53.32%", left: "33.3%" }}
            >
              {game.board[45].length > 0
                ? game.board[45].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "45"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[46]}
              className="cells bg-white "
              style={{ top: "53.32%", left: "26.64%" }}
            >
              {game.board[46].length > 0
                ? game.board[46].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "46"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[47]}
              className="cells bg-white"
              style={{ top: "53.32%", left: "19.98%" }}
            >
              {game.board[47].length > 0
                ? game.board[47].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "47"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[48]}
              className="cells  bg-gray-400 "
              style={{ top: "53.32%", left: "13.32%" }}
            >
              {game.board[48].length > 0
                ? game.board[48].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "48"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              value={game.board[49]}
              className="cells bg-white "
              style={{ top: "53.32% ", left: "6.66%" }}
            >
              {game.board[49].length > 0
                ? game.board[49].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "49"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>

            <div
              className="cells bg-white  "
              value={game.board[50]}
              style={{ top: "53.32%", left: 0 }}
            >
              {game.board[50].length > 0
                ? game.board[50].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "50"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>

            <div
              className="cells green"
              style={{ top: "46.66%", left: "33.3%" }}
            >
              {game.players["green"].path[4].length > 0
                ? game.players["green"].path[4].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "4" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells green"
              style={{ top: "46.66%", left: "26.64%" }}
            >
              {game.players["green"].path[3].length > 0
                ? game.players["green"].path[3].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "3" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells green"
              style={{ top: "46.66%", left: "19.98%" }}
            >
              {game.players["green"].path[2].length > 0
                ? game.players["green"].path[2].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "2" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells green"
              style={{ top: "46.66%", left: "13.32%" }}
            >
              {game.players["green"].path[1].length > 0
                ? game.players["green"].path[1].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "1" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells green"
              style={{ top: "46.66%", left: "6.66%" }}
            >
              {game.players["green"].path[0].length > 0
                ? game.players["green"].path[0].map((e) => {
                    return (
                      <Button
                        onClick={winningPath}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "0" + "-" + "w"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
            <div
              className="cells bg-white"
              value={game.board[51]}
              style={{ top: "46.66%", left: 0 }}
            >
              {game.board[51].length > 0
                ? game.board[51].map((e) => {
                    return (
                      <Button
                        onClick={MovePiece}
                        key={e.color + "-" + e.number}
                        id={e.color + "-" + e.number + "-" + "51"}
                        className={colorStyle[e.color]}
                      >
                        {e.number}
                      </Button>
                    );
                  })
                : ""}
            </div>
          </Col>
          <div className="flex m-4  justify-center">
            <label className="bg-blue-500 hover:bg-blue-400 text-white font-bold text-3xl py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
              Points
            </label>
          </div>
          <div className="flex m-4   justify-around">
            <Row className="flex flex-col  " >
            <Row className="mb-10 " >
                  {" "}
                  <label className="bg-green-500  text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ">
                    Player 1{" "}
                  </label>
                  <label className="bg-green-500  text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    {game.players.green.points}
                  </label>
                </Row>
                <Row>
                  {" "}
                  <label className="bg-yellow-500  text-white font-bold  py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Player 2{" "}
                  </label>
                  <label className="bg-yellow-500  text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    {game.players.yellow.points}
                  </label>
                </Row>
            </Row>
            <Row className="flex flex-col  justify-between" >
                <Row>
                  {" "}
                  <label className="bg-red-500  text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ">
                    Player 3{" "}
                  </label>
                  <label className="bg-red-500  text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    {game.players.red.points}
                  </label>
                </Row>
                <Row>
                  {" "}
                  <label className="bg-blue-500  text-white font-bold  py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Player 4{" "}
                  </label>
                  <label className="bg-blue-500  text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    {game.players.blue.points}
                  </label>
                </Row>
            </Row>
          </div>
        </Row>
        <Row className=" flex   m-5 justify-center ">
        <label className="font-bold text-xl text-gray-500">Click on the Dice to Play your turn</label>

        </Row>
        <Row className=" flex   m-5 justify-center ">
          <Dice size={60}  onRoll={(value) => Roll(value)} disabled={disabled} />
          {/* <Button
            onClick={() => {
              Roll();
              //   setDisabled(true)
            }}
            disabled={disabled}
            className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center p-10"
          >
            Roll
          </Button>

          <label className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
            {game.dice}
          </label> */}
        </Row>
        <Row className="flex justify-around mt-5">
        <button
            onClick={() => {
              localStorage.clear();
            }}
            class="bg-gray-600 hover:bg-gray-400 text-white hover:text-black  font-semibold py-2 px-4 border  rounded shadow"          >
            Clear data
          </button>
          <button
            onClick={() => {
              Save();
            }}
            class="bg-green-800 hover:bg-green-500 text-white hover:text-black  font-semibold py-2 px-4 border  rounded shadow"          >
            Save Game
          </button>

          <button
            onClick={() => {
              reset();
            }}
            class="bg-red-500 hover:bg-gray-100 text-white hover:text-black font-semibold py-2 px-4 border rounded shadow"          >
            Reset
          </button>
        </Row>
        <Row className="flex justify-center m-5">
          {game.queue[0] == "green" ? (
            <Button className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-500 sm:mx-0 sm:h-10 sm:w-10"></Button>
          ) : game.queue[0] == "yellow" ? (
            <Button className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-500 sm:mx-0 sm:h-10 sm:w-10"></Button>
          ) : game.queue[0] == "red" ? (
            <Button className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-500 sm:mx-0 sm:h-10 sm:w-10"></Button>
          ) : (
            <Button className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 sm:mx-0 sm:h-10 sm:w-10"></Button>
          )}
        </Row>
      </div>
      <div className="flex flex-row justify-center mb-5">
        {/* <CountdownCircleTimer
          onComplete={() => {
            ChangeQueue();
            return [true, 100];
          }}
          size={100}
          isPlaying={showTimer}
          duration={5}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        /> */}
        <Button
            onClick={() => {
             ChangeQueue()
            }}
            className=" bg-red-500 hover:bg-green-400 text-white hover:text-black font-bold py-2 px-4 rounded inline-flex items-center p-10"
          >
            Pass
          </Button>      </div>

      <Transition.Root
        show={showWinner}
        as={Fragment}
        className="m-4 flex justify-center"
      >
        <Dialog
          className="flex justify-center  z-10 inset-0 overflow-y-auto"
          onClose={() => {
            setshowWinner(false);
          }}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    { game.players.green.points==4 ? (
                      <label className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-500 sm:mx-0 sm:h-10 sm:w-10"></label>
                    ) :game.players.yellow.points==4 ? (
                      <label className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-500 sm:mx-0 sm:h-10 sm:w-10"></label>
                    ) : game.players.red.points==4 ? (
                      <label className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-500 sm:mx-0 sm:h-10 sm:w-10"></label>
                    ) : (
                      <label className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 sm:mx-0 sm:h-10 sm:w-10"></label>
                    )}
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Player has won.
                          
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setshowWinner(false)}
                  >
                    Okay
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={show} as={Fragment} >
        <Dialog
          className="fixed  inset-10  flex flex-auto flex-row justify-center"
          onClose={() => {
            setshow(false);
          }}
        >
          <Button className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Button className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <Button className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <Button className="sm:flex sm:items-start">
                    {game.queue[0] == "green" ? (
                      <Button className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-500 sm:mx-0 sm:h-10 sm:w-10"></Button>
                    ) : game.queue[0] == "yellow" ? (
                      <Button className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-500 sm:mx-0 sm:h-10 sm:w-10"></Button>
                    ) : game.queue[0] == "red" ? (
                      <Button className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-500 sm:mx-0 sm:h-10 sm:w-10"></Button>
                    ) : (
                      <Button className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 sm:mx-0 sm:h-10 sm:w-10"></Button>
                    )}
                    <Button className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Roll Again
                      </Dialog.Title>
                      <Button className="mt-2">
                        <p className="text-sm text-gray-500">
                          You have Rolled a 6.
                        </p>
                      </Button>
                    </Button>
                  </Button>
                </Button>
                <Button className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                          setGame((prevstate) => ({
      ...prevstate,
      dice: 0,
      prevroll: 0,
    }));
    setshow(false)
                    }}
                  >
                    Okay
                  </button>
                </Button>
              </Button>
            </Transition.Child>
          </Button>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={show1} as={Fragment}>
        <Dialog
          as="Button"
          className="fixed  inset-10   flex-auto flex-row justify-center"
          onClose={() => {
            setshow1(false);
          }}
        >
          <Button className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900 mb-5 flex flex-row justify-center"
                      >
                        Player
                      </Dialog.Title>
                      <div className='flex-1 justify-evenly' >
                      
                            <button
                              id='2'
                              type="button"
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
                              onClick={() => {
                                  PlayerCount(2)
                                  setshow1(false);

                              }}
                            >
                              2
                            </button>
                            <button
                              id='3'
                              type="button"
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
                              onClick={() => {
                                  PlayerCount(3)
                                  setshow1(false);

                              }}
                            >
                              3
                            </button>
                            <button
                              id='4'
                              type="button"
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
                              onClick={() => {
                                setshow1(false);
                              }}
                            >
                              4
                            </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </Button>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={showDialog} as={Fragment}>
        <Dialog
          as="Button"
          className="fixed  inset-10   flex-auto flex-row justify-center"
          onClose={() => {
            setshowDialog(false);
          }}
        >
          <Button className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Load Game
                      </Dialog.Title>
                      <div>
                        {gamedata.length > 0 ? (
                          gamedata.map((e) => (
                            <button
                              id={e.id}
                              type="button"
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
                              onClick={() => {
                                setGame(e.game);
                                setshowDialog(false);
                              }}
                            >
                              {"id " + e.id}
                            </button>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </Button>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
export default Game;
