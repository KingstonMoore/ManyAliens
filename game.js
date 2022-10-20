class Game{
    constructor(){

    }
    getState(){
        db.ref("gamestate").on("value", function(data){
            gamestate = data.val()
        })
    }

    updateState(num){
        db.ref("/").update({
            gamestate: num
        })
    }

    start(){
        player = new Player()
        playercount = player.getCount()
        form = new Form()
        form.display()
        p1 = createSprite(150, 500)
        p2 = createSprite(650, 500)
        p1.addImage(alienImg)
        p2.addImage(alienImg)
        p1.scale = 0.2
        p2.scale = 0.2
        p2.mirrorX(-1)
        p = [p1, p2]
        ufog = new Group()
        bg1 = new Group()
        bg2 = new Group()
    }

    play(){
        form.greeting.hide()
        Player.getPlayers()
            background("black")
            var index = 0
            drawSprites()
            for (var i in players) {
                index = index+1
                p[index - 1].position.x = players[i].posx
                p[index - 1].position.y = players[i].posy
                textSize(25)
                text("player1: "+ players.player1.score, 50, 50 )
                text("player2: "+ players.player2.score, 50, 100 )
                if (keyIsDown(UP_ARROW) && player.posy>0){
                    player.posy = player.posy - 10
                    player.updateInfo()
                  }
                  if (keyIsDown(DOWN_ARROW) && player.posy<600){
                    player.posy = player.posy + 10
                    player.updateInfo()
                  }
                  if (frameCount%30===0){
                      ufo = createSprite(random(200, 600), 0)
                      ufo.velocityY = 4
                      ufo.addImage(ufoImg)
                      ufo.scale = 0.4
                      ufog.add(ufo)
                  }
                  if(index === player.idx){
                  if (index===1){
                    if (keyIsDown(RIGHT_ARROW)&& frameCount%10===0){
                        bullet1 = createSprite(p[index - 1].position.x, p[index - 1].position.y, 40, 20)
                        bullet1.velocityX = 5
                        bg1.add(bullet1)
                    }
                  }
                  for (var j = 0;j<ufog.length;j++){
                  if (bg1.isTouching(ufog.get(j))){
                    player.score = player.score + 5
                    player.updateInfo()
                    bg1.destroyEach()
                    ufog.get(j).destroy()
                    }
                }
                for (var j = 0;j<ufog.length;j++){
                    if (bg2.isTouching(ufog.get(j))){
                      player.score = player.score + 5
                      player.updateInfo()
                      bg2.destroyEach()
                      ufog.get(j).destroy()
                      }
                  }
                  if (index===2){
                    if (keyIsDown(LEFT_ARROW)&& frameCount%10===0){
                        bullet2 = createSprite(p[index - 1].position.x, p[index - 1].position.y, 40, 20)
                        bullet2.velocityX = -5
                        bg2.add(bullet2)
                    }
                    if (bg2.isTouching(ufog)){
                        player.score = player.score + 5
                        player.updateInfo()
                    }
                  }
                }
    }
    if (player.score>= 100){
        game.updateState(2)
        player.rank = 1
        player.updateInfo()
    }
        
    }
    end(){
        background("black")
        Player.getPlayers()
        p1.destroy()
        p2.destroy()
        ufog.destroyEach()
        bg1.destroyEach()
        bg2.destroyEach()
        textSize(30)
        text("GAME OVER", 250, 250)
        if (players.player1.rank === 1){
            text("Winner: "+ players.player1.name, 300, 350)
        }
        if (players.player2.rank === 1){
            text("Winner: "+ players.player2.name, 300, 350)
        }
    }
}