class Player{
    constructor(){
        this.name = null
        this.posx = 0
        this.posy = 300
        this.idx = null
        this.score = 0
        this.rank = 0
    }
    addPlayer(){
        if (this.idx===1){
          this.posx = width/2 - 300
        } else {
          this.posx = width/2 + 300
        }
        db.ref("players/player" + this.idx).set({
          name: this.name, 
          posx: this.posx,
          posy: this.posy,
          score: this.score,
          rank: this.rank
        })
      }
    // collect playerCount value from d
      getCount(){
        db.ref("playercount").on("value", data=>{
          playercount = data.val()
        })
      }
    //write the playerCount to the database
      updateCount(count){
        db.ref("/").update({
          playercount: count
        })
      }
    
      getInfo(){
        db.ref("players/player" + this.idx).on("value", data=>{
         var distance = data.val()
         this.posx = distance.posx
         this.posy = distance.posy
        })
      }
    //write the playerCount to the database
      updateInfo(){
        db.ref("players/player" + this.idx).update({
          posx: this.posx,
          posy: this.posy,
          score: this.score,
          rank: this.rank
        })
      }
     static getPlayers(){
        db.ref("players").on("value", data =>{
          players = data.val()
        })
      }
    }