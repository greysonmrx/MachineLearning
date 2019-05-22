function Genetic() {
    this.criaNeuronios = criaNeuronios;
    this.activateNetwork = activateNetwork;
    this.executeNeuron = executeNeuron;

    function criaNeuronios(num_con, inputs, outputs) {
        var pool = 10, connections = 15, gates = 5;
        while(neuronios.length < num_con){
            var n = new Architect.Liquid(inputs, pool, outputs, connections, gates);
            n.fitness = 0;
            neuronios.push(n);
        }
    }

    function activateNetwork(network, input) {
        if(input == undefined){
            network.fitness = 0;
            input = [0, 0, 0];
        }
        return network.activate(input);
    }

    function prepareCrossover() {
        neuronios = selectBestNeurons(5);
        var bestNeurons = _.clone(neuronios);
        // crossover de apenas 1/4
        while(neuronios.length < (numero_neuronios - Math.round(numero_neuronios / 2))){
            var neuA = _.sample(bestNeurons).toJSON();
            var neuB = _.sample(bestNeurons).toJSON();
            // Cross over and Mutate
            var newNeuron = mutate(crossOver(neuA, neuB));
            neuronios.push(Network.fromJSON(newNeuron));
        }

        while (neuronios.length < numero_neuronios) {
            // Pegando dois neuronios aleatórios
            var neu = _.sample(bestNeurons).toJSON();
            // Mutação
            var newNeuron = mutate(neu);
            // Adicionando à geração
            neuronios.push(Network.fromJSON(newNeuron));
        }
    }

    function selectBestNeurons(selectN) {
        var selected = _.sortBy(neuronios, 'fitness').reverse();
        while(selected.length > selectN){
            selected.pop();
        }
        return selected;
    }

    function crossOver(netA, netB) {
        // Swap (50% prob.)
        if (Math.random() > 0.5) {
            var tmp = netA;
            netA = netB;
            netB = tmp;
        }
        // Clone network
        netA = _.cloneDeep(netA);
        netB = _.cloneDeep(netB);
        // Cross over data keys
        crossOverDataKey(netA.neurons, netB.neurons, 'bias');
        return netA;
    }

    function crossOverDataKey(a, b, key) {
        var cutLocation = Math.round(a.length * Math.random());
        var tmp;
        for (var k = cutLocation; k < a.length; k++) {
            // Swap
            tmp = a[k][key];
            a[k][key] = b[k][key];
            b[k][key] = tmp;
        }
    }

    function mutate(net) {
        mutateDataKeys(net.neurons, 'bias', 0.3);
        mutateDataKeys(net.connections, 'weight', 0.3);
        return net;
    }

    function mutateDataKeys(a, key, mutationRate) {
        for (var k = 0; k < a.length; k++) {
            if (Math.random() > mutationRate) {
                continue;
            }
            a[k][key] += a[k][key] * (Math.random() - 0.5) * 3 + (Math.random() - 0.5);
        }
    }

    function executeNeuron(pos, co) {
        if (neuronios[pos].fitness == undefined || neuronios[pos].fitness < myscore.score) {
            neuronios[pos].fitness = myscore.score;
        }
        if (myscore.score > record_fitness) {
            record_fitness = myscore.score;
        }
        if (co) {
            prepareCrossover();
            geracao++;
        }
    }
}
