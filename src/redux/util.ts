export function extraPathsValue(...params: any): { paths: string[]; value: any; batchUpdate: any } {

  let p1 = params[0], p2 = params.length >= 2 ? params[1] : null;
  let handFunc: any = null;
  if (typeof params[params.length - 1] === 'function') {
    handFunc = params[params.length - 1];
  }

  let paths: string[] = [], value, batchUpdate: any = [];
  
  if (typeof p1 === 'string' && p2 && p2.props && p2.props['data-paths']) {
    //字符数组;
    paths = p2.props['data-paths'].split('.');
    value = p1;
  } else if (p1 instanceof Array && p1[0].hasOwnProperty('paths') && p1[0].hasOwnProperty('value')) {
    batchUpdate = p1.map(({ paths, value }) => {
      let _paths = paths;
      if (typeof _paths === 'string') {
        _paths = paths.split('.');
      }
      return {
        paths: _paths, value
      }
    });
  } else if (typeof p1 === 'string') {
    //字符数组;
    paths = p1.split('.');
    value = p2;
  }
  return handFunc ? handFunc({ paths, value, batchUpdate, raw: params }) : { paths, value, batchUpdate };
}


