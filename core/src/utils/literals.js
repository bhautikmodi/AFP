"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-any
function oneLine(strings, ...values) {
    const endResult = String.raw(strings, ...values);
    return endResult.replace(/(?:\n(?:\s*))+/gm, ' ').trim();
}
exports.oneLine = oneLine;
function indentBy(indentations) {
    let i = '';
    while (indentations--) {
        i += ' ';
    }
    return (strings, ...values) => {
        return i + stripIndent(strings, ...values).replace(/\n/g, '\n' + i);
    };
}
exports.indentBy = indentBy;
// tslint:disable-next-line:no-any
function stripIndent(strings, ...values) {
    const endResult = String.raw(strings, ...values);
    // remove the shortest leading indentation from each line
    const match = endResult.match(/^[ \t]*(?=\S)/gm);
    // return early if there's nothing to strip
    if (match === null) {
        return endResult;
    }
    const indent = Math.min(...match.map(el => el.length));
    const regexp = new RegExp('^[ \\t]{' + indent + '}', 'gm');
    return (indent > 0 ? endResult.replace(regexp, '') : endResult).trim();
}
exports.stripIndent = stripIndent;
// tslint:disable-next-line:no-any
function stripIndents(strings, ...values) {
    return String.raw(strings, ...values)
        .split('\n')
        .map(line => line.trim())
        .join('\n')
        .trim();
}
exports.stripIndents = stripIndents;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl0ZXJhbHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2hhbnNsL1NvdXJjZXMvaGFuc2wvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvY29yZS9zcmMvdXRpbHMvbGl0ZXJhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFXQSxrQ0FBa0M7QUFDbEMsaUJBQXdCLE9BQTZCLEVBQUUsR0FBRyxNQUFhO0lBQ3JFLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFFakQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDM0QsQ0FBQztBQUpELDBCQUlDO0FBRUQsa0JBQXlCLFlBQW9CO0lBQzNDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNYLE9BQU8sWUFBWSxFQUFFLEVBQUUsQ0FBQztRQUN0QixDQUFDLElBQUksR0FBRyxDQUFDO0lBQ1gsQ0FBQztJQUVELE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU0sRUFBRSxFQUFFO1FBQzVCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUMsQ0FBQztBQUNKLENBQUM7QUFURCw0QkFTQztBQUdELGtDQUFrQztBQUNsQyxxQkFBNEIsT0FBNkIsRUFBRSxHQUFHLE1BQWE7SUFDekUsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUVqRCx5REFBeUQ7SUFDekQsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRWpELDJDQUEyQztJQUMzQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuQixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLFVBQVUsR0FBRyxNQUFNLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRTNELE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN6RSxDQUFDO0FBZkQsa0NBZUM7QUFHRCxrQ0FBa0M7QUFDbEMsc0JBQTZCLE9BQTZCLEVBQUUsR0FBRyxNQUFhO0lBQzFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQztTQUNsQyxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDVixJQUFJLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFORCxvQ0FNQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbmV4cG9ydCB0eXBlIFRlbXBsYXRlVGFnID0gKHRlbXBsYXRlOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uc3Vic3RpdHV0aW9uczogYW55W10pID0+IHN0cmluZztcblxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG5leHBvcnQgZnVuY3Rpb24gb25lTGluZShzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4udmFsdWVzOiBhbnlbXSkge1xuICBjb25zdCBlbmRSZXN1bHQgPSBTdHJpbmcucmF3KHN0cmluZ3MsIC4uLnZhbHVlcyk7XG5cbiAgcmV0dXJuIGVuZFJlc3VsdC5yZXBsYWNlKC8oPzpcXG4oPzpcXHMqKSkrL2dtLCAnICcpLnRyaW0oKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZGVudEJ5KGluZGVudGF0aW9uczogbnVtYmVyKTogVGVtcGxhdGVUYWcge1xuICBsZXQgaSA9ICcnO1xuICB3aGlsZSAoaW5kZW50YXRpb25zLS0pIHtcbiAgICBpICs9ICcgJztcbiAgfVxuXG4gIHJldHVybiAoc3RyaW5ncywgLi4udmFsdWVzKSA9PiB7XG4gICAgcmV0dXJuIGkgKyBzdHJpcEluZGVudChzdHJpbmdzLCAuLi52YWx1ZXMpLnJlcGxhY2UoL1xcbi9nLCAnXFxuJyArIGkpO1xuICB9O1xufVxuXG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbmV4cG9ydCBmdW5jdGlvbiBzdHJpcEluZGVudChzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4udmFsdWVzOiBhbnlbXSkge1xuICBjb25zdCBlbmRSZXN1bHQgPSBTdHJpbmcucmF3KHN0cmluZ3MsIC4uLnZhbHVlcyk7XG5cbiAgLy8gcmVtb3ZlIHRoZSBzaG9ydGVzdCBsZWFkaW5nIGluZGVudGF0aW9uIGZyb20gZWFjaCBsaW5lXG4gIGNvbnN0IG1hdGNoID0gZW5kUmVzdWx0Lm1hdGNoKC9eWyBcXHRdKig/PVxcUykvZ20pO1xuXG4gIC8vIHJldHVybiBlYXJseSBpZiB0aGVyZSdzIG5vdGhpbmcgdG8gc3RyaXBcbiAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGVuZFJlc3VsdDtcbiAgfVxuXG4gIGNvbnN0IGluZGVudCA9IE1hdGgubWluKC4uLm1hdGNoLm1hcChlbCA9PiBlbC5sZW5ndGgpKTtcbiAgY29uc3QgcmVnZXhwID0gbmV3IFJlZ0V4cCgnXlsgXFxcXHRdeycgKyBpbmRlbnQgKyAnfScsICdnbScpO1xuXG4gIHJldHVybiAoaW5kZW50ID4gMCA/IGVuZFJlc3VsdC5yZXBsYWNlKHJlZ2V4cCwgJycpIDogZW5kUmVzdWx0KS50cmltKCk7XG59XG5cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuZXhwb3J0IGZ1bmN0aW9uIHN0cmlwSW5kZW50cyhzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4udmFsdWVzOiBhbnlbXSkge1xuICByZXR1cm4gU3RyaW5nLnJhdyhzdHJpbmdzLCAuLi52YWx1ZXMpXG4gICAgLnNwbGl0KCdcXG4nKVxuICAgIC5tYXAobGluZSA9PiBsaW5lLnRyaW0oKSlcbiAgICAuam9pbignXFxuJylcbiAgICAudHJpbSgpO1xufVxuIl19