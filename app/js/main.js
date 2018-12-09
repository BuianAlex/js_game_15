class Game{
  constructor(){
    this.wraper = document.getElementById('app');
    this.array = [];
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
    if (this.array.join('') === '1234567891011121314150'){
      console.log('ddd');
    }
    console.log(this.array.join(''));
  }
  createdrag(){
    let bones = this.wraper.querySelectorAll('.bone');
    bones.forEach(element => {
      element.classList.remove("mystyle");
      element.removeAttribute("draggable");
    }, this);
    let nullPlace = this.array.indexOf(0);
    if (bones[nullPlace - 1] && nullPlace % 4 !== 0) {
      bones[nullPlace - 1].classList.add('dragBone');
      bones[nullPlace - 1].setAttribute("draggable", "true");
    }
    if(bones[nullPlace - 4]){
      bones[nullPlace - 4].classList.add('dragBone');
      bones[nullPlace - 4].setAttribute("draggable", "true");
    }
    if (bones[nullPlace + 1] && (nullPlace+1) % 4 !== 0){
      bones[nullPlace + 1].classList.add('dragBone');
      bones[nullPlace + 1].setAttribute("draggable", "true");
    }
    if (bones[nullPlace + 4] ){
      bones[nullPlace + 4].classList.add('dragBone');
      bones[nullPlace + 4].setAttribute("draggable", "true");
    }
  
    console.log((nullPlace + 1) % 4);

    
  }

  shuffle() {
    this.array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    //this.array.sort(function (a, b) { return 0.5 - Math.random() });
    //update table

    //this.array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0,11, 12, 13, 14, 15];  //ok
    //this.array = [1, 2, 3, 4, 5, 6,0, 7, 8, 9, 10,  11, 12, 13, 14, 15];   //ok
    //this.array = [1, 2, 3, 0,4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    //this.array = [1, 2, 3, 4, 5, 6, 7, 0, 8, 0,9, 10, 0, 11, 12, 13, 14, 15];

    let bones = this.wraper.querySelectorAll('.bone');
    bones.forEach(element => {
      this.wraper.removeChild(element);
    },this);
    //create new
    this.array.forEach(function (params) {
      let bone = document.createElement("div");
      bone.innerHTML = params;
      bone.className = 'bone';
      this.wraper.appendChild(bone);
    }, this);
    this.array.push(0);
    //let empty = document.createElement("div");

    this.createdrag();
    this.ifWin();
  }
}

let newGame =  new Game();

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}