---
title: "Positioning"
metaTitle: "Positioning"
metaDescription: "Positioning"
---

Understanding how to position overlays and underlays is important in translating a design into an chained transformation with overlay/underlay.

In the example in the previous section, we used a combination of gravity to initialize the starting position and x,y to position the text at a coordinate relative to the starting position.

Let’s look at some examples in the abstract.  

## Gravity

We'll see that gravity can be expressed in many ways.  We'll start by looking at gravity expressed by compass positions.  The default gravity is center if no other gravity positions are applied.  Once the center of gravity has been determined, you can use X, Y numerical values to position the overlaid text or image relative to the center of gravity.  

The picture below shows how X and Y are interpreted with respect to the primary compass positions North, East, South, and West.  You might develop the following intuition: increasing X values move the overlay to the right for all gravity except East and increasing Y value move the overlay down for all except South  

![compass primary gravity](https://res.cloudinary.com/cloudinary-training/image/upload/v1590886372/book/ou-position-compass-primary.png)

The picture below focuses on using secondary compass designations for gravity.  Here, the intuition is that increase X moves the overlay closer to the center and increasing Y moves the overlay farther from the center.

![compass secondary gravity](https://res.cloudinary.com/cloudinary-training/image/upload/v1590886459/book/ou-secondary-compass-gravity.png)

### Northwest Gravity

Some developers like to use northwest gravity because your center of gravity is upper left and you need only supply positive X, Y values to move down and to the right.
