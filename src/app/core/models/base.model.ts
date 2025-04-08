export class BaseModel {
  public setAttributes(attributes?) {
    if (attributes) {
      const keys = Object.keys(attributes);
      if (keys.length) {
        keys.forEach(el => {
          this[el] = attributes[el];
        });
      }
    }

    return this;
  }
}
