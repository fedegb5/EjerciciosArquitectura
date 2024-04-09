"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pipeline {
    constructor() {
        // Initialize attributes
        this.filters = [];
    }
    use(filter) {
        // Add a filter to the execution flow
        this.filters.push(filter);
    }
    run(input) {
        /* Execute the first filter and then pass the modified input
          to the next filter
          */
        const result = this.filters.reduce(function (total, func) {
            return func(total);
        }, input);
        return result;
    }
}
exports.default = Pipeline;
