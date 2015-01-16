;(function() {
    
    var deps = [];
    
    deps.push('src/engine/Class');
    deps.push('src/engine/network/Network');
    deps.push('src/lib/Socket.io');
    deps.push('src/engine/events/EventSet');
    deps.push('src/engine/utils/Each');
    
    define(deps, function(Class, Network, SocketIO, EventSet, Each) {
        
        var SocketNetwork = new Class('SocketNetwork', function() {
            SocketNetwork.super.constructor.call(this);
            
            this.socket = null;
            this.events = new EventSet();
        });
        
        SocketNetwork.extend(Network);
        
        SocketNetwork.prototype.connect = function(url, port) {
            this.socket = SocketIO.connect(url + (port || SocketNetwork.defaultPort));
            
            Each(SocketNetwork.IOEvents, (function(index, eventName) {
                this.socket.on(eventName, (function() {
                    this.event.fire(eventName);
                }).bind(this));
            }).bind(this));
            
        };
        
        SocketNetwork.defaultPort = 8080;
        
        SocketNetwork.IOEvents = [
            'connect',
            'connect_error',
            'connect_timeout',
            'reconnect',
            'reconnect_attempt',
            'reconnecting',
            'reconnect_error',
            'reconnect_failed',
            'error',
            'disconnect'
            ];
        
        return SocketNetwork;
    });
})();