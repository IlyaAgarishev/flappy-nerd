import React from 'react';
import './index.css';
import bg from '../../img/bg.png';
import pipeUp from '../../img/pipeUp.png';
import pipeDown from '../../img/pipeDown.png';
import song from '../../audio/raceSong.mp3';
import scoreAudio from '../../audio/score.mp3';

class Game extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            nerdX:100, 
            nerdY:150, 
            pipe:[{x:1536, y:0}], 
            score:0
        }

        this.song = new Audio(song)
        this.scoreAudio = new Audio(scoreAudio);
    }
    
    draw = () => {
        const ctx = this.canvas.getContext('2d');

        const canvas = this.canvas;
        const nerd = this.nerd;
        const bg = this.bg;
        const pipeUp = this.pipeUp;
        const pipeDown = this.pipeDown;

        const gravitation = 3;
        const gap = 300;

        const nerdX = this.state.nerdX;
        const nerdY = this.state.nerdY;

    
        ctx.drawImage(bg,0,0);
        
        for (let i = 0; i < this.state.pipe.length; i++) {

            ctx.drawImage(pipeUp, this.state.pipe[i].x, this.state.pipe[i].y);
            ctx.drawImage(pipeDown, this.state.pipe[i].x, this.state.pipe[i].y + pipeUp.height + gap);

            if(this.state.pipe[i].x == 900){
                this.setState({pipe:this.state.pipe.concat({
                    x: this.canvas.width,
                    y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
                })})
            }

            
            if(this.state.pipe[i].x == nerdX - this.nerd.width){
                this.setState({score:this.state.score+1})
                this.scoreAudio.play();
            }

            const nerdTouchedPipeSide = nerdX + nerd.width >= this.state.pipe[i].x && nerdX <= this.state.pipe[i].x + pipeUp.width;
            const nerdTouchedPipeUpBottom = nerdY <= this.state.pipe[i].y + pipeUp.height;
            const nerdTouchedPipeDownBottom = nerdY + nerd.height >= this.state.pipe[i].y + pipeUp.height + gap;
            const nerdTouchedPipeBottoms = nerdTouchedPipeUpBottom || nerdTouchedPipeDownBottom;
            const nerdTouchedCanvasBottom = nerdY + nerd.height >= canvas.height;

            if(nerdTouchedPipeSide && nerdTouchedPipeBottoms || nerdTouchedCanvasBottom){
                this.redSreen.style.display = 'block';
                setTimeout(()=>{this.redSreen.style.display = 'none'},200);
                this.setState({nerdX:100,nerdY:150,pipe:[{x:1536, y:0}],score:0});
            }     


        }

        ctx.drawImage(nerd,this.state.nerdX,this.state.nerdY);

        this.setState({pipe:this.state.pipe.map((object)=>({
            x:object.x - 4,
            y:object.y
        }))});       
    

        this.setState({nerdY: this.state.nerdY + gravitation});
    }

    moveUp = () => {
        this.setState({nerdY: this.state.nerdY - 100});
    }

    heroSrc = () => {
        let heroId = this.props.heroId;
        let ilya = this.props.ilya;
        let opex = this.props.opex;
        let immo = this.props.immo; 

        if(heroId == 0){
            return ilya;
        }else if(heroId == 1){
            return opex;
        }else if(heroId == 2){
            return immo;
        };
    }

    componentDidMount(){
       this.drawing = setInterval(()=>{this.draw()},10);
       document.addEventListener("keydown", this.moveUp);
    }

    componentWillUnmount(){
        clearInterval(this.drawing);
    }

    render(){
        this.song.play();
        let colors = this.props.colors;
        let playerName = this.props.playerName;
        return(
            <div>
                <canvas id='canvas' ref={ref=>this.canvas=ref} width={1536} height={800}/>
                <img src={this.heroSrc()} ref={ref=>this.nerd=ref} className='hidden'/>
                <img src={bg} ref={ref=>this.bg=ref} className='hidden' />
                <img src={pipeUp} ref={ref=>this.pipeUp=ref} className='hidden'/>
                <img src={pipeDown} ref={ref=>this.pipeDown=ref} className='hidden'/>
                <div className="playerName" style={{color:colors}}>{playerName}</div>
                <div className="score" style={{color:colors}}>Score: {this.state.score} </div>
                <div className="redScreen" ref={ref=>this.redSreen=ref} ></div>
            </div>
        )
    }
}


export default Game;