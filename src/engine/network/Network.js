/**
 * All Classes will be tested here, for now
 */
;(function() {
    
    var deps = [];
    
    deps.push('src/engine/Class');
    deps.push('src/engine/storage/Container');
    
    define(deps, function(Class, Container) {
        
        var Network = new Class('Network', function() {
            this.objects = new Container();
        });
        
        Network.prototype.register = function(name, gameObjectClass) {
            this.objects.add(name, gameObjectClass);
        };
        
        return Network;
    });
})();