import { Col, Row, Button, Modal } from "react-bootstrap";
import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Game = () => {
  const [show, setshow] = useState(false);
  const [showTimer, setShowtimer] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const colorStyle = {
    green: "border-white	 rounded-full  mr-1  text-white bg-green-700",
    red: " border-white	 rounded-full p-1 mr-1   text-white bg-red-700",
    yellow: "border-white	rounded-full p-1 mr-1  bg-yellow-500 text-white ",
    blue: "border-white	 rounded-full p-1 mr-1   bg-blue-500 text-white ",
  };
  const [game, setGame] = useState({
    dice: 5,
    players: {
      green: {
        house: [1, 2, 3, 4],
        safe: 22,
        zone: [[], [], [], [], []],
        start: 1,
        out: [],
        path: [[{ color: "green", number: 1 }], [], [], [], []],
        points:0
      },
      yellow: {
        house: [1, 2, 3, 4],
        safe: 48,
        zone: [[], [], [], [], []],
        start: 13,
        out: [],
        path: [[], [], [], [], []],
        points:0

      },
      red: {
        house: [1, 2, 3, 4],
        safe: 35,
        zone: [[], [], [], [], []],
        start: 39,
        out: [],
        path: [[], [], [], [], []],
        points:0

      },
      blue: {
        house: [1, 2, 3, 4],
        safe: 9,
        zone: [[], [], [], [], []],
        start: 26,
        out: [],
        points:0,

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
    ],
    queue: ["green", "yellow", "red", "blue"],
  });
  useEffect(() => {}, []);
  const MoveFromHouse = (e) => {
    let pawn = e.target.id;
    pawn = pawn.split("-");
    if (pawn[0] == game.queue[0] && game.dice == 6) {
      let main = game.queue;
      let data = game.players;

      if (game.board[data[pawn[0]].start].length > 0) {
        game.board[data[pawn[0]].start].map((e) => {
          if (e.color != pawn[0]) {
            let board = game.board;

            let player = game.players;
            player[e.color].house.push(parseInt(e.number));
            board[data[pawn[0]].start].splice(
              board[data[pawn[0]].start].indexOf(e),
              1
            );
            setGame((prev) => ({
              ...prev,
              board: board,
              players: player,
            }));
          }
        });
      }
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
      ChangeQueue();
    }
  };
  const winningPath = (e) => {
    let pawn = e.target.id;
    pawn = pawn.split("-");
    console.log('in',game,pawn,e.target.id)
    if (game.dice>0)
  {  
    if(pawn[2]=='null'){
      let players=game.players
      let board=game.board
      board[players[pawn[0]].start].splice(board[players[pawn[0]].start].indexOf({color:pawn[0],number:pawn[1]}))
      players[pawn[0]].path[0].push({color:pawn[0],number:pawn[1]})
      let d=game.dice-1
      game.dice=d
      game.board=board
      game.players=players
      setGame(game)
      console.log(game)
      pawn=[pawn[0],pawn[1],'0','w']
    }
  if(game.dice>0)
  {  console.log(game,'-------------')
      let players=game.players
      let data = game.players[pawn[0]];
      let current_pos=parseInt(pawn[1])-1
      let left=data.path.length-current_pos+1
      console.log(pawn,'----------pawn----',left,data.path.length,current_pos,game)

      if (game.dice<=left){ 
        let j=1
        for (let i = 1; i <=game.dice; i++) {
          let way=game.players
          
            way[pawn[0]].path[current_pos].splice(way[pawn[0]].path[current_pos].indexOf(e),1)
 
  
          if(data.path.length==game.dice){
            way[pawn[0]].points+=1
            setGame((prev)=>({
              ...prev,
              players:way
            }))
            return 0
          }
          else{
            
            way[pawn[0]].path[current_pos+j].push({color:pawn[0],number:pawn[1]})

          }
          game.players=way
          setGame(game)
          current_pos+=j
          console.log(game,'chnage')
        }
      }
      else{
        console.log('Move not possible')
      }}
    }
      ChangeQueue()

console.log('in')
  };
  const ChangeQueue = () => {
    let main = game.queue;
    if (game.dice == 6) {
      setGame((prevstate) => ({
        ...prevstate,
        dice: 0,
      }));
      setshow(true);
    } else {
      console.log('QueueChange')
      let q = main[0];

      main.shift();

      main.push(q);

      setGame((prev) => ({
        ...prev,
        queue: main,
      }));
      setShowtimer(false);
    }

    setDisabled(false)
    return true;
  };
  const MovePiece = (e) => {
    console.log('Move')
    let pawn = e.target.id;
    pawn = pawn.split("-");
    let board = game.board[parseInt(pawn[2])];
    let flag = 0;
    if (pawn[0] == game.queue[0]  ) {
      let current_pos = parseInt(pawn[2]);
      let j = 1;
      for (let i = 1; i <= game.dice; i++) {
        let board = game.board;


        console.log(board, current_pos, pawn[2],'-----------------------');
        let data = game.players;
        console.log(current_pos, "fff", j, board.length);
        if (current_pos == 51) {
          current_pos = 0;
        }
        if (game.board[current_pos + j].length > 0) {
          // eslint-disable-next-line no-loop-func
          game.board[current_pos + j].map((e) => {
            if (e.color != pawn[0]) {
              let player = game.players;
              let safe=game.players[e.color].safe
              let pos=current_pos+j
              if(pos!=safe){              
                player[e.color].house.push(parseInt(e.number));
              board[data[pawn[0]].start].splice(
                board[data[pawn[0]].start].indexOf(e),
                1
              );
              setGame((prev) => ({
                ...prev,
                board: board,
                players: player,
              }));}
            }
          });
  
        board = game.board;
        current_pos != 0
          ? board[current_pos].splice(
              board[current_pos].indexOf({ color: pawn[0], number: pawn[1] }),
              1
            )
          : board[51].splice(
              board[51].indexOf({ color: pawn[0], number: pawn[1] }),
              1
            );
        board[current_pos + j].push({ color: pawn[0], number: pawn[1] });
        current_pos += j;
        if (current_pos == game.players[pawn[0]].start) {
            board = game.board;
            current_pos != 0
              ? board[current_pos].splice(
                  board[current_pos].indexOf({ color: pawn[0], number: pawn[1] }),
                  1
                )
              : board[51].splice(
                  board[51].indexOf({ color: pawn[0], number: pawn[1] }),
                  1
                );
                let d=game.dice-i
                  console.log(d,i,game.dice)
                  game.board=board
                  game.dice=d
                  setGame(game);
                console.log(game,'before call')
            e.target.id=pawn[0]+'-'+pawn[1]+"-"+'null'+'-'+'w'
            return winningPath(e);
                }
      }        
      setGame((prev) => ({
          ...prev,
          board: board,
        }));
      }
      console.log('queueChange')
      ChangeQueue();
    }
  };
  const Roll = (e) => {
    let roll = Math.floor(Math.random() * 6) + 1;
    setGame((prev) => ({
      ...prev,
      dice: roll,
    }));
    setTimer(10);
    setShowtimer(true);
    setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
  };
  return (
    <>
      <div className="flex-1" style={{ flex: 1, flexDirection: "column" }}>
        <Col className="game">
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
            ''
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
          <Button className="cells" style={{ top: "40%" }}>
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
          </Button>
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
            className="cells"
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
            className="cells "
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
            className="cells "
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
            className="cells  "
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
            value={game.board[6]}
            className="cells   "
            style={{ top: 0, left: "40%" }}
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
            value={game.board[10]}
            className="cells "
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
            className="cells b-start safe "
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
            className="cells"
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
            className="cells "
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
            className="cells  "
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
            className="cells"
            value={game.board[11]}
            style={{ top: 0, left: "46.66%" }}
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
            className="cells yellow "
            style={{ top: "6.66%", left: "46.66%" }}
          >
                 {game.players['yellow'].path[0].length > 0
              ? game.players['yellow'].path[0].map((e) => {
                  return (
                    <Button
                      onClick={winningPath}
                      key={e.color + "-" + e.number}
                      id={e.color + "-" + e.number + "-" + "0" +'-'+"w"}
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
             {game.players['yellow'].path[1].length > 0
              ? game.players['yellow'].path[1].map((e) => {
                  return (
                    <Button
                      onClick={MovePiece}
                      key={e.color + "-" + e.number}
                      id={e.color + "-" + e.number + "-" + "1" +'-'+"w"}
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
          {game.players['yellow'].path[2].length > 0
              ? game.players['yellow'].path[2].map((e) => {
                  return (
                    <Button
                      onClick={winningPath}
                      key={e.color + "-" + e.number}
                      id={e.color + "-" + e.number + "-" + "2" +'-'+"w"}
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
          {game.players['yellow'].path[3].length > 0
              ? game.players['yellow'].path[3].map((e) => {
                  return (
                    <Button
                      onClick={winningPath}
                      key={e.color + "-" + e.number}
                      id={e.color + "-" + e.number + "-" + "3" +'-'+"w"}
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
          {game.players['yellow'].path[4].length > 0
              ? game.players['yellow'].path[4].map((e) => {
                  return (
                    <Button
                      onClick={winningPath}
                      key={e.color + "-" + e.number}
                      id={e.color + "-" + e.number + "-" + "4" +'-'+"w"}
                      className={colorStyle[e.color]}
                    >
                      {e.number}
                    </Button>
                  );
                })
              : ""}
          </div>

          <div
            className="cells "
            value={game.board[12]}
            style={{ top: 0, left: "53.32%" }}
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
            id="yellow-start"
            value={game.board[13]}
            className="cells y-start"
            style={{ top: "6.66%", left: "53.32%" }}
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
            value={game.board[14]}
            className="cells  "
            style={{ top: "13.32%", left: "53.32%" }}
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
            className="cells "
            value={game.board[15]}
            style={{ top: "19.98%", left: "53.32%" }}
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
            className="cells"
            value={game.board[16]}
            style={{ top: "26.64%", left: "53.32%" }}
          >
            {game.board[16].length > 0
              ? game.board[16].map((e) => {
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
            className="cells "
            value={game.board[17]}
            style={{ top: "33.3%", left: "53.32%" }}
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
            value={game.board[18]}
            className="cells "
            style={{ top: "40%", right: "33.3%" }}
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
            className="cells"
            style={{ top: "40%", right: "26.64%" }}
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
            className="cells "
            style={{ top: "40%", right: "19.98%" }}
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
            className="cells g-start safe"
            style={{ top: "40%", right: "13.32%" }}
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
            className="cells"
            style={{ top: "40%", right: "6.66%" }}
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
            className="cells"
            style={{ top: "40%", right: "0" }}
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

          <div className="cells blue" style={{ top: "46.66%", right: "33.3%" }}>
          {game.players['blue'].path[4].length > 0
              ? game.players['blue'].path[4].map((e) => {
                  return (
                    <Button
                      onClick={winningPath}
                      key={e.color + "-" + e.number}
                      id={e.color + "-" + e.number + "-" + "4" +'-'+"w"}
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
          {game.players['blue'].path[3].length > 0
              ? game.players['blue'].path[3].map((e) => {
                  return (
                    <Button
                      onClick={winningPath}
                      key={e.color + "-" + e.number}
                      id={e.color + "-" + e.number + "-" + "3" +'-'+"w"}
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
          {game.players['blue'].path[2].length > 0
              ? game.players['blue'].path[2].map((e) => {
                  return (
                    <Button
                      onClick={winningPath}
                      key={e.color + "-" + e.number}
                      id={e.color + "-" + e.number + "-" + "2" +'-'+"w"}
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
          {game.players['blue'].path[1].length > 0
              ? game.players['blue'].path[1].map((e) => {
                  return (
                    <Button
                      onClick={winningPath}
                      key={e.color + "-" + e.number}
                      id={e.color + "-" + e.number + "-" + "1" +'-'+"w"}
                      className={colorStyle[e.color]}
                    >
                      {e.number}
                    </Button>
                  );
                })
              : ""}
          </div>
          <div className="cells blue" style={{ top: "46.66%", right: "6.66%" }}>
          {game.players['blue'].path[0].length > 0
              ? game.players['blue'].path[0].map((e) => {
                  return (
                    <Button
                      onClick={winningPath}
                      key={e.color + "-" + e.number}
                      id={e.color + "-" + e.number + "-" + "0" +'-'+"w"}
                      className={colorStyle[e.color]}
                    >
                      {e.number}
                    </Button>
                  );
                })
              : ""}
          </div>
          <div
            className="cells "
            value={game.board[24]}
            style={{ top: "46.66%", right: 0 }}
          >
            {game.board[24].length > 0
              ? game.board[24].map((e) => {
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
            className="cells  "
            style={{ top: "53.32%", right: "33.3%" }}
            value={game.board[30]}
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
            className="cells "
            value={game.board[29]}
            style={{ top: "53.32%", right: "26.64%" }}
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
            className="cells"
            value={game.board[28]}
            style={{ top: "53.32%", right: "19.98%" }}
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
            className="cells "
            value={game.board[27]}
            style={{ top: "53.32%", right: "13.32%" }}
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
            id="blue-start"
            className="cells b-start"
            value={game.board[26]}
            style={{ top: "53.32%", right: "6.66%" }}
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
            className="cells "
            style={{ top: "53.32%", right: "0" }}
            value={game.board[25]}
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
            className="cells "
            value={game.board[36]}
            style={{ bottom: 0, left: "53.32%" }}
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
            className="cells"
            value={game.board[35]}
            style={{ bottom: "6.66%", left: "53.32%" }}
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
            className="cells r-start safe"
            value={game.board[34]}
            style={{ bottom: "13.32%", left: "53.32%" }}
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
            className="cells "
            value={game.board[33]}
            style={{ bottom: "19.98%", left: "53.32%" }}
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
            className="cells"
            value={game.board[32]}
            style={{ bottom: "26.64%", left: "53.32%" }}
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
            className="cells "
            value={game.board[31]}
            style={{ bottom: "33.3%", left: "53.32%" }}
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
            value={game.board[37]}
            className="cells "
            style={{ bottom: 0, left: "46.66%" }}
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
            className="cells red "
            style={{ bottom: "6.66%", left: "46.66%" }}
          >
            {game.players['red'].path[0].length > 0
              ? game.players['red'].path[0].map((e) => {
                  return (
                    <Button
                      onClick={winningPath}
                      key={e.color + "-" + e.number}
                      id={e.color + "-" + e.number + "-" + "0" +'-'+"w"}
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
            {game.players['red'].path[1].length > 0
              ? game.players['red'].path[1].map((e) => {
                  return (
                    <Button
                      onClick={winningPath}
                      key={e.color + "-" + e.number}
                      id={e.color + "-" + e.number + "-" + "1" + "w"}
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
            {game.players['red'].path[2].length > 0
              ? game.players['red'].path[2].map((e) => {
                  return (
                    <Button
                      onClick={winningPath}
                      key={e.color + "-" + e.number}
                      id={e.color + "-" + e.number + "-" + "2" +'-'+"w"}
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
              {game.players['red'].path[3].length > 0
              ? game.players['red'].path[3].map((e) => {
                  return (
                    <Button
                      onClick={winningPath}
                      key={e.color + "-" + e.number}
                      id={e.color + "-" + e.number + "-" + "3" +'-'+"w"}
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
            {game.players['red'].path[4].length > 0
              ? game.players['red'].path[4].map((e) => {
                  return (
                    <Button
                      onClick={winningPath}
                      key={e.color + "-" + e.number}
                      id={e.color + "-" + e.number + "-" + "4"+ '-'+"w"}
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
            className="cells  "
            style={{ bottom: 0, left: "40%" }}
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
            value={game.board[39]}
            id="red-start"
            className="cells r-start"
            style={{ bottom: "6.66%", left: "40%" }}
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
            className="cells "
            style={{ bottom: "13.32%", left: "40%" }}
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
            className="cells"
            value={game.board[41]}
            style={{ bottom: "19.98%", left: "40%" }}
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
            value={game.board[42]}
            className="cells"
            style={{ bottom: "26.64%", left: "40%" }}
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
            className="cells  "
            style={{ bottom: "33.3%", left: "40%" }}
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
            className="cells"
            value={game.board[44]}
            style={{ top: "53.32%", left: "33.3%" }}
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
            value={game.board[45]}
            className="cells "
            style={{ top: "53.32%", left: "26.64%" }}
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
            className="cells"
            style={{ top: "53.32%", left: "19.98%" }}
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
            className="cells y-start safe"
            style={{ top: "53.32%", left: "13.32%" }}
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
            className="cells "
            style={{ top: "53.32% ", left: "6.66%" }}
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
            className="cells  "
            value={game.board[49]}
            style={{ top: "53.32%", left: 0 }}
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

          <div className="cells green" style={{ top: "46.66%", left: "33.3%" }}>
            {game.players["green"].path[4].length > 0
              ? game.players["green"].path[4].map((e) => {
                  return (
                    <Button
                      onClick={winningPath}
                      key={e.color + "-" + e.number}
                      id={e.color + "-" + e.number + "-" + "4" +'-'+"w"}
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
                      id={e.color + "-" + e.number + "-" + "3" +'-'+"w"}
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
                      id={e.color + "-" + e.number + "-" + "2" +'-'+"w"}
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
                      id={e.color + "-" + e.number + "-" + "1" +'-'+"w"}
                      className={colorStyle[e.color]}
                    >
                      {e.number}
                    </Button>
                  );
                })
              : ""}
          </div>
          <div className="cells green" style={{ top: "46.66%", left: "6.66%" }}>
            {game.players["green"].path[0].length > 0
              ? game.players["green"].path[0].map((e) => {
                  return (
                    <Button
                      onClick={winningPath}
                      key={e.color + "-" + e.number}
                      id={e.color + "-" + e.number + "-" + "0" +'-'+"w"}
                      className={colorStyle[e.color]}
                    >
                      {e.number}
                    </Button>
                  );
                })
              : ""}
          </div>
          <div
            className="cells"
            value={game.board[50]}
            style={{ top: "46.66%", left: 0 }}
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
        </Col>
        <Row className="justify-center">
          <Button
            onClick={() => {
              Roll();
              //   setDisabled(true)
            }}
            disabled={disabled}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            Roll
          </Button>
          <label className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
            {game.dice}
          </label>
        </Row>
        <Row>
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
      <div>
        {/* <CountdownCircleTimer
          onComplete={()=>{
            ChangeQueue()
            return [true,100]
          }}
          size={100}
          isPlaying={showTimer}
          duration={10}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        /> */}
       
      </div>
      <Transition.Root show={show} as={Fragment}>
        <Dialog
          as="Button"
          className="fixed z-10 inset-0 overflow-y-auto"
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
                    onClick={() => setshow(false)}
                  >
                    Okay
                  </button>
                </Button>
              </Button>
            </Transition.Child>
          </Button>
        </Dialog>
      </Transition.Root>
    </>
  );
};
export default Game;
