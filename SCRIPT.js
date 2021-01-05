alert("hello")
let characterPage= {
    "strenght": document.getElementById("strenght"),
    "agility": document.getElementById("agility"),
    "intelligence": document.getElementById("intelligence"),
    "Faith": document.getElementById("Faith"),
    "Luck": document.getElementById("Luck"),
    "life":document.getElementById("life"),
    "XP":document.getElementById("XP"),
    "defense":document.getElementById("defense")
}

let stats={
    "life":100,
    "strenght" :5,
    "agility": 5,
    "intelligence": 5,
    "Faith": 5,
    "Luck":5,
    "defense":20,
    "XP":0

}

let levels_exp= [1, 30, 50, 80,100];

let available_points=0;

let level= 0;

let lvl_description=[

];


function refreshCharacterPage(){

characterPage.strenght.innerHTML = stats.strenght;
characterPage.agility.innerHTML = stats.agility;
characterPage.intelligence.innerHTML = stats.intelligence;
characterPage.Faith.innerHTML = stats.Faith;
characterPage.Luck.innerHTML = stats.Luck;
characterPage.life.innerHTML = stats.life;
characterPage.XP.innerHTML = stats.XP;
characterPage.defense.innerHTML=stats.defense;
    if(upgradePoint<=0)
    {
    upgradePoint=0;
    //alert("Nincs több upgrade pontod!")
    let buttons =document.getElementsByClassName("addBtn");
        for(let i=0; i< buttons.length; i++){
        buttons[i].style.display="none";
        }
    }
    else{
    let buttons =document.getElementsByClassName("addBtn");
        for(let i=0; i< buttons.length; i++){
        buttons[i].style.display="block";
        }  
    }
}

refreshCharacterPage();

function addStrenght(){
    stats.strenght+=5;
    upgradePoint--;
    refreshCharacterPage();
}
function addAgility(){
    stats.agility+=5;
    upgradePoint--;
    refreshCharacterPage();
}
function addIntelligence(){
    stats.intelligence+=5;
    upgradePoint--;
    refreshCharacterPage();
}

function addFaith(){
    stats.Faith+=5;
    upgradePoint--;
    refreshCharacterPage();
}

function addLuck(){
    stats.Luck+=5;
    upgradePoint--;
    refreshCharacterPage();
}
function addlife(){
    stats.life+=10;
    upgradePoint--;
    refreshCharacterPage();
}
function adddefense(){
    stats.defense+=1;
    upgradePoint--;
    refreshCharacterPage();
}


function lvl_up(){
    if(lvl < lvl_description.length - 1){
        available_points += 5;
        lvl++;
        refreshProfileStats();
    }
}

/* ADVENTURE */

let story = document.getElementById("story");

function rnd_szazalek(){
    return Math.floor(Math.random()*100);
}

function kaszalas(){
    let szazalek = rnd_szazalek();
    let sebzes_eselye = 50 - stats.deffense;

    if(sebzes_eselye <= 0) sebzes_eselye = 1;

    if(szazalek >= sebzes_eselye){
        // story.innerHTML += "Megsebződtél (-1 élet)<br>";
        // stats.life -= 1;
        fight("Farkas", 5, 100);
        refreshProfileStats();
    }else{
        story.innerHTML += "Tapasztalatot szereztél! (+1)<br>";
        stats.experience += 1;
        refreshProfileStats();
    }
}

function fight(e_name, e_damage, e_life){
    story.innerHTML += "Munka közben megtámadott téged egy " + e_name + "!<br>";

    let counter = 0;
    let enemy_attack = true;

    do {
        counter++;
        if(enemy_attack){
            // ellenfél támad
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 - stats.deffense;
            if(sebzes_eselye <= 0) sebzes_eselye = 1;

            if(szazalek >= sebzes_eselye){
                story.innerHTML += "Ellenfeled rád ront! (-"+e_damage+" élet)<br>";
                stats.life -= e_damage;
                refreshProfileStats();
            }else{
                story.innerHTML += "Sikeresen elkerülöd ellenfeled csapását!<br>";
            }
            
        }else{
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 + stats.endurance;
            if(sebzes_eselye >= 100) sebzes_eselye = 99;
            if(szazalek >= sebzes_eselye){
                story.innerHTML += "Rátámadsz ellenfeledre! ("+e_name+" -"+stats.strength+" élet)<br>";
                e_life -= stats.strength;
                story.innerHTML += e_name + "-nek maradt " + e_life;
                refreshProfileStats();
            }else{
                story.innerHTML += "Ellenfeled sikeresen kikerül a csapásodat!<br>";
            }
        }

        enemy_attack = !enemy_attack;
        
    } while (counter <=  10);
}
