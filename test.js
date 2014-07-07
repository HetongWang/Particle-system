$(function() {

  var Particle = Backbone.Model.extend({
    initialize: function() {
      var radians = this.get('angle') * Math.PI / 180;
      this.set({
          vel_x: Math.cos(radians) * this.get('speed'),
          vel_y: Math.sin(radians) * this.get('speed')
      })
    },
    defaults: {
      pos_x: 0,
      pos_y: 0,
      speed: 5,
      life: 1,
      size: 2,
      lived: 0
    },
  });

  var Emitter = Backbone.Collection.extend({
    settings: {
       emission_rate: 50,
       min_life: 5,
       life_range: 2,
       min_angle: 0,
       angle_range: 360,
       min_speed: 50,
       speed_range: 15,
       min_size: 1,
       size_range: 1,
       color: '#011'
    },
    pos_x: 0,
    pos_y: 0,
    emission_delay: 15,
    last_update: 0,
    last_emission: 0,
    ctx: document.getElementById('canvas').getContext('2d'),
    updata: function() {
      if (!this.last_update) {
        this.last_update = Date.now();
        return;
      }
      this.updata_settings();
      var that = this;
      var time = Date.now();
      var dt = time - this.last_update;
      var temp = this.settings.emission_rate / 100;
      this.emission_delay = 10 / temp;
      this.last_emission += dt;
      this.last_update = time;
      if (this.last_emission > this.emission_delay) {
        var i = Math.floor(this.last_emission / this.emission_delay);
        this.last_emission -= i * this.emission_delay;
        while (i--) {
          var particle = new Particle({
            angle: this.settings.min_angle + Math.random() * this.settings.angle_range,
            speed: this.settings.min_speed + Math.random() * this.settings.speed_range,
            size:  this.settings.min_size + Math.random() * this.settings.size_range,
            life:  this.settings.min_life + Math.random() * this.settings.life_range
          });
          this.add(particle);
        }
      }
      dt /= 1000;
      this.each(function(particle) {
        var pos_x = particle.get('pos_x'),
            pos_y = particle.get('pos_y');
        var vel_x = particle.get('vel_x'),
            vel_y = particle.get('vel_y');
        pos_x += vel_x * dt;
        pos_y += vel_y * dt;
        particle.set({pos_x: pos_x});
        particle.set({pos_y: pos_y});
        particle.set({lived: particle.get('lived') + dt});
        if (particle.get('life') < particle.get('lived'))
          that.remove(particle);
      });
    },
    updata_settings: function() {
      this.settings = {
       emission_rate: parseInt($('input[name=rate]').val()),
       min_life: parseInt($('input[name=min_life]').val()),
       life_range: parseInt($('input[name=life_range]').val()),
       min_angle: parseInt($('input[name=min_angle]').val()),
       angle_range: parseInt($('input[name=angle_range]').val()),
       min_speed: parseInt($('input[name=min_speed]').val()),
       speed_range: parseInt($('input[name=speed_range]').val()),
       min_size: parseInt($('input[name=min_size]').val()),
       size_range: parseInt($('input[name=size_range]').val()),
       color: $('input[name=color]').val()
      };
    },
  });

  var emitter = new Emitter;

  var View = Backbone.View.extend({
    el: $('#canvas'),
    initialize: function() {
      $('#canvas')[0].width = $('#canvas').width() * 1.6;
      $('#canvas')[0].height = $('#canvas').height() * 1.6;
      emitter.pos_x = this.el.width / 2;
      emitter.pos_y = this.el.height / 2;
      emitter.ctx.fillStyle = emitter.settings.color;
      window.requestAnimationFrame(this.animate.bind(this));
    },
    animate: function() {
      emitter.ctx.clearRect(0, 0, this.el.width, this.el.height);
      emitter.updata();
      emitter.each(this.darwParticle);
      window.requestAnimationFrame(this.animate.bind(this));
    },
    darwParticle: function(particle) {
      var x = particle.get('pos_x') + emitter.pos_x;
      var y = particle.get('pos_y') + emitter.pos_y;
      emitter.ctx.beginPath();
      emitter.ctx.arc(x, y, particle.get('size'), 0, Math.PI * 2);
      emitter.ctx.fill();
    }
  });

  var view = new View;
});