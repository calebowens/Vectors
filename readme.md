# Vectors CO

This library is an implementation of N length vectors. I made the initial implementation for a ray tracing demo I was working on. Looking at the vector libraries out there, it seems like there aren't many multi-dimensional ones. So, here is mine.

### Documentation

TODO! remember to put link

## Example

Vec3; Also implemented are Vec2 and Vec4 specializations

```ts
import { Vec3 } from 'vectors-co'

const vec1 = new Vec3([1, 2, 3])
const vec2 = new Vec3([2, 3, 4])

const vec3 = vec1.add(vec2) // is Vec3([3, 5, 7])
const vec4 = vec1.mul(vec2) // is Vec3([2, 6, 12])
```

Vec<N>

```ts
import { Vec } from 'vectors-co'

const vec1 = new Vec([1, 2, 3], 3)
const vec2 = new Vec([2, 3, 4], 3)

const vec3 = vec1.add(vec2) // is Vec<3>([3, 5, 7], 3)
const vec4 = vec1.mul(vec2) // is Vec<3>([2, 6, 12], 3)
```

### TODO

- N-Length Cross Products, so the product of N-1 vectors crossed together
- No throwing errors. Throwing errors sucks.