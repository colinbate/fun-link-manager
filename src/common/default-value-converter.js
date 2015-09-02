export class DefValueConverter {
  toView(value, defvalue) {
    return (value == null) ? defvalue : value;
  }
}