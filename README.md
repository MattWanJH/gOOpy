# Group 08 - gOOpy

[Try gOOpy Here](https://goopy-frontend.onrender.com/)

This ain't your grandma's 3D modeling software! With gOOpy you can create wild shapes and watch in fascination as they gOOp together with ray marching! Join our vibrant community of gOOpers, view their artworks, and get gOOpy today!
 metadata. Shapes is a list of "shape" type, which each contain information about what type of object it is as well as other parameters to describe it's position and features.

### Raymarching

The raymarching is implemented in `/gOOpy-frontend/public/shaders/raymarching.fs.glsl`.

This project uses a unique rendering technique called "raymarching". For each pixel, we cast a ray into the scene to check for collisions. Unlike raytracing which finds intersections of rays with polygons, raymarching (in our implementation) figures out the distance to the nearest shape, and then takes small steps until it hits the surface. This might sound inefficient, but it allows for some very fun new possibilities.

But how does it find the nearest distance to the surface? You can do this using a _signed distance function_. A signed distance function (or SDF) is a function that takes in an input and returns a distance to the surface. You can learn more, and see some examples [here](https://iquilezles.org/articles/distfunctions/).

So, at each step of the raymarching, we find the minimum value of all the SDFs. This gives us the maximum step size without passing through a shape. The ray will "march" to that point, and then check again. When the distance is very close to zero, we have hit a shape, and we render a surface at this point.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Visualization_of_SDF_ray_marching_algorithm.png/2880px-Visualization_of_SDF_ray_marching_algorithm.png" width="500px">

Source: [Wikipedia](https://en.wikipedia.org/wiki/Ray_marching#/media/File:Visualization_of_SDF_ray_marching_algorithm.png)

When we render a surface, we need some more information to calculate the lighting. Specifically, the need the surface normal. This is a vector that is orthogonal to a surface. Imaging spikey hair pointing straight outwards. We can calculate this from the SDF by sampling a few nearby points and using central differences. You can learn more about this [here](https://iquilezles.org/articles/normalsSDF/).

### gOOpiness

You might be wondering what is special about raymarching and signed distance functions. Well, they allow you to do some pretty unique effects. In our case, we are using a concept called "smooth minimum". In simple terms, it finds the minimum while smoothing around the edges. This technique allows shapes to "blend" or "gOOp" together. You can read more about it [here](https://iquilezles.org/articles/smin/).

There are other cool things you can do with SDFs. For example, you could make a shape defined by the intersection of two other shapes. You can also "subtract" from a shape using another shape. These are not currently implemented in gOOpy, but we plan on implementing it some day.

### WebGL and React

There were two requirements for our Editor that needed a special solution.

1. Users can add an arbitrary number of shapes in the scene
2. Users can select multiple types of shapes in their scene

The first one was a challenge because WebGL/Three.js require that the values passed to the shader are static in size. To solve this, we simply create a large fixed-size array that we fill with our shape data. Then we only need to loop over the existing shapes withing that array. Note that WebGL requires that we fill the array with data even if it's not used.

For the second one, this is a problem that would often be solved with some type of polymorphism. However, GLSL does not support polymorphism. So instead, all of our shape objects have a "type" attribute that contains the type ID. Then the raymarching step can check a different SDF based on the type.
