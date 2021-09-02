// NOTE:
// This is all temporary backup and is not the final project, 
// since i have study to complete i spend too much time on windows computer on which i can`t continue my tcg-term game, i'll be working on this instead.

let player; 
let img;
let pokemons = [];
let bushes = [];
let name;
var pokemon_names=new Array("Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew");
let pokemon_count = 50;
let grid_size  = 25;



let play_btn;

function setup() {
  createCanvas(900, 600);
  
  // Create Player object as player
  player = new Player(grid_size);
  
  for(let i=0; i < pokemon_count; i++){
    name = pokemon_names[round(random(pokemon_names.length))];
    pokemons[i] = new Pokemon(grid_size,name);
    bushes[i] = new Bushe(pokemons[i].x,pokemons[i].y);
  }
  
  let pokemon_index = round(random(pokemon_count))
  append(player.pokemons,pokemons[pokemon_index])
  
  print(player.pokemons[0].name+' I choose you!')
}

function draw() {
  
  if(player.room == 1){
    // In game (forest)
    background(10,100,30);
    //Bushes
    for(let i =0; i<bushes.length; i++){
      bushes[i].display();
    }
    for(let i =0; i<pokemons.length; i++){
      pokemons[i].display();
      
      //Encounter
      if (player.x == pokemons[i].x && player.y == pokemons[i].y) {
        player.x+=grid_size;
        print('A wild '+pokemons[i].name+' apeared!')
        encounter = pokemons[i];
        pokemons.splice(i, 1);
        //player.room = 'Battle'
      }
    }
    player.display();
  }
  
  if(player.room == 2){
    // In game (village)
    background(100,90,80);
  }
  
  if(player.room == 3){
    // Main Menu
    background(100,90,80);
  }
  
  if(player.room == 'Battle'){
    // Battle
  }
  
}

// Classes

class Field {
  constructor() {
    this.active = None;
  }
}

class Player {
  constructor(size) {
    this.room = 1;
    this.pokemons = [];
    this.x = 0;
    this.y = 0;
    this.size = size;
  }
  
  display(){
    fill(255)
    ellipse(this.x,this.y,this.size)
  }
}

class Pokemon {
  constructor(grid_size,name) {
    this.name = name;
    this.x = grid_size*round(random(width/grid_size));
    this.y = grid_size*round(random(height/grid_size));
    this.size = 10;
  }
  
  display(){
    //Debug
    fill(255,0,0)
    ellipse(this.x,this.y,this.size)
    fill(255)
    ellipse(this.x,this.y,this.size/2)
  }
}

class Bushe {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.size = 10
  }
  
  display(){
    // Bushes
    for(let i=0; i < 10; i++){
      fill(0,60,25,50)
      noStroke()
      ellipse(this.x+cos(i+this.x)*grid_size*1.2,this.y+tan(i+this.y)*grid_size*1.2,this.size*3)
      ellipse(this.x+cos(i+this.x+1)*grid_size*1.2,this.y+tan(i+this.y+1)*grid_size*1.2,this.size*2)
      ellipse(this.x+cos(i+this.x-1)*grid_size*1.2,this.y+tan(i+this.y-1)*grid_size*1.2,this.size*2)
      ellipse(this.x+tan(i+this.x-1)*grid_size*1.2,this.y+sin(i+this.y+1)*grid_size*1.2,this.size*2)
      ellipse(this.x+sin(i+this.x+1)*grid_size*1.2,this.y+cos(i+this.y-1)*grid_size*1.2,this.size*2)
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.x-=player.size;
  } else if (keyCode === RIGHT_ARROW) {
    player.x+=player.size;
  }
  if (keyCode === UP_ARROW) {
    player.y-=player.size;
  } else if (keyCode === DOWN_ARROW) {
    player.y+=player.size;
  }
  // Boundery
  if (player.x>width) {
    player.x=0;
  }
  if (player.x<0) {
    player.x=width;
  }
  if (player.y>height) {
    player.y=0;
  }
  if (player.y<0) {
    player.y=height;
  }
}
