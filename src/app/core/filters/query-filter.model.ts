import {getSearchQuerys} from '@core/utils/query-builder';

export abstract class QueryFilter {
  getQuery(): string {
    const params = this;
    return getSearchQuerys(params).join('&');
  }

  // getQueryForRouter() {
  //   const params = this;
  //
  //   const result: any = {};
  //   for (const el in params) {
  //     if (params.hasOwnProperty(el) && Array.isArray(params[el])) {
  //       // result[el] = params[el].join(',');
  //     }
  //   }
  //
  //   return result;
  // }
}
