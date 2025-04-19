class GameTimer {
    constructor(duration = 2 * 60) {
        this.totalSeconds = duration;
        this.remainingSeconds = this.totalSeconds;
        this.timerInterval = null;
        this.timerElement = document.querySelector('.timer');
        this.timerContainer = document.querySelector('.timer-container');
        this.callbacks = {
            onTick: null,
            onTimeUp: null
        };
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    updateDisplay() {
        if (!this.timerElement) return;
        
        this.timerElement.textContent = this.formatTime(this.remainingSeconds);
        
        // Update timer color based on remaining time
        if (this.remainingSeconds <= 30) {
            this.timerElement.className = 'timer danger';
        } else if (this.remainingSeconds <= 60) {
            this.timerElement.className = 'timer warning';
        } else {
            this.timerElement.className = 'timer';
        }
        
        if (this.callbacks.onTick) {
            this.callbacks.onTick(this.remainingSeconds);
        }
    }

    start() {
        if (this.timerInterval) this.stop();
        
        this.timerInterval = setInterval(() => {
            this.remainingSeconds--;
            this.updateDisplay();
            
            if (this.remainingSeconds <= 0) {
                this.stop();
                if (this.callbacks.onTimeUp) {
                    this.callbacks.onTimeUp();
                }
            }
        }, 1000);
        
        this.updateDisplay();
    }

    stop() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    reset() {
        this.stop();
        this.remainingSeconds = this.totalSeconds;
        this.updateDisplay();
    }

    onTick(callback) {
        this.callbacks.onTick = callback;
    }

    onTimeUp(callback) {
        this.callbacks.onTimeUp = callback;
    }
}