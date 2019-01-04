import React from 'react'; 
import Square from './Square';
import Piece from './Piece';
import Rook from '../controllers/pieces/rook';
import King from '../controllers/pieces/king';
import Bishop from '../controllers/pieces/bishop';
import Knight from '../controllers/pieces/knight';
import Queen from '../controllers/pieces/queen';
import Pawn from '../controllers/pieces/pawn';
import PendingMove from './PendingMove';

class Board extends React.Component {
    constructor() {
        super(); 
        this.state = {
            piecesObject : {
                a2 : new Rook('a2', 'white'),
                e1 : new King('e1', 'white'),
                e7 : new Bishop('e7', 'white'),
                d4 : new Knight('d4', 'white'),
                f4 : new Rook('f4', 'black'),
                c3 : new Queen('c3', 'white'),
                h2 : new Pawn('h2', 'white'),
                g7 : new Pawn('g7', 'black'),
                f2 : new Rook('f2', 'black'),
            },
            pendingMovesArr : [],
            pendingMovesShowing : false,
            history : [],
            turn: 'white',
        };
        this.addToPendingPieces = this.addToPendingPieces.bind(this);
        this.updatePiecesObject = this.updatePiecesObject.bind(this);
        this.addHistory = this.addHistory.bind(this);
    }

    componentDidMount () {
        for (let key in this.state.piecesObject) {
            this.state.piecesObject[key].setInitialMoves(this.state.piecesObject)
        }
        for (let key in this.state.piecesObject) {
            this.state.piecesObject[key].setPossibleMoves(this.state.piecesObject)
        }
    }

    componentDidUpdate () {
        for (let key in this.state.piecesObject) {
            this.state.piecesObject[key].setInitialMoves(this.state.piecesObject)
        }
        for (let key in this.state.piecesObject) {
            this.state.piecesObject[key].setPossibleMoves(this.state.piecesObject)
        }
    }

    
    updatePiecesObject(origin, target, color, piece){
        let newPiecesObject = {};

        //old ones, minus the origin
        for (let piece in this.state.piecesObject) {
            if (piece !== origin) {
                let newPiece;
                switch(this.state.piecesObject[piece].piece) {
                    case 'knight' : {
                        newPiece = new Knight(this.state.piecesObject[piece].coordinates, this.state.piecesObject[piece].color)
                        break;
                    }
                    case 'rook' : {
                        newPiece = new Rook(this.state.piecesObject[piece].coordinates, this.state.piecesObject[piece].color)
                        break;
                    }
                    case 'bishop' : {
                        newPiece = new Bishop(this.state.piecesObject[piece].coordinates, this.state.piecesObject[piece].color)
                        break;
                    }
                    case 'queen' : {
                        newPiece = new Queen(this.state.piecesObject[piece].coordinates, this.state.piecesObject[piece].color)
                        break;
                    }
                    case 'king' : {
                        newPiece = new King(this.state.piecesObject[piece].coordinates, this.state.piecesObject[piece].color)
                        break;
                    }
                    case 'pawn' : {
                        newPiece = new Pawn(this.state.piecesObject[piece].coordinates, this.state.piecesObject[piece].color)
                        break;
                    }
                } 
                newPiecesObject[piece] = newPiece;
            }
        }
        //new one, switch to target
        let newPiece;
        switch(piece) {
            case 'knight' : {
                newPiece = new Knight(target, color)
                break;
            }
            case 'rook' : {
                newPiece = new Rook(target, color)
                break;
            }
            case 'bishop' : {
                newPiece = new Bishop(target, color)
                break;
            }
            case 'queen' : {
                newPiece = new Queen(target, color)
                break;
            }
            case 'king' : {
                newPiece = new King(target, color)
                break;
            }
            case 'pawn' : {
                newPiece = new Pawn(target, color)
                break;
            }
        } 
        newPiecesObject[target] = newPiece

        console.log(newPiecesObject);
        this.setState({
            piecesObject : newPiecesObject,
            pendingMovesShowing: false,
            turn: this.state.turn === 'black' ? 'white': 'black'
        })
    }

    //takes two parameters from handleClickPiece in Pieces component
    addToPendingPieces (coordinateArr, originCoordinates, color, piece) {
        if (this.state.turn !== color) {
            return;
        } else {
        let pendingMovesArr = coordinateArr.map(coordinate => {
            return {
                origin : originCoordinates,
                target : coordinate,
                color,
                piece,
            }
        });
        this.setState({
            //overwriting the states pendingMovesArr after clickHandling
            pendingMovesArr : pendingMovesArr,
            pendingMovesShowing: !this.state.pendingMovesShowing,
        });
    }
} 

    addHistory (move) {
        let historyCopy = this.state.history.slice();
        historyCopy.push(move);

        this.setState({
            history : historyCopy
        })
    }
    
    render() {
        // console.log(this.state.piecesObject);
        let squares = [];
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if (i % 2 === 0 && j % 2 === 0) {
                    squares.push(<Square key={'square'+i+j} color={'gray'}/>)
                } 
                else if (i % 2 === 0 && j % 2 === 1) {
                    squares.push(<Square key={'square'+i+j} color={'green'}/>)
                }
                else if (i % 2 === 1 && j % 2 === 0) {
                    squares.push(<Square key={'square'+i+j} color={'green'}/>)
                }
                else if (i % 2 === 1 && j % 2 === 1) {
                    squares.push(<Square key={'square'+i+j} color={'gray'}/>)
                }
            }
        }

        //grab all keys from piecesObj and forEach key push into pieces array
        let pieces = [];
        Object.keys(this.state.piecesObject).forEach((key, index) => {
            pieces.push(
                <Piece 
                    key={'piece'+index} 
                    pieceObj={this.state.piecesObject[key]}
                    piecesObj={this.state.piecesObject}
                    addToPendingPieces = {this.addToPendingPieces}
                />
            )
        });
        
        //map through pendingMovesArr where each move returns a pendingMove component.
        let pendingMoves = this.state.pendingMovesArr.map((pendingMove,i) => {
            return <PendingMove 
            updatePiecesObject = {this.updatePiecesObject}
            pieceObj={
                {
                    target : pendingMove.target,
                    origin : pendingMove.origin,
                    color : pendingMove.color,
                    piece : pendingMove.piece,
                }
            } 
            key={'pendingmove' + i} ></PendingMove>
        })

        return (
            <div id='board'>
                {squares}
                {pieces}
                
                {(this.state.pendingMovesShowing === true) ? 
                pendingMoves : null
                }
            </div>
        )  
    }

}

export default Board;