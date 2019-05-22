function GameArea(obj) {
    this.numero_neuronios = obj.numero_neuronios;
    this.animation = obj.animation;
    this.genetic = obj.genetic;
    this.canvas = document.createElement("canvas");
    this.canvas.width = 800;
    this.canvas.height = 450;
    document.getElementById("canvascontainer").appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");
    this.pause = false;
    this.frameNo = 0;
    this.start = function () {
        this.genetic.criaNeuronios(this.numero_neuronios, 3, 2);
        updateGameArea();
    }

    this.stop = function () {
        cancelAnimationFrame(this.animation);
        this.pause = true;
    }

    this.clear = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
