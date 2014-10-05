(function()
{
    this.moveDown = function() { console.log('down'); }
    this.moveUp = function() { console.log('up'); }
    this.moveLeft = function() { console.log('left'); }
    this.moveRight = function() { console.log('right'); }
    this.attackNearbyEnemy = function() { console.log('attack'); }
    
    var seq = 'ddruurrdda';

    var move_map =
    {
        'd': this.moveDown,
        'u': this.moveUp,
        'l': this.moveLeft,
        'r': this.moveRight,
        'a': this.attackNearbyEnemy
    };

    seq.split('').forEach(function(cmd)
    {
        move_map[cmd]();
    });
})();
