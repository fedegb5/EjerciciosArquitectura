var Filter = require('bad-words');

export function badWords(data: string): string {
    const words = getWords(); 
    var customFilter = new Filter({words});
    return customFilter.clean(data);
}

function getWords(): string[]{
    return ['odio', 'feo', 'asco', 'peñarol', 'dolor'];
}