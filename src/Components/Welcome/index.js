import React from 'react';
import './index.css'
import Game from '../Game';
import colors from '../Colors/index.js';
import ilya from '../../img/ilya.svg';
import opex from '../../img/opex.svg';
import immo from '../../img/immo.svg';
import welcomeSong from '../../audio/welcomeSong.mp3';
import fb from '../../img/fb.svg';
import git from '../../img/git.svg';
import inst from '../../img/inst.svg';


class Welcome extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            submitted: false,
            colors:'white',
            playerName:'',
            heroId:0
        }

        this.welcomeSong = new Audio(welcomeSong);

        this.heroClass = document.getElementsByClassName('hero');
    }

    colorChange = () => {
        this.setState({colors:colors[Math.round(Math.random()*11)]})
    }

    onSubmit = (e) =>{
        e.preventDefault();
        this.setState({submitted:!this.state.submitted});

        if(this.nameInput.value == ''){
            this.setState({playerName:'player'})
        }else{
            this.setState({playerName:this.nameInput.value})
        }
    }
    
    changeBackground = () => {
        this.nameInput.style.background = 'white';
    }

    hideHeroes = () => {
        for (let i = 0; i < this.heroClass.length; i++) {
            this.heroClass[i].classList.remove('heroChosen')
        }
    }

    heroChosen = (i) => {
        this.hideHeroes();
        this.heroClass[i].classList.add('heroChosen');
        this.setState({heroId:i})
    }

    onHeroClick = (event) => {
        var target = event.target;
        for (let i = 0; i < this.heroClass.length; i++) {
            if(target == this.heroClass[i]){
                this.heroChosen(i);
            }
        }
    }

    playSong = () => {
        this.state.submitted ? this.welcomeSong.pause() : this.welcomeSong.play();
    }

    componentDidMount(){
        this.colorChangee = setInterval(()=>{this.colorChange()},100);
    }

    componentWillUnmount(){
        clearInterval(this.colorChangee)
    }

    render(){
        this.playSong();
        return(
            <div>
                {
                this.state.submitted ?
                <Game 
                    heroId={this.state.heroId} 
                    colors={this.state.colors} 
                    playerName={this.state.playerName} 
                    ilya={ilya}
                    opex={opex}
                    immo={immo}
                /> : 
                (<div className="welcome">
                    <form className="coub" action="" onSubmit={this.onSubmit}>
                        <div className="welcomeLogo" style={{color:this.state.colors}}>Flappy Nerd</div>
                        <div className="yourName" >
                            <span>Your name:</span>
                            <input id="nameInput" ref={ref=>this.nameInput=ref} onClick={this.changeBackground}/>
                        </div>
                        <div className="chooseHero">
                            <span>Choose hero:</span>
                            <div className="heroes" onClick={this.onHeroClick}>
                                <div className="hero nerd">
                                    <img src={ilya}/>
                                </div>
                                <div className="hero opex">
                                    <img src={opex}/>
                                </div>
                                <div className="hero immo">
                                    <img src={immo}/>
                                </div>
                            </div>
                        </div>
                        <button type="submit" id='gameStart'>Start</button>
                        <div className="authorSign">
                            <span>Made by Ilya Agarishev</span>
                            <a href="https://github.com/IlyaAgarishev" rel="noopener noreferrer" target='_blank'>
                                <img src={git}/>
                            </a>
                            <a href="https://www.instagram.com/ilyagarishev/" rel="noopener noreferrer" target='_blank'>
                                <img src={inst}/>
                            </a>
                            <a href="https://www.facebook.com/ilya.agarishev" rel="noopener noreferrer" target='_blank'>
                                <img src={fb}/>
                            </a>
                        </div>
                    </form>
                </div>)
                }
            </div>
        );
    }
}


export default Welcome; 

