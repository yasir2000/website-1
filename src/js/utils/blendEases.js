function blendEases(startEase, endEase, blender) {﻿
  blender = blender || Power4.easeInOut;
  return new Ease(function(v) {
    var b = blender.getRatio(v);
    return startEase.getRatio(v) * (1 - b) + endEase.getRatio(v) * b;
  });
}

export default blendEases