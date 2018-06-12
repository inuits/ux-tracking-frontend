export class ESResponse<T> {


  public objects: T[];
  public total: number;

  set hits(value: object[]) {
    this.objects = [];
    value.forEach(obj => {

      obj['_source']['id'] = obj['_id'];
      this.objects.push(<T>obj['_source']);
    });
  }

  static from<T>(response) {
    const res = new ESResponse<T>();

    res.hits = response != null ? response['hits'] : [];
    res.total = response != null ? response['total'] : 0;

    return res;
  }
}
