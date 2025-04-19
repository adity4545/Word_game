particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 100,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": ["#00f5ff", "#ff00d4", "#ffffff"] // neon gaming colors
      },
      "shape": {
        "type": "star",
        
      },
      "opacity": {
        "value": 0.8,
        "random": true
      },
      "size": {
        "value": 4,
        "random": true
      },
      "line_linked": {
        "enable": true// disable connecting lines for a cleaner arcade feel
      },
      "move": {
        "enable": true,
        "speed": 3,
        "direction": "right",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": true
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse" // or "repulse" for a more energetic effect
        },
        "onclick": {
          "enable": true,
          "mode": "push" // adds more particles when clicked
        }
      },
      "modes": {
        "repulse": {
          "distance": 140,
          "line_linked": {
            "opacity": 0.5
          }
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": false
  });
  