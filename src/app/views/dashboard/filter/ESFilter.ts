export class ESFilter {
  static createQueryParams(filters: ESFilter[]): string {
    const params = new Map<string, string[]>();

    for (const filter of filters) {
      if (params.has(filter.field)) {
        params.get(filter.field).push(filter.getQueryValue());
      } else {
        params.set(filter.field, []);
        params.get(filter.field).push(filter.getQueryValue());
      }
    }

    return this.asQueryParam(params);
  }

  static asQueryParam(paramArray: Map<string, string[]>) {
    let query = '';

    paramArray.forEach((value, key) => {
      query += key + '=' + value;
      query += '&';
    });

    return query.substring(0, query.length - 1);
  }


  constructor(private field: string = null, private includes: string = null, private value: string = null, public removable: boolean = true) {
  }

  isInclude(): boolean {
    return this.includes === 'include';
  }

  isValid(): boolean {
    return this.field != null && this.includes != null && this.value != null;
  }

  duplicate(): ESFilter {
    return new ESFilter(this.field, this.includes, this.value);
  }

  getQueryValue(): string {
    let param = '';

    if (!this.isInclude()) {
      param += '!';
    }

    return param + this.value.toLowerCase();
  }

  sameAs(filter: ESFilter): boolean {
    return filter.field.toLowerCase() === this.field.toLowerCase()
      && filter.value.toLowerCase() === this.value.toLowerCase();
  }

}
