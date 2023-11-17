class TrieNode {
  constructor() {
      this.children = {}; // 非 []
      this.isEndOfWord = false;
  }
}

export class Trie {
  constructor() {
      this.root = new TrieNode();
  }

  insert(word) {
      let node = this.root;
      for (let char of word) {
          if (!node.children[char]) {
              node.children[char] = new TrieNode();
          }
          node = node.children[char];
      }
      node.isEndOfWord = true;
  }

  search(word) {
      let node = this.root;
      for (let char of word) {
          if (!node.children[char]) {
              return false;
          }
          node = node.children[char];
      }
      return node.isEndOfWord;
  }

  startsWith(prefix) {
      let node = this.root;
      for (let char of prefix) {
          if (!node.children[char]) {
              return false;
          }
          node = node.children[char];
      }
      return true;
  }
}