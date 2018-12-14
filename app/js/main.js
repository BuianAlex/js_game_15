class Game{
  constructor(){
    this.wraper = document.getElementById('app');
    this.array = [];
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
    if (this.array.join('') === '1234567891011121314150'){
      console.log('ddd');
    }
    console.log(this.array.join(''));
  }

  createdrag(){
    console.log(this.array);
    
    let bones = this.wraper.querySelectorAll('.bone');
    bones.forEach(element => {
      element.removeAttribute("draggable");
      element.classList = 'bone';
    }, this);
    let nullPlace = this.array.indexOf(0);
    console.log(nullPlace);

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
    this.array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    this.array.sort(function (a, b) { return 0.5 - Math.random() });

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
    let empty = document.createElement("div");
    this.emptyDrag(empty);
    this.wraper.appendChild(empty);
    this.createdrag();
    this.ifWin();
  }
  dragStart(e) {
    e.dataTransfer.setData('text/html', this.innerHTML);
  }
  
  dragEnd(e) { 
    if (this.dropped) {
      let place = this.array.indexOf(parseInt(e.target.innerHTML));
      this.array[place] = 0;
      this.emptyDrag(e.target);
      this.createdrag();
    }
    this.dropped = false;
  }

  dragDrop(e) {
    e.preventDefault();
    this.dropped = true;
    let place = this.array.indexOf(0);
    e.target.innerHTML = e.dataTransfer.getData('text/html');
    this.array[place] = parseInt(e.target.innerHTML);
    e.dataTransfer.clearData();
    e.target.classList = 'bone';
  }


  boneDrag(element){
    element.classList.add('dragBone');
    element.setAttribute("draggable", "true");
    element.addEventListener('dragstart', this.dragStart);
    element.addEventListener('dragend', this.dragEnd.bind(this), false);
    element.removeEventListener('dragover', function dragOver(e) {
      e.preventDefault();
    });
    element.removeEventListener('dragenter', function dragEnter(e) {
      e.preventDefault();
    });
    element.removeEventListener('dragleave', function dragLeave() {
    });
    element.removeEventListener('drop', this.dragDrop.bind(this), false);
  }
  emptyDrag(element){
    element.innerHTML = '';
    element.classList.add('bone');
    element.classList.add('epmty');
    element.removeAttribute("draggable");

    element.removeEventListener('dragstart', this.dragStart);
    element.removeEventListener('dragend', this.dragEnd.bind(this), false);

    element.addEventListener('dragover', function dragOver(e) {
      e.preventDefault();
    });
    element.addEventListener('dragenter', function dragEnter(e) {
      e.preventDefault();
    });
    element.addEventListener('dragleave', function dragLeave() {
    });
    element.addEventListener('drop', this.dragDrop.bind(this), false);
  }
}

let newGame =  new Game();

// let dropped = false;
// let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,0];
// function dragStart(e) {
//   e.dataTransfer.setData('text/html', this.innerHTML);
// }

// function dragEnd() {
//   if (dropped){
//     let place = array.indexOf(parseInt(this.innerHTML));
//     console.log(place);
    
//     array[place] = 0;
//     console.log(array);
//     this.innerHTML = '';
//     this.removeAttribute("draggable");
//     setTimeout(() => (this.className = 'epmty'), 0);
    
    
//   }
//   dropped = false;
  
// }

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {

}

// function dragDrop(e) {
//   dropped = true;
//   let place = array.indexOf(0);
//   console.log(place);
  
//   this.innerHTML = e.dataTransfer.getData('text/html');
  
//   array[place] = parseInt(this.innerHTML);
//   e.dataTransfer.clearData();
//   this.classList = 'bone';
// }