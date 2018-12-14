class Game{
  constructor(){
    this.wraper = document.getElementById('app');
    this.order = [];
    this.dropped = false;
    this.createView();
  }
 
  createView(){
    let button = document.createElement("button");
    button.className = 'new-game';
    button.innerHTML = 'New game';
    button.addEventListener('click',function (params) {
      this.shuffle();
    }.bind(this), false);
    this.wraper.appendChild(button);
    this.shuffle();
  }

  ifWin(){
    let winMessage = document.querySelector(".winner");
    if(typeof(winMessage) != 'undefined' && winMessage != null){
      winMessage.parentNode.removeChild(winMessage);
    }
    if (this.order.join('') === '1234567891011121314150'){
      let winner = document.createElement("span");
      winner.className = 'winner';
      winner.innerHTML= "You Win!!!"
      this.wraper.appendChild(winner);
    }
  }

  createdrag(){
    let bones = this.wraper.querySelectorAll('.bone');
    let nullPlace = this.order.indexOf(0);

    if (bones[nullPlace - 1] && nullPlace % 4 !== 0) {
      this.boneDrag(bones[nullPlace - 1]);
    }
    if(bones[nullPlace - 4]){
      this.boneDrag(bones[nullPlace - 4]);
    }
    if (bones[nullPlace + 1] && (nullPlace + 1) % 4 !== 0){
      
      this.boneDrag(bones[nullPlace + 1]);
    }
    if (bones[nullPlace + 4] ){
      this.boneDrag(bones[nullPlace + 4]);
    } 
  }

  shuffle() {
    this.order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    this.order.sort(function (a, b) { return 0.5 - Math.random() });
    this.order.push(0);
    this.createBones();
  }

  createBones(){
    let bones = this.wraper.querySelectorAll('.bone');
    bones.forEach(element => {
      this.wraper.removeChild(element);     
    },this);
    this.order.forEach(function (params) {
      let bone = document.createElement("div");
      if(params===0){
        this.emptyDrag(bone);
      }
      else{
        bone.innerHTML = params;
        bone.className = 'bone';
      }
      
      this.wraper.appendChild(bone);
    }, this);

    this.createdrag();
    this.ifWin();
  }



  dragStart(e) {   
    e.dataTransfer.setData('text/html', this.innerHTML);
  }
  
  dragEnd(e) { 
    if (this.dropped) {
      let startPlace = this.order.indexOf(parseInt(e.target.innerHTML));
      let dropPlace = this.order.indexOf(0);
      this.order[dropPlace]= parseInt(e.target.innerHTML);
      this.order[startPlace] = 0;
      this.createBones()
    }
    this.dropped = false;
  }

  dragDrop(e) {
    e.preventDefault();
    this.dropped = true; 
    e.dataTransfer.clearData();
  }


  boneDrag(element){
    element.classList.add('dragBone');
    element.setAttribute("draggable", "true");
    element.addEventListener('dragstart', this.dragStart);
    element.addEventListener('dragend', this.dragEnd.bind(this), false);
  }

  emptyDrag(element){
    element.innerHTML = '';
    element.classList = "bone epmty";
    element.addEventListener('dragover', function(e) {
      e.preventDefault();
    });
    element.addEventListener('dragenter', function (e) {
      e.preventDefault();
    });
    element.addEventListener('dragleave', function() {
    });
    element.addEventListener('drop', this.dragDrop.bind(this), false);
  }

}

let newGame =  new Game();

