/**
 * @file implements Interaval class
 * @see
 *    var clock = new Interval(1000);
 *    
 *    clock.on('tick', function() {
 *       //do stuff with this interval
 *    });
 */
;(function() {
   
   var deps = [];
   
   deps.push('src/engine/Class');
   deps.push('src/engine/globals/Window');
   deps.push('src/engine/events/EventSet');
   
   define(deps, function (Class, Window, EventSet) {
       
      var Interval = new Class('Interval', function(speed, iterationsBeforeDie) {
         Interval.super.constructor.call(this);
         
         this.$$speed = Number(speed);
         this.$$clock = null;
         this.$$iterationsBeforeDie = Number(iterationsBeforeDie) || Infinity;
         this.$$iterations = 0;
      });
      
      Interval.extend(EventSet);
      
      Interval.prototype.start = function($$nonForced) {
         var that = this;
         
         if(!that.$$clock) {
            
            if(!$$nonForced) {
               that.$$iterations = 0;  
            }
            
            that.fire('start', Date.now());
            
            that.$$clock = Window.setInterval(function() {
               that.tick();
            }, that.$$speed);
         }
      };
      
      Interval.prototype.tick = function() {
         this.$$iterations++;
               
         this.fire('tick', this.$$iterations, Date.now());
            
         if(this.$$iterations >= this.$$iterationsBeforeDie) {
            this.stop();
         }
      };
      
      Interval.prototype.resume = function () {
         this.start(true);
         this.fire('resume', this.$$iterations, Date.now());
      };
      
      Interval.prototype.stop = function () {
         if(this.$$clock) {
            this.fire('stop', this.$$iterations, Date.now());
            Window.clearInterval(this.$$clock);
            this.$$clock = null;
         }
      };
      
      Interval.prototype.isRunning = function() {
         return Boolean(this.$$clock);
      };
      
      return Interval; 
   });
})();