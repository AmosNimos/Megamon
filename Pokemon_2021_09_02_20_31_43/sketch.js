let player; 
let encounter;
let img;
let pokemons = [];
let bushes = [];
let name;

// This array is devide by 3 stage of each pokemon (some stage where added for this mechanic)
var pokemon_names=new Array("Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Ratake","Spearow","Fearow","Ekans","Arbok","vipors","Pichu","Pikachu","Raichu","Sandshrew","Sandslash","Sandslice","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","clefantasy","Vulpix","Ninetales","Firefox","Jigglypuff","Wigglytuff","Bigglyruff","Zubat","Golbat","Torbat","Oddish","Gloom","Vileplume","Paras","Parasect","Pasec","Venonat","Venomoth","Venomorph","Diglett","Dugtrio","Duging","Meowth","Persian","Felian","Psyduck","Golduck","Minduck","Mankey","Primeape","Goriape","Growlithe","Arcanine","Wolfine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Tentamare","Geodude","Graveler","Golem","Ponyta","Rapidash","Speedvit","Slowpoke","Slowbro","Slowking","Magnemite","Magneton","Magnetron","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew");
// https://bulbapedia.bulbagarden.net/wiki/List_of_moves
var skills_names=new Array("Kick","Punch","Throw","Pound","Slap","Scratch","Cut","Slam","Stomp","Headbutt","Tackle","Bite","Blast","Slash");
var skills_special_names=new Array("Double","Mega","Ultra","Hard","Rapid","Flying","Fury","Hyper","Low","High","Ultra","Quick","Triple","Dynamic","Focus","Giant","Small");
var types_names = new Array("Normal", "Fire", "Water", "Grass", "Flying", "Fighting", "Poison", "Electric", "Ground", "Rock", "Psychic", "Ice", "Bug", "Ghost", "Steel", "Dragon", "Dark", "Fairy")
let pokemon_count = 50;
let grid_size  = 25;
let text_size = 24;
let total_text ="";



let play_btn;

function setup() {
  createCanvas(displayWidth, displayHeight);
  
  // Create Player object as player
  player = new Player(grid_size);
  
  // Gen first region
  for(let i=0; i < pokemon_count; i++){
    name = pokemon_names[round(random(pokemon_names.length))];
    pokemons[i] = new Pokemon(grid_size,name,round(random(1,10)));
    bushes[i] = new Bushe(pokemons[i].x,pokemons[i].y);
  }
  
  let pokemon_index = round(random(pokemon_count))
  name = pokemon_names[round(random(pokemon_names.length))];
  append(player.pokemons,new Pokemon(grid_size,name,3));
  player.active_pokemon = player.pokemons[0];
  player.active_pokemon.owned = true;
  
  player.x =  grid_size*round(random(width/grid_size));
  player.y =  grid_size*round(random(height/grid_size));
  
  print(player.pokemons[0].name+' I choose you!')
}

function draw() {
  
  if(player.room == "Forest"){
    // In game (forest)
    background(10,100,30);
    //Bushes
    for(let i =0; i<bushes.length; i++){
      bushes[i].display();
    }
    for(let i =0; i<pokemons.length; i++){
      // Debug
      //pokemons[i].display();
      
      //Encounter
      if (player.x == pokemons[i].x && player.y == pokemons[i].y) {
        player.x+=grid_size;
        print('A wild '+pokemons[i].name+' apeared!')
        player.history = player.console;
        player.console = 'A wild '+pokemons[i].name+' apeared!';
        encounter = pokemons[i];
        pokemons.splice(i, 1);
        player.room = 'Battle'
      }
    }
    player.display();
    
    // ui
    total_text='';
    total_text += '\nConsole:\n'
    total_text += '  '+player.console+'\n';
    total_text += '  '+player.history+'\n';
    text(total_text,text_size*1.5+text_size*1.5,text_size*1.5+text_size*1.5);
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
    background(90,15,5);
    fill(255);
    noStroke();
    textSize(text_size);
    total_text= ""
    total_text += encounter.name+' HP['+encounter.hp+'/'+encounter.max_hp+'] LV['+encounter.level+']\n';
    //Debug 
    total_text += "_____________________________________\n"
    total_text += player.active_pokemon.name+' HP['+player.active_pokemon.hp+'/'+player.active_pokemon.max_hp+'] LV['+player.active_pokemon.level+']\n';
    total_text+= "\nMoves:\n";
    for(let i =1; i<player.active_pokemon.skills.length+1; i++){
      total_text+='  ['+i+'] '+ player.active_pokemon.skills[i-1].name + ' ' + player.active_pokemon.skills[i-1].power+'\n';
    }
    total_text+='\nActions:\n';
    total_text+='  [P] Pokeball('+player.pokeball+")\n";
    total_text+='  [R] Run\n';
    total_text+='  [I] Item\n';
    total_text+='  [C] Change Pokemon\n';
    total_text += '\nConsole:\n'
    total_text += '  '+player.console+'\n';
    total_text += '  '+player.history+'\n';
    //Total_text
    text(total_text,text_size*1.5,text_size*1.5);
    if (player.turn == false){
      encounter.turn(player);
      player.active_pokemon.turn(player);
      player.turn = true;
    }
  }
  
  if(player.room == 'Gameover'){
    total_text = '';
    background(0,0,0);
    fill(255);
    noStroke();
    textSize(text_size*2);
    text('GAME OVER',text_size*1.5*2,text_size*1.5*2)
    textSize(text_size);
    total_text += '\nConsole:\n'
    total_text += '  '+player.console+'\n';
    total_text += '  '+player.history+'\n';
    text(total_text,text_size*1.5+text_size*1.5*2,text_size*1.5+text_size*1.5*2);
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
    this.pokeball =10;
    this.console = '';
    this.history = ''
    this.room = "Forest";
    this.level =0;
    this.region=0;
    this.pokemons = [];
    this.active_pokemon = this.pokemons[0];
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
    this.xp;
    this.next_level = this.level*2;
    this.hp = round(random(this.level/2,this.level+int(this.level/2)))*5
    this.max_hp = this.hp;
    this.name = name;
    this.x = grid_size*round(random(width/grid_size));
    this.y = grid_size*round(random(height/grid_size));
    this.size = 10;
    this.owned=false;
    
    // Gen skills
    let skills_count=round(this.level/5)-1;
    if (skills_count<1){
      skills_count=0;
    }
    for(let i =0; i<=skills_count; i++){
      let name = skills_special_names[round(random(skills_special_names.length))]+" "+skills_names[round(random(skills_names.length))];
      let effect = random(["Poison","Sleep","Confuse"])
      let skill = new Skill(name,effect,round(random(this.level/2,this.level+int(this.level/2))));
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
  
  turn(player){
   if (this.debuff[0] == true){
     this.hp-=10;
     player.console = this.name + " is poisoned."
   }
    
   if (this.owned == false){
     this.skills[round(random(this.skills.length-1))].use(player.active_pokemon,this);
   }
    
   if(this.hp<=0){
     //lost
     player.history = player.console;
     player.console = this.name + " was defeated."
     if(this.owned == false){
       player.history = player.console;
       player.console = "You Won the battle!"
       player.room='Forest'
     } else {
       player.history = player.console;
       player.console = "You Lost the battle!"
       player.room = 'Gameover'
     }
   }
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
    this.accuracy = random(0,4);
    this.type = types_names[round(random(types_names.length))]; // the type of the skills affect affect resistence and weakness
  }
  
  use(target,user){
    if (target.hp > 0 && user.hp > 0){
      let annotation =''
      if (user.owned == true){
        annotation = 'Your '
      } else {
        annotation = 'Wild '
      }
      if(round(random(this.accuracy))==0){
        if (target.resistance == this.type){
          target.hp -= round(this.power/1.5);
          player.history = player.console;
          player.console = annotation + user.name + ' use '+ this.name + " and it's not very effective."
        } else if (target.weakness == this.type){
          target.hp -= round(this.power*1.5);
          player.history = player.console;
          player.console = annotation + user.name + ' use '+ this.name + " and it's very effective."
        } else {
          target.hp -= this.power;
          player.history = player.console;
          player.console = annotation+ user.name + ' use '+ this.name+ 'and it hit.'
        }
      } else {
        player.history = player.console;
        player.console = annotation +user.name + ' use '+ this.name+ ' and it miss.'
      }
      if (this.effect == "Poison"){
      }
      player.turn=false;
    }
  }
}

function keyPressed() {
  
  if (player.room == "Battle"){
    if (player.turn ==true){
      if (key == 'i'){
        player.active_pokemon.hp=player.active_pokemon.max_hp;
      }
      if (key == 'r'){
        player.room='Forest';
      }
      if (key == 'C'){
        player.active_pokemon = player.pokemons[round(random(player.pokemons.length-1))]
      }
      if (key == 'p'){
        player.pokeball -= 1;
        if(round(random(encounter.hp))<2*encounter.level){
          player.history = player.console;
          player.console = encounter.name + ' was caught!';
          encounter.owned = true;
          append(player.pokemons,encounter);
          player.active_pokemon = player.pokemons[player.pokemons.length-1];
          player.room='Forest';
        } else {
          player.history = player.console;
          player.console = encounter.name + ' escaped from the pokeball!';
        }
      }
      if (key == '1'){
        player.active_pokemon.skills[0].use(encounter,player.active_pokemon)
        player.turn = false;
      }
      if (key == '2'){
        player.active_pokemon.skills[1].use(encounter,player.active_pokemon)
        player.turn = false;
      }
    }
  } 
  
  if (player.room == "Forest"){
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
  }
  if (player.y>height) {
    player.y=0;
  }
  if (player.y<0) {
    player.y=height;
  }
}