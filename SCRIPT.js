let stats = {
    "life": 100,
    "strength": 10,
    "endurance": 10,
    "deffense": 15,
    "inteligence":10,
    "experience": 0 
}

let available_points = 0;

let lvl = 0;

let lvl_description = [
    ["Egy gyenge kalandor vagy!", "prof_lvl0.jpg"],
    ["Egy gyenge kalandor vagy!", "prof_lvl0.jpg"],
    ["Egy gyenge kalandor vagy!", "prof_lvl0.jpg"],
    ["Egy gyenge kalandor vagy!", "prof_lvl0.jpg"],
    ["Kalandor lettél!","prof_lvl1.jpg"],
    ["Kalandor lettél!","prof_lvl1.jpg"],
    ["Kalandor lettél!","prof_lvl1.jpg"],
    ["Kalandor lettél!","prof_lvl1.jpg"],
    ["Kalandor lettél!","prof_lvl1.jpg"],
    ["Kalandor céh megbecsült tagja lettél!","prof_lvl2.jpg"],
    ["Kalandor céh megbecsült tagja lettél!","prof_lvl2.jpg"],
    ["Kalandor céh megbecsült tagja lettél!","prof_lvl2.jpg"],
    ["Kalandor céh megbecsült tagja lettél!","prof_lvl2.jpg"],
    ["Kalandor céh megbecsült tagja lettél!","prof_lvl2.jpg"],
    ["Kalandor céh megbecsült tagja lettél!","prof_lvl2.jpg"],
    ["Kalandor céh megbecsült tagja lettél!","prof_lvl2.jpg"],
    ["Te vagy a céh legerősebb tagja és a vezetője is!", "prof_lvl3.jpg"],
    ["Te vagy a céh legerősebb tagja és a vezetője is!", "prof_lvl3.jpg"],
    ["Te vagy a céh legerősebb tagja és a vezetője is!", "prof_lvl3.jpg"],
    ["Te vagy a céh legerősebb tagja és a vezetője is!", "prof_lvl3.jpg"],
    ["Te vagy a céh legerősebb tagja és a vezetője is!", "prof_lvl3.jpg"],
    ["Te vagy a céh legerősebb tagja és a vezetője is!", "prof_lvl3.jpg"],
    ["Te vagy a céh legerősebb tagja és a vezetője is!", "prof_lvl3.jpg"],
    ["Megöregedtél, nem vagy tagja már a kalandor céhnek. Vissza vonultál. Te vagy a legerőssebb az országban!", "prof_lvl4.jpg"]
];

let profile_stats = {
    "pics": document.getElementById("prof_pics"),
    "description": document.getElementById("description"),
    "life": document.getElementById("profile_life"),
    "strength": document.getElementById("profile_strength"),
    "endurance": document.getElementById("profile_endurance"),
    "inteligence":document.getElementById("profile_inteligence"),
    "deffense": document.getElementById("profile_deffense"),
    "experience": document.getElementById("profile_experience"),
    "next_level": document.getElementById("next_lvl")
}

function refreshProfileStats(){
    profile_stats.pics.src = "pics/"+lvl_description[lvl][1]
    profile_stats.life.innerHTML = stats.life;
    profile_stats.strength.innerHTML = stats.strength;
    profile_stats.endurance.innerHTML = stats.endurance;
    profile_stats.deffense.innerHTML = stats.deffense;
    profile_stats.inteligence.innerHTML=stats.inteligence;
    profile_stats.experience.innerHTML = stats.experience;
    profile_stats.description.innerHTML = lvl_description[lvl][0];
    profile_stats.next_level.innerHTML = 10;
    display_addBtns();
}

refreshProfileStats();

function update_strength(){
    if(available_points > 0){
        available_points--;
        stats.strength += 5;
        refreshProfileStats();
    }
}
function update_endurance(){
    if(available_points > 0){
        available_points--;
        stats.endurance += 5;
        refreshProfileStats();
    }
}
function update_deffense(){
    if(available_points > 0){
        available_points--;
        stats.deffense += 5;
        refreshProfileStats();
    }
}
function update_inteligence(){
    if(available_points > 0){
        available_points--;
        stats.inteligence += 5;
        refreshProfileStats();
        }
    }

function display_addBtns(){
    let btns = document.getElementsByClassName("addButtons");
    if(available_points > 0){
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="inline";
        }
    } else{
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="none";
        }
    }
}

function lvl_up(){
    if(stats.experience>=10 && lvl < lvl_description.length - 1){
            available_points += 5;
            stats.life+=100;
            lvl++;
            refreshProfileStats();
    }
}

/* ADVENTURE */

let story = document.getElementById("story");

function rnd_szazalek(){
    return Math.floor(Math.random()*100);
}

function kalandozas(){
    let szazalek = rnd_szazalek();
    let sebzes_eselye = 50 - stats.deffense;

    if(sebzes_eselye <= 0) sebzes_eselye = 1;

    if(szazalek >= sebzes_eselye){
        story.innerHTML += "Megsebződtél (-1 élet)<br>";
        stats.life -= 1;
        fight("Farkas", 1, 100);
        refreshProfileStats();
    }else{
        story.innerHTML += "Tapasztalatot szereztél! (+1)<br>";
        stats.experience += 3;
        refreshProfileStats();
    }
}

function fight(e_name, e_damage, e_life)
{
    story.innerHTML += "Kalandozás közben megtámadott téged egy " + e_name + "!<br>";

    let counter = 0;
    let enemy_attack = true;

    do {
        counter++;
        if(enemy_attack){
            // ellenfél támad
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 30 - stats.deffense;
            if(sebzes_eselye <= 0) sebzes_eselye = 1;

            if(szazalek >= sebzes_eselye){
                story.innerHTML += "Ellenfeled rád ront! (-"+e_damage+" élet)<br>";
                stats.life -= e_damage;
                stats.experience+=1;
                refreshProfileStats();
            }else{
                story.innerHTML += "Ellenfeled el vétette!<br>";
                stats.experience+= 0,3;
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
                story.innerHTML += "Ellenfeled el kerülte a támadásod!<br>";
            }
        }

        enemy_attack = !enemy_attack;

    } while (counter <=  10);
} 
