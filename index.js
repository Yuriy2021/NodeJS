const EventEmitter = require ('events');
const emitter = new EventEmitter();
let deadline = process.argv[2];
class Handler {
    static send(){
        console.log(`Before timer elapsed: ${getTimeRemaining(deadline).total / 1000}`)
    }
}
emitter.on("send", Handler.send);


function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
    
};
let timerID = setInterval(() => {
    if (getTimeRemaining(deadline).total > 0) {
        emitter.emit("send")}
        else{
            clearInterval(timerID)
        console.log('Timer was elapsed')}
        },1000);