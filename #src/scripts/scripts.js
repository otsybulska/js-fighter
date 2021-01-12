let $start = document.querySelector('.start-btn')
let $first = document.querySelector('.fighter-first')
let $second = document.querySelector('.fighter-second')
let $battle = document.querySelector('.battle__body')
let $steps = document.querySelector('.battle__steps')

let gameSteps = 0
let win = 0
let lose = 0

class Fighter {
    constructor(options) {
        this.name = options.name,
        this.damage = options.damage,
        this.totalHp = options.hp,
        this.strength = options.strength,
        this.agility = options.agility,
        this.currentHp = options.hp,
        this.win,
        this.lose
    }
    
    getName() {
        return this.name
    }
    
    getDamage() {
        return this.damage
    }

    setHealth() {
        return this.currentHp = this.totalHp
    }

    getHealth() {
        return this.currentHp
    }
    
    getStrength() {
        return this.strength
    }

    getAgility() {
        return this.agility
    }

    attack(defender) {
        let attackMiss = defender.getStrength() + defender.getAgility()
        let attackRandom = Math.random() * 100
        
        if (attackRandom > attackMiss) {
            defender.dealDamage(this.damage)
            
            let p = document.createElement('p')
            p.innerHTML = `${this.name} makes ${this.damage} damage to ${defender.getName()}`
            $battle.appendChild(p)
        } else {
            let p = document.createElement('p')
            p.innerHTML = `${this.name} attack missed`
            $battle.appendChild(p)
        }
    }

    logStats() {
        if (this.name === firstFighter.name) {
            $first.querySelector('.fighter__name').textContent = this.name
            $first.querySelector('.fighter__damage').textContent = this.damage
            $first.querySelector('.fighter__strength').textContent = this.strength
            $first.querySelector('.fighter__agility').textContent = this.agility
            $first.querySelector('.fighter__hp').textContent = this.currentHp
        }

        if (this.name === secondFighter.name) {
            $second.querySelector('.fighter__name').textContent = this.name
            $second.querySelector('.fighter__damage').textContent = this.damage
            $second.querySelector('.fighter__strength').textContent = this.strength
            $second.querySelector('.fighter__agility').textContent = this.agility
            $second.querySelector('.fighter__hp').textContent = this.currentHp
        }
    }
    
    heal(addHeal) {
        this.currentHp = this.currentHp >= this.totalHp ? this.totalHp : this.currentHp + addHeal
    }
    
    dealDamage(addDamage) {
        this.currentHp = this.currentHp - addDamage < 0 ? 0 : this.currentHp - addDamage
    }
    
    addWin() {
        win++
    }
    
    addLose() {
        lose++
    }
}

function startBattle() {
    gameSteps++
    $steps.innerHTML = `${gameSteps}`

    $battle.innerHTML = ''
    
    firstFighter.setHealth()
    secondFighter.setHealth()
    
    firstFighter.logStats()
    secondFighter.logStats()

    battle(firstFighter, secondFighter)
}

function battle(firstFighter, secondFighter) {
    while (firstFighter.getHealth() > 0 && secondFighter.getHealth() > 0) {
        firstFighter.attack(secondFighter)
        
        if (secondFighter.getHealth() > 0) {
            secondFighter.attack(firstFighter)
        }
    }
        
    endBattle(firstFighter, secondFighter)
}

function endBattle(firstFighter, secondFighter) {
    let winFighter = firstFighter.getHealth() === 0 ? secondFighter : firstFighter
    let loseFighter = firstFighter.getHealth() === 0 ? firstFighter : secondFighter
    
    loseFighter.addLose()
    winFighter.addWin()
    
    let p = document.createElement('p')
    p.innerHTML = `${winFighter.getName()} has won!`
    $battle.appendChild(p)
}

const firstFighter = new Fighter({name: 'First Fighter', damage: 25, hp: 100, strength: 30, agility: 25, win: 0, lose: 0})
const secondFighter = new Fighter({name: 'Second Fighter', damage: 20, hp: 90, strength: 20, agility: 15, win: 0, lose: 0})

$start.addEventListener('click', startBattle)

/*
secondFighter.heal(30)
secondFighter.getHealth()
secondFighter.getStrength()*/

svg4everybody()
