import math

class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self._radius = radius
        elif diameter is not None:
            self._radius = diameter / 2
        else:
            raise ValueError("Either radius or diameter must be provided")
        if self._radius <= 0:
            raise ValueError("Circle dimensions must be positive")
    
    @property
    def radius(self):
        return self._radius
    
    @radius.setter
    def radius(self, value):
        if value <= 0:
            raise ValueError("Radius must be positive")
        self._radius = value
    
    @property
    def diameter(self):
        return self._radius * 2
    
    @diameter.setter
    def diameter(self, value):
        if value <= 0:
            raise ValueError("Diameter must be positive")
        self._radius = value / 2
    
    def area(self):
        return math.pi * self._radius ** 2
    
    def __str__(self):
        return f"Circle(radius={self._radius:.2f}, diameter={self.diameter:.2f}, area={self.area():.2f})"
    
    
    def __add__(self, other):
        """Add two circles and return a new circle with the combined radius."""
        if not isinstance(other, Circle):
            raise TypeError("Can only add another Circle")
        return Circle(radius=self.radius + other.radius)
    
    def __gt__(self, other):
        if not isinstance(other, Circle):
            raise TypeError("Can only compare with another Circle")
        return self.radius > other.radius
    
    def __eq__(self, other):
        if not isinstance(other, Circle):
            return False
        return self.radius == other.radius




# Example usage
if __name__ == "__main__":

    c1 = Circle(radius=5)
    c2 = Circle(diameter=16)
    c3 = Circle(radius=3)
    c4 = Circle(diameter=24)
    print(c1)
    print(c2)
    c5 = c1 + c3
    print(f"c1 + c3 = {c5}")
    print(f"c1 > c2: {c1 > c2}")
    print(f"c1 == Circle(radius=5): {c1 == Circle(radius=5)}")
    circles = [c1, c2, c3, c4, c5]
    sorted_circles = sorted(circles)
    print("\nSorted circles (smallest to largest):")
    for c in sorted_circles:
        print(c)
