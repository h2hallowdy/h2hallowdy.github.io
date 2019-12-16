document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.querySelector('canvas');
    var c = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    document.addEventListener('resize', function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    
    function Snow() {
      this.radius = Math.random() * 5;
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = -this.radius;
      
      this.color = "#ffffff";
      this.velocity = {
        x: Math.random() * 4 - 2,
        y: Math.random() * 3 + 1
      }
    }
    Snow.prototype.draw = function(c) {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = this.color;
      c.shadowColor = this.color;
      c.shadowBlur = 5;
      c.fill();
      c.closePath();
    }
    
    Snow.prototype.update = function(c) {
      this.y += this.velocity.y;
      this.x += this.velocity.x;
      if(this.y >= canvas.height) {
        this.velocity.y = 0;
      }
      this.draw(c);
    }
    var arraySnow = [];
    function init() {
      arraySnow.push(new Snow());
    }
    
    function animate() {
      window.requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);
      arraySnow.forEach(function(snow) {
        snow.update(c);
      });
      if (arraySnow.length > 200) {
        arraySnow.splice(0, 1);
      }
      init();
    }
    animate();
    
  }, false);