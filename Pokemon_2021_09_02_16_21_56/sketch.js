let player; 
let encounter;
let img;
let pokemons = [];
let bushes = [];
let name;
var pokemon_names=new Array("Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew");
// https://bulbapedia.bulbagarden.net/wiki/List_of_moves
var skills_names=new Array("Kick","Punch","Throw","Pound","Slap","Scratch","Cut","Slam","Stomp","Headbutt","Tackle");
var types_names = new Array("Normal", "Fire", "Water", "Grass", "Flying", "Fighting", "Poison", "Electric", "Ground", "Rock", "Psychic", "Ice", "Bug", "Ghost", "Steel", "Dragon", "Dark", "Fairy")
let pokemon_count = 50;
let grid_size  = 25;
let text_size = 24;



let play_btn;

function setup() {
  createCanvas(900, 600);
  
  // Create Player object as player
  player = new Player(grid_size);
  
  // Gen first region
  for(let i=0; i < pokemon_count; i++){
    name = pokemon_names[round(random(pokemon_names.length))];
    pokemons[i] = new Pokemon(grid_size,name,round(random(1,10)));
    bushes[i] = new Bushe(pokemons[i].x,pokemons[i].y);
  }
  
  let pokemon_index = round(random(pokemon_count))
  append(player.pokemons,pokemons[pokemon_index])
  player.active_pokemon = player.pokemons[0];
  
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
      // Debug
      pokemons[i].display();
      
      //Encounter
      if (player.x == pokemons[i].x && player.y == pokemons[i].y) {
        player.x+=grid_size;
        print('A wild '+pokemons[i].name+' apeared!')
        encounter = pokemons[i];
        pokemons.splice(i, 1);
        player.room = 'Battle'
      }
    }
    player.display();
  }
  
  // In game (village)
  if(player.room == 2){
    background(100,90,80);
  }
  
  // Main Menu
  if(player.room == 3){
    background(100,90,80);
  }

  // Battle
  if(player.room == 'Battle'){
    background(50,0,0);
    fill(255);
    noStroke();
    textSize(text_size);
    text(encounter.name+' HP['+encounter.hp+'] LV['+encounter.level+'] Resistance['+encounter.resistance+']',text_size*1.5,text_size*1.5);
    
    
    //Debug 
    text(player.active_pokemon.name+' HP['+player.active_pokemon.hp+'] LV['+player.active_pokemon.level+'] Resistance['+player.active_pokemon.resistance+']',text_size*1.5,text_size*1.5*2);
  
    text(player.console,text_size*1.5,text_size*1.5*3);
    
    for(let i =1; i<player.active_pokemon.skills.length+1; i++){
      text('['+i+']'+player.active_pokemon.skills[i].name,text_size*1.5,text_size*1.5*4*i);
    }
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
    this.active_pokemon;
    this.console = 'test';
    this.room = 1;
    this.level =0;
    this.region=0;
    this.pokemons = [];
    this.x = 0;
    this.y = 0;
    this.size = size;
    this.turn = true;
  }
  
  display(){
    fill(255)
    ellipse(this.x,this.y,this.size)
  }
}

class Pokemon {
  constructor(grid_size,name,level) {
    //Debuff(Poison,sleep,confuse)
    this.debuff = [null,null,null];
    this.skills=[];
    this.weakness = types_names[round(random(types_names.length))];
    this.resistance = types_names[round(random(types_names.length))];
    this.level = level;
    this.hp = round(random(this.level/2,this.level+int(this.level/2)))
    this.name = name;
    this.x = grid_size*round(random(width/grid_size));
    this.y = grid_size*round(random(height/grid_size));
    this.size = 10;
    
    // Gen skills
    let skills_count = 9;
    if (this.level <= 9){
      skills_count=this.level;
    }
    for(let i =0; i<skills_count; i++){
      let skill = new Skill(random(10),null,10);
      append(this.skills,skill)
    }
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
      ellipse(this.x+cos(i+this.x)*grid_size*0.5,this.y+tan(i+this.y)*grid_size*2.5,this.size*3)
      ellipse(this.x+cos(i+this.x+1)*grid_size*1,this.y+tan(i+this.y+1)*grid_size*2,this.size*2)
      ellipse(this.x+cos(i+this.x-1)*grid_size*1.5,this.y+tan(i+this.y-1)*grid_size*1.5,this.size*2)
      ellipse(this.x+tan(i+this.x-1)*grid_size*2,this.y+sin(i+this.y+1)*grid_size*1,this.size*2)
      ellipse(this.x+sin(i+this.x+1)*grid_size*2.5,this.y+cos(i+this.y-1)*grid_size*0.5,this.size*2)
    }
  }
}

class Skill {
  constructor(name,effect,power) {
    this.power = power;
    this.effect = effect;
    this.name = name;
    this.type = types_names[round(random(types_names.length))]; // the type of the skills affect affect resistence and weakness
  }
  
  use(target,user){
    target.hp - this.power;
    if (target.resistance == this.type){
      target.hp - round(this.power/1.5);
      player.console += user.name + ' use '+ this.name+ '.'
      player.console += '\n'+ this.name + ' is not very effective.'
    } else if (target.weakness == this.type){
      target.hp - round(this.power*1.5);
      player.console += user.name + ' use '+ this.name+ '.'
      player.console += '\n'+ this.name + ' is very effective.'
    } else {
      target.hp - this.power;
      player.console += user.name + ' use '+ this.name+ '.'
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