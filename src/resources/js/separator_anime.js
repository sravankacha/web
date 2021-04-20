//
// these easing functions are based on the code of glsl-easing module.
// https://github.com/glslify/glsl-easings
//

const ease = {
  exponentialIn: (t) => {
    return t == 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
  },
  exponentialOut: (t) => {
    return t == 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
  },
  exponentialInOut: (t) => {
    return t == 0.0 || t == 1.0
      ? t
      : t < 0.5
      ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0)
      : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
  },
  sineOut: (t) => {
    const HALF_PI = 1.5707963267948966;
    return Math.sin(t * HALF_PI);
  },
  circularInOut: (t) => {
    return t < 0.5
      ? 0.5 * (1.0 - Math.sqrt(1.0 - 4.0 * t * t))
      : 0.5 * (Math.sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
  },
  cubicIn: (t) => {
    return t * t * t;
  },
  cubicOut: (t) => {
    const f = t - 1.0;
    return f * f * f + 1.0;
  },
  cubicInOut: (t) => {
    return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
  },
  quadraticOut: (t) => {
    return -t * (t - 2.0);
  },
  quarticOut: (t) => {
    return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
  }
};
let step = 1;

class ShapeOverlays {
  constructor(elm) {
    this.elm = elm;
    this.path = elm.querySelector('path');
    this.numPoints = 4;
    this.duration = 1000;
    this.delayPointsArray = [];
    this.delayPointsMax = 0;
    this.timeStart = Date.now();
    this.flip = 1;
  }
  open() {
    this.timeStart = Date.now();
    for (var i = 0; i < this.numPoints; i++) {
      this.delayPointsArray[i] = 0;
    }
    this.renderLoop();
  }
  updatePath(time = 200) {
    const points = [];
    for (var i = 0; i < this.numPoints; i++) {
      const thisEase = i % 2 === 1 ? ease.sineOut : ease.exponentialInOut;
      const pointTime = (1 - thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1))) * 100;
      points[i] = pointTime;
    }

    let str = '';
    str += `M 0 0 H ${points[0]}`;
    for (var i = 0; i < this.numPoints - 1; i++) {
      const p = ((i + 1) / (this.numPoints - 1)) * 100;
      const cp = p - ((1 / (this.numPoints - 1)) * 100) / 2;
      str += `C ${points[i]} ${cp} ${points[i + 1]} ${cp} ${points[i + 1]} ${p} `;
    }
    str += `H 100 V 0`;
    return str;
  }
  render(flip = 1) {
    const timeDiff = 333 * flip; //Date.now() - this.timeStart;
    console.log(timeDiff);
    this.path.setAttribute('d', this.updatePath(timeDiff));
  }
  renderLoop() {
    // this.flip = -1 * this.flip;
    // if (this.flip) {
    // }
    // this.render(this.flip);
    // setInterval(() => {
    //   this.renderLoop();
    // }, 30);
  }
}

(function () {
  const elmOverlay = document.querySelector('.shape-overlays');
  const overlay = new ShapeOverlays(elmOverlay);
  overlay.open();
})();
