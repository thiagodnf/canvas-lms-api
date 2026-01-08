export default function () {

    return [{
        type: 'output',
        regex: /<h2 (.*)>(.*)<\/h2>/g,
        replace: '<h2 $1><strong>$2</strong></h2>'
    }, {
        type: 'output',
        regex: /<h3 (.*)>(.*)<\/h3>/g,
        replace: '<h3 $1><strong>$2</strong></h3>'
    }];
}
