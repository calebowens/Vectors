export type TPoints<Length extends number> = [number, ...number[]] & { length: Length }

export class MismatchedSizeError {
  private message: string
  private name: string

  constructor(lhsWidth: number, rhsWidth: number) {
    this.message = `The left hand side, and the right hand side have mis-matched sizes. ${lhsWidth} and ${rhsWidth} respectively`
    this.name = 'MismatchedSizeError'
  }
}

/**
 * This is the super class. A generically lengthened vector that takes in a type argument for the length.
 */
export class Vec<Length extends number> {
  constructor(public points: TPoints<Length>, public length: Length) {
  }

  /**
   * This function creates a vector where each element is the same value
   * @param value The value for each element to be
   * @param length The length of the vector
   */
  static fromScalar<Length extends number>(value: number, length: Length): Vec<Length> {
    return new Vec<Length>(new Array(length).fill(value) as TPoints<Length>, length)
  }

  /**
   *
   * @param rhs
   * @protected
   * @throws MismatchedSizeError
   */
  protected _add(rhs: Vec<Length>) {
    if (this.length !== rhs.length) {
      throw new MismatchedSizeError(this.length, rhs.length)
    }

    return this.points.map((point, index) => point + rhs.points[index]) as TPoints<Length>
  }

  /**
   * Adds two vectors together
   * @param rhs
   * @throws MismatchedSizeError
   */
  add(rhs: Vec<Length>) {
    return new Vec(this._add(rhs), this.length)
  }

  /**
   *
   * @param rhs
   * @protected
   * @throws MismatchedSizeError
   */
  protected _sub(rhs: Vec<Length>) {
    if (this.length !== rhs.length) {
      throw new MismatchedSizeError(this.length, rhs.length)
    }

    return this.points.map((point, index) => point - rhs.points[index]) as TPoints<Length>
  }

  /**
   * Subtracts two vectors togethers
   * @param rhs
   * @throws MismatchedSizeError
   */
  sub(rhs: Vec<Length>) {
    return new Vec(this._sub(rhs), this.length)
  }

  /**
   *
   * @param rhs
   * @protected
   * @throws MismatchedSizeError
   */
  protected _mul(rhs: Vec<Length>) {
    if (this.length !== rhs.length) {
      throw new MismatchedSizeError(this.length, rhs.length)
    }

    return this.points.map((point, index) => point * rhs.points[index]) as TPoints<Length>
  }

  /**
   * Multiples each value of two vectors together
   * @param rhs
   * @throws MismatchedSizeError
   */
  mul(rhs: Vec<Length>) {
    return new Vec(this._mul(rhs), this.length)
  }

  /**
   *
   * @param rhs
   * @protected
   * @throws MismatchedSizeError
   */
  protected _div(rhs: Vec<Length>) {
    if (this.length !== rhs.length) {
      throw new MismatchedSizeError(this.length, rhs.length)
    }

    return this.points.map((point, index) => point / rhs.points[index]) as TPoints<Length>
  }

  protected _pow(power: number) {
    return this.points.map((point) => point ** power) as TPoints<Length>
  }

  /**
   * Raises each element to the power given
   * @param power
   */
  pow(power: number) {
    return new Vec(this._pow(power), this.length)
  }

  /**
   * Divides each value of two vectors together
   * @param rhs
   * @protected
   * @throws MismatchedSizeError
   */
  div(rhs: Vec<Length>) {
    return new Vec(this._div(rhs), this.length)
  }

  /**
   * Gives the dot product of two vectors
   * @param rhs
   * @throws MismatchedSizeError
   */
  dot(rhs: Vec<Length>) {
    return this._mul(rhs).reduce((n, acc) => n + acc, 0)
  }

  /**
   * Gives the magnitude of the vector
   */
  get size() {
    return this.dot(this) ** 0.5
  }

  /**
   * Gives the values of the vector summed up
   */
  get sum() {
    return this.points.reduce((n, acc) => n + acc, 0)
  }

  get _unit() {
    const size = this.size

    return this.points.map((point) => point / size) as TPoints<Length>
  }

  /**
   * Returns a unit vector of the current vector
   */
  get unit() {
    return new Vec<Length>(this._unit, this.length)
  }
}

export class Vec2 extends Vec<2> {
  constructor(points: TPoints<2>) {
    super(points, 2)
  }

  add(rhs: Vec<2>) {
    return new Vec2(this._add(rhs))
  }

  sub(rhs: Vec<2>) {
    return new Vec2(this._sub(rhs))
  }

  mul(rhs: Vec<2>) {
    return new Vec2(this._mul(rhs))
  }

  div(rhs: Vec<2>) {
    return new Vec2(this._div(rhs))
  }

  pow(power: number) {
    return new Vec2(this._pow(power))
  }

  get x() {
    return this.points[0]
  }

  set x(val) {
    this.points[0] = val
  }

  get y() {
    return this.points[1]
  }

  set y(val) {
    this.points[1] = val
  }

  get unit() {
    return new Vec2(this._unit)
  }
}

export class Vec3 extends Vec<3> {
  constructor(points: TPoints<3>) {
    super(points, 3)
  }

  add(rhs: Vec<3>) {
    return new Vec3(this._add(rhs))
  }

  sub(rhs: Vec<3>) {
    return new Vec3(this._sub(rhs))
  }

  mul(rhs: Vec<3>) {
    return new Vec3(this._mul(rhs))
  }

  div(rhs: Vec<3>) {
    return new Vec3(this._div(rhs))
  }

  pow(power: number) {
    return new Vec3(this._pow(power))
  }


  /**
   * Calculates a cross product
   * @param _rhs
   * @throws MismatchedSizeError
   */
  cross(_rhs: Vec<3>) {
    if (this.length !== _rhs.length) {
      throw new MismatchedSizeError(this.length, _rhs.length)
    }

    const rhs = new Vec3(_rhs.points)

    return new Vec3([
      this.y * rhs.z - this.z * rhs.y,
      this.z * rhs.x - this.x * rhs.z,
      this.z * rhs.y - this.y * rhs.x
    ])
  }

  get x() {
    return this.points[0]
  }

  set x(val) {
    this.points[0] = val
  }

  get y() {
    return this.points[1]
  }

  set y(val) {
    this.points[1] = val
  }

  get z() {
    return this.points[2]
  }

  set z(val) {
    this.points[2] = val
  }

  get unit() {
    return new Vec3(this._unit)
  }
}


export class Vec4 extends Vec<4> {
  constructor(points: TPoints<4>) {
    super(points, 4)
  }

  add(rhs: Vec<4>) {
    return new Vec4(this._add(rhs))
  }

  sub(rhs: Vec<4>) {
    return new Vec4(this._sub(rhs))
  }

  mul(rhs: Vec<4>) {
    return new Vec4(this._mul(rhs))
  }

  div(rhs: Vec<4>) {
    return new Vec4(this._div(rhs))
  }

  pow(power: number) {
    return new Vec4(this._pow(power))
  }

  get x() {
    return this.points[0]
  }

  set x(val) {
    this.points[0] = val
  }

  get y() {
    return this.points[1]
  }

  set y(val) {
    this.points[1] = val
  }

  get z() {
    return this.points[2]
  }

  set z(val) {
    this.points[2] = val
  }

  get w() {
    return this.points[3]
  }

  set w(val) {
    this.points[3] = val
  }

  get unit() {
    return new Vec4(this._unit)
  }
}