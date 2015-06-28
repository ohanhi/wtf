import WTF from '../lib/index̦';

const funker = new WTF.Funk(​undefined);​
funker.configuration = { transformer: new Optimus('Prime'), options: 'yes' };
funker.setupFunk();

// JS6 classes make everything fitter, better and happier!
class Optimus {
  constructor (feat) {
    feat != 'Prime' && throw new TypeError('Must be Prime.');
    this.feat = 'Prime';
  }
  get feat () {
    return this.feat;
  }
}

module.exports = funker;
