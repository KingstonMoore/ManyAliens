class Form{
    constructor(){
        this.input = createInput("").attribute("placeholder", "Enter Name")
        this.button = createButton("PLAY")
        this.greeting = createElement("h2")
        this.reset = createButton("RESET")
    }
    display(){
        this.input.position(300, 200)
        this.button.position(350, 250)
        this.button.mousePressed(()=>{
            this.input.hide()
            this.button.hide()
            this.greeting.position(200, 100)
            this.greeting.style("color", "white")
            this.greeting.html("Welcome! "+this.input.value()+", Wait for Other Players")
            playercount = playercount + 1
            player.idx = playercount
            player.name = this.input.value()
            player.addPlayer()
            player.updateCount(playercount)
        })
        this.reset.position(700, 30)
        this.reset.mousePressed(()=>{
            db.ref("/").set({
                playercount: 0,
                gamestate: 0,
                players: {} 
            })
            location.reload()
        })
    }
}