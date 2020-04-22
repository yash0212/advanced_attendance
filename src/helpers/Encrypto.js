export default class Encrypto {
  constructor() {
    this.key = Math.floor(Math.random() * (16 - 10)) + 10;
    this.loc = Math.floor(Math.random() * (30 - 11)) + 11;
    this.rev = Math.round(Math.random() * (3 - 2)) + 2;
    // this.key = 17
    // this.loc = 12
    // this.rev = 0
    this.letterCycle =
      'abdefghijkmnqrty1234567890ABDEFGHJKLMNQRTYabdefghijkmnqrty';
    this.spchr = '@#$%';
    this.randArr =
      '1234567890qwertyuioplkjhgfdsazxcvbnm1234567890POIUYTREWQASDFGHJKLMNBVCXZ';
  }
  enc1(x) {
    let index = this.letterCycle.indexOf(x);
    return this.letterCycle[index + this.key];
  }
  enc2(x) {
    let k = parseInt((this.key + '')[0]);
    let s = '';
    for (let i = 0; i < k; i++) {
      for (let j = i; j < x.length; j += k) {
        s += x[j];
      }
    }
    return s;
  }
  encrypt(...vars) {
    let temp = [];
    vars.forEach(i => {
      temp.push(
        i
          .toString()
          .split('')
          .map(x => this.enc1(x))
          .join(''),
      );
    });
    let res = [];
    temp.forEach(i => {
      res.push(this.enc2(i));
    });
    return res;
  }
  createMat(data) {
    let mat = [];
    // let mat = new Array(100).fill('*');
    for (let i = 0; i < 100; i++) {
      mat[i] = this.randArr[Math.floor(Math.random() * 72)];
    }
    let loc = this.loc;
    let cp = loc - 1;
    data.forEach(s => {
      s +=
        this.spchr[Math.floor(Math.random() * 4)] +
        (Math.floor(Math.random() * (8 + 1 - 2)) + 2).toString();
      for (let i = 0; i < s.length; i++) {
        mat[cp++] = s[i];
      }
      cp += parseInt(mat[cp - 1]) - 1;
    });

    loc = loc
      .toString()
      .split('')
      .map(x => this.enc1(x));
    let k = this.key.toString().split('');
    k =
      String.fromCharCode(loc.join('').charCodeAt(1) + parseInt(k[0])) +
      String.fromCharCode(loc.join('').charCodeAt(0) + parseInt(k[1]));
    mat[0] = this.rev == 2 ? loc[0] : loc[1];
    mat[1] = this.rev == 2 ? loc[1] : loc[0];
    mat[9] = this.rev;
    mat[98] = k[0];
    mat[99] = k[1];

    mat = mat.join('');
    return mat;
  }
  getCode(...vars) {
    let data = this.encrypt(...vars);
    let mat = this.createMat(data);
    return mat;
  }
}
