import { Trie } from "./trie";

function goThroughObjectTree(root, cb) {
  if (!root) return;
  cb(root);
  const children = root.children;
  if (children) {
    Object.keys(children).forEach(key => {
      goThroughObjectTree(children[key], cb);
    })
  } 
}

function goThrough(root, cb) {
  if (!root) return;
  root.child?.forEach(node => {
    goThrough(node, cb);
  })
  cb(root);
}

function goThroughRev(root, cb) {
  if (!root) return;
  cb(root);
  root.child?.forEach(node => {
    goThroughRev(node, cb);
  })
}

function sum(arr) {
  return arr.reduce((pre, cur) => pre + cur, 0);
}

const unit = 100;
const canvas = document.querySelector('#treeCanvas');

const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = true;
const cbr = canvas.getBoundingClientRect();
  canvas.width = cbr.width;
  canvas.height = cbr.height;

function renderNode(node, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 25, 0, Math.PI * 2);
  const color = node.isEndOfWord ? '#333' : '#bbb'
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function renderLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = '#aaa';
  ctx.stroke();
  ctx.closePath();
}

function renderText(text, x, y) {
  ctx.font = '30px Arial';
  ctx.beginPath();
  ctx.fillStyle = '#aa4500';
  ctx.fillText(text, x, y);
  ctx.closePath();
}

function renderTree(root, x = 300, y = 0) {
  const tw = root.w;
  const keys = Object.keys(root.children);
  if (root.child.length == 1) {
    const nx = x - 1/2 * unit;
    const ny = y + Math.sqrt(3) / 2 * unit;
    renderLine(x, y, nx, ny);
    
    renderText(keys[0], (x + nx) / 2, (y + ny) / 2)
    renderTree(root.child[0], nx, ny);
  }
  else {
    root.child.forEach((n, index) => {
      const nx = x - tw/2 * unit + sum(root.child.slice(0, index).map(n => n.w + 1)) * unit + root.child[index].w / 2 * unit;
      const ny = y + Math.sqrt(3) / 2 * unit;
      renderLine(x, y, nx, ny);
      renderText(keys[index], (x + nx) / 2, (y + ny) / 2)
      renderTree(root.child[index], nx, ny);
    })
  }
  renderNode(root, x, y);
}



export function app() {
  const trie = new Trie()
  trie.insert("apple");
  trie.insert("app");
  trie.insert("agent");
  trie.insert("adult");
  trie.insert("bear");
  trie.insert("boom");
  trie.insert("beach");
  trie.insert("boil");
  trie.insert("branch");
  trie.insert("agei");

  // 转成数组
  goThroughObjectTree(trie.root, (node) => {
    node.child = Object.values(node.children);
  })

  goThrough(trie.root, node => {
    if (node.child.length == 0) {
      node.w = 0;
    }
    else if (node.child.length == 1) {
      node.w = sum(node.child.map(n => n.w)) + 1/2;
    }
    else if (node.child.length >= 2) {
      node.w = sum(node.child.map(n => n.w)) + node.child.length - 1;
    }
  })


  let x = 600;
  let y = 300;

  handleResize()


  function render() {
    renderTree(trie.root, x, y);
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function handleResize() {
    const cbr = canvas.getBoundingClientRect();
    canvas.width = cbr.width * 2;
    canvas.height = cbr.height * 2;
    render();
  }

  window.addEventListener('resize', handleResize)

  window.addEventListener('wheel', (e) => {
    const {wheelDeltaX, wheelDeltaY} = e;
    x += wheelDeltaX / 5;
    y += wheelDeltaY / 5;
    clear();
    render();
  })

  window.addEventListener('mousewheel', (e) => {
    console.log(e)
  })
}
