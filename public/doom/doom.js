'use strict';

window.Module = {
  monitorRunDependencies: function(toLoad) {
    this.dependencies = Math.max(this.dependencies, toLoad);
  },
  dependencies: 0,
  setStatus: null,
  progress: null,
  loader: null,
  canvas: null
};

function getStatus(status) {
  var loading = status.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
  if (loading) {
    var progress = loading[2] / loading[4] * 100;
    Module.progress.innerHTML = progress.toFixed(1) + '%';
    if (progress === 100) {
      setTimeout(function() {
        document.getElementById('fullscreen').classList.add('visible');
        Module.loader.classList.add('completed');
        Module.canvas.classList.add('ready');
      }, 500);
      setTimeout(function() {
        Module.canvas.dispatchEvent(new Event('mousedown'));
      }, 2000);
    }
  }
}

window.addEventListener('DOMContentLoaded', function() {
  Module.progress = document.getElementById('progress');
  Module.loader = document.getElementById('loader');
  Module.canvas = document.getElementById('doom');
  Module.setStatus = getStatus;

  Module.canvas.addEventListener('webglcontextlost', function(event) {
    alert('WebGL context lost. Please reload the page.');
    event.preventDefault();
  }, false);

  Module.canvas.addEventListener('contextmenu', function(event) {
    event.preventDefault();
  });

  document.getElementById('fullscreen').addEventListener('click', function() {
    Module.requestFullscreen(true, false);
  });

  var doomScript = document.createElement('script');
  doomScript.type = 'text/javascript';
  doomScript.src = 'doom1.js';
  document.body.appendChild(doomScript);
});
